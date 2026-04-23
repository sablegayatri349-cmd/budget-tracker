const crypto     = require("crypto");
const bcrypt     = require("bcrypt");
const nodemailer = require("nodemailer");
const User       = require("../models/User");

/* ── EMAIL TRANSPORTER ──
   Uses Gmail. Add these to your .env:
   EMAIL_USER=your@gmail.com
   EMAIL_PASS=your_app_password   ← Gmail App Password, NOT your real password
   CLIENT_URL=http://localhost:5000
   See: https://support.google.com/accounts/answer/185833 for App Password     */
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email service not configured. Please set EMAIL_USER and EMAIL_PASS in .env file");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/* ── FORGOT PASSWORD  POST /api/auth/forgot-password ──
   1. Find user by email
   2. Generate a secure random token
   3. Save token + expiry to user document
   4. Send reset email                                    */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    /* SECURITY: always return 200 even if email not found.
       This prevents attackers from knowing which emails are registered. */
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If that email is registered, a reset link has been sent",
      });
    }

    /* Generate a secure random token (32 bytes = 64 hex chars) */
    const resetToken   = crypto.randomBytes(32).toString("hex");
    const hashedToken  = crypto.createHash("sha256").update(resetToken).digest("hex");
    const tokenExpiry  = Date.now() + 15 * 60 * 1000; /* 15 minutes */

    /* Save hashed token to user */
    user.resetPasswordToken  = hashedToken;
    user.resetPasswordExpiry = tokenExpiry;
    await user.save();

    /* Build reset URL */
    const clientUrl  = process.env.CLIENT_URL || "http://localhost:5000";
    const resetUrl   = `${clientUrl}/reset-password.html?token=${resetToken}`;

    /* Send email */
    const transporter = createTransporter();
    await transporter.sendMail({
      from:    `"BudgetTracker" <${process.env.EMAIL_USER}>`,
      to:      user.email,
      subject: "Reset Your BudgetTracker Password",
      html: `
        <div style="font-family:'DM Sans',Arial,sans-serif;max-width:520px;margin:0 auto;background:#080f08;border-radius:16px;overflow:hidden;border:1px solid #2a402a;">

          <!-- HEADER -->
          <div style="background:#1a3d1a;padding:28px 32px;border-bottom:1px solid rgba(201,168,75,0.2);">
            <div style="font-size:22px;font-weight:600;color:#e8c86a;letter-spacing:-0.5px;">
              💰 BudgetTracker
            </div>
          </div>

          <!-- BODY -->
          <div style="padding:32px;">
            <h2 style="color:#e8f0e0;font-size:22px;margin:0 0 12px;">Reset Your Password</h2>
            <p style="color:#7a9870;font-size:14px;line-height:1.6;margin:0 0 24px;">
              Hi <strong style="color:#e8f0e0;">${user.name}</strong>,<br/>
              We received a request to reset your BudgetTracker password.
              Click the button below to set a new password.
            </p>

            <!-- BUTTON -->
            <div style="text-align:center;margin:28px 0;">
              <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#c9a84c,#e8c86a);color:#0c0c00;text-decoration:none;border-radius:50px;font-weight:700;font-size:15px;letter-spacing:0.3px;">
                Reset My Password
              </a>
            </div>

            <p style="color:#3a5030;font-size:12px;line-height:1.6;margin:0 0 16px;">
              Or copy this link into your browser:<br/>
              <span style="color:#7a9870;word-break:break-all;">${resetUrl}</span>
            </p>

            <!-- WARNING -->
            <div style="background:#1a2a1a;border:1px solid #2a402a;border-radius:10px;padding:14px 16px;margin-top:20px;">
              <p style="color:#7a9870;font-size:12px;margin:0;line-height:1.6;">
                ⏰ This link expires in <strong style="color:#e8c86a;">15 minutes</strong>.<br/>
                🔒 If you didn't request this, you can safely ignore this email — your password will not change.
              </p>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="padding:16px 32px;border-top:1px solid #1f2f1f;">
            <p style="color:#3a5030;font-size:11px;margin:0;text-align:center;">
              © 2025 BudgetTracker · This email was sent to ${user.email}
            </p>
          </div>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "If that email is registered, a reset link has been sent",
    });

  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send reset email. Try again later." });
  }
};

/* ── RESET PASSWORD  POST /api/auth/reset-password ──
   1. Hash the token from URL
   2. Find user with matching token that hasn't expired
   3. Hash new password and save
   4. Clear reset token fields                           */
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: "Token and new password are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    /* Hash the incoming token to compare with stored hash */
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    /* Find user with matching token that hasn't expired */
    const user = await User.findOne({
      resetPasswordToken:  hashedToken,
      resetPasswordExpiry: { $gt: Date.now() }, /* $gt = greater than (not expired) */
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or has expired. Please request a new one.",
      });
    }

    /* Hash new password and save */
    user.password            = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken  = undefined; /* clear the token */
    user.resetPasswordExpiry = undefined; /* clear the expiry */
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });

  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({ success: false, message: "Server error during password reset" });
  }
};