/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║       BudgetTracker — Miu Miu Help Tour 🩵                  ║
 * ║  One file · All pages · 11 languages · Auto page detect     ║
 * ║  Gayatri Sable — College Mini Project                       ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

(function () {
  "use strict";

  // ─── LANGUAGE DETECTION ──────────────────────────────────────────────────
  function getLang() {
    return localStorage.getItem("bt_language") || "en";
  }

  // ─── PAGE DETECTION ───────────────────────────────────────────────────────
  function getPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("income-expense")) return "income";
    if (path.includes("monthly"))        return "monthly";
    if (path.includes("barchart"))       return "barchart";
    if (path.includes("savings-goals"))  return "savings";
    if (path.includes("bill-reminders")) return "bills";
    if (path.includes("pdf-report"))     return "pdf";
    if (path.includes("profile"))        return "profile";
    if (path.includes("settings"))       return "settings";
    if (path.includes("welcome"))        return "welcome";
    return "dashboard"; // index.html
  }

  // ─── ALL TOUR STEPS PER PAGE ─────────────────────────────────────────────
  // Each step: { id: "element-id" | null (center), title, desc }
  // id = null means Miu floats in center (intro/goodbye)

  const STEPS = {

    // ── DASHBOARD (index.html) ─────────────────────────────────────────────
    dashboard: {
      en: [
        { id: null,          title: "Hi, I'm Miu Miu! 🩵",         desc: "I'm your friendly budget buddy! Let me give you a quick tour of BudgetTracker. Ready? Let's go!" },
        { id: "stat-total",  title: "Total Expenses 💸",             desc: "This card shows all the money you've spent in total. Your grand spending sum — keep it in check!" },
        { id: "stat-month",  title: "This Month 📅",                 desc: "How much you've spent this month specifically. Great for tracking your monthly habits!" },
        { id: "stat-budget", title: "Budget Used 🎯",                desc: "What percentage of your budget is gone. Try to keep it under 100%! 😅" },
        { id: "stat-avg",    title: "Avg Expense 📊",                desc: "Your average expense amount per transaction. High number? Maybe cut back on those bubble teas! 🧋" },
        { id: "add-expense", title: "Add Expense ✏️",                desc: "Use this form to record a new expense. Enter the title, amount, date, category — then click Add!" },
        { id: "chart-cat",   title: "Category Chart 🥧",             desc: "This pie chart shows where your money goes by category — Food, Shopping, Bills and more!" },
        { id: "chart-7days", title: "Last 7 Days 📈",                desc: "Your spending trend over the past week as a bar chart. Spending more on weekends? 👀" },
        { id: "all-txn",     title: "All Transactions 📋",           desc: "Every expense you've added lives here. Review, filter, or delete entries anytime!" },
        { id: null,          title: "You're all set! 🎉",            desc: "That's the dashboard! Click the 🩵 Help Tour link in the sidebar anytime to see this again. Happy budgeting!" },
      ],
      hi: [
        { id: null,          title: "नमस्ते! मैं Miu Miu हूँ! 🩵",   desc: "मैं आपकी बजट सहेली हूँ! चलिए BudgetTracker का एक त्वरित दौरा करते हैं। तैयार हैं? चलते हैं!" },
        { id: "stat-total",  title: "कुल खर्च 💸",                   desc: "इस कार्ड में आपने अब तक जितना खर्च किया है वो दिखता है। अपने कुल खर्च पर नज़र रखें!" },
        { id: "stat-month",  title: "इस महीने 📅",                   desc: "इस महीने आपने कितना खर्च किया। मासिक आदतों को ट्रैक करने के लिए बढ़िया!" },
        { id: "stat-budget", title: "बजट उपयोग 🎯",                  desc: "आपका कितना बजट खर्च हो गया। इसे 100% से कम रखने की कोशिश करें! 😅" },
        { id: "stat-avg",    title: "औसत खर्च 📊",                   desc: "प्रति लेनदेन औसत खर्च राशि। ज़्यादा है? शायद कुछ चीज़ें कम खरीदें! 🧋" },
        { id: "add-expense", title: "खर्च जोड़ें ✏️",                desc: "नया खर्च दर्ज करने के लिए इस फ़ॉर्म का उपयोग करें। शीर्षक, राशि, तारीख, श्रेणी भरें — फिर Add दबाएं!" },
        { id: "chart-cat",   title: "श्रेणी चार्ट 🥧",               desc: "यह पाई चार्ट दिखाता है कि आपका पैसा कहाँ जाता है — खाना, खरीदारी, बिल और बहुत कुछ!" },
        { id: "chart-7days", title: "पिछले 7 दिन 📈",                desc: "पिछले हफ्ते का खर्च रुझान बार चार्ट में। क्या आप वीकेंड पर ज़्यादा खर्च करते हैं? 👀" },
        { id: "all-txn",     title: "सभी लेनदेन 📋",                 desc: "आपके सभी खर्च यहाँ हैं। कभी भी समीक्षा करें, फ़िल्टर करें या हटाएं!" },
        { id: null,          title: "सब तैयार! 🎉",                  desc: "यह था डैशबोर्ड! साइडबार में 🩵 Help Tour पर फिर से क्लिक करें। खुशहाल बजटिंग!" },
      ],
      zh: [
        { id: null,          title: "你好！我是Miu Miu！🩵",           desc: "我是你的预算小伙伴！让我带你快速了解BudgetTracker。准备好了吗？出发！" },
        { id: "stat-total",  title: "总支出 💸",                      desc: "这张卡显示你迄今为止的总花费。你的总支出金额——请留意它！" },
        { id: "stat-month",  title: "本月 📅",                        desc: "本月你具体花了多少钱。非常适合追踪每月习惯！" },
        { id: "stat-budget", title: "预算使用 🎯",                    desc: "你已经用掉了多少预算百分比。尽量保持在100%以下！😅" },
        { id: "stat-avg",    title: "平均支出 📊",                    desc: "每笔交易的平均支出金额。数字太高？也许少喝点奶茶！🧋" },
        { id: "add-expense", title: "添加支出 ✏️",                    desc: "用这个表单记录新支出。填入标题、金额、日期、类别——然后点击添加！" },
        { id: "chart-cat",   title: "类别图表 🥧",                    desc: "这个饼图显示你的钱流向哪里——食物、购物、账单等等！" },
        { id: "chart-7days", title: "近7天 📈",                       desc: "过去一周的支出趋势柱状图。周末花得更多吗？👀" },
        { id: "all-txn",     title: "所有交易 📋",                    desc: "你添加的每笔支出都在这里。随时查看、筛选或删除！" },
        { id: null,          title: "全部完成！🎉",                   desc: "这就是仪表板！随时点击侧边栏中的🩵帮助导览再次查看。愉快地管理预算！" },
      ],
      ja: [
        { id: null,          title: "こんにちは！Miu Miuです！🩵",    desc: "私はあなたの予算フレンドです！BudgetTrackerを案内しますね。準備はいい？レッツゴー！" },
        { id: "stat-total",  title: "総支出 💸",                      desc: "これまでに使った合計金額を表示します。総支出額を把握しましょう！" },
        { id: "stat-month",  title: "今月 📅",                        desc: "今月の支出金額です。毎月の習慣を追跡するのに便利！" },
        { id: "stat-budget", title: "予算使用率 🎯",                  desc: "予算の何パーセントを使ったか。100%以下を目指しましょう！😅" },
        { id: "stat-avg",    title: "平均支出 📊",                    desc: "1回あたりの平均支出額です。高い？タピオカを減らしましょう！🧋" },
        { id: "add-expense", title: "支出を追加 ✏️",                  desc: "このフォームで新しい支出を記録します。タイトル・金額・日付・カテゴリを入力して追加！" },
        { id: "chart-cat",   title: "カテゴリチャート 🥧",            desc: "円グラフでお金の使い道を表示します——食費・買い物・光熱費など！" },
        { id: "chart-7days", title: "直近7日間 📈",                   desc: "過去1週間の支出傾向を棒グラフで表示。週末に使いすぎてる？👀" },
        { id: "all-txn",     title: "全取引 📋",                      desc: "追加したすべての支出がここに。いつでも確認・絞り込み・削除できます！" },
        { id: null,          title: "準備完了！🎉",                   desc: "ダッシュボードの説明でした！サイドバーの🩵ヘルプツアーでいつでも見直せます。" },
      ],
      ar: [
        { id: null,          title: "مرحبًا! أنا Miu Miu! 🩵",       desc: "أنا رفيقتك في الميزانية! دعيني أرشدك في جولة سريعة. هل أنت مستعد؟ هيا بنا!" },
        { id: "stat-total",  title: "إجمالي النفقات 💸",              desc: "تعرض هذه البطاقة إجمالي ما أنفقته حتى الآن. راقب مجموع إنفاقك!" },
        { id: "stat-month",  title: "هذا الشهر 📅",                   desc: "كم أنفقت هذا الشهر تحديدًا. رائع لتتبع عاداتك الشهرية!" },
        { id: "stat-budget", title: "الميزانية المستخدمة 🎯",         desc: "نسبة ميزانيتك التي استنفدتها. حاول إبقاءها تحت 100%! 😅" },
        { id: "stat-avg",    title: "متوسط النفقات 📊",               desc: "متوسط مبلغ الإنفاق لكل معاملة. مرتفع؟ ربما خفف المشتريات! 🧋" },
        { id: "add-expense", title: "إضافة نفقة ✏️",                  desc: "استخدم هذا النموذج لتسجيل نفقة جديدة. أدخل العنوان والمبلغ والتاريخ والفئة ثم اضغط إضافة!" },
        { id: "chart-cat",   title: "مخطط الفئات 🥧",                 desc: "يعرض الرسم البياني الدائري أين يذهب مالك — طعام وتسوق وفواتير وأكثر!" },
        { id: "chart-7days", title: "آخر 7 أيام 📈",                  desc: "اتجاه إنفاقك خلال الأسبوع الماضي. هل تنفق أكثر في عطلة نهاية الأسبوع؟ 👀" },
        { id: "all-txn",     title: "جميع المعاملات 📋",              desc: "كل نفقاتك هنا. راجع أو رشّح أو احذف أي إدخال في أي وقت!" },
        { id: null,          title: "أنت جاهز! 🎉",                   desc: "هذه لوحة التحكم! انقر على 🩵 جولة المساعدة في الشريط الجانبي لرؤيتها مرة أخرى." },
      ],
      fr: [
        { id: null,          title: "Bonjour ! Je suis Miu Miu ! 🩵", desc: "Je suis ton assistante budget ! Laisse-moi te faire visiter BudgetTracker. Prêt(e) ? C'est parti !" },
        { id: "stat-total",  title: "Total des dépenses 💸",           desc: "Cette carte affiche tout l'argent dépensé jusqu'ici. Surveille ce grand total !" },
        { id: "stat-month",  title: "Ce mois-ci 📅",                   desc: "Combien tu as dépensé ce mois-ci précisément. Idéal pour suivre tes habitudes mensuelles !" },
        { id: "stat-budget", title: "Budget utilisé 🎯",               desc: "Quel pourcentage de ton budget est déjà dépensé. Essaie de rester sous 100% ! 😅" },
        { id: "stat-avg",    title: "Dépense moyenne 📊",              desc: "Le montant moyen par transaction. C'est élevé ? Moins de bubble teas peut-être ! 🧋" },
        { id: "add-expense", title: "Ajouter une dépense ✏️",          desc: "Utilise ce formulaire pour enregistrer une nouvelle dépense. Titre, montant, date, catégorie — puis Ajouter !" },
        { id: "chart-cat",   title: "Graphique par catégorie 🥧",      desc: "Ce camembert montre où va ton argent — Nourriture, Shopping, Factures et plus !" },
        { id: "chart-7days", title: "Les 7 derniers jours 📈",         desc: "Ta tendance de dépenses sur la semaine passée. Tu dépenses plus le week-end ? 👀" },
        { id: "all-txn",     title: "Toutes les transactions 📋",      desc: "Toutes tes dépenses sont ici. Consulte, filtre ou supprime n'importe quelle entrée !" },
        { id: null,          title: "C'est tout ! 🎉",                 desc: "Voilà pour le tableau de bord ! Clique sur 🩵 Aide dans la barre latérale pour revoir ça." },
      ],
      de: [
        { id: null,          title: "Hallo! Ich bin Miu Miu! 🩵",     desc: "Ich bin dein Budget-Freund! Lass mich dir BudgetTracker zeigen. Bereit? Los geht's!" },
        { id: "stat-total",  title: "Gesamtausgaben 💸",               desc: "Diese Karte zeigt alle bisher ausgegebenen Beträge. Behalte deine Gesamtausgaben im Blick!" },
        { id: "stat-month",  title: "Diesen Monat 📅",                 desc: "Wie viel du speziell in diesem Monat ausgegeben hast. Toll um monatliche Gewohnheiten zu verfolgen!" },
        { id: "stat-budget", title: "Budget verbraucht 🎯",            desc: "Wie viel Prozent deines Budgets bereits aufgebraucht sind. Versuche, unter 100% zu bleiben! 😅" },
        { id: "stat-avg",    title: "Durchschnittsausgabe 📊",         desc: "Dein durchschnittlicher Ausgabenbetrag pro Transaktion. Hoch? Vielleicht weniger Bubble Tea! 🧋" },
        { id: "add-expense", title: "Ausgabe hinzufügen ✏️",           desc: "Nutze dieses Formular um neue Ausgaben zu erfassen. Titel, Betrag, Datum, Kategorie — dann Hinzufügen!" },
        { id: "chart-cat",   title: "Kategorien-Diagramm 🥧",          desc: "Dieses Kreisdiagramm zeigt wohin dein Geld fließt — Essen, Shopping, Rechnungen und mehr!" },
        { id: "chart-7days", title: "Letzte 7 Tage 📈",                desc: "Dein Ausgabentrend der vergangenen Woche als Balkendiagramm. Mehr am Wochenende? 👀" },
        { id: "all-txn",     title: "Alle Transaktionen 📋",           desc: "Alle deine Ausgaben sind hier. Jederzeit ansehen, filtern oder löschen!" },
        { id: null,          title: "Alles klar! 🎉",                  desc: "Das war das Dashboard! Klicke auf 🩵 Hilfe-Tour in der Seitenleiste um es nochmal zu sehen." },
      ],
      es: [
        { id: null,          title: "¡Hola! ¡Soy Miu Miu! 🩵",        desc: "¡Soy tu amiga del presupuesto! Déjame mostrarte BudgetTracker. ¿Lista? ¡Vamos!" },
        { id: "stat-total",  title: "Gastos totales 💸",               desc: "Esta tarjeta muestra todo el dinero gastado hasta ahora. ¡Vigila tu gran total!" },
        { id: "stat-month",  title: "Este mes 📅",                     desc: "Cuánto has gastado este mes específicamente. ¡Genial para seguir tus hábitos mensuales!" },
        { id: "stat-budget", title: "Presupuesto usado 🎯",            desc: "Qué porcentaje de tu presupuesto ya gastaste. ¡Intenta mantenerte bajo el 100%! 😅" },
        { id: "stat-avg",    title: "Gasto promedio 📊",               desc: "Tu gasto promedio por transacción. ¿Alto? ¡Quizás menos bubble teas! 🧋" },
        { id: "add-expense", title: "Agregar gasto ✏️",                desc: "Usa este formulario para registrar un nuevo gasto. Título, monto, fecha, categoría — ¡luego Agregar!" },
        { id: "chart-cat",   title: "Gráfico por categoría 🥧",        desc: "Este gráfico circular muestra adónde va tu dinero — Comida, Compras, Facturas y más!" },
        { id: "chart-7days", title: "Últimos 7 días 📈",               desc: "Tu tendencia de gastos de la semana pasada en barras. ¿Gastas más en fines de semana? 👀" },
        { id: "all-txn",     title: "Todas las transacciones 📋",      desc: "Todos tus gastos están aquí. ¡Revisa, filtra o elimina cualquier entrada cuando quieras!" },
        { id: null,          title: "¡Todo listo! 🎉",                 desc: "¡Eso es el panel! Haz clic en 🩵 Tour de Ayuda en la barra lateral para verlo de nuevo." },
      ],
      pt: [
        { id: null,          title: "Olá! Eu sou Miu Miu! 🩵",        desc: "Sou sua amiga do orçamento! Deixa eu te mostrar o BudgetTracker. Pronto(a)? Vamos lá!" },
        { id: "stat-total",  title: "Total de Gastos 💸",              desc: "Este cartão mostra todo o dinheiro gasto até agora. Fique de olho no seu total!" },
        { id: "stat-month",  title: "Este Mês 📅",                     desc: "Quanto você gastou especificamente neste mês. Ótimo para acompanhar hábitos mensais!" },
        { id: "stat-budget", title: "Orçamento Usado 🎯",              desc: "Que porcentagem do seu orçamento já foi usada. Tente manter abaixo de 100%! 😅" },
        { id: "stat-avg",    title: "Gasto Médio 📊",                  desc: "Seu gasto médio por transação. Alto? Talvez menos bubble teas! 🧋" },
        { id: "add-expense", title: "Adicionar Gasto ✏️",              desc: "Use este formulário para registrar um novo gasto. Título, valor, data, categoria — depois Adicionar!" },
        { id: "chart-cat",   title: "Gráfico por Categoria 🥧",        desc: "Este gráfico de pizza mostra para onde vai seu dinheiro — Comida, Compras, Contas e mais!" },
        { id: "chart-7days", title: "Últimos 7 Dias 📈",               desc: "Sua tendência de gastos da semana passada em barras. Gasta mais no fim de semana? 👀" },
        { id: "all-txn",     title: "Todas as Transações 📋",          desc: "Todos os seus gastos estão aqui. Revise, filtre ou exclua qualquer entrada a qualquer hora!" },
        { id: null,          title: "Tudo pronto! 🎉",                 desc: "Esse é o painel! Clique em 🩵 Tour de Ajuda na barra lateral para ver novamente." },
      ],
      ko: [
        { id: null,          title: "안녕하세요! 저는 Miu Miu예요! 🩵", desc: "저는 여러분의 예산 친구예요! BudgetTracker를 안내해 드릴게요. 준비됐나요? 출발!" },
        { id: "stat-total",  title: "총 지출 💸",                      desc: "지금까지 사용한 총 금액을 보여주는 카드예요. 총 지출을 잘 확인하세요!" },
        { id: "stat-month",  title: "이번 달 📅",                      desc: "이번 달에 얼마나 썼는지 확인하세요. 월별 습관 추적에 딱이에요!" },
        { id: "stat-budget", title: "예산 사용률 🎯",                  desc: "예산의 몇 퍼센트를 사용했는지 보여줘요. 100% 미만으로 유지하려고 노력하세요! 😅" },
        { id: "stat-avg",    title: "평균 지출 📊",                    desc: "거래당 평균 지출 금액이에요. 높다면 버블티를 줄여볼까요! 🧋" },
        { id: "add-expense", title: "지출 추가 ✏️",                    desc: "이 양식으로 새 지출을 기록하세요. 제목, 금액, 날짜, 카테고리를 입력하고 추가 버튼을 누르세요!" },
        { id: "chart-cat",   title: "카테고리 차트 🥧",                desc: "파이 차트로 돈이 어디에 쓰이는지 확인하세요 — 음식, 쇼핑, 청구서 등!" },
        { id: "chart-7days", title: "최근 7일 📈",                     desc: "지난 주 지출 추세를 막대 차트로 보여줘요. 주말에 더 많이 쓰나요? 👀" },
        { id: "all-txn",     title: "모든 거래 📋",                    desc: "추가한 모든 지출이 여기 있어요. 언제든지 검토, 필터, 삭제할 수 있어요!" },
        { id: null,          title: "모두 완료! 🎉",                   desc: "대시보드 소개가 끝났어요! 사이드바의 🩵 도움말 투어를 클릭하면 다시 볼 수 있어요." },
      ],
      ru: [
        { id: null,          title: "Привет! Я Miu Miu! 🩵",           desc: "Я твой бюджетный помощник! Давай я покажу тебе BudgetTracker. Готов(а)? Поехали!" },
        { id: "stat-total",  title: "Общие расходы 💸",                desc: "На этой карточке показана вся потраченная сумма. Следи за своим итогом!" },
        { id: "stat-month",  title: "Этот месяц 📅",                   desc: "Сколько ты потратил(а) именно в этом месяце. Отлично для отслеживания привычек!" },
        { id: "stat-budget", title: "Использовано бюджета 🎯",         desc: "Какой процент бюджета уже потрачен. Постарайся оставаться ниже 100%! 😅" },
        { id: "stat-avg",    title: "Средний расход 📊",               desc: "Средняя сумма на транзакцию. Высокая? Может, меньше пить bubble tea! 🧋" },
        { id: "add-expense", title: "Добавить расход ✏️",              desc: "Используй эту форму для записи нового расхода. Название, сумма, дата, категория — затем Добавить!" },
        { id: "chart-cat",   title: "График по категориям 🥧",         desc: "Эта круговая диаграмма показывает, куда уходят деньги — еда, покупки, счета и многое другое!" },
        { id: "chart-7days", title: "Последние 7 дней 📈",             desc: "Тенденция расходов за прошлую неделю в виде столбчатой диаграммы. Тратишь больше в выходные? 👀" },
        { id: "all-txn",     title: "Все транзакции 📋",               desc: "Все твои расходы здесь. Просматривай, фильтруй или удаляй любую запись в любое время!" },
        { id: null,          title: "Всё готово! 🎉",                  desc: "Это был дашборд! Нажми 🩵 Помощь в боковой панели, чтобы посмотреть снова." },
      ],
    },

    // ── INCOME vs EXPENSE ──────────────────────────────────────────────────
    income: {
      en: [
        { id: null,         title: "Income vs Expense 🩵",        desc: "This page helps you compare what you earn against what you spend. Let me show you around!" },
        { id: "sc-income",  title: "Total Income 💚",              desc: "All the money coming in — salary, freelance, gifts — your total income sum!" },
        { id: "sc-expense", title: "Total Expenses 🔴",            desc: "All the money going out. Compare it with your income to see how you're doing!" },
        { id: "sc-net",     title: "Net Balance 💛",               desc: "Income minus expenses. If it's positive, great job saving! If negative, time to cut back! 😅" },
        { id: "sc-rate",    title: "Savings Rate 📊",              desc: "What percentage of your income you're actually saving. Aim for at least 20%! 🎯" },
        { id: "vt-month",   title: "View Toggle 📅",               desc: "Switch between Monthly and Weekly views of your income vs expense chart!" },
        { id: "mainChart",  title: "Income vs Expense Chart 📈",   desc: "This bar chart shows your income (green) vs expenses (red) side by side. Spot the trends!" },
        { id: "txnRows",    title: "All Transactions 📋",          desc: "See all your income and expense entries here. Filter by All, Income, or Expenses!" },
        { id: "inc-title",  title: "Add Income ➕",                desc: "Use this form to record a new income source — salary, freelance work, or any money you received!" },
        { id: null,         title: "Great job! 🎉",               desc: "That's the Income vs Expense page! Knowing your cash flow is the first step to financial freedom!" },
      ],
      hi: [
        { id: null,         title: "आय बनाम व्यय 🩵",             desc: "यह पृष्ठ आपकी कमाई और खर्च की तुलना करता है। चलिए देखते हैं!" },
        { id: "sc-income",  title: "कुल आय 💚",                   desc: "सभी आने वाले पैसे — वेतन, फ्रीलांस, उपहार — आपकी कुल आय!" },
        { id: "sc-expense", title: "कुल व्यय 🔴",                 desc: "सभी जाने वाले पैसे। अपनी आय से तुलना करें!" },
        { id: "sc-net",     title: "शुद्ध शेष 💛",                desc: "आय घटाएं व्यय। सकारात्मक = बचत, नकारात्मक = कटौती का समय! 😅" },
        { id: "sc-rate",    title: "बचत दर 📊",                   desc: "आप अपनी कमाई का कितना प्रतिशत बचा रहे हैं। कम से कम 20% का लक्ष्य रखें! 🎯" },
        { id: "vt-month",   title: "दृश्य टॉगल 📅",              desc: "मासिक और साप्ताहिक दृश्य के बीच स्विच करें!" },
        { id: "mainChart",  title: "चार्ट 📈",                    desc: "यह बार चार्ट आय (हरा) बनाम व्यय (लाल) दिखाता है। रुझान देखें!" },
        { id: "txnRows",    title: "सभी लेनदेन 📋",               desc: "सभी आय और व्यय प्रविष्टियाँ यहाँ देखें। फ़िल्टर करें!" },
        { id: "inc-title",  title: "आय जोड़ें ➕",                desc: "नई आय दर्ज करने के लिए इस फ़ॉर्म का उपयोग करें!" },
        { id: null,         title: "शाबाश! 🎉",                   desc: "यह था आय बनाम व्यय पृष्ठ! अपना नकदी प्रवाह जानें!" },
      ],
      zh: [{ id: null, title: "收支对比 🩵", desc: "这个页面帮你比较收入和支出。让我带你了解一下！" }, { id: "sc-income", title: "总收入 💚", desc: "所有进账——薪资、自由职业、礼金——你的总收入！" }, { id: "sc-expense", title: "总支出 🔴", desc: "所有出账。与收入比较看看你做得如何！" }, { id: "sc-net", title: "净余额 💛", desc: "收入减支出。正数=太棒了！负数=需要节省！😅" }, { id: "sc-rate", title: "储蓄率 📊", desc: "你实际储蓄了收入的多少百分比。目标至少20%！🎯" }, { id: "vt-month", title: "视图切换 📅", desc: "在月视图和周视图之间切换！" }, { id: "mainChart", title: "收支图表 📈", desc: "柱状图并排显示收入(绿)和支出(红)。" }, { id: "txnRows", title: "所有交易 📋", desc: "在这里查看所有收支记录。可以筛选！" }, { id: "inc-title", title: "添加收入 ➕", desc: "用这个表单记录新的收入来源！" }, { id: null, title: "太棒了！🎉", desc: "这就是收支页面！了解现金流是财务自由的第一步！" }],
      ja: [{ id: null, title: "収支比較 🩵", desc: "このページでは収入と支出を比較できます。案内しますね！" }, { id: "sc-income", title: "総収入 💚", desc: "給料・フリーランス・贈り物など全ての収入合計！" }, { id: "sc-expense", title: "総支出 🔴", desc: "全ての支出。収入と比べてみましょう！" }, { id: "sc-net", title: "純残高 💛", desc: "収入マイナス支出。プラスなら素晴らしい！マイナスなら節約を！😅" }, { id: "sc-rate", title: "貯蓄率 📊", desc: "収入の何%を実際に貯蓄しているか。最低20%を目指しましょう！🎯" }, { id: "vt-month", title: "表示切替 📅", desc: "月次と週次の表示を切り替えられます！" }, { id: "mainChart", title: "収支チャート 📈", desc: "棒グラフで収入(緑)と支出(赤)を並べて表示します。" }, { id: "txnRows", title: "全取引 📋", desc: "収支の全エントリーをここで確認。フィルターも使えます！" }, { id: "inc-title", title: "収入を追加 ➕", desc: "このフォームで新しい収入源を記録しましょう！" }, { id: null, title: "よくできました！🎉", desc: "収支比較ページの説明でした！キャッシュフローを把握しましょう！" }],
      ar: [{ id: null, title: "الدخل مقابل النفقات 🩵", desc: "تساعدك هذه الصفحة على مقارنة دخلك بنفقاتك. دعيني أرشدك!" }, { id: "sc-income", title: "إجمالي الدخل 💚", desc: "كل الأموال الواردة — الراتب والعمل الحر والهدايا — مجموع دخلك!" }, { id: "sc-expense", title: "إجمالي النفقات 🔴", desc: "كل الأموال الصادرة. قارنها بدخلك!" }, { id: "sc-net", title: "الرصيد الصافي 💛", desc: "الدخل ناقص النفقات. إيجابي = رائع! سلبي = وقت للتوفير! 😅" }, { id: "sc-rate", title: "معدل الادخار 📊", desc: "ما نسبة دخلك التي تدخرها فعلاً. استهدف 20% على الأقل! 🎯" }, { id: "vt-month", title: "تبديل العرض 📅", desc: "التبديل بين العرض الشهري والأسبوعي!" }, { id: "mainChart", title: "مخطط الدخل والنفقات 📈", desc: "يعرض المخطط الشريطي الدخل (أخضر) مقابل النفقات (أحمر)." }, { id: "txnRows", title: "جميع المعاملات 📋", desc: "اعرض جميع إدخالات الدخل والنفقات هنا مع الفلترة!" }, { id: "inc-title", title: "إضافة دخل ➕", desc: "استخدم هذا النموذج لتسجيل مصدر دخل جديد!" }, { id: null, title: "أحسنت! 🎉", desc: "هذه هي صفحة الدخل مقابل النفقات! معرفة تدفقك النقدي هو الخطوة الأولى!" }],
      fr: [{ id: null, title: "Revenus vs Dépenses 🩵", desc: "Cette page t'aide à comparer tes revenus et dépenses. Laisse-moi te guider !" }, { id: "sc-income", title: "Revenus totaux 💚", desc: "Tout l'argent entrant — salaire, freelance, cadeaux — ta somme de revenus !" }, { id: "sc-expense", title: "Dépenses totales 🔴", desc: "Tout l'argent sortant. Compare-le avec tes revenus !" }, { id: "sc-net", title: "Solde net 💛", desc: "Revenus moins dépenses. Positif = super économies ! Négatif = à réduire ! 😅" }, { id: "sc-rate", title: "Taux d'épargne 📊", desc: "Quel pourcentage de tes revenus tu épargnes vraiment. Vise au moins 20% ! 🎯" }, { id: "vt-month", title: "Bascule de vue 📅", desc: "Passe de la vue mensuelle à hebdomadaire !" }, { id: "mainChart", title: "Graphique revenus/dépenses 📈", desc: "Ce diagramme montre revenus (vert) vs dépenses (rouge) côte à côte." }, { id: "txnRows", title: "Toutes les transactions 📋", desc: "Vois toutes tes entrées de revenus et dépenses ici. Filtre-les !" }, { id: "inc-title", title: "Ajouter un revenu ➕", desc: "Utilise ce formulaire pour enregistrer une nouvelle source de revenu !" }, { id: null, title: "Bravo ! 🎉", desc: "C'est la page Revenus vs Dépenses ! Connaître ton flux de trésorerie, c'est la clé !" }],
      de: [{ id: null, title: "Einnahmen vs Ausgaben 🩵", desc: "Diese Seite hilft dir Einnahmen und Ausgaben zu vergleichen. Ich zeige es dir!" }, { id: "sc-income", title: "Gesamteinnahmen 💚", desc: "Alles eingehende Geld — Gehalt, Freelance, Geschenke — deine Gesamteinnahmen!" }, { id: "sc-expense", title: "Gesamtausgaben 🔴", desc: "Alles ausgehende Geld. Vergleiche es mit deinen Einnahmen!" }, { id: "sc-net", title: "Nettosaldo 💛", desc: "Einnahmen minus Ausgaben. Positiv = super Sparer! Negativ = Zeit zum Sparen! 😅" }, { id: "sc-rate", title: "Sparquote 📊", desc: "Wie viel Prozent deiner Einnahmen du tatsächlich sparst. Ziel: mindestens 20%! 🎯" }, { id: "vt-month", title: "Ansicht wechseln 📅", desc: "Zwischen Monats- und Wochenansicht wechseln!" }, { id: "mainChart", title: "Einnahmen/Ausgaben-Diagramm 📈", desc: "Dieses Balkendiagramm zeigt Einnahmen (grün) vs Ausgaben (rot) nebeneinander." }, { id: "txnRows", title: "Alle Transaktionen 📋", desc: "Alle deine Einnahmen- und Ausgabeneinträge hier einsehen. Filtern möglich!" }, { id: "inc-title", title: "Einnahme hinzufügen ➕", desc: "Nutze dieses Formular um eine neue Einnahmequelle zu erfassen!" }, { id: null, title: "Super! 🎉", desc: "Das war die Einnahmen vs Ausgaben-Seite! Deinen Cashflow zu kennen ist der erste Schritt!" }],
      es: [{ id: null, title: "Ingresos vs Gastos 🩵", desc: "¡Esta página te ayuda a comparar ingresos y gastos. Déjame guiarte!" }, { id: "sc-income", title: "Ingresos totales 💚", desc: "Todo el dinero entrante — salario, freelance, regalos — ¡tu suma total de ingresos!" }, { id: "sc-expense", title: "Gastos totales 🔴", desc: "Todo el dinero saliente. ¡Compáralo con tus ingresos!" }, { id: "sc-net", title: "Saldo neto 💛", desc: "Ingresos menos gastos. ¡Positivo = gran ahorro! ¡Negativo = hora de reducir! 😅" }, { id: "sc-rate", title: "Tasa de ahorro 📊", desc: "¡Qué porcentaje de tus ingresos estás ahorrando. Apunta al menos al 20%! 🎯" }, { id: "vt-month", title: "Cambiar vista 📅", desc: "¡Cambia entre vistas mensual y semanal!" }, { id: "mainChart", title: "Gráfico ingresos/gastos 📈", desc: "Este gráfico de barras muestra ingresos (verde) vs gastos (rojo) uno al lado del otro." }, { id: "txnRows", title: "Todas las transacciones 📋", desc: "¡Ve todos tus registros de ingresos y gastos aquí. Filtra también!" }, { id: "inc-title", title: "Agregar ingreso ➕", desc: "¡Usa este formulario para registrar una nueva fuente de ingresos!" }, { id: null, title: "¡Genial! 🎉", desc: "¡Esa es la página de Ingresos vs Gastos! ¡Conocer tu flujo de caja es el primer paso!" }],
      pt: [{ id: null, title: "Receitas vs Despesas 🩵", desc: "Esta página te ajuda a comparar receitas e despesas. Deixa eu te mostrar!" }, { id: "sc-income", title: "Receita Total 💚", desc: "Todo o dinheiro entrando — salário, freelance, presentes — sua soma total de receitas!" }, { id: "sc-expense", title: "Despesas Totais 🔴", desc: "Todo o dinheiro saindo. Compare com sua receita!" }, { id: "sc-net", title: "Saldo Líquido 💛", desc: "Receita menos despesas. Positivo = ótima economia! Negativo = hora de cortar! 😅" }, { id: "sc-rate", title: "Taxa de Poupança 📊", desc: "Que porcentagem da sua receita você está de fato poupando. Mire em pelo menos 20%! 🎯" }, { id: "vt-month", title: "Alternar Visualização 📅", desc: "Alterne entre visualizações mensais e semanais!" }, { id: "mainChart", title: "Gráfico Receita/Despesa 📈", desc: "Este gráfico de barras mostra receita (verde) vs despesas (vermelho) lado a lado." }, { id: "txnRows", title: "Todas as Transações 📋", desc: "Veja todos os seus registros de receitas e despesas aqui. Filtre também!" }, { id: "inc-title", title: "Adicionar Receita ➕", desc: "Use este formulário para registrar uma nova fonte de receita!" }, { id: null, title: "Ótimo! 🎉", desc: "Essa é a página de Receitas vs Despesas! Conhecer seu fluxo de caixa é o primeiro passo!" }],
      ko: [{ id: null, title: "수입 vs 지출 🩵", desc: "이 페이지는 수입과 지출을 비교하는 데 도움을 줍니다. 안내해 드릴게요!" }, { id: "sc-income", title: "총 수입 💚", desc: "들어오는 모든 돈 — 급여, 프리랜서, 선물 — 총 수입 합계!" }, { id: "sc-expense", title: "총 지출 🔴", desc: "나가는 모든 돈. 수입과 비교해 보세요!" }, { id: "sc-net", title: "순 잔액 💛", desc: "수입 빼기 지출. 플러스=저축 잘하고 있어요! 마이너스=절약할 때예요! 😅" }, { id: "sc-rate", title: "저축률 📊", desc: "수입의 몇 퍼센트를 실제로 저축하고 있나요. 최소 20%를 목표로! 🎯" }, { id: "vt-month", title: "보기 전환 📅", desc: "월별과 주별 보기를 전환할 수 있어요!" }, { id: "mainChart", title: "수입/지출 차트 📈", desc: "막대 차트로 수입(초록)과 지출(빨강)을 나란히 보여줘요." }, { id: "txnRows", title: "모든 거래 📋", desc: "수입과 지출 항목을 여기서 모두 확인하세요. 필터도 가능해요!" }, { id: "inc-title", title: "수입 추가 ➕", desc: "이 양식으로 새 수입원을 기록하세요!" }, { id: null, title: "잘했어요! 🎉", desc: "수입 vs 지출 페이지였어요! 현금 흐름을 아는 것이 첫 걸음이에요!" }],
      ru: [{ id: null, title: "Доходы vs Расходы 🩵", desc: "Эта страница помогает сравнить доходы и расходы. Позволь мне показать!" }, { id: "sc-income", title: "Общий доход 💚", desc: "Все входящие деньги — зарплата, фриланс, подарки — твоя общая сумма доходов!" }, { id: "sc-expense", title: "Общие расходы 🔴", desc: "Все исходящие деньги. Сравни с доходами!" }, { id: "sc-net", title: "Чистый баланс 💛", desc: "Доходы минус расходы. Положительный = отлично! Отрицательный = пора экономить! 😅" }, { id: "sc-rate", title: "Норма сбережений 📊", desc: "Какой процент дохода ты реально сберегаешь. Цель — минимум 20%! 🎯" }, { id: "vt-month", title: "Переключить вид 📅", desc: "Переключайся между месячным и недельным видом!" }, { id: "mainChart", title: "График доходов/расходов 📈", desc: "Столбчатая диаграмма доходов (зелёный) vs расходов (красный) рядом." }, { id: "txnRows", title: "Все транзакции 📋", desc: "Все записи доходов и расходов здесь. Можно фильтровать!" }, { id: "inc-title", title: "Добавить доход ➕", desc: "Используй эту форму для записи нового источника дохода!" }, { id: null, title: "Отлично! 🎉", desc: "Это страница Доходы vs Расходы! Знать свой денежный поток — первый шаг!" }],
    },

    // ── MONTHLY ───────────────────────────────────────────────────────────
    monthly: {
      en: [
        { id: null,              title: "Monthly Report 🩵",          desc: "This page gives a detailed breakdown of your spending for a specific month. Let me walk you through it!" },
        { id: "mnav-label",      title: "Month Navigator 📅",         desc: "Use the arrows to go back and forth between months. Check any month's expenses!" },
        { id: "sc-total",        title: "Total Expense 💸",           desc: "The total amount spent in this selected month. How's this month looking?" },
        { id: "sc-avg",          title: "Daily Average 📊",           desc: "Your average daily spending this month. Great for understanding your daily habits!" },
        { id: "sc-top",          title: "Top Category 🏆",            desc: "Which category ate up most of your money this month — is it Food or Shopping? 🍕" },
        { id: "sc-max",          title: "Biggest Spend 💰",           desc: "Your single most expensive purchase this month. That big one! 👀" },
        { id: "sc-budget-pct",   title: "Budget Used 🎯",             desc: "How much of your set budget you've used this month. Set a budget in Settings!" },
        { id: "trendChart",      title: "Daily Trend Chart 📈",       desc: "This chart shows your spending day by day for the month. Spot your spendiest days!" },
        { id: "txnBody",         title: "Transaction Table 📋",       desc: "A full table of all transactions this month — with date, category, amount and more!" },
        { id: "catBody",         title: "Category Breakdown 🥧",      desc: "How your spending is split across categories. See what's eating your budget!" },
        { id: null,              title: "That's it! 🎉",              desc: "The Monthly Report is super useful for end-of-month reviews. Use it to plan better next month!" },
      ],
      hi: [{ id: null, title: "मासिक रिपोर्ट 🩵", desc: "यह पृष्ठ किसी विशिष्ट महीने के खर्च का विस्तृत विवरण देता है। चलिए देखते हैं!" }, { id: "mnav-label", title: "महीना नेविगेटर 📅", desc: "तीरों का उपयोग करके महीनों के बीच आगे-पीछे जाएं!" }, { id: "sc-total", title: "कुल व्यय 💸", desc: "इस चुने हुए महीने में खर्च की गई कुल राशि।" }, { id: "sc-avg", title: "दैनिक औसत 📊", desc: "इस महीने आपका औसत दैनिक खर्च।" }, { id: "sc-top", title: "शीर्ष श्रेणी 🏆", desc: "इस महीने किस श्रेणी में सबसे ज़्यादा खर्च हुआ?" }, { id: "sc-max", title: "सबसे बड़ा खर्च 💰", desc: "इस महीने का सबसे महंगा एकल खर्च।" }, { id: "sc-budget-pct", title: "बजट उपयोग 🎯", desc: "इस महीने आपने अपने बजट का कितना उपयोग किया।" }, { id: "trendChart", title: "दैनिक ट्रेंड चार्ट 📈", desc: "यह चार्ट महीने के दिन-दर-दिन खर्च दिखाता है।" }, { id: "txnBody", title: "लेनदेन तालिका 📋", desc: "इस महीने के सभी लेनदेन की पूर्ण तालिका।" }, { id: "catBody", title: "श्रेणी विभाजन 🥧", desc: "श्रेणियों में आपका खर्च कैसे विभाजित है।" }, { id: null, title: "बस यही था! 🎉", desc: "मासिक रिपोर्ट अगले महीने की बेहतर योजना के लिए उपयोगी है!" }],
      zh: [{ id: null, title: "月度报告 🩵", desc: "此页面提供特定月份支出的详细分析。让我带你了解！" }, { id: "mnav-label", title: "月份导航 📅", desc: "使用箭头在月份间前后切换！" }, { id: "sc-total", title: "总支出 💸", desc: "所选月份的总支出金额。" }, { id: "sc-avg", title: "日均支出 📊", desc: "本月你的日均支出。" }, { id: "sc-top", title: "最多类别 🏆", desc: "本月哪个类别花费最多？" }, { id: "sc-max", title: "最大单笔 💰", desc: "本月最贵的单笔消费。" }, { id: "sc-budget-pct", title: "预算使用 🎯", desc: "本月已使用多少预算。" }, { id: "trendChart", title: "日趋势图 📈", desc: "此图表显示本月逐日支出。" }, { id: "txnBody", title: "交易表格 📋", desc: "本月所有交易的完整表格。" }, { id: "catBody", title: "类别分解 🥧", desc: "支出如何分配到各类别。" }, { id: null, title: "完成！🎉", desc: "月度报告非常适合月末回顾！" }],
      ja: [{ id: null, title: "月次レポート 🩵", desc: "このページは特定の月の支出を詳しく分析します。案内しますね！" }, { id: "mnav-label", title: "月ナビゲーター 📅", desc: "矢印で月を前後に移動できます！" }, { id: "sc-total", title: "総支出 💸", desc: "選択した月の総支出額です。" }, { id: "sc-avg", title: "1日の平均 📊", desc: "今月の1日あたりの平均支出です。" }, { id: "sc-top", title: "トップカテゴリ 🏆", desc: "今月最もお金を使ったカテゴリは？" }, { id: "sc-max", title: "最大の出費 💰", desc: "今月最も高額な単一の支出です。" }, { id: "sc-budget-pct", title: "予算使用率 🎯", desc: "今月の予算をどれだけ使ったか。" }, { id: "trendChart", title: "日次トレンドチャート 📈", desc: "月の日ごとの支出を表示するチャートです。" }, { id: "txnBody", title: "取引テーブル 📋", desc: "今月の全取引の完全なテーブルです。" }, { id: "catBody", title: "カテゴリ内訳 🥧", desc: "支出がカテゴリーにどう分割されているか。" }, { id: null, title: "完了！🎉", desc: "月次レポートは月末レビューに最適です！" }],
      ar: [{ id: null, title: "التقرير الشهري 🩵", desc: "توفر هذه الصفحة تفصيلاً مفصلاً للإنفاق في شهر محدد. دعيني أرشدك!" }, { id: "mnav-label", title: "متصفح الأشهر 📅", desc: "استخدم السهمين للتنقل بين الأشهر!" }, { id: "sc-total", title: "إجمالي النفقات 💸", desc: "المبلغ الإجمالي المنفق في هذا الشهر المحدد." }, { id: "sc-avg", title: "المتوسط اليومي 📊", desc: "متوسط إنفاقك اليومي هذا الشهر." }, { id: "sc-top", title: "الفئة الأعلى 🏆", desc: "أي فئة استهلكت معظم أموالك هذا الشهر؟" }, { id: "sc-max", title: "أكبر إنفاق 💰", desc: "أغلى عملية شراء منفردة هذا الشهر." }, { id: "sc-budget-pct", title: "الميزانية المستخدمة 🎯", desc: "كم من ميزانيتك استخدمت هذا الشهر." }, { id: "trendChart", title: "مخطط الاتجاه اليومي 📈", desc: "يعرض هذا المخطط إنفاقك يومًا بيوم." }, { id: "txnBody", title: "جدول المعاملات 📋", desc: "جدول كامل بجميع معاملات هذا الشهر." }, { id: "catBody", title: "تفصيل الفئات 🥧", desc: "كيف يتوزع إنفاقك على الفئات." }, { id: null, title: "هذا كل شيء! 🎉", desc: "التقرير الشهري مفيد جداً للمراجعة في نهاية الشهر!" }],
      fr: [{ id: null, title: "Rapport mensuel 🩵", desc: "Cette page donne une analyse détaillée de tes dépenses pour un mois spécifique. Laisse-moi te guider !" }, { id: "mnav-label", title: "Navigateur de mois 📅", desc: "Utilise les flèches pour naviguer entre les mois !" }, { id: "sc-total", title: "Dépense totale 💸", desc: "Le montant total dépensé dans ce mois sélectionné." }, { id: "sc-avg", title: "Moyenne journalière 📊", desc: "Ta dépense quotidienne moyenne ce mois-ci." }, { id: "sc-top", title: "Catégorie principale 🏆", desc: "Quelle catégorie a pris le plus de ton argent ce mois ?" }, { id: "sc-max", title: "Plus grande dépense 💰", desc: "Ton achat unique le plus cher ce mois-ci." }, { id: "sc-budget-pct", title: "Budget utilisé 🎯", desc: "Combien de ton budget tu as utilisé ce mois-ci." }, { id: "trendChart", title: "Graphique de tendance 📈", desc: "Ce graphique montre tes dépenses jour par jour pour le mois." }, { id: "txnBody", title: "Tableau des transactions 📋", desc: "Un tableau complet de toutes les transactions de ce mois." }, { id: "catBody", title: "Répartition par catégorie 🥧", desc: "Comment tes dépenses se répartissent par catégorie." }, { id: null, title: "C'est tout ! 🎉", desc: "Le rapport mensuel est super utile pour les bilans de fin de mois !" }],
      de: [{ id: null, title: "Monatsbericht 🩵", desc: "Diese Seite zeigt eine detaillierte Aufschlüsselung deiner Ausgaben für einen bestimmten Monat. Ich führe dich durch!" }, { id: "mnav-label", title: "Monatsnavigator 📅", desc: "Mit den Pfeilen zwischen Monaten navigieren!" }, { id: "sc-total", title: "Gesamtausgaben 💸", desc: "Der Gesamtbetrag, der in diesem ausgewählten Monat ausgegeben wurde." }, { id: "sc-avg", title: "Tagesdurchschnitt 📊", desc: "Dein durchschnittlicher Tagesausgabenbetrag in diesem Monat." }, { id: "sc-top", title: "Top-Kategorie 🏆", desc: "Welche Kategorie hat diesen Monat das meiste Geld verschlungen?" }, { id: "sc-max", title: "Größte Ausgabe 💰", desc: "Dein teuerster Einzelkauf diesen Monat." }, { id: "sc-budget-pct", title: "Budget verbraucht 🎯", desc: "Wie viel deines Budgets du diesen Monat verbraucht hast." }, { id: "trendChart", title: "Tages-Trenddiagramm 📈", desc: "Dieses Diagramm zeigt deine Ausgaben Tag für Tag im Monat." }, { id: "txnBody", title: "Transaktionsübersicht 📋", desc: "Eine vollständige Tabelle aller Transaktionen dieses Monats." }, { id: "catBody", title: "Kategorienaufschlüsselung 🥧", desc: "Wie sich deine Ausgaben auf die Kategorien verteilen." }, { id: null, title: "Das war's! 🎉", desc: "Der Monatsbericht ist super nützlich für Monatsende-Überprüfungen!" }],
      es: [{ id: null, title: "Informe mensual 🩵", desc: "¡Esta página ofrece un desglose detallado de tus gastos de un mes específico. Déjame guiarte!" }, { id: "mnav-label", title: "Navegador de mes 📅", desc: "¡Usa las flechas para navegar entre meses!" }, { id: "sc-total", title: "Gasto total 💸", desc: "El monto total gastado en el mes seleccionado." }, { id: "sc-avg", title: "Promedio diario 📊", desc: "Tu gasto diario promedio este mes." }, { id: "sc-top", title: "Categoría principal 🏆", desc: "¿Qué categoría consumió más de tu dinero este mes?" }, { id: "sc-max", title: "Mayor gasto 💰", desc: "Tu compra individual más cara este mes." }, { id: "sc-budget-pct", title: "Presupuesto usado 🎯", desc: "Cuánto de tu presupuesto has usado este mes." }, { id: "trendChart", title: "Gráfico de tendencia diaria 📈", desc: "Este gráfico muestra tus gastos día a día del mes." }, { id: "txnBody", title: "Tabla de transacciones 📋", desc: "Una tabla completa de todas las transacciones de este mes." }, { id: "catBody", title: "Desglose por categoría 🥧", desc: "Cómo se divide tu gasto entre categorías." }, { id: null, title: "¡Eso es todo! 🎉", desc: "¡El informe mensual es muy útil para revisiones de fin de mes!" }],
      pt: [{ id: null, title: "Relatório Mensal 🩵", desc: "Esta página fornece um detalhamento do gasto de um mês específico. Deixa eu te mostrar!" }, { id: "mnav-label", title: "Navegador de Mês 📅", desc: "Use as setas para navegar entre meses!" }, { id: "sc-total", title: "Despesa Total 💸", desc: "O total gasto no mês selecionado." }, { id: "sc-avg", title: "Média Diária 📊", desc: "Seu gasto diário médio neste mês." }, { id: "sc-top", title: "Categoria Principal 🏆", desc: "Qual categoria consumiu mais do seu dinheiro neste mês?" }, { id: "sc-max", title: "Maior Gasto 💰", desc: "Sua compra única mais cara neste mês." }, { id: "sc-budget-pct", title: "Orçamento Usado 🎯", desc: "Quanto do seu orçamento você usou neste mês." }, { id: "trendChart", title: "Gráfico de Tendência Diária 📈", desc: "Este gráfico mostra seus gastos dia a dia do mês." }, { id: "txnBody", title: "Tabela de Transações 📋", desc: "Uma tabela completa de todas as transações deste mês." }, { id: "catBody", title: "Divisão por Categoria 🥧", desc: "Como seus gastos se dividem por categorias." }, { id: null, title: "É isso! 🎉", desc: "O Relatório Mensal é super útil para revisões de fim de mês!" }],
      ko: [{ id: null, title: "월별 보고서 🩵", desc: "이 페이지는 특정 월의 지출을 자세히 분석합니다. 안내해 드릴게요!" }, { id: "mnav-label", title: "월 탐색기 📅", desc: "화살표로 월 사이를 앞뒤로 이동하세요!" }, { id: "sc-total", title: "총 지출 💸", desc: "선택한 달의 총 지출 금액입니다." }, { id: "sc-avg", title: "일 평균 📊", desc: "이번 달 하루 평균 지출입니다." }, { id: "sc-top", title: "최다 카테고리 🏆", desc: "이번 달 가장 많은 돈을 쓴 카테고리는?" }, { id: "sc-max", title: "최대 지출 💰", desc: "이번 달 가장 비싼 단일 구매입니다." }, { id: "sc-budget-pct", title: "예산 사용 🎯", desc: "이번 달 설정한 예산의 얼마나 사용했는지." }, { id: "trendChart", title: "일별 추세 차트 📈", desc: "이 차트는 한 달 동안 하루하루의 지출을 보여줍니다." }, { id: "txnBody", title: "거래 테이블 📋", desc: "이번 달 모든 거래의 전체 테이블입니다." }, { id: "catBody", title: "카테고리 분석 🥧", desc: "지출이 카테고리별로 어떻게 나뉘어 있는지." }, { id: null, title: "완료! 🎉", desc: "월별 보고서는 월말 검토에 매우 유용합니다!" }],
      ru: [{ id: null, title: "Месячный отчёт 🩵", desc: "Эта страница даёт подробный анализ расходов за конкретный месяц. Позволь показать!" }, { id: "mnav-label", title: "Навигатор по месяцам 📅", desc: "Используй стрелки для перехода между месяцами!" }, { id: "sc-total", title: "Общие расходы 💸", desc: "Общая сумма, потраченная в выбранном месяце." }, { id: "sc-avg", title: "Дневной средний 📊", desc: "Твой средний ежедневный расход за этот месяц." }, { id: "sc-top", title: "Топ категория 🏆", desc: "Какая категория потратила больше всего денег в этом месяце?" }, { id: "sc-max", title: "Наибольшая трата 💰", desc: "Твоя самая дорогая единовременная покупка за месяц." }, { id: "sc-budget-pct", title: "Использовано бюджета 🎯", desc: "Сколько бюджета ты использовал(а) в этом месяце." }, { id: "trendChart", title: "График дневного тренда 📈", desc: "Этот график показывает расходы день за днём за месяц." }, { id: "txnBody", title: "Таблица транзакций 📋", desc: "Полная таблица всех транзакций за этот месяц." }, { id: "catBody", title: "Разбивка по категориям 🥧", desc: "Как распределяются расходы по категориям." }, { id: null, title: "Готово! 🎉", desc: "Месячный отчёт очень полезен для проверки в конце месяца!" }],
    },

    // ── BAR CHART ─────────────────────────────────────────────────────────
    barchart: {
      en: [
        { id: null,        title: "Bar Chart Analysis 🩵",        desc: "This page gives you visual charts to analyze your expenses. I'll walk you through every section!" },
        { id: "tab-cat",   title: "View Tabs 📊",                  desc: "Switch between three views — By Category, By Month, or Last 7 Days. Each gives a different lens!" },
        { id: "sc-total",  title: "Total Tracked 💸",              desc: "Total money tracked across all your recorded expenses. Your grand sum!" },
        { id: "sc-top",    title: "Top Category 🏆",               desc: "The category where you spend the most. Is it Food? Shopping? Time to find out! 🍕" },
        { id: "sc-max",    title: "Highest Expense 🔥",            desc: "Your single biggest expense ever recorded. The one that hurt the most! 😅" },
        { id: "mainChart", title: "Main Bar Chart 📈",             desc: "This is the big chart! It shows your expenses as bars — taller bar means more money spent!" },
        { id: "pieChart",  title: "Category Pie Chart 🥧",         desc: "A donut chart showing the share of each category. Hover over any slice for details!" },
        { id: "catList",   title: "Top 5 Categories 📋",           desc: "A ranked list of your top 5 spending categories with amounts and bar indicators!" },
        { id: null,        title: "Charts are your best friend! 🎉", desc: "Use these charts to spot spending patterns and make smarter budget decisions. You've got this!" },
      ],
      hi: [{ id: null, title: "बार चार्ट विश्लेषण 🩵", desc: "यह पृष्ठ आपके खर्चों का विश्लेषण करने के लिए विज़ुअल चार्ट प्रदान करता है!" }, { id: "tab-cat", title: "दृश्य टैब 📊", desc: "तीन दृश्यों के बीच स्विच करें — श्रेणी, महीना, या पिछले 7 दिन!" }, { id: "sc-total", title: "कुल ट्रैक किया गया 💸", desc: "सभी दर्ज खर्चों का कुल पैसा।" }, { id: "sc-top", title: "शीर्ष श्रेणी 🏆", desc: "वह श्रेणी जहाँ आप सबसे ज़्यादा खर्च करते हैं।" }, { id: "sc-max", title: "सबसे अधिक खर्च 🔥", desc: "आपका सबसे बड़ा एकल खर्च कभी दर्ज किया गया।" }, { id: "mainChart", title: "मुख्य बार चार्ट 📈", desc: "बड़ा चार्ट! खर्च को बार के रूप में दिखाता है।" }, { id: "pieChart", title: "श्रेणी पाई चार्ट 🥧", desc: "प्रत्येक श्रेणी का हिस्सा दिखाने वाला डोनट चार्ट।" }, { id: "catList", title: "शीर्ष 5 श्रेणियाँ 📋", desc: "शीर्ष 5 खर्च श्रेणियों की रैंक वाली सूची।" }, { id: null, title: "शाबाश! 🎉", desc: "इन चार्ट का उपयोग स्मार्ट बजट निर्णय लेने के लिए करें!" }],
      zh: [{ id: null, title: "柱状图分析 🩵", desc: "此页面提供可视化图表来分析你的支出。让我带你了解！" }, { id: "tab-cat", title: "视图标签 📊", desc: "在三种视图间切换——按类别、按月或近7天！" }, { id: "sc-total", title: "总追踪 💸", desc: "所有记录支出的总金额。" }, { id: "sc-top", title: "最多类别 🏆", desc: "你花费最多的类别。" }, { id: "sc-max", title: "最高支出 🔥", desc: "你有史以来记录的最大单笔支出。" }, { id: "mainChart", title: "主柱状图 📈", desc: "大图表！以柱状显示支出——柱越高花得越多！" }, { id: "pieChart", title: "类别饼图 🥧", desc: "显示每个类别份额的圆环图。" }, { id: "catList", title: "前5类别 📋", desc: "前5个支出类别的排名列表。" }, { id: null, title: "太棒了！🎉", desc: "用这些图表发现支出模式，做出更明智的预算决策！" }],
      ja: [{ id: null, title: "棒グラフ分析 🩵", desc: "このページでは支出を分析するビジュアルチャートが見られます。案内しますね！" }, { id: "tab-cat", title: "ビュータブ 📊", desc: "カテゴリ別・月別・直近7日間の3つのビューを切り替え！" }, { id: "sc-total", title: "総追跡額 💸", desc: "記録された全支出の合計金額。" }, { id: "sc-top", title: "トップカテゴリ 🏆", desc: "最もお金を使っているカテゴリ。" }, { id: "sc-max", title: "最高支出 🔥", desc: "今まで記録した中で最も高額な単一支出。" }, { id: "mainChart", title: "メイン棒グラフ 📈", desc: "大きなグラフ！支出を棒で表示します。" }, { id: "pieChart", title: "カテゴリ円グラフ 🥧", desc: "各カテゴリのシェアを示すドーナツグラフ。" }, { id: "catList", title: "上位5カテゴリ 📋", desc: "上位5支出カテゴリのランキングリスト。" }, { id: null, title: "完了！🎉", desc: "これらのグラフで支出パターンを発見しましょう！" }],
      ar: [{ id: null, title: "تحليل المخطط الشريطي 🩵", desc: "توفر هذه الصفحة مخططات بصرية لتحليل نفقاتك. دعيني أرشدك!" }, { id: "tab-cat", title: "تبويبات العرض 📊", desc: "التبديل بين ثلاثة عروض — حسب الفئة أو الشهر أو آخر 7 أيام!" }, { id: "sc-total", title: "إجمالي المتتبع 💸", desc: "إجمالي الأموال عبر جميع نفقاتك المسجلة." }, { id: "sc-top", title: "الفئة الأعلى 🏆", desc: "الفئة التي تنفق فيها أكثر." }, { id: "sc-max", title: "أعلى نفقة 🔥", desc: "أكبر نفقة منفردة سجلتها على الإطلاق." }, { id: "mainChart", title: "المخطط الشريطي الرئيسي 📈", desc: "المخطط الكبير! يعرض نفقاتك كأشرطة — كلما ارتفع الشريط، زاد الإنفاق!" }, { id: "pieChart", title: "مخطط الفئات الدائري 🥧", desc: "مخطط دائري يعرض حصة كل فئة." }, { id: "catList", title: "أفضل 5 فئات 📋", desc: "قائمة مرتبة بأفضل 5 فئات إنفاق." }, { id: null, title: "أحسنت! 🎉", desc: "استخدم هذه المخططات للعثور على أنماط الإنفاق!" }],
      fr: [{ id: null, title: "Analyse des graphiques 🩵", desc: "Cette page t'offre des graphiques visuels pour analyser tes dépenses. Je te guide !" }, { id: "tab-cat", title: "Onglets de vue 📊", desc: "Bascule entre trois vues — Par catégorie, Par mois ou 7 derniers jours !" }, { id: "sc-total", title: "Total suivi 💸", desc: "Argent total suivi sur toutes tes dépenses enregistrées." }, { id: "sc-top", title: "Catégorie principale 🏆", desc: "La catégorie où tu dépenses le plus." }, { id: "sc-max", title: "Dépense la plus haute 🔥", desc: "Ta plus grande dépense unique jamais enregistrée." }, { id: "mainChart", title: "Graphique principal 📈", desc: "Le grand graphique ! Il montre tes dépenses sous forme de barres." }, { id: "pieChart", title: "Graphique en secteurs 🥧", desc: "Un graphique en donut montrant la part de chaque catégorie." }, { id: "catList", title: "Top 5 catégories 📋", desc: "Une liste classée de tes 5 catégories de dépenses principales." }, { id: null, title: "C'est tout ! 🎉", desc: "Utilise ces graphiques pour repérer les tendances de dépenses !" }],
      de: [{ id: null, title: "Balkendiagramm-Analyse 🩵", desc: "Diese Seite bietet visuelle Diagramme zur Analyse deiner Ausgaben. Ich führe dich durch!" }, { id: "tab-cat", title: "Ansicht-Tabs 📊", desc: "Wechsel zwischen drei Ansichten — Nach Kategorie, Nach Monat oder Letzte 7 Tage!" }, { id: "sc-total", title: "Gesamt verfolgt 💸", desc: "Gesamtgeld über alle aufgezeichneten Ausgaben." }, { id: "sc-top", title: "Top-Kategorie 🏆", desc: "Die Kategorie, in der du am meisten ausgibst." }, { id: "sc-max", title: "Höchste Ausgabe 🔥", desc: "Deine bisher höchste einzelne Ausgabe." }, { id: "mainChart", title: "Haupt-Balkendiagramm 📈", desc: "Das große Diagramm! Zeigt deine Ausgaben als Balken." }, { id: "pieChart", title: "Kategorien-Kreisdiagramm 🥧", desc: "Ein Donut-Diagramm, das den Anteil jeder Kategorie zeigt." }, { id: "catList", title: "Top 5 Kategorien 📋", desc: "Eine Rangliste deiner Top 5 Ausgabenkategorien." }, { id: null, title: "Das war's! 🎉", desc: "Nutze diese Diagramme um Ausgabenmuster zu erkennen!" }],
      es: [{ id: null, title: "Análisis de gráficos 🩵", desc: "¡Esta página te ofrece gráficos visuales para analizar tus gastos. Te guío!" }, { id: "tab-cat", title: "Pestañas de vista 📊", desc: "¡Cambia entre tres vistas — Por categoría, Por mes o Últimos 7 días!" }, { id: "sc-total", title: "Total rastreado 💸", desc: "Dinero total rastreado en todos tus gastos registrados." }, { id: "sc-top", title: "Categoría principal 🏆", desc: "La categoría donde más gastas." }, { id: "sc-max", title: "Gasto más alto 🔥", desc: "Tu mayor gasto individual registrado." }, { id: "mainChart", title: "Gráfico de barras principal 📈", desc: "¡El gran gráfico! Muestra tus gastos como barras." }, { id: "pieChart", title: "Gráfico circular de categorías 🥧", desc: "Un gráfico donut que muestra la cuota de cada categoría." }, { id: "catList", title: "Top 5 categorías 📋", desc: "Una lista clasificada de tus top 5 categorías de gasto." }, { id: null, title: "¡Eso es todo! 🎉", desc: "¡Usa estos gráficos para detectar patrones de gasto!" }],
      pt: [{ id: null, title: "Análise de Gráficos 🩵", desc: "Esta página oferece gráficos visuais para analisar seus gastos. Deixa eu te guiar!" }, { id: "tab-cat", title: "Abas de Visualização 📊", desc: "Alterne entre três visualizações — Por Categoria, Por Mês ou Últimos 7 Dias!" }, { id: "sc-total", title: "Total Rastreado 💸", desc: "Dinheiro total rastreado em todos os gastos registrados." }, { id: "sc-top", title: "Categoria Principal 🏆", desc: "A categoria onde você mais gasta." }, { id: "sc-max", title: "Maior Gasto 🔥", desc: "Seu maior gasto único já registrado." }, { id: "mainChart", title: "Gráfico de Barras Principal 📈", desc: "O gráfico grande! Mostra seus gastos como barras." }, { id: "pieChart", title: "Gráfico de Pizza por Categoria 🥧", desc: "Um gráfico donut mostrando a parcela de cada categoria." }, { id: "catList", title: "Top 5 Categorias 📋", desc: "Uma lista classificada das suas top 5 categorias de gasto." }, { id: null, title: "É isso! 🎉", desc: "Use esses gráficos para detectar padrões de gastos!" }],
      ko: [{ id: null, title: "막대 차트 분석 🩵", desc: "이 페이지는 지출을 분석하기 위한 시각적 차트를 제공합니다. 안내해 드릴게요!" }, { id: "tab-cat", title: "보기 탭 📊", desc: "카테고리별, 월별, 최근 7일 세 가지 보기 사이를 전환하세요!" }, { id: "sc-total", title: "총 추적 💸", desc: "기록된 모든 지출의 총 금액." }, { id: "sc-top", title: "최다 카테고리 🏆", desc: "가장 많이 소비하는 카테고리." }, { id: "sc-max", title: "최고 지출 🔥", desc: "지금까지 기록된 가장 큰 단일 지출." }, { id: "mainChart", title: "메인 막대 차트 📈", desc: "큰 차트! 지출을 막대로 표시합니다." }, { id: "pieChart", title: "카테고리 파이 차트 🥧", desc: "각 카테고리의 비율을 보여주는 도넛 차트." }, { id: "catList", title: "상위 5개 카테고리 📋", desc: "상위 5개 지출 카테고리의 순위 목록." }, { id: null, title: "완료! 🎉", desc: "이 차트로 지출 패턴을 발견하세요!" }],
      ru: [{ id: null, title: "Анализ столбчатой диаграммы 🩵", desc: "Эта страница предоставляет визуальные диаграммы для анализа расходов. Позволь показать!" }, { id: "tab-cat", title: "Вкладки просмотра 📊", desc: "Переключайся между тремя видами — По категории, По месяцу или Последние 7 дней!" }, { id: "sc-total", title: "Всего отслежено 💸", desc: "Общие деньги по всем записанным расходам." }, { id: "sc-top", title: "Топ категория 🏆", desc: "Категория, в которой ты тратишь больше всего." }, { id: "sc-max", title: "Наибольший расход 🔥", desc: "Твой самый большой единовременный расход из когда-либо записанных." }, { id: "mainChart", title: "Главная столбчатая диаграмма 📈", desc: "Большая диаграмма! Показывает расходы в виде столбцов." }, { id: "pieChart", title: "Круговая диаграмма категорий 🥧", desc: "Кольцевая диаграмма, показывающая долю каждой категории." }, { id: "catList", title: "Топ 5 категорий 📋", desc: "Рейтинговый список топ 5 категорий расходов." }, { id: null, title: "Готово! 🎉", desc: "Используй эти диаграммы для обнаружения закономерностей расходов!" }],
    },

    // ── SAVINGS GOALS ─────────────────────────────────────────────────────
    savings: {
      en: [
        { id: null,           title: "Savings Goals 🩵",            desc: "This is your goals page! Set targets, track progress, and level up as you save. Let me show you!" },
        { id: "playerCard",   title: "Your Player Card 🎮",         desc: "You have a player profile with XP, level, streak, and badges! Save money and level up like a game! 🎯" },
        { id: "badgesRow",    title: "Your Badges 🏅",              desc: "Earn badges as you hit milestones — First Goal, Streak Master, Big Saver and more! Collect them all!" },
        { id: "st-total",     title: "Total Goals 📊",              desc: "How many savings goals you've created. More goals, more focus!" },
        { id: "st-saved",     title: "Total Saved 💚",              desc: "The combined amount saved across all your goals. This is your real progress!" },
        { id: "st-target",    title: "Total Target 🎯",             desc: "The combined target amount for all goals. How far are you from the finish line?" },
        { id: "st-done",      title: "Completed Goals 🎉",          desc: "Goals you've fully achieved! Each one is a win worth celebrating! 🥳" },
        { id: "goalsList",    title: "Your Goals List 📋",          desc: "All your savings goals are here. Click any goal to add a contribution and track progress!" },
        { id: "leaderboardCard", title: "Leaderboard 🏆",          desc: "See how your total savings rank compared to milestones. Climb the leaderboard!" },
        { id: "g-name",       title: "Add a New Goal ➕",           desc: "Create a new goal here! Give it a name, set a target amount, add emoji, and set a deadline!" },
        { id: null,           title: "Save like a champion! 🎉",    desc: "Every rupee saved brings you closer to your dreams. Keep going Miu Miu believes in you! 🩵" },
      ],
      hi: [{ id: null, title: "बचत लक्ष्य 🩵", desc: "यह आपका लक्ष्य पृष्ठ है! लक्ष्य निर्धारित करें, प्रगति ट्रैक करें और लेवल अप करें!" }, { id: "playerCard", title: "आपका प्लेयर कार्ड 🎮", desc: "XP, लेवल, स्ट्रीक और बैज के साथ प्लेयर प्रोफ़ाइल! बचत करें और गेम की तरह लेवल अप करें!" }, { id: "badgesRow", title: "आपके बैज 🏅", desc: "माइलस्टोन पहुँचने पर बैज अर्जित करें!" }, { id: "st-total", title: "कुल लक्ष्य 📊", desc: "आपने कितने बचत लक्ष्य बनाए हैं।" }, { id: "st-saved", title: "कुल बचत 💚", desc: "सभी लक्ष्यों में बचाई गई संयुक्त राशि।" }, { id: "st-target", title: "कुल लक्ष्य राशि 🎯", desc: "सभी लक्ष्यों की संयुक्त लक्ष्य राशि।" }, { id: "st-done", title: "पूर्ण लक्ष्य 🎉", desc: "लक्ष्य जो आपने पूरी तरह हासिल किए हैं!" }, { id: "goalsList", title: "आपकी लक्ष्य सूची 📋", desc: "सभी बचत लक्ष्य यहाँ हैं। किसी भी लक्ष्य पर क्लिक करें!" }, { id: "leaderboardCard", title: "लीडरबोर्ड 🏆", desc: "अपनी बचत की रैंकिंग देखें।" }, { id: "g-name", title: "नया लक्ष्य जोड़ें ➕", desc: "यहाँ नया लक्ष्य बनाएं!" }, { id: null, title: "चैंपियन की तरह बचत करें! 🎉", desc: "हर बचाया रुपया आपके सपनों के करीब ले जाता है। Miu Miu आप पर विश्वास करती है! 🩵" }],
      zh: [{ id: null, title: "储蓄目标 🩵", desc: "这是你的目标页面！设置目标，追踪进度，像游戏一样升级！" }, { id: "playerCard", title: "你的玩家卡 🎮", desc: "有XP、等级、连续天数和徽章的玩家档案！存钱升级！" }, { id: "badgesRow", title: "你的徽章 🏅", desc: "达到里程碑时获得徽章！" }, { id: "st-total", title: "总目标 📊", desc: "你创建了多少个储蓄目标。" }, { id: "st-saved", title: "总已存 💚", desc: "所有目标的合计已存金额。" }, { id: "st-target", title: "总目标金额 🎯", desc: "所有目标的合计目标金额。" }, { id: "st-done", title: "已完成目标 🎉", desc: "你已完全实现的目标！" }, { id: "goalsList", title: "你的目标列表 📋", desc: "所有储蓄目标都在这里。点击任意目标添加贡献！" }, { id: "leaderboardCard", title: "排行榜 🏆", desc: "查看你的总储蓄排名。" }, { id: "g-name", title: "添加新目标 ➕", desc: "在这里创建新目标！" }, { id: null, title: "像冠军一样储蓄！🎉", desc: "每一分钱都让你离梦想更近。Miu Miu相信你！🩵" }],
      ja: [{ id: null, title: "貯蓄目標 🩵", desc: "ここが目標ページです！目標を設定し、進捗を追跡し、ゲームのようにレベルアップ！" }, { id: "playerCard", title: "プレイヤーカード 🎮", desc: "XP・レベル・ストリーク・バッジ付きのプレイヤープロフィール！貯蓄してレベルアップ！" }, { id: "badgesRow", title: "バッジ 🏅", desc: "マイルストーンを達成するとバッジが獲得できます！" }, { id: "st-total", title: "総目標数 📊", desc: "作成した貯蓄目標の数。" }, { id: "st-saved", title: "総貯蓄額 💚", desc: "全目標の合計貯蓄額。" }, { id: "st-target", title: "総目標金額 🎯", desc: "全目標の合計目標金額。" }, { id: "st-done", title: "達成した目標 🎉", desc: "完全に達成した目標！" }, { id: "goalsList", title: "目標リスト 📋", desc: "全貯蓄目標がここに。クリックして貢献を追加！" }, { id: "leaderboardCard", title: "リーダーボード 🏆", desc: "総貯蓄のランキングを確認。" }, { id: "g-name", title: "新しい目標を追加 ➕", desc: "ここで新しい目標を作成！" }, { id: null, title: "チャンピオンのように貯蓄を！🎉", desc: "1円貯めるごとに夢に近づきます。Miu Miuはあなたを応援しています！🩵" }],
      ar: [{ id: null, title: "أهداف الادخار 🩵", desc: "هذه صفحة أهدافك! حدد أهدافاً وتتبع التقدم وارتقِ بالمستوى كما في اللعبة!" }, { id: "playerCard", title: "بطاقة اللاعب 🎮", desc: "ملف لاعب مع XP ومستوى وتتابع وشارات! وفّر المال وارتقِ بالمستوى!" }, { id: "badgesRow", title: "شاراتك 🏅", desc: "اكسب شارات عند الوصول إلى معالم!" }, { id: "st-total", title: "إجمالي الأهداف 📊", desc: "عدد أهداف الادخار التي أنشأتها." }, { id: "st-saved", title: "إجمالي المدخرات 💚", desc: "المبلغ الإجمالي المدخر عبر جميع أهدافك." }, { id: "st-target", title: "إجمالي الهدف 🎯", desc: "المبلغ الإجمالي المستهدف لجميع الأهداف." }, { id: "st-done", title: "الأهداف المكتملة 🎉", desc: "الأهداف التي أنجزتها بالكامل!" }, { id: "goalsList", title: "قائمة أهدافك 📋", desc: "جميع أهداف الادخار هنا. انقر على أي هدف لإضافة مساهمة!" }, { id: "leaderboardCard", title: "لوحة المتصدرين 🏆", desc: "انظر كيف تصنف مدخراتك الإجمالية." }, { id: "g-name", title: "إضافة هدف جديد ➕", desc: "أنشئ هدفاً جديداً هنا!" }, { id: null, title: "ادخر كالبطل! 🎉", desc: "كل روبية مدخرة تقربك من أحلامك. Miu Miu تؤمن بك! 🩵" }],
      fr: [{ id: null, title: "Objectifs d'épargne 🩵", desc: "C'est ta page d'objectifs ! Fixe des cibles, suis ta progression et monte en niveau ! " }, { id: "playerCard", title: "Ta carte de joueur 🎮", desc: "Un profil avec XP, niveau, streak et badges ! Économise et monte en niveau comme dans un jeu !" }, { id: "badgesRow", title: "Tes badges 🏅", desc: "Gagne des badges en atteignant des jalons !" }, { id: "st-total", title: "Total des objectifs 📊", desc: "Combien d'objectifs d'épargne tu as créés." }, { id: "st-saved", title: "Total épargné 💚", desc: "Le montant combiné épargné sur tous tes objectifs." }, { id: "st-target", title: "Total ciblé 🎯", desc: "Le montant cible combiné pour tous les objectifs." }, { id: "st-done", title: "Objectifs atteints 🎉", desc: "Les objectifs que tu as pleinement atteints !" }, { id: "goalsList", title: "Ta liste d'objectifs 📋", desc: "Tous tes objectifs d'épargne sont ici. Clique pour ajouter une contribution !" }, { id: "leaderboardCard", title: "Classement 🏆", desc: "Vois comment ton épargne totale se classe." }, { id: "g-name", title: "Ajouter un objectif ➕", desc: "Crée un nouvel objectif ici !" }, { id: null, title: "Épargne comme un champion ! 🎉", desc: "Chaque roupie épargnée te rapproche de tes rêves. Miu Miu croit en toi ! 🩵" }],
      de: [{ id: null, title: "Sparziele 🩵", desc: "Das ist deine Zielseite! Ziele setzen, Fortschritt verfolgen und wie in einem Spiel aufsteigen!" }, { id: "playerCard", title: "Deine Spielerkarte 🎮", desc: "Ein Spielerprofil mit XP, Level, Streak und Abzeichen! Spare und steige auf!" }, { id: "badgesRow", title: "Deine Abzeichen 🏅", desc: "Verdiene Abzeichen wenn du Meilensteine erreichst!" }, { id: "st-total", title: "Gesamtziele 📊", desc: "Wie viele Sparziele du erstellt hast." }, { id: "st-saved", title: "Gesamt gespart 💚", desc: "Der kombinierte gesparte Betrag über alle deine Ziele." }, { id: "st-target", title: "Gesamtziel 🎯", desc: "Der kombinierte Zielbetrag für alle Ziele." }, { id: "st-done", title: "Erreichte Ziele 🎉", desc: "Ziele, die du vollständig erreicht hast!" }, { id: "goalsList", title: "Deine Zielliste 📋", desc: "Alle deine Sparziele sind hier. Klicke um einen Beitrag hinzuzufügen!" }, { id: "leaderboardCard", title: "Rangliste 🏆", desc: "Sieh wie deine Gesamtersparnis im Vergleich abschneidet." }, { id: "g-name", title: "Neues Ziel hinzufügen ➕", desc: "Erstelle hier ein neues Ziel!" }, { id: null, title: "Spare wie ein Champion! 🎉", desc: "Jede gesparte Rupie bringt dich deinen Träumen näher. Miu Miu glaubt an dich! 🩵" }],
      es: [{ id: null, title: "Metas de Ahorro 🩵", desc: "¡Esta es tu página de metas! Fija objetivos, rastrea el progreso y sube de nivel." }, { id: "playerCard", title: "Tu Tarjeta de Jugador 🎮", desc: "¡Un perfil con XP, nivel, racha y medallas! ¡Ahorra y sube de nivel como en un juego!" }, { id: "badgesRow", title: "Tus Medallas 🏅", desc: "¡Gana medallas al alcanzar hitos!" }, { id: "st-total", title: "Total de Metas 📊", desc: "Cuántas metas de ahorro has creado." }, { id: "st-saved", title: "Total Ahorrado 💚", desc: "La cantidad combinada ahorrada en todas tus metas." }, { id: "st-target", title: "Total Objetivo 🎯", desc: "La cantidad objetivo combinada para todas las metas." }, { id: "st-done", title: "Metas Completadas 🎉", desc: "¡Metas que has logrado completamente!" }, { id: "goalsList", title: "Tu Lista de Metas 📋", desc: "Todas tus metas de ahorro están aquí. ¡Haz clic para agregar una contribución!" }, { id: "leaderboardCard", title: "Tabla de Clasificación 🏆", desc: "Mira cómo se clasifica tu ahorro total." }, { id: "g-name", title: "Agregar Nueva Meta ➕", desc: "¡Crea una nueva meta aquí!" }, { id: null, title: "¡Ahorra como un campeón! 🎉", desc: "¡Cada rupia ahorrada te acerca a tus sueños. Miu Miu cree en ti! 🩵" }],
      pt: [{ id: null, title: "Metas de Poupança 🩵", desc: "Esta é sua página de metas! Defina alvos, acompanhe o progresso e suba de nível!" }, { id: "playerCard", title: "Seu Cartão de Jogador 🎮", desc: "Um perfil de jogador com XP, nível, sequência e emblemas! Poupe e suba de nível!" }, { id: "badgesRow", title: "Seus Emblemas 🏅", desc: "Ganhe emblemas ao atingir marcos!" }, { id: "st-total", title: "Total de Metas 📊", desc: "Quantas metas de poupança você criou." }, { id: "st-saved", title: "Total Poupado 💚", desc: "O valor combinado poupado em todas as suas metas." }, { id: "st-target", title: "Total Alvo 🎯", desc: "O valor alvo combinado para todas as metas." }, { id: "st-done", title: "Metas Concluídas 🎉", desc: "Metas que você alcançou completamente!" }, { id: "goalsList", title: "Sua Lista de Metas 📋", desc: "Todas as suas metas de poupança estão aqui. Clique para adicionar uma contribuição!" }, { id: "leaderboardCard", title: "Classificação 🏆", desc: "Veja como sua poupança total se classifica." }, { id: "g-name", title: "Adicionar Nova Meta ➕", desc: "Crie uma nova meta aqui!" }, { id: null, title: "Poupe como um campeão! 🎉", desc: "Cada rupia poupada te aproxima dos seus sonhos. Miu Miu acredita em você! 🩵" }],
      ko: [{ id: null, title: "저축 목표 🩵", desc: "여기가 목표 페이지예요! 목표를 설정하고 진행 상황을 추적하며 레벨업하세요!" }, { id: "playerCard", title: "플레이어 카드 🎮", desc: "XP, 레벨, 연속 저축, 배지가 있는 플레이어 프로필! 저축하고 레벨업하세요!" }, { id: "badgesRow", title: "배지 🏅", desc: "마일스톤을 달성하면 배지를 획득하세요!" }, { id: "st-total", title: "총 목표 수 📊", desc: "만든 저축 목표의 수." }, { id: "st-saved", title: "총 저축액 💚", desc: "모든 목표의 합산 저축 금액." }, { id: "st-target", title: "총 목표 금액 🎯", desc: "모든 목표의 합산 목표 금액." }, { id: "st-done", title: "완료된 목표 🎉", desc: "완전히 달성한 목표들!" }, { id: "goalsList", title: "목표 목록 📋", desc: "모든 저축 목표가 여기 있어요. 클릭해서 기여금을 추가하세요!" }, { id: "leaderboardCard", title: "리더보드 🏆", desc: "총 저축액 순위를 확인하세요." }, { id: "g-name", title: "새 목표 추가 ➕", desc: "여기서 새 목표를 만드세요!" }, { id: null, title: "챔피언처럼 저축하세요! 🎉", desc: "저축한 모든 루피가 꿈에 가까워지게 합니다. Miu Miu가 응원해요! 🩵" }],
      ru: [{ id: null, title: "Цели сбережений 🩵", desc: "Это страница целей! Устанавливай цели, отслеживай прогресс и повышай уровень!" }, { id: "playerCard", title: "Карточка игрока 🎮", desc: "Профиль игрока с XP, уровнем, серией и значками! Копи и повышай уровень!" }, { id: "badgesRow", title: "Твои значки 🏅", desc: "Зарабатывай значки при достижении вех!" }, { id: "st-total", title: "Всего целей 📊", desc: "Сколько целей сбережений ты создал(а)." }, { id: "st-saved", title: "Всего накоплено 💚", desc: "Суммарная накопленная сумма по всем целям." }, { id: "st-target", title: "Общая цель 🎯", desc: "Суммарная целевая сумма по всем целям." }, { id: "st-done", title: "Выполненные цели 🎉", desc: "Цели, которые ты полностью достиг(ла)!" }, { id: "goalsList", title: "Список целей 📋", desc: "Все цели сбережений здесь. Нажми чтобы добавить взнос!" }, { id: "leaderboardCard", title: "Таблица лидеров 🏆", desc: "Посмотри, как твои накопления соотносятся с вехами." }, { id: "g-name", title: "Добавить новую цель ➕", desc: "Создай новую цель здесь!" }, { id: null, title: "Копи как чемпион! 🎉", desc: "Каждая сбережённая рупия приближает к мечте. Miu Miu верит в тебя! 🩵" }],
    },

    // ── BILL REMINDERS ────────────────────────────────────────────────────
    bills: {
      en: [
        { id: null,          title: "Bill Reminders 🩵",           desc: "Never miss a bill again! This page helps you track upcoming and recurring bills. Let me show you!" },
        { id: "st-total",    title: "Total Bills 📋",              desc: "How many bills you're currently tracking. Stay on top of all of them!" },
        { id: "st-overdue",  title: "Overdue Bills 🔴",            desc: "Bills you've missed! These need your attention immediately. Pay them before they pile up!" },
        { id: "st-week",     title: "Due This Week ⏰",            desc: "Bills coming up in the next 7 days. Plan ahead so you're never caught off guard!" },
        { id: "st-paid",     title: "Paid This Month ✅",          desc: "Bills you've already cleared this month. Every paid bill is a win! 🎉" },
        { id: "vt-list",     title: "View Toggle 📅",              desc: "Switch between List View and Calendar View. Calendar makes it easy to see due dates visually!" },
        { id: "billsList",   title: "Your Bills List 📋",          desc: "All your bills listed here. Filter by Upcoming, Overdue, or Paid. Mark any as paid with one click!" },
        { id: "b-name",      title: "Add a New Bill ➕",           desc: "Add a new bill here — name, amount, due date, category, and how often it repeats!" },
        { id: "upcomingList",title: "Upcoming Bills 📅",           desc: "A quick glance at what's due soon. Great for planning your week's cash flow!" },
        { id: null,          title: "No more missed bills! 🎉",    desc: "With Miu Miu's reminders, you'll always be on top of your bills. Financial responsibility unlocked! 🩵" },
      ],
      hi: [{ id: null, title: "बिल रिमाइंडर 🩵", desc: "अब कोई बिल नहीं छूटेगा! यह पृष्ठ आगामी और आवर्ती बिलों को ट्रैक करता है!" }, { id: "st-total", title: "कुल बिल 📋", desc: "आप वर्तमान में कितने बिल ट्रैक कर रहे हैं।" }, { id: "st-overdue", title: "अतिदेय बिल 🔴", desc: "बिल जो आप चूक गए! इन पर तुरंत ध्यान दें!" }, { id: "st-week", title: "इस सप्ताह देय ⏰", desc: "अगले 7 दिनों में आने वाले बिल।" }, { id: "st-paid", title: "इस महीने भुगतान ✅", desc: "बिल जो आपने इस महीने पहले ही चुका दिए।" }, { id: "vt-list", title: "दृश्य टॉगल 📅", desc: "सूची दृश्य और कैलेंडर दृश्य के बीच स्विच करें!" }, { id: "billsList", title: "आपकी बिल सूची 📋", desc: "सभी बिल यहाँ सूचीबद्ध हैं। फ़िल्टर करें और भुगतान करें!" }, { id: "b-name", title: "नया बिल जोड़ें ➕", desc: "यहाँ नया बिल जोड़ें — नाम, राशि, देय तिथि!" }, { id: "upcomingList", title: "आगामी बिल 📅", desc: "जल्द ही देय होने वाले बिलों पर एक नज़र।" }, { id: null, title: "अब कोई बिल नहीं छूटेगा! 🎉", desc: "Miu Miu के रिमाइंडर के साथ आप हमेशा ऊपर रहेंगे! 🩵" }],
      zh: [{ id: null, title: "账单提醒 🩵", desc: "再也不会错过账单！这个页面帮你追踪即将到来和定期账单。让我带你了解！" }, { id: "st-total", title: "总账单 📋", desc: "你目前正在追踪的账单数量。" }, { id: "st-overdue", title: "逾期账单 🔴", desc: "你错过的账单！需要立即处理！" }, { id: "st-week", title: "本周到期 ⏰", desc: "未来7天内到期的账单。" }, { id: "st-paid", title: "本月已付 ✅", desc: "本月已经支付的账单。" }, { id: "vt-list", title: "视图切换 📅", desc: "在列表视图和日历视图之间切换！" }, { id: "billsList", title: "账单列表 📋", desc: "所有账单都在这里。筛选并标记为已付！" }, { id: "b-name", title: "添加新账单 ➕", desc: "在这里添加新账单！" }, { id: "upcomingList", title: "即将到来的账单 📅", desc: "快速查看即将到期的账单。" }, { id: null, title: "再也不会错过账单！🎉", desc: "有Miu Miu的提醒，你总能掌控账单！🩵" }],
      ja: [{ id: null, title: "請求書リマインダー 🩵", desc: "もう請求書を見逃さない！このページで定期的な請求書を追跡します。案内しますね！" }, { id: "st-total", title: "総請求書数 📋", desc: "現在追跡している請求書の数。" }, { id: "st-overdue", title: "期限超過 🔴", desc: "見逃した請求書！すぐに対処してください！" }, { id: "st-week", title: "今週の期限 ⏰", desc: "次の7日以内に期限が来る請求書。" }, { id: "st-paid", title: "今月の支払済み ✅", desc: "今月すでに支払った請求書。" }, { id: "vt-list", title: "表示切替 📅", desc: "リスト表示とカレンダー表示を切り替えられます！" }, { id: "billsList", title: "請求書リスト 📋", desc: "すべての請求書がここに。フィルターして支払い済みにマーク！" }, { id: "b-name", title: "新しい請求書を追加 ➕", desc: "ここで新しい請求書を追加！" }, { id: "upcomingList", title: "近日の請求書 📅", desc: "もうすぐ期限の請求書を一目で確認。" }, { id: null, title: "もう見逃さない！🎉", desc: "Miu Miuのリマインダーで常に請求書を把握しましょう！🩵" }],
      ar: [{ id: null, title: "تذكيرات الفواتير 🩵", desc: "لن تفوتك فاتورة أبداً! تساعدك هذه الصفحة على تتبع الفواتير القادمة والمتكررة. دعيني أرشدك!" }, { id: "st-total", title: "إجمالي الفواتير 📋", desc: "عدد الفواتير التي تتابعها حالياً." }, { id: "st-overdue", title: "الفواتير المتأخرة 🔴", desc: "الفواتير التي فاتتك! تحتاج إلى اهتمامك فوراً!" }, { id: "st-week", title: "مستحق هذا الأسبوع ⏰", desc: "الفواتير المستحقة خلال الأيام السبعة القادمة." }, { id: "st-paid", title: "مدفوع هذا الشهر ✅", desc: "الفواتير التي سددتها هذا الشهر بالفعل." }, { id: "vt-list", title: "تبديل العرض 📅", desc: "التبديل بين عرض القائمة وعرض التقويم!" }, { id: "billsList", title: "قائمة فواتيرك 📋", desc: "جميع فواتيرك مدرجة هنا. قم بالتصفية والتحديد كمدفوع!" }, { id: "b-name", title: "إضافة فاتورة جديدة ➕", desc: "أضف فاتورة جديدة هنا!" }, { id: "upcomingList", title: "الفواتير القادمة 📅", desc: "نظرة سريعة على ما سيحل أجله قريباً." }, { id: null, title: "لا مزيد من الفواتير الفائتة! 🎉", desc: "مع تذكيرات Miu Miu ستكون دائماً على اطلاع بفواتيرك! 🩵" }],
      fr: [{ id: null, title: "Rappels de factures 🩵", desc: "Ne rate plus jamais une facture ! Cette page t'aide à suivre les factures à venir. Je te guide !" }, { id: "st-total", title: "Total des factures 📋", desc: "Combien de factures tu suis actuellement." }, { id: "st-overdue", title: "Factures en retard 🔴", desc: "Factures que tu as ratées ! Elles nécessitent ton attention immédiate !" }, { id: "st-week", title: "Dues cette semaine ⏰", desc: "Factures à régler dans les 7 prochains jours." }, { id: "st-paid", title: "Payées ce mois ✅", desc: "Factures déjà réglées ce mois-ci." }, { id: "vt-list", title: "Bascule de vue 📅", desc: "Basculer entre la vue liste et la vue calendrier !" }, { id: "billsList", title: "Ta liste de factures 📋", desc: "Toutes tes factures ici. Filtre et marque comme payée !" }, { id: "b-name", title: "Ajouter une facture ➕", desc: "Ajoute une nouvelle facture ici !" }, { id: "upcomingList", title: "Factures à venir 📅", desc: "Un coup d'œil rapide sur ce qui arrive bientôt." }, { id: null, title: "Plus de factures oubliées ! 🎉", desc: "Avec les rappels de Miu Miu, tu seras toujours au top ! 🩵" }],
      de: [{ id: null, title: "Rechnungserinnerungen 🩵", desc: "Vergiss nie mehr eine Rechnung! Diese Seite hilft dir anstehende Rechnungen zu verfolgen. Ich führe dich!" }, { id: "st-total", title: "Gesamtrechnungen 📋", desc: "Wie viele Rechnungen du aktuell verfolgst." }, { id: "st-overdue", title: "Überfällige Rechnungen 🔴", desc: "Rechnungen die du verpasst hast! Diese brauchen sofortige Aufmerksamkeit!" }, { id: "st-week", title: "Diese Woche fällig ⏰", desc: "Rechnungen die in den nächsten 7 Tagen fällig sind." }, { id: "st-paid", title: "Diesen Monat bezahlt ✅", desc: "Rechnungen die du diesen Monat bereits bezahlt hast." }, { id: "vt-list", title: "Ansicht wechseln 📅", desc: "Zwischen Listen- und Kalenderansicht wechseln!" }, { id: "billsList", title: "Deine Rechnungsliste 📋", desc: "Alle deine Rechnungen hier. Filtern und als bezahlt markieren!" }, { id: "b-name", title: "Neue Rechnung hinzufügen ➕", desc: "Füge hier eine neue Rechnung hinzu!" }, { id: "upcomingList", title: "Anstehende Rechnungen 📅", desc: "Ein schneller Blick auf was bald fällig ist." }, { id: null, title: "Nie wieder verpasste Rechnungen! 🎉", desc: "Mit Miu Mius Erinnerungen bist du immer auf dem Laufenden! 🩵" }],
      es: [{ id: null, title: "Recordatorios de Facturas 🩵", desc: "¡Nunca más olvides una factura! Esta página te ayuda a rastrear las próximas. ¡Te guío!" }, { id: "st-total", title: "Total de Facturas 📋", desc: "Cuántas facturas estás rastreando actualmente." }, { id: "st-overdue", title: "Facturas Vencidas 🔴", desc: "¡Facturas que has perdido! ¡Necesitan tu atención inmediata!" }, { id: "st-week", title: "Vencen Esta Semana ⏰", desc: "Facturas a pagar en los próximos 7 días." }, { id: "st-paid", title: "Pagadas Este Mes ✅", desc: "Facturas que ya has pagado este mes." }, { id: "vt-list", title: "Cambiar Vista 📅", desc: "¡Cambia entre vista de lista y vista de calendario!" }, { id: "billsList", title: "Tu Lista de Facturas 📋", desc: "Todas tus facturas aquí. ¡Filtra y marca como pagada!" }, { id: "b-name", title: "Agregar Nueva Factura ➕", desc: "¡Agrega una nueva factura aquí!" }, { id: "upcomingList", title: "Próximas Facturas 📅", desc: "Un vistazo rápido a lo que vence pronto." }, { id: null, title: "¡No más facturas olvidadas! 🎉", desc: "¡Con los recordatorios de Miu Miu siempre estarás al día! 🩵" }],
      pt: [{ id: null, title: "Lembretes de Contas 🩵", desc: "Nunca mais esqueça uma conta! Esta página te ajuda a rastrear contas próximas. Deixa eu te mostrar!" }, { id: "st-total", title: "Total de Contas 📋", desc: "Quantas contas você está rastreando atualmente." }, { id: "st-overdue", title: "Contas Vencidas 🔴", desc: "Contas que você perdeu! Precisam de atenção imediata!" }, { id: "st-week", title: "Vencendo Esta Semana ⏰", desc: "Contas a pagar nos próximos 7 dias." }, { id: "st-paid", title: "Pagas Este Mês ✅", desc: "Contas que você já pagou este mês." }, { id: "vt-list", title: "Alternar Visualização 📅", desc: "Alterne entre visualização de lista e calendário!" }, { id: "billsList", title: "Sua Lista de Contas 📋", desc: "Todas as suas contas aqui. Filtre e marque como pagas!" }, { id: "b-name", title: "Adicionar Nova Conta ➕", desc: "Adicione uma nova conta aqui!" }, { id: "upcomingList", title: "Próximas Contas 📅", desc: "Uma visão rápida do que vence em breve." }, { id: null, title: "Sem mais contas esquecidas! 🎉", desc: "Com os lembretes de Miu Miu você sempre estará em dia! 🩵" }],
      ko: [{ id: null, title: "청구서 알림 🩵", desc: "더 이상 청구서를 놓치지 마세요! 이 페이지는 다가오는 청구서를 추적합니다. 안내해 드릴게요!" }, { id: "st-total", title: "총 청구서 수 📋", desc: "현재 추적하고 있는 청구서 수." }, { id: "st-overdue", title: "연체 청구서 🔴", desc: "놓친 청구서들! 즉시 처리가 필요해요!" }, { id: "st-week", title: "이번 주 마감 ⏰", desc: "향후 7일 내 마감 청구서." }, { id: "st-paid", title: "이번 달 납부 완료 ✅", desc: "이번 달 이미 납부한 청구서." }, { id: "vt-list", title: "보기 전환 📅", desc: "목록 보기와 달력 보기 사이를 전환하세요!" }, { id: "billsList", title: "청구서 목록 📋", desc: "모든 청구서가 여기 있어요. 필터링하고 납부 완료로 표시하세요!" }, { id: "b-name", title: "새 청구서 추가 ➕", desc: "여기서 새 청구서를 추가하세요!" }, { id: "upcomingList", title: "다가오는 청구서 📅", desc: "곧 마감될 청구서를 빠르게 확인하세요." }, { id: null, title: "청구서 놓치지 않아요! 🎉", desc: "Miu Miu 알림으로 항상 청구서를 파악하세요! 🩵" }],
      ru: [{ id: null, title: "Напоминания о счетах 🩵", desc: "Никогда не пропускай счета! Эта страница помогает отслеживать предстоящие счета. Позволь показать!" }, { id: "st-total", title: "Всего счетов 📋", desc: "Сколько счетов ты сейчас отслеживаешь." }, { id: "st-overdue", title: "Просроченные счета 🔴", desc: "Счета, которые ты пропустил(а)! Нужно срочно разобраться!" }, { id: "st-week", title: "К оплате на этой неделе ⏰", desc: "Счета к оплате в ближайшие 7 дней." }, { id: "st-paid", title: "Оплачено в этом месяце ✅", desc: "Счета, которые ты уже оплатил(а) в этом месяце." }, { id: "vt-list", title: "Переключить вид 📅", desc: "Переключайся между списком и календарём!" }, { id: "billsList", title: "Список счетов 📋", desc: "Все твои счета здесь. Фильтруй и отмечай как оплаченные!" }, { id: "b-name", title: "Добавить новый счёт ➕", desc: "Добавь новый счёт здесь!" }, { id: "upcomingList", title: "Предстоящие счета 📅", desc: "Быстрый взгляд на то, что скоро нужно оплатить." }, { id: null, title: "Больше не пропустишь счета! 🎉", desc: "С напоминаниями Miu Miu ты всегда в курсе своих счетов! 🩵" }],
    },

    // ── PDF REPORT ────────────────────────────────────────────────────────
    pdf: {
      en: [
        { id: null,         title: "PDF Report 🩵",                  desc: "This page lets you generate and download a beautiful expense report as a PDF. Let me show you how!" },
        { id: "filter-card",title: "Filter Options 🔍",              desc: "Filter your report by month, year, category, or custom date range. Get exactly the data you need!" },
        { id: "s-total",    title: "Total Spent 💸",                 desc: "Total amount spent in the filtered period. This is what your report is based on!" },
        { id: "s-avg",      title: "Avg per Transaction 📊",         desc: "Average spending per transaction in the selected period." },
        { id: "s-top",      title: "Top Category 🏆",                desc: "Which category dominated your spending in this period." },
        { id: "s-budget-pct", title: "Budget Used 🎯",               desc: "How much of your budget you've used in this filtered period. Keep it green!" },
        { id: "searchBox",  title: "Search & Sort 🔍",               desc: "Search transactions by name, category or TXN ID. Sort by date or amount too!" },
        { id: "tableBody",  title: "Expense Records Table 📋",       desc: "A full detailed table of every expense — with TXN ID, category, date and amount!" },
        { id: "breakdownRows", title: "Category Breakdown 🥧",       desc: "A visual breakdown of spending by category with bar indicators and percentages!" },
        { id: null,         title: "Download your report! 🎉",       desc: "Hit the Print/PDF button at the top to download your report. Perfect for sharing or record keeping! 🩵" },
      ],
      hi: [{ id: null, title: "PDF रिपोर्ट 🩵", desc: "यह पृष्ठ आपको PDF के रूप में एक सुंदर व्यय रिपोर्ट डाउनलोड करने देता है!" }, { id: "filter-card", title: "फ़िल्टर विकल्प 🔍", desc: "महीने, साल, श्रेणी या कस्टम तिथि सीमा से फ़िल्टर करें!" }, { id: "s-total", title: "कुल खर्च 💸", desc: "फ़िल्टर अवधि में खर्च की गई कुल राशि।" }, { id: "s-avg", title: "प्रति लेनदेन औसत 📊", desc: "चयनित अवधि में प्रति लेनदेन औसत खर्च।" }, { id: "s-top", title: "शीर्ष श्रेणी 🏆", desc: "इस अवधि में किस श्रेणी में सबसे ज़्यादा खर्च।" }, { id: "s-budget-pct", title: "बजट उपयोग 🎯", desc: "इस अवधि में आपके बजट का कितना उपयोग हुआ।" }, { id: "searchBox", title: "खोजें और क्रमबद्ध करें 🔍", desc: "नाम, श्रेणी या TXN ID द्वारा खोजें।" }, { id: "tableBody", title: "व्यय रिकॉर्ड तालिका 📋", desc: "हर व्यय की पूर्ण विस्तृत तालिका।" }, { id: "breakdownRows", title: "श्रेणी विभाजन 🥧", desc: "श्रेणी द्वारा खर्च का विज़ुअल विभाजन।" }, { id: null, title: "रिपोर्ट डाउनलोड करें! 🎉", desc: "PDF डाउनलोड करने के लिए Print/PDF बटन दबाएं! 🩵" }],
      zh: [{ id: null, title: "PDF报告 🩵", desc: "此页面让你以PDF格式生成和下载漂亮的支出报告！" }, { id: "filter-card", title: "筛选选项 🔍", desc: "按月份、年份、类别或自定义日期范围筛选！" }, { id: "s-total", title: "总支出 💸", desc: "筛选期间的总支出金额。" }, { id: "s-avg", title: "每笔平均 📊", desc: "选定期间每笔交易的平均支出。" }, { id: "s-top", title: "最多类别 🏆", desc: "该期间哪个类别占主导。" }, { id: "s-budget-pct", title: "预算使用 🎯", desc: "筛选期间使用了多少预算。" }, { id: "searchBox", title: "搜索和排序 🔍", desc: "按名称、类别或交易ID搜索。" }, { id: "tableBody", title: "支出记录表格 📋", desc: "每笔支出的完整详细表格。" }, { id: "breakdownRows", title: "类别分解 🥧", desc: "按类别的支出可视化分解。" }, { id: null, title: "下载你的报告！🎉", desc: "点击打印/PDF按钮下载报告！🩵" }],
      ja: [{ id: null, title: "PDFレポート 🩵", desc: "このページでPDF形式で美しい支出レポートを生成・ダウンロードできます！" }, { id: "filter-card", title: "フィルターオプション 🔍", desc: "月・年・カテゴリ・カスタム期間でフィルター！" }, { id: "s-total", title: "合計支出 💸", desc: "フィルター期間中の合計支出額。" }, { id: "s-avg", title: "取引あたり平均 📊", desc: "選択期間中の取引あたり平均支出。" }, { id: "s-top", title: "トップカテゴリ 🏆", desc: "この期間で支出が最も多かったカテゴリ。" }, { id: "s-budget-pct", title: "予算使用率 🎯", desc: "この期間でどれだけの予算を使ったか。" }, { id: "searchBox", title: "検索・並び替え 🔍", desc: "名前・カテゴリ・TXN IDで検索。" }, { id: "tableBody", title: "支出記録テーブル 📋", desc: "全支出の完全な詳細テーブル。" }, { id: "breakdownRows", title: "カテゴリ内訳 🥧", desc: "カテゴリ別支出のビジュアル内訳。" }, { id: null, title: "レポートをダウンロード！🎉", desc: "印刷/PDFボタンを押してレポートをダウンロードしましょう！🩵" }],
      ar: [{ id: null, title: "تقرير PDF 🩵", desc: "يتيح لك هذا الصفحة إنشاء وتنزيل تقرير نفقات جميل بصيغة PDF!" }, { id: "filter-card", title: "خيارات التصفية 🔍", desc: "فلتر حسب الشهر والسنة والفئة أو نطاق تاريخ مخصص!" }, { id: "s-total", title: "إجمالي الإنفاق 💸", desc: "إجمالي المبلغ المنفق في الفترة المفلترة." }, { id: "s-avg", title: "المتوسط لكل معاملة 📊", desc: "متوسط الإنفاق لكل معاملة في الفترة المحددة." }, { id: "s-top", title: "الفئة الأعلى 🏆", desc: "أي فئة سيطرت على إنفاقك في هذه الفترة." }, { id: "s-budget-pct", title: "الميزانية المستخدمة 🎯", desc: "كم من ميزانيتك استخدمت في هذه الفترة." }, { id: "searchBox", title: "بحث وترتيب 🔍", desc: "ابحث بالاسم أو الفئة أو رقم المعاملة." }, { id: "tableBody", title: "جدول سجلات النفقات 📋", desc: "جدول كامل تفصيلي لكل نفقة." }, { id: "breakdownRows", title: "تفصيل الفئات 🥧", desc: "تفصيل بصري للإنفاق حسب الفئة." }, { id: null, title: "نزّل تقريرك! 🎉", desc: "اضغط زر الطباعة/PDF لتنزيل تقريرك! 🩵" }],
      fr: [{ id: null, title: "Rapport PDF 🩵", desc: "Cette page te permet de générer et télécharger un beau rapport de dépenses en PDF. Je te montre !" }, { id: "filter-card", title: "Options de filtre 🔍", desc: "Filtre par mois, année, catégorie ou plage de dates personnalisée !" }, { id: "s-total", title: "Total dépensé 💸", desc: "Montant total dépensé dans la période filtrée." }, { id: "s-avg", title: "Moy. par transaction 📊", desc: "Dépense moyenne par transaction dans la période sélectionnée." }, { id: "s-top", title: "Catégorie principale 🏆", desc: "Quelle catégorie a dominé tes dépenses dans cette période." }, { id: "s-budget-pct", title: "Budget utilisé 🎯", desc: "Combien de ton budget tu as utilisé dans cette période." }, { id: "searchBox", title: "Rechercher et trier 🔍", desc: "Recherche par nom, catégorie ou ID de transaction." }, { id: "tableBody", title: "Tableau des dépenses 📋", desc: "Un tableau complet et détaillé de chaque dépense." }, { id: "breakdownRows", title: "Répartition par catégorie 🥧", desc: "Répartition visuelle des dépenses par catégorie." }, { id: null, title: "Télécharge ton rapport ! 🎉", desc: "Clique sur le bouton Imprimer/PDF pour télécharger ton rapport ! 🩵" }],
      de: [{ id: null, title: "PDF-Bericht 🩵", desc: "Diese Seite ermöglicht es dir einen schönen Ausgabenbericht als PDF zu generieren und herunterzuladen!" }, { id: "filter-card", title: "Filteroptionen 🔍", desc: "Filtern nach Monat, Jahr, Kategorie oder benutzerdefiniertem Datumsbereich!" }, { id: "s-total", title: "Gesamt ausgegeben 💸", desc: "Gesamtbetrag im gefilterten Zeitraum ausgegeben." }, { id: "s-avg", title: "Durchschnitt/Transaktion 📊", desc: "Durchschnittliche Ausgaben pro Transaktion im ausgewählten Zeitraum." }, { id: "s-top", title: "Top-Kategorie 🏆", desc: "Welche Kategorie deine Ausgaben in diesem Zeitraum dominiert hat." }, { id: "s-budget-pct", title: "Budget verbraucht 🎯", desc: "Wie viel Budget du in diesem Zeitraum verbraucht hast." }, { id: "searchBox", title: "Suchen & Sortieren 🔍", desc: "Suche nach Name, Kategorie oder TXN-ID." }, { id: "tableBody", title: "Ausgabentabelle 📋", desc: "Eine vollständige detaillierte Tabelle jeder Ausgabe." }, { id: "breakdownRows", title: "Kategorienaufschlüsselung 🥧", desc: "Visuelle Aufschlüsselung der Ausgaben nach Kategorie." }, { id: null, title: "Bericht herunterladen! 🎉", desc: "Klicke auf Drucken/PDF um deinen Bericht herunterzuladen! 🩵" }],
      es: [{ id: null, title: "Informe PDF 🩵", desc: "¡Esta página te permite generar y descargar un hermoso informe de gastos como PDF. Te muestro cómo!" }, { id: "filter-card", title: "Opciones de filtro 🔍", desc: "¡Filtra por mes, año, categoría o rango de fechas personalizado!" }, { id: "s-total", title: "Total gastado 💸", desc: "Monto total gastado en el período filtrado." }, { id: "s-avg", title: "Prom. por transacción 📊", desc: "Gasto promedio por transacción en el período seleccionado." }, { id: "s-top", title: "Categoría principal 🏆", desc: "Qué categoría dominó tu gasto en este período." }, { id: "s-budget-pct", title: "Presupuesto usado 🎯", desc: "Cuánto de tu presupuesto has usado en este período." }, { id: "searchBox", title: "Buscar y ordenar 🔍", desc: "Busca por nombre, categoría o ID de transacción." }, { id: "tableBody", title: "Tabla de gastos 📋", desc: "Una tabla completa y detallada de cada gasto." }, { id: "breakdownRows", title: "Desglose por categoría 🥧", desc: "Desglose visual de gastos por categoría." }, { id: null, title: "¡Descarga tu informe! 🎉", desc: "¡Haz clic en el botón Imprimir/PDF para descargar tu informe! 🩵" }],
      pt: [{ id: null, title: "Relatório PDF 🩵", desc: "Esta página permite gerar e baixar um belo relatório de despesas em PDF. Deixa eu te mostrar!" }, { id: "filter-card", title: "Opções de Filtro 🔍", desc: "Filtre por mês, ano, categoria ou intervalo de datas personalizado!" }, { id: "s-total", title: "Total Gasto 💸", desc: "Valor total gasto no período filtrado." }, { id: "s-avg", title: "Média por Transação 📊", desc: "Gasto médio por transação no período selecionado." }, { id: "s-top", title: "Categoria Principal 🏆", desc: "Qual categoria dominou seu gasto neste período." }, { id: "s-budget-pct", title: "Orçamento Usado 🎯", desc: "Quanto do seu orçamento você usou neste período." }, { id: "searchBox", title: "Buscar e Ordenar 🔍", desc: "Busque por nome, categoria ou ID de transação." }, { id: "tableBody", title: "Tabela de Registros 📋", desc: "Uma tabela completa e detalhada de cada despesa." }, { id: "breakdownRows", title: "Divisão por Categoria 🥧", desc: "Divisão visual de gastos por categoria." }, { id: null, title: "Baixe seu relatório! 🎉", desc: "Clique no botão Imprimir/PDF para baixar seu relatório! 🩵" }],
      ko: [{ id: null, title: "PDF 보고서 🩵", desc: "이 페이지에서 아름다운 지출 보고서를 PDF로 생성하고 다운로드할 수 있어요. 안내해 드릴게요!" }, { id: "filter-card", title: "필터 옵션 🔍", desc: "월, 연도, 카테고리 또는 사용자 지정 날짜 범위로 필터링하세요!" }, { id: "s-total", title: "총 지출 💸", desc: "필터링된 기간의 총 지출 금액." }, { id: "s-avg", title: "거래당 평균 📊", desc: "선택한 기간의 거래당 평균 지출." }, { id: "s-top", title: "최다 카테고리 🏆", desc: "이 기간에 지출을 지배한 카테고리." }, { id: "s-budget-pct", title: "예산 사용 🎯", desc: "이 기간에 예산의 얼마나 사용했는지." }, { id: "searchBox", title: "검색 및 정렬 🔍", desc: "이름, 카테고리 또는 TXN ID로 검색하세요." }, { id: "tableBody", title: "지출 기록 표 📋", desc: "모든 지출의 완전하고 상세한 표." }, { id: "breakdownRows", title: "카테고리 분석 🥧", desc: "카테고리별 지출의 시각적 분석." }, { id: null, title: "보고서를 다운로드하세요! 🎉", desc: "인쇄/PDF 버튼을 클릭해 보고서를 다운로드하세요! 🩵" }],
      ru: [{ id: null, title: "PDF-отчёт 🩵", desc: "Эта страница позволяет создавать и скачивать красивый отчёт о расходах в PDF. Позволь показать!" }, { id: "filter-card", title: "Параметры фильтра 🔍", desc: "Фильтруй по месяцу, году, категории или пользовательскому диапазону дат!" }, { id: "s-total", title: "Всего потрачено 💸", desc: "Общая сумма, потраченная за отфильтрованный период." }, { id: "s-avg", title: "Среднее на транзакцию 📊", desc: "Средние расходы на транзакцию за выбранный период." }, { id: "s-top", title: "Топ категория 🏆", desc: "Какая категория доминировала в расходах за этот период." }, { id: "s-budget-pct", title: "Использовано бюджета 🎯", desc: "Сколько бюджета использовано за этот период." }, { id: "searchBox", title: "Поиск и сортировка 🔍", desc: "Поиск по названию, категории или ID транзакции." }, { id: "tableBody", title: "Таблица расходов 📋", desc: "Полная детальная таблица каждого расхода." }, { id: "breakdownRows", title: "Разбивка по категориям 🥧", desc: "Визуальная разбивка расходов по категориям." }, { id: null, title: "Скачай свой отчёт! 🎉", desc: "Нажми кнопку Печать/PDF для скачивания отчёта! 🩵" }],
    },

    // ── PROFILE ───────────────────────────────────────────────────────────
    profile: {
      en: [
        { id: null,          title: "Your Profile 🩵",              desc: "This is your personal profile page! Manage your account, update info, and see your activity. Let me walk you through!" },
        { id: "avatar-card", title: "Profile Card 👤",              desc: "Your profile card shows your name, email, and quick stats — total expenses, transactions, this month, and budget!" },
        { id: "inp-name",    title: "Update Profile ✏️",            desc: "Change your name and email here. Hit Save Profile when you're done!" },
        { id: "cur-pw",      title: "Change Password 🔑",           desc: "Update your password here for security. Enter current password, then the new one twice!" },
        { id: "activityList",title: "Recent Activity 🕒",           desc: "Your recent transactions listed here — a quick log of your latest financial moves!" },
        { id: null,          title: "Your profile is set! 🎉",      desc: "Keep your profile updated for a personalized BudgetTracker experience. You're doing great! 🩵" },
      ],
      hi: [{ id: null, title: "आपकी प्रोफ़ाइल 🩵", desc: "यह आपका व्यक्तिगत प्रोफ़ाइल पृष्ठ है! खाता प्रबंधित करें और जानकारी अपडेट करें!" }, { id: "avatar-card", title: "प्रोफ़ाइल कार्ड 👤", desc: "आपका नाम, ईमेल और त्वरित आंकड़े दिखाता है!" }, { id: "inp-name", title: "प्रोफ़ाइल अपडेट करें ✏️", desc: "यहाँ अपना नाम और ईमेल बदलें।" }, { id: "cur-pw", title: "पासवर्ड बदलें 🔑", desc: "सुरक्षा के लिए यहाँ पासवर्ड अपडेट करें।" }, { id: "activityList", title: "हाल की गतिविधि 🕒", desc: "आपके हाल के लेनदेन यहाँ सूचीबद्ध हैं।" }, { id: null, title: "प्रोफ़ाइल सेट! 🎉", desc: "व्यक्तिगत अनुभव के लिए अपनी प्रोफ़ाइल अपडेट रखें! 🩵" }],
      zh: [{ id: null, title: "你的个人资料 🩵", desc: "这是你的个人资料页面！管理账户、更新信息、查看活动。" }, { id: "avatar-card", title: "个人资料卡 👤", desc: "显示你的姓名、邮箱和快速统计！" }, { id: "inp-name", title: "更新个人资料 ✏️", desc: "在这里更改姓名和邮箱。" }, { id: "cur-pw", title: "更改密码 🔑", desc: "在这里更新密码以确保安全。" }, { id: "activityList", title: "最近活动 🕒", desc: "你最近的交易记录在这里。" }, { id: null, title: "个人资料已设置！🎉", desc: "保持个人资料更新以获得个性化体验！🩵" }],
      ja: [{ id: null, title: "あなたのプロフィール 🩵", desc: "これはあなたの個人プロフィールページです！アカウント管理、情報更新、活動確認ができます。" }, { id: "avatar-card", title: "プロフィールカード 👤", desc: "名前・メール・クイック統計が表示されます！" }, { id: "inp-name", title: "プロフィール更新 ✏️", desc: "ここで名前とメールを変更できます。" }, { id: "cur-pw", title: "パスワード変更 🔑", desc: "セキュリティのためにここでパスワードを更新。" }, { id: "activityList", title: "最近のアクティビティ 🕒", desc: "最近の取引がここにリストされています。" }, { id: null, title: "プロフィール完成！🎉", desc: "パーソナライズされた体験のためにプロフィールを更新しておきましょう！🩵" }],
      ar: [{ id: null, title: "ملفك الشخصي 🩵", desc: "هذه صفحة ملفك الشخصي! أدر حسابك وحدث معلوماتك وراجع نشاطك." }, { id: "avatar-card", title: "بطاقة الملف الشخصي 👤", desc: "تعرض اسمك وبريدك الإلكتروني وإحصاءات سريعة!" }, { id: "inp-name", title: "تحديث الملف الشخصي ✏️", desc: "غيّر اسمك وبريدك الإلكتروني هنا." }, { id: "cur-pw", title: "تغيير كلمة المرور 🔑", desc: "حدّث كلمة مرورك هنا للأمان." }, { id: "activityList", title: "النشاط الأخير 🕒", desc: "معاملاتك الأخيرة مدرجة هنا." }, { id: null, title: "تم ضبط ملفك الشخصي! 🎉", desc: "حافظ على تحديث ملفك لتجربة شخصية! 🩵" }],
      fr: [{ id: null, title: "Ton profil 🩵", desc: "C'est ta page de profil personnel ! Gère ton compte, mets à jour tes infos et consulte ton activité." }, { id: "avatar-card", title: "Carte de profil 👤", desc: "Ta carte affiche ton nom, email et statistiques rapides !" }, { id: "inp-name", title: "Mettre à jour le profil ✏️", desc: "Change ton nom et email ici." }, { id: "cur-pw", title: "Changer le mot de passe 🔑", desc: "Mets à jour ton mot de passe ici pour la sécurité." }, { id: "activityList", title: "Activité récente 🕒", desc: "Tes transactions récentes sont listées ici." }, { id: null, title: "Ton profil est configuré ! 🎉", desc: "Garde ton profil à jour pour une expérience personnalisée ! 🩵" }],
      de: [{ id: null, title: "Dein Profil 🩵", desc: "Das ist deine persönliche Profilseite! Verwalte dein Konto, aktualisiere Infos und sieh deine Aktivitäten." }, { id: "avatar-card", title: "Profilkarte 👤", desc: "Deine Karte zeigt Name, E-Mail und Schnellstatistiken!" }, { id: "inp-name", title: "Profil aktualisieren ✏️", desc: "Ändere hier deinen Namen und deine E-Mail." }, { id: "cur-pw", title: "Passwort ändern 🔑", desc: "Aktualisiere hier dein Passwort für mehr Sicherheit." }, { id: "activityList", title: "Letzte Aktivitäten 🕒", desc: "Deine letzten Transaktionen sind hier aufgelistet." }, { id: null, title: "Dein Profil ist eingerichtet! 🎉", desc: "Halte dein Profil aktuell für ein personalisiertes Erlebnis! 🩵" }],
      es: [{ id: null, title: "Tu Perfil 🩵", desc: "¡Esta es tu página de perfil personal! Gestiona tu cuenta, actualiza info y ve tu actividad." }, { id: "avatar-card", title: "Tarjeta de Perfil 👤", desc: "¡Tu tarjeta muestra tu nombre, email y estadísticas rápidas!" }, { id: "inp-name", title: "Actualizar Perfil ✏️", desc: "Cambia tu nombre y email aquí." }, { id: "cur-pw", title: "Cambiar Contraseña 🔑", desc: "Actualiza tu contraseña aquí por seguridad." }, { id: "activityList", title: "Actividad Reciente 🕒", desc: "Tus transacciones recientes están listadas aquí." }, { id: null, title: "¡Tu perfil está configurado! 🎉", desc: "¡Mantén tu perfil actualizado para una experiencia personalizada! 🩵" }],
      pt: [{ id: null, title: "Seu Perfil 🩵", desc: "Esta é sua página de perfil pessoal! Gerencie sua conta, atualize informações e veja sua atividade." }, { id: "avatar-card", title: "Cartão de Perfil 👤", desc: "Seu cartão mostra nome, email e estatísticas rápidas!" }, { id: "inp-name", title: "Atualizar Perfil ✏️", desc: "Mude seu nome e email aqui." }, { id: "cur-pw", title: "Alterar Senha 🔑", desc: "Atualize sua senha aqui por segurança." }, { id: "activityList", title: "Atividade Recente 🕒", desc: "Suas transações recentes estão listadas aqui." }, { id: null, title: "Seu perfil está configurado! 🎉", desc: "Mantenha seu perfil atualizado para uma experiência personalizada! 🩵" }],
      ko: [{ id: null, title: "내 프로필 🩵", desc: "이것은 개인 프로필 페이지입니다! 계정을 관리하고 정보를 업데이트하고 활동을 확인하세요." }, { id: "avatar-card", title: "프로필 카드 👤", desc: "이름, 이메일, 빠른 통계를 표시합니다!" }, { id: "inp-name", title: "프로필 업데이트 ✏️", desc: "여기서 이름과 이메일을 변경하세요." }, { id: "cur-pw", title: "비밀번호 변경 🔑", desc: "보안을 위해 여기서 비밀번호를 업데이트하세요." }, { id: "activityList", title: "최근 활동 🕒", desc: "최근 거래가 여기에 나열됩니다." }, { id: null, title: "프로필 설정 완료! 🎉", desc: "개인화된 경험을 위해 프로필을 업데이트하세요! 🩵" }],
      ru: [{ id: null, title: "Твой профиль 🩵", desc: "Это твоя личная страница профиля! Управляй аккаунтом, обновляй информацию и смотри активность." }, { id: "avatar-card", title: "Карточка профиля 👤", desc: "Твоя карточка показывает имя, email и быструю статистику!" }, { id: "inp-name", title: "Обновить профиль ✏️", desc: "Измени здесь имя и email." }, { id: "cur-pw", title: "Изменить пароль 🔑", desc: "Обнови здесь пароль для безопасности." }, { id: "activityList", title: "Последние действия 🕒", desc: "Твои последние транзакции перечислены здесь." }, { id: null, title: "Профиль настроен! 🎉", desc: "Поддерживай профиль актуальным для персонализированного опыта! 🩵" }],
    },

    // ── SETTINGS ─────────────────────────────────────────────────────────
    settings: {
      en: [
        { id: null,       title: "Settings 🩵",                     desc: "This is your Settings page! Customize BudgetTracker to fit your life perfectly. Let me show you around!" },
        { id: "salary",   title: "Budget Details ✏️",               desc: "Enter your monthly salary, savings goal, and amount already spent. BudgetTracker calculates your expense budget automatically!" },
        { id: "budgetResults", title: "Budget Breakdown 📊",        desc: "A live calculation showing your budget, remaining amount, and how much is already spent. Updates as you type!" },
        { id: "langGrid", title: "Language 🌐",                     desc: "Choose your preferred language! BudgetTracker supports 11 languages including Hindi, Chinese, Arabic, and more!" },
        { id: "accountList", title: "Multiple Accounts 👥",         desc: "Manage multiple financial accounts here — savings, current, wallet. Switch between them easily!" },
        { id: "pinToggle",title: "PIN Lock 🔒",                     desc: "Enable a 4-digit PIN to protect your BudgetTracker. Great for shared devices or extra privacy!" },
        { id: null,       title: "All set! 🎉",                     desc: "Your settings are configured! A well-tuned BudgetTracker makes managing money so much easier. 🩵" },
      ],
      hi: [{ id: null, title: "सेटिंग्स 🩵", desc: "यह आपकी सेटिंग्स पृष्ठ है! BudgetTracker को अपने जीवन के लिए अनुकूलित करें!" }, { id: "salary", title: "बजट विवरण ✏️", desc: "अपना मासिक वेतन, बचत लक्ष्य और पहले से खर्च की गई राशि दर्ज करें!" }, { id: "budgetResults", title: "बजट विभाजन 📊", desc: "आपका बजट, शेष राशि और पहले से खर्च का लाइव कैलकुलेशन!" }, { id: "langGrid", title: "भाषा 🌐", desc: "अपनी पसंदीदा भाषा चुनें! 11 भाषाओं का समर्थन!" }, { id: "accountList", title: "एकाधिक खाते 👥", desc: "यहाँ एकाधिक वित्तीय खाते प्रबंधित करें!" }, { id: "pinToggle", title: "PIN लॉक 🔒", desc: "4-अंकीय PIN से BudgetTracker को सुरक्षित करें!" }, { id: null, title: "सब तैयार! 🎉", desc: "आपकी सेटिंग्स कॉन्फ़िगर हैं! 🩵" }],
      zh: [{ id: null, title: "设置 🩵", desc: "这是你的设置页面！自定义BudgetTracker以完美适应你的生活！" }, { id: "salary", title: "预算详情 ✏️", desc: "输入月薪、储蓄目标和已花费金额！" }, { id: "budgetResults", title: "预算分解 📊", desc: "实时计算显示预算、剩余金额和已花金额！" }, { id: "langGrid", title: "语言 🌐", desc: "选择你喜欢的语言！支持11种语言！" }, { id: "accountList", title: "多账户 👥", desc: "在这里管理多个财务账户！" }, { id: "pinToggle", title: "PIN锁 🔒", desc: "启用4位PIN保护BudgetTracker！" }, { id: null, title: "全部完成！🎉", desc: "你的设置已配置！🩵" }],
      ja: [{ id: null, title: "設定 🩵", desc: "ここが設定ページです！BudgetTrackerをあなたの生活に合わせてカスタマイズ！" }, { id: "salary", title: "予算詳細 ✏️", desc: "月収・貯蓄目標・すでに使った金額を入力してください！" }, { id: "budgetResults", title: "予算内訳 📊", desc: "予算・残額・すでに使った金額のライブ計算！" }, { id: "langGrid", title: "言語 🌐", desc: "好きな言語を選択！11言語をサポート！" }, { id: "accountList", title: "複数アカウント 👥", desc: "ここで複数の金融アカウントを管理！" }, { id: "pinToggle", title: "PINロック 🔒", desc: "4桁のPINでBudgetTrackerを保護！" }, { id: null, title: "準備完了！🎉", desc: "設定が完了しました！🩵" }],
      ar: [{ id: null, title: "الإعدادات 🩵", desc: "هذه صفحة إعداداتك! خصص BudgetTracker ليناسب حياتك تماماً!" }, { id: "salary", title: "تفاصيل الميزانية ✏️", desc: "أدخل راتبك الشهري وهدف الادخار والمبلغ المنفق مسبقاً!" }, { id: "budgetResults", title: "تفصيل الميزانية 📊", desc: "حساب مباشر يعرض ميزانيتك والمبلغ المتبقي!" }, { id: "langGrid", title: "اللغة 🌐", desc: "اختر لغتك المفضلة! 11 لغة مدعومة!" }, { id: "accountList", title: "حسابات متعددة 👥", desc: "أدر حسابات مالية متعددة هنا!" }, { id: "pinToggle", title: "قفل PIN 🔒", desc: "فعّل رمز PIN مكون من 4 أرقام لحماية BudgetTracker!" }, { id: null, title: "كل شيء جاهز! 🎉", desc: "تم ضبط إعداداتك! 🩵" }],
      fr: [{ id: null, title: "Paramètres 🩵", desc: "C'est ta page de paramètres ! Personnalise BudgetTracker pour qu'il corresponde parfaitement à ta vie !" }, { id: "salary", title: "Détails du budget ✏️", desc: "Saisis ton salaire mensuel, objectif d'épargne et montant déjà dépensé !" }, { id: "budgetResults", title: "Répartition du budget 📊", desc: "Un calcul en direct montrant ton budget et montant restant !" }, { id: "langGrid", title: "Langue 🌐", desc: "Choisis ta langue préférée ! 11 langues supportées !" }, { id: "accountList", title: "Comptes multiples 👥", desc: "Gère plusieurs comptes financiers ici !" }, { id: "pinToggle", title: "Verrouillage PIN 🔒", desc: "Active un PIN à 4 chiffres pour protéger BudgetTracker !" }, { id: null, title: "Tout est configuré ! 🎉", desc: "Tes paramètres sont configurés ! 🩵" }],
      de: [{ id: null, title: "Einstellungen 🩵", desc: "Das ist deine Einstellungsseite! Passe BudgetTracker perfekt an dein Leben an!" }, { id: "salary", title: "Budget-Details ✏️", desc: "Gib dein Monatsgehalt, Sparziel und bereits ausgegebenen Betrag ein!" }, { id: "budgetResults", title: "Budget-Aufschlüsselung 📊", desc: "Eine Live-Berechnung zeigt dein Budget und verbleibenden Betrag!" }, { id: "langGrid", title: "Sprache 🌐", desc: "Wähle deine bevorzugte Sprache! 11 Sprachen unterstützt!" }, { id: "accountList", title: "Mehrere Konten 👥", desc: "Verwalte hier mehrere Finanzkonten!" }, { id: "pinToggle", title: "PIN-Sperre 🔒", desc: "Aktiviere einen 4-stelligen PIN um BudgetTracker zu schützen!" }, { id: null, title: "Alles eingestellt! 🎉", desc: "Deine Einstellungen sind konfiguriert! 🩵" }],
      es: [{ id: null, title: "Configuración 🩵", desc: "¡Esta es tu página de configuración! Personaliza BudgetTracker para que se adapte perfectamente a tu vida." }, { id: "salary", title: "Detalles del Presupuesto ✏️", desc: "¡Ingresa tu salario mensual, meta de ahorro y monto ya gastado!" }, { id: "budgetResults", title: "Desglose del Presupuesto 📊", desc: "¡Un cálculo en vivo que muestra tu presupuesto y monto restante!" }, { id: "langGrid", title: "Idioma 🌐", desc: "¡Elige tu idioma preferido! ¡11 idiomas compatibles!" }, { id: "accountList", title: "Múltiples Cuentas 👥", desc: "¡Gestiona múltiples cuentas financieras aquí!" }, { id: "pinToggle", title: "Bloqueo PIN 🔒", desc: "¡Activa un PIN de 4 dígitos para proteger BudgetTracker!" }, { id: null, title: "¡Todo configurado! 🎉", desc: "¡Tu configuración está lista! 🩵" }],
      pt: [{ id: null, title: "Configurações 🩵", desc: "Esta é sua página de configurações! Personalize o BudgetTracker para se adaptar perfeitamente à sua vida!" }, { id: "salary", title: "Detalhes do Orçamento ✏️", desc: "Insira seu salário mensal, meta de poupança e valor já gasto!" }, { id: "budgetResults", title: "Divisão do Orçamento 📊", desc: "Um cálculo ao vivo mostrando seu orçamento e valor restante!" }, { id: "langGrid", title: "Idioma 🌐", desc: "Escolha seu idioma preferido! 11 idiomas suportados!" }, { id: "accountList", title: "Contas Múltiplas 👥", desc: "Gerencie várias contas financeiras aqui!" }, { id: "pinToggle", title: "Bloqueio PIN 🔒", desc: "Ative um PIN de 4 dígitos para proteger o BudgetTracker!" }, { id: null, title: "Tudo configurado! 🎉", desc: "Suas configurações estão definidas! 🩵" }],
      ko: [{ id: null, title: "설정 🩵", desc: "이것은 설정 페이지입니다! BudgetTracker를 내 삶에 맞게 커스터마이즈하세요!" }, { id: "salary", title: "예산 세부 사항 ✏️", desc: "월 급여, 저축 목표, 이미 지출한 금액을 입력하세요!" }, { id: "budgetResults", title: "예산 분석 📊", desc: "예산, 남은 금액, 이미 지출한 금액을 실시간 계산!" }, { id: "langGrid", title: "언어 🌐", desc: "선호하는 언어를 선택하세요! 11개 언어 지원!" }, { id: "accountList", title: "다중 계좌 👥", desc: "여기서 여러 금융 계좌를 관리하세요!" }, { id: "pinToggle", title: "PIN 잠금 🔒", desc: "4자리 PIN으로 BudgetTracker를 보호하세요!" }, { id: null, title: "모두 설정 완료! 🎉", desc: "설정이 구성되었습니다! 🩵" }],
      ru: [{ id: null, title: "Настройки 🩵", desc: "Это страница настроек! Настрой BudgetTracker идеально под свою жизнь!" }, { id: "salary", title: "Детали бюджета ✏️", desc: "Введи ежемесячную зарплату, цель сбережений и уже потраченную сумму!" }, { id: "budgetResults", title: "Разбивка бюджета 📊", desc: "Живой расчёт, показывающий бюджет и оставшуюся сумму!" }, { id: "langGrid", title: "Язык 🌐", desc: "Выбери предпочтительный язык! Поддерживается 11 языков!" }, { id: "accountList", title: "Несколько аккаунтов 👥", desc: "Управляй несколькими финансовыми аккаунтами здесь!" }, { id: "pinToggle", title: "PIN-блокировка 🔒", desc: "Включи 4-значный PIN для защиты BudgetTracker!" }, { id: null, title: "Всё настроено! 🎉", desc: "Твои настройки сконфигурированы! 🩵" }],
    },
  };

  // ─── STYLES ───────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById("miumiu-tour-style")) return;
    const style = document.createElement("style");
    style.id = "miumiu-tour-style";
    style.textContent = `
      /* ── Overlay ── */
     #miumiu-overlay {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(8,15,8,0.55);
  /* REMOVE backdrop-filter: blur(2px); — deleted entirely */
  pointer-events: none;
  opacity: 0; transition: opacity .4s;
}
      #miumiu-overlay.show { opacity: 1; pointer-events: all; }

      /* ── Glow highlight ring ── */
      .miumiu-glow-ring {
        position: fixed; z-index: 9001;
        border-radius: 14px;
        box-shadow: 0 0 0 4px #c9a84c, 0 0 30px 8px rgba(201,168,76,0.45);
        pointer-events: none;
        transition: all .45s cubic-bezier(.4,0,.2,1);
        outline: none;
      }

      /* ── Miu container ── */
      #miumiu-char {
        position: fixed; z-index: 9100;
        width: 90px; height: 90px;
        transition: all .5s cubic-bezier(.4,0,.2,1);
        filter: drop-shadow(0 4px 16px rgba(201,168,76,0.35));
      }
      #miumiu-char lottie-player,
      #miumiu-char .miumiu-fallback {
        width: 100%; height: 100%;
      }
      .miumiu-fallback {
        display: flex; align-items: center; justify-content: center;
        font-size: 56px; animation: miu-float 2.5s ease-in-out infinite;
      }

      /* ── Speech bubble ── */
      #miumiu-bubble {
        position: fixed; z-index: 9100;
        background: #141f14;
        border: 1.5px solid rgba(201,168,76,0.4);
        border-radius: 18px;
        padding: 16px 18px;
        max-width: 270px; min-width: 210px;
        box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.12);
        transition: all .45s cubic-bezier(.4,0,.2,1);
        opacity: 0; transform: scale(0.85);
        pointer-events: all;
      }
      #miumiu-bubble.show { opacity: 1; transform: scale(1); }

      }

      .miumiu-title {
        font-family: 'DM Serif Display', serif;
        font-size: 15px; color: #e8c86a;
        margin-bottom: 6px; line-height: 1.3;
      }
      .miumiu-desc {
        font-family: 'DM Sans', sans-serif;
        font-size: 12.5px; color: #a8c8a0;
        line-height: 1.55; margin-bottom: 14px;
      }
      .miumiu-progress {
        display: flex; gap: 4px; margin-bottom: 12px;
      }
      .miumiu-dot {
        flex: 1; height: 3px; border-radius: 2px;
        background: rgba(201,168,76,0.2);
        transition: background .3s;
      }
      .miumiu-dot.done { background: #c9a84c; }
      .miumiu-buttons {
        display: flex; gap: 8px; justify-content: flex-end;
      }
      .miumiu-btn-skip {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px; color: #7a9870;
        background: none; border: none;
        cursor: pointer; padding: 6px 4px;
        transition: color .2s;
      }
      .miumiu-btn-skip:hover { color: #a8c8a0; }
      .miumiu-btn-next {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px; font-weight: 600;
        color: #0c0c00; background: #c9a84c;
        border: none; border-radius: 8px;
        padding: 7px 16px; cursor: pointer;
        transition: background .2s, transform .15s;
      }
      .miumiu-btn-next:hover { background: #e8c86a; transform: scale(1.04); }

      /* ── ? button ── */
      #miumiu-help-btn {
        position: fixed; bottom: 22px; right: 22px;
        z-index: 8999;
        width: 44px; height: 44px;
        background: linear-gradient(135deg,#1a3d1a,#2d6a2d);
        border: 1.5px solid rgba(201,168,76,0.4);
        border-radius: 50%;
        color: #c9a84c; font-size: 20px;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 18px rgba(0,0,0,0.35), 0 0 12px rgba(201,168,76,0.18);
        transition: transform .2s, box-shadow .2s;
      }
      #miumiu-help-btn:hover {
        transform: scale(1.12);
        box-shadow: 0 6px 24px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.3);
      }

      /* ── Float animation ── */
      @keyframes miu-float {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-8px); }
      }

      /* ── Goodbye wave ── */
      @keyframes miu-wave {
        0%   { transform: rotate(0deg); }
        20%  { transform: rotate(-20deg); }
        40%  { transform: rotate(20deg); }
        60%  { transform: rotate(-15deg); }
        80%  { transform: rotate(10deg); }
        100% { transform: rotate(0deg); }
      }
      #miumiu-char.waving .miumiu-fallback { animation: miu-wave .6s ease; }
    `;
    document.head.appendChild(style);
  }

  // ─── TOUR STATE ───────────────────────────────────────────────────────────
  let state = {
    active: false,
    step: 0,
    steps: [],
    glowEl: null,
    charEl: null,
    bubbleEl: null,
    overlayEl: null,
  };

  // ─── BUILD DOM ────────────────────────────────────────────────────────────
  function buildDOM() {
    // Overlay
    if (!document.getElementById("miumiu-overlay")) {
      const ov = document.createElement("div");
      ov.id = "miumiu-overlay";
      document.body.appendChild(ov);
    }
    // Glow ring
    if (!document.getElementById("miumiu-glow")) {
      const gr = document.createElement("div");
      gr.id = "miumiu-glow";
      gr.className = "miumiu-glow-ring";
      gr.style.display = "none";
      document.body.appendChild(gr);
    }
    // Miu character
    if (!document.getElementById("miumiu-char")) {
      const ch = document.createElement("div");
      ch.id = "miumiu-char";
      // Try lottie first, fallback to emoji axolotl
      ch.innerHTML = `<div class="miumiu-fallback" id="miumiu-emoji">🦎</div>`;
      document.body.appendChild(ch);
      // Try to load lottie animation
      tryLottie(ch);
    }
    // Bubble
    if (!document.getElementById("miumiu-bubble")) {
      const bub = document.createElement("div");
      bub.id = "miumiu-bubble";
      bub.innerHTML = `
        <div class="miumiu-title" id="miumiu-bubble-title">Hi!</div>
        <div class="miumiu-desc"  id="miumiu-bubble-desc">...</div>
        <div class="miumiu-progress" id="miumiu-progress"></div>
        <div class="miumiu-buttons">
          <button class="miumiu-btn-skip" id="miumiu-skip">Skip</button>
          <button class="miumiu-btn-next" id="miumiu-next">Next →</button>
        </div>`;
      document.body.appendChild(bub);
    }

    state.overlayEl = document.getElementById("miumiu-overlay");
    state.glowEl    = document.getElementById("miumiu-glow");
    state.charEl    = document.getElementById("miumiu-char");
    state.bubbleEl  = document.getElementById("miumiu-bubble");

    document.getElementById("miumiu-next").onclick  = () => HelpTour.next();
    document.getElementById("miumiu-skip").onclick  = () => HelpTour.end();
    document.getElementById("miumiu-overlay").onclick = () => HelpTour.end();
  }

  function tryLottie(ch) {
    try {
      if (typeof lottie !== "undefined") {
        ch.innerHTML = "";
        lottie.loadAnimation({
          container: ch, renderer: "svg", loop: true, autoplay: true,
          path: "miumiu.json",
        });
      }
    } catch (e) { /* keep fallback emoji */ }
  }

  // ─── ? BUTTON ─────────────────────────────────────────────────────────────
  function injectHelpBtn() {
    if (document.getElementById("miumiu-help-btn")) return;
    const btn = document.createElement("button");
    btn.id = "miumiu-help-btn";
    btn.innerHTML = "🩵";
    btn.title = "Help Tour";
    btn.onclick = () => HelpTour.start();
    document.body.appendChild(btn);
  }

  // ─── RENDER STEP ──────────────────────────────────────────────────────────
  function renderStep(index) {
    resetLiftedEl();
    const step = state.steps[index];
    const lang = getLang();
    const isLast = index === state.steps.length - 1;

    // Update bubble text
    document.getElementById("miumiu-bubble-title").textContent = step.title;
    document.getElementById("miumiu-bubble-desc").textContent  = step.desc;
    document.getElementById("miumiu-next").textContent = isLast ? "Done 🎉" : "Next →";

    // Skip button label
    const skipLabels = { en:"Skip", hi:"छोड़ें", zh:"跳过", ja:"スキップ", ar:"تخطي", fr:"Passer", de:"Überspringen", es:"Omitir", pt:"Pular", ko:"건너뛰기", ru:"Пропустить" };
    document.getElementById("miumiu-skip").textContent = skipLabels[lang] || "Skip";

    // Progress dots
    const prog = document.getElementById("miumiu-progress");
    prog.innerHTML = state.steps.map((_, i) =>
      `<div class="miumiu-dot ${i <= index ? "done" : ""}"></div>`
    ).join("");

    // Glow + position
    if (step.id) {
      const el = document.getElementById(step.id);
      if (el) {
        positionOnElement(el);
      } else {
        positionCenter();
      }
    } else {
      hideGlow();
      positionCenter();
    }
  }

  function positionOnElement(el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.position = 'relative';
    el.style.zIndex   = '9002';
    el._miumiuLifted  = true;
    setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const pad  = 6;

      // Glow ring
      const g = state.glowEl;
      g.style.display  = "block";
      g.style.left     = (rect.left - pad) + "px";
      g.style.top      = (rect.top  - pad) + "px";
      g.style.width    = (rect.width  + pad * 2) + "px";
      g.style.height   = (rect.height + pad * 2) + "px";

      const miuW = 90, miuH = 90;
      const bubW = 270, bubH = 180;
      const margin = 12;

      // Always place Miu to the right side of the element
      let miuLeft = rect.right - miuW;
      let miuTop  = rect.top - miuH - 12;

      // If too close to top, place Miu below element
      if (miuTop < 8) miuTop = rect.bottom + 12;

      // Clamp Miu within screen
      miuLeft = Math.max(8, Math.min(miuLeft, window.innerWidth - miuW - 8));
      miuTop  = Math.max(8, Math.min(miuTop, window.innerHeight - miuH - 8));

      state.charEl.style.left = miuLeft + "px";
      state.charEl.style.top  = miuTop + "px";

      // Place bubble to the LEFT of element always
      let bubLeft = rect.left - bubW - margin;
      let bubTop  = rect.top;

      // If no room on left, place below element
      if (bubLeft < 8) {
        bubLeft = rect.left;
        bubTop  = rect.bottom + margin;
      }

      // If bubble goes off bottom, push it up
      if (bubTop + bubH > window.innerHeight - 8) {
        bubTop = window.innerHeight - bubH - 8;
      }

      // Clamp bubble within screen
      bubLeft = Math.max(8, Math.min(bubLeft, window.innerWidth - bubW - 8));
      bubTop  = Math.max(8, bubTop);

      const bub = state.bubbleEl;
      bub.style.left = bubLeft + "px";
      bub.style.top  = bubTop + "px";
      bub.className  = "show";
      setTimeout(() => bub.classList.add("show"), 50);

    }, 120);
  }

  function positionBubble(miuLeft, miuTop, miuW, targetRect) {
    // This is now handled inside positionOnElement
  }

  function positionCenter() {
    hideGlow();
    const miuLeft = window.innerWidth / 2 - 45;
    const miuTop  = window.innerHeight / 2 - 120;
    state.charEl.style.left = miuLeft + "px";
    state.charEl.style.top  = miuTop + "px";

    const bub = state.bubbleEl;
    const bubW = 270;
    let bubLeft = window.innerWidth / 2 - bubW / 2;
    let bubTop  = miuTop + 100;
    bub.style.left = Math.max(8, bubLeft) + "px";
    bub.style.top  = bubTop + "px";
    bub.className  = "show";
    setTimeout(() => bub.classList.add("show"), 50);
  }

  function hideGlow() {
    if (state.glowEl) state.glowEl.style.display = "none";
  }

  function resetLiftedEl() {
    const prev = document.querySelector('[data-miumiu-lifted]');
    if (prev) {
      prev.style.zIndex   = '';
      prev.style.position = '';
      prev.removeAttribute('data-miumiu-lifted');
    }
  }

  // ─── START / NEXT / END ───────────────────────────────────────────────────
  var HelpTour = {
    start: function () {
      const page = getPage();
      const lang = getLang();
      const pageSteps = STEPS[page];

      if (!pageSteps) {
        console.warn("Miu Miu: No tour steps for page:", page);
        return;
      }

      const langSteps = pageSteps[lang] || pageSteps["en"];
      state.steps  = langSteps;
      state.step   = 0;
      state.active = true;

      injectStyles();
      buildDOM();

      state.overlayEl.classList.add("show");
      state.charEl.style.display   = "block";
      state.bubbleEl.style.display = "block";

      renderStep(0);
    },

    next: function () {
      if (!state.active) return;
      if (state.step >= state.steps.length - 1) {
        HelpTour.end();
        return;
      }
      state.step++;
      state.bubbleEl.classList.remove("show");
      setTimeout(() => renderStep(state.step), 200);
    },

    end: function () {
      state.active = false;
      // Wave goodbye
      if (state.charEl) {
        state.charEl.classList.add("waving");
        setTimeout(() => {
          if (state.charEl) state.charEl.classList.remove("waving");
        }, 700);
      }
      // Fade out
      setTimeout(() => {
        if (state.overlayEl) state.overlayEl.classList.remove("show");
        if (state.bubbleEl)  { state.bubbleEl.classList.remove("show"); state.bubbleEl.style.display = "none"; }
        if (state.glowEl)    state.glowEl.style.display = "none";
        if (state.charEl)    state.charEl.style.display = "none";
      }, 400);
    },
  };

  // ─── EXPOSE GLOBALLY ──────────────────────────────────────────────────────
  window.HelpTour = HelpTour;

  // ─── AUTO INJECT ? BUTTON & FILTER CARD ID ────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    injectStyles();
    injectHelpBtn();

    // Auto-add id="filter-card" for PDF report page if missing
    const page = getPage();
    if (page === "pdf") {
      const fc = document.querySelector(".filter-card");
      if (fc && !fc.id) fc.id = "filter-card";
      const br = document.querySelector(".breakdown-card");
      if (br && !br.id) br.id = "breakdownRows";
    }

    // Auto-add id="avatar-card" for profile page if missing
    if (page === "profile") {
      const ac = document.querySelector(".avatar-card");
      if (ac && !ac.id) ac.id = "avatar-card";
    }
  });

})();