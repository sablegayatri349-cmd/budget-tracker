/*!
 * business-help-tour.js
 * Miu Miu Help Tour — Business Pages
 * Pages: business.html, business-chart.html, business-partners.html,
 *        business-profile.html, business-report.html, business-setting.html
 * Languages: en, hi, zh, ja, ar, fr, de, es, pt, ko, ru
 * Author: Gayatri Sable — BudgetTracker College Mini Project
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. LANGUAGE SYSTEM
  ───────────────────────────────────────────── */
  const LANG = localStorage.getItem('bt_language') || 'en';

  // ── Tour step content per language ──────────────────────────────────────────
  const TOURS = {

    /* ══════════════════════════════════════════════════════════════
       DASHBOARD  (business.html)
    ══════════════════════════════════════════════════════════════ */
    dashboard: {
      en: [
        { id: 's-in',      title: '💚 Total Income',       desc: 'Your total money received across all transactions — this is everything that came IN to your business.' },
        { id: 's-out',     title: '🔴 Total Expenses',     desc: 'All money that went OUT. Track every rupee spent so nothing slips through the cracks.' },
        { id: 's-profit',  title: '✨ Net Profit',          desc: 'Income minus Expenses = your real profit. Keep this green and growing!' },
        { id: 's-today',   title: '📅 Today\'s Activity',  desc: 'Money added today — great for a quick daily check-in on your business pulse.' },
        { id: 'inPieChart',title: '🥧 Income Breakdown',   desc: 'See which income categories earn you the most. Bigger slice = bigger earner!' },
        { id: 'barChart',  title: '📊 Last 7 Days',        desc: 'Green bars = income, Red bars = expenses for the past week. Spot trends at a glance.' },
        { id: 'txnRows',   title: '📋 All Transactions',   desc: 'Your full transaction history. Search, filter by type, and review every entry here.' },
        { id: 'btnIN',     title: '➕ Add Transaction',    desc: 'Click Money IN or Money OUT, fill in the amount, category, and hit Add. Simple!' },
        { id: 'partnerInputs', title: '🤝 Partner Split',  desc: 'Got business partners? Enter their names here to automatically split profits fairly.' },
      ],
      hi: [
        { id: 's-in',      title: '💚 कुल आमदनी',          desc: 'आपके व्यवसाय में आई कुल राशि — हर लेनदेन जो अंदर आया।' },
        { id: 's-out',     title: '🔴 कुल खर्च',            desc: 'बाहर गई सभी राशि। हर रुपये पर नज़र रखें।' },
        { id: 's-profit',  title: '✨ शुद्ध लाभ',            desc: 'आमदनी घटा खर्च = आपका असली मुनाफा। इसे हरा बनाए रखें!' },
        { id: 's-today',   title: '📅 आज की गतिविधि',       desc: 'आज जोड़ी गई राशि — रोज़ाना का त्वरित चेक।' },
        { id: 'inPieChart',title: '🥧 आमदनी विश्लेषण',      desc: 'कौन सी श्रेणी सबसे ज़्यादा कमाती है — बड़ा टुकड़ा = बड़ी कमाई!' },
        { id: 'barChart',  title: '📊 पिछले 7 दिन',          desc: 'हरे = आमदनी, लाल = खर्च। रुझान तुरंत देखें।' },
        { id: 'txnRows',   title: '📋 सभी लेनदेन',           desc: 'पूरा इतिहास यहाँ है। खोजें, फ़िल्टर करें।' },
        { id: 'btnIN',     title: '➕ लेनदेन जोड़ें',        desc: 'मनी IN या OUT चुनें, राशि भरें और जोड़ें।' },
        { id: 'partnerInputs', title: '🤝 साझेदार विभाजन', desc: 'साझेदारों के नाम डालें — लाभ अपने आप बंटेगा।' },
      ],
      zh: [
        { id: 's-in',      title: '💚 总收入',              desc: '您业务的全部收入金额 — 所有进账交易汇总。' },
        { id: 's-out',     title: '🔴 总支出',              desc: '所有出账金额。追踪每一分钱，不遗漏任何支出。' },
        { id: 's-profit',  title: '✨ 净利润',              desc: '收入减支出 = 真实利润。保持绿色增长！' },
        { id: 's-today',   title: '📅 今日动态',            desc: '今天新增的金额 — 快速了解今日业务状况。' },
        { id: 'inPieChart',title: '🥧 收入分析',            desc: '查看哪个收入类别贡献最大。扇形越大赚得越多！' },
        { id: 'barChart',  title: '📊 近7天',               desc: '绿柱=收入，红柱=支出。一眼看清本周趋势。' },
        { id: 'txnRows',   title: '📋 所有交易',            desc: '完整交易历史。搜索和筛选每一笔记录。' },
        { id: 'btnIN',     title: '➕ 添加交易',            desc: '选择收入或支出，填写金额和类别，点击添加。' },
        { id: 'partnerInputs', title: '🤝 合伙人分配',     desc: '输入合伙人姓名，利润将自动按比例分配。' },
      ],
      ja: [
        { id: 's-in',      title: '💚 総収入',              desc: 'ビジネスの全収入 — すべての入金取引の合計です。' },
        { id: 's-out',     title: '🔴 総支出',              desc: '出ていったすべての金額。一円も見逃さずに。' },
        { id: 's-profit',  title: '✨ 純利益',              desc: '収入 − 支出 = 本当の利益。緑を保ちましょう！' },
        { id: 's-today',   title: '📅 今日の活動',          desc: '今日追加された金額 — 毎日のビジネス状況確認に。' },
        { id: 'inPieChart',title: '🥧 収入内訳',            desc: 'どのカテゴリが最も稼ぐか一目でわかります！' },
        { id: 'barChart',  title: '📊 過去7日間',           desc: '緑=収入、赤=支出。週のトレンドをすぐ把握。' },
        { id: 'txnRows',   title: '📋 全取引',              desc: '完全な履歴。検索・フィルターで確認できます。' },
        { id: 'btnIN',     title: '➕ 取引追加',            desc: '収入か支出を選び、金額とカテゴリを入力して追加！' },
        { id: 'partnerInputs', title: '🤝 パートナー分配', desc: 'パートナー名を入力すると利益が自動分配されます。' },
      ],
      ar: [
        { id: 's-in',      title: '💚 إجمالي الدخل',       desc: 'إجمالي المبالغ المستلمة — كل ما دخل إلى عملك.' },
        { id: 's-out',     title: '🔴 إجمالي المصروفات',   desc: 'كل الأموال التي خرجت. تتبع كل روبية.' },
        { id: 's-profit',  title: '✨ صافي الربح',          desc: 'الدخل ناقص المصروفات = ربحك الحقيقي. حافظ عليه أخضر!' },
        { id: 's-today',   title: '📅 نشاط اليوم',         desc: 'المبالغ المضافة اليوم — فحص يومي سريع.' },
        { id: 'inPieChart',title: '🥧 تحليل الدخل',        desc: 'اعرف أي فئة تدر أكثر دخل — القطعة الأكبر = أكبر دخل!' },
        { id: 'barChart',  title: '📊 آخر 7 أيام',         desc: 'أخضر = دخل، أحمر = مصروفات. اكتشف الاتجاهات.' },
        { id: 'txnRows',   title: '📋 كل المعاملات',       desc: 'السجل الكامل. ابحث وصفِّ كل قيد.' },
        { id: 'btnIN',     title: '➕ إضافة معاملة',       desc: 'اختر داخل أو خارج، أدخل المبلغ والفئة واضغط إضافة.' },
        { id: 'partnerInputs', title: '🤝 توزيع الشركاء', desc: 'أدخل أسماء الشركاء لتوزيع الأرباح تلقائياً.' },
      ],
      fr: [
        { id: 's-in',      title: '💚 Revenus Totaux',     desc: 'Le total de l\'argent reçu — toutes les entrées de votre entreprise.' },
        { id: 's-out',     title: '🔴 Dépenses Totales',   desc: 'Tout l\'argent sorti. Suivez chaque roupie dépensée.' },
        { id: 's-profit',  title: '✨ Bénéfice Net',        desc: 'Revenus − Dépenses = votre vrai bénéfice. Gardez-le vert !' },
        { id: 's-today',   title: '📅 Activité du Jour',   desc: 'Argent ajouté aujourd\'hui — vérification quotidienne rapide.' },
        { id: 'inPieChart',title: '🥧 Répartition Revenus',desc: 'Quelle catégorie rapporte le plus ? Plus grand = plus rentable !' },
        { id: 'barChart',  title: '📊 7 Derniers Jours',   desc: 'Barres vertes = revenus, rouges = dépenses de la semaine.' },
        { id: 'txnRows',   title: '📋 Toutes Transactions',desc: 'Historique complet. Recherchez et filtrez chaque entrée.' },
        { id: 'btnIN',     title: '➕ Ajouter Transaction', desc: 'Choisissez Entrée ou Sortie, remplissez le montant et ajoutez !' },
        { id: 'partnerInputs', title: '🤝 Partage Associés',desc: 'Entrez les noms des associés pour partager les bénéfices auto.' },
      ],
      de: [
        { id: 's-in',      title: '💚 Gesamteinnahmen',    desc: 'Das gesamte eingehende Geld — alle Einnahmen Ihres Unternehmens.' },
        { id: 's-out',     title: '🔴 Gesamtausgaben',     desc: 'Alles ausgegebene Geld. Verfolgen Sie jede Rupie.' },
        { id: 's-profit',  title: '✨ Nettogewinn',         desc: 'Einnahmen − Ausgaben = Ihr echter Gewinn. Grün halten!' },
        { id: 's-today',   title: '📅 Heutige Aktivität',  desc: 'Heute hinzugefügte Beträge — tägliche Schnellüberprüfung.' },
        { id: 'inPieChart',title: '🥧 Einnahmen-Analyse',  desc: 'Welche Kategorie verdient am meisten? Größeres Stück = mehr!' },
        { id: 'barChart',  title: '📊 Letzte 7 Tage',      desc: 'Grüne Balken = Einnahmen, Rote = Ausgaben der Woche.' },
        { id: 'txnRows',   title: '📋 Alle Transaktionen', desc: 'Vollständiger Verlauf. Suchen und filtern Sie jeden Eintrag.' },
        { id: 'btnIN',     title: '➕ Transaktion Hinzufügen', desc: 'Einnahme oder Ausgabe wählen, Betrag eingeben, hinzufügen!' },
        { id: 'partnerInputs', title: '🤝 Partner-Aufteilung', desc: 'Partnernamen eingeben — Gewinn wird automatisch aufgeteilt.' },
      ],
      es: [
        { id: 's-in',      title: '💚 Ingresos Totales',   desc: 'El total de dinero recibido — todo lo que entró a tu negocio.' },
        { id: 's-out',     title: '🔴 Gastos Totales',     desc: 'Todo el dinero salido. Rastrea cada rupia gastada.' },
        { id: 's-profit',  title: '✨ Beneficio Neto',      desc: 'Ingresos − Gastos = tu ganancia real. ¡Mantenla verde!' },
        { id: 's-today',   title: '📅 Actividad de Hoy',   desc: 'Dinero añadido hoy — revisión rápida del negocio.' },
        { id: 'inPieChart',title: '🥧 Desglose de Ingresos',desc: '¿Qué categoría gana más? ¡Porción mayor = más ganancias!' },
        { id: 'barChart',  title: '📊 Últimos 7 Días',     desc: 'Verde = ingresos, Rojo = gastos. Ve tendencias de un vistazo.' },
        { id: 'txnRows',   title: '📋 Todas las Transacciones', desc: 'Historial completo. Busca y filtra cada entrada.' },
        { id: 'btnIN',     title: '➕ Agregar Transacción', desc: 'Elige Entrada o Salida, llena el monto y categoría, ¡agrega!' },
        { id: 'partnerInputs', title: '🤝 División de Socios', desc: 'Ingresa nombres de socios para dividir ganancias automáticamente.' },
      ],
      pt: [
        { id: 's-in',      title: '💚 Receita Total',      desc: 'Todo o dinheiro recebido — todas as entradas do seu negócio.' },
        { id: 's-out',     title: '🔴 Despesas Totais',    desc: 'Todo dinheiro gasto. Rastreie cada rúpia.' },
        { id: 's-profit',  title: '✨ Lucro Líquido',       desc: 'Receita − Despesas = seu lucro real. Mantenha no verde!' },
        { id: 's-today',   title: '📅 Atividade de Hoje',  desc: 'Dinheiro adicionado hoje — verificação diária rápida.' },
        { id: 'inPieChart',title: '🥧 Análise de Receita', desc: 'Qual categoria rende mais? Fatia maior = mais lucrativo!' },
        { id: 'barChart',  title: '📊 Últimos 7 Dias',     desc: 'Verde = receita, Vermelho = despesas da semana.' },
        { id: 'txnRows',   title: '📋 Todas as Transações',desc: 'Histórico completo. Pesquise e filtre cada entrada.' },
        { id: 'btnIN',     title: '➕ Adicionar Transação', desc: 'Escolha Entrada ou Saída, preencha o valor e adicione!' },
        { id: 'partnerInputs', title: '🤝 Divisão de Sócios', desc: 'Insira nomes dos sócios para dividir lucros automaticamente.' },
      ],
      ko: [
        { id: 's-in',      title: '💚 총 수입',             desc: '비즈니스에 들어온 모든 금액 — 전체 수입 거래 합계입니다.' },
        { id: 's-out',     title: '🔴 총 지출',             desc: '나간 모든 금액. 모든 루피를 추적하세요.' },
        { id: 's-profit',  title: '✨ 순이익',               desc: '수입 − 지출 = 실제 이익. 항상 녹색을 유지하세요!' },
        { id: 's-today',   title: '📅 오늘 활동',            desc: '오늘 추가된 금액 — 매일 빠른 사업 현황 확인.' },
        { id: 'inPieChart',title: '🥧 수입 분석',            desc: '어느 카테고리가 가장 많이 버나요? 큰 조각 = 더 많은 수익!' },
        { id: 'barChart',  title: '📊 최근 7일',             desc: '초록 = 수입, 빨강 = 지출. 한눈에 트렌드 확인.' },
        { id: 'txnRows',   title: '📋 모든 거래',            desc: '전체 거래 내역. 검색하고 필터링하세요.' },
        { id: 'btnIN',     title: '➕ 거래 추가',            desc: '입금 또는 출금 선택, 금액과 카테고리 입력 후 추가!' },
        { id: 'partnerInputs', title: '🤝 파트너 분배',     desc: '파트너 이름을 입력하면 수익이 자동으로 분배됩니다.' },
      ],
      ru: [
        { id: 's-in',      title: '💚 Общий Доход',        desc: 'Все полученные деньги — каждая входящая транзакция бизнеса.' },
        { id: 's-out',     title: '🔴 Общие Расходы',      desc: 'Все потраченные деньги. Отслеживайте каждую рупию.' },
        { id: 's-profit',  title: '✨ Чистая Прибыль',     desc: 'Доход − Расходы = настоящая прибыль. Держите её в зелёном!' },
        { id: 's-today',   title: '📅 Активность Сегодня', desc: 'Деньги добавленные сегодня — быстрая ежедневная сводка.' },
        { id: 'inPieChart',title: '🥧 Анализ Дохода',      desc: 'Какая категория приносит больше всего? Больший сектор = больше дохода!' },
        { id: 'barChart',  title: '📊 Последние 7 Дней',   desc: 'Зелёные = доход, Красные = расходы. Тренды за неделю.' },
        { id: 'txnRows',   title: '📋 Все Транзакции',     desc: 'Полная история. Поиск и фильтрация каждой записи.' },
        { id: 'btnIN',     title: '➕ Добавить Транзакцию',desc: 'Выберите Доход или Расход, заполните сумму и нажмите Добавить!' },
        { id: 'partnerInputs', title: '🤝 Раздел Партнёров', desc: 'Введите имена партнёров — прибыль разделится автоматически.' },
      ],
    },

    /* ══════════════════════════════════════════════════════════════
       CHARTS  (business-chart.html)
    ══════════════════════════════════════════════════════════════ */
    chart: {
      en: [
        { id: 'ms-in',         title: '💚 All-Time Income',   desc: 'Your cumulative income since you started — the grand total of everything earned.' },
        { id: 'ms-out',        title: '🔴 All-Time Expenses',  desc: 'Total amount spent across all time. Compare this with income to see the big picture.' },
        { id: 'ms-profit',     title: '✨ All-Time Profit',    desc: 'Your net profit across the entire business lifetime. This is the score that matters!' },
        { id: 'weekBar',       title: '📊 Last 7 Days Bar',   desc: 'Daily income vs expenses for the past week as grouped bars. Quick weekly overview.' },
        { id: 'monthLine',     title: '📈 Monthly Trend',     desc: 'A line chart showing income and expense trends month by month. Spot your growth!' },
        { id: 'inPie',         title: '🥧 Income Categories', desc: 'Pie chart of all income sources — see what brings in the most revenue for your business.' },
        { id: 'outPie',        title: '🔴 Expense Categories',desc: 'Pie chart of where money goes out — find your biggest cost centres.' },
        { id: 'inCatBars',     title: '📊 Income Breakdown',  desc: 'Bar breakdown of each income category with amounts. Easy to compare at a glance.' },
        { id: 'outCatBars',    title: '📊 Expense Breakdown', desc: 'Same for expenses — see which categories drain your budget the most.' },
        { id: 'overallDoughnut',title: '🍩 Overall Split',    desc: 'A donut chart showing the overall income vs expense ratio. Green means you\'re winning!' },
      ],
      hi: [
        { id: 'ms-in',         title: '💚 कुल समय आमदनी',    desc: 'शुरुआत से अब तक की कुल आमदनी।' },
        { id: 'ms-out',        title: '🔴 कुल समय खर्च',     desc: 'सभी समय का कुल खर्च। बड़ी तस्वीर देखें।' },
        { id: 'ms-profit',     title: '✨ कुल समय लाभ',      desc: 'पूरे व्यवसाय का शुद्ध लाभ — यही असली स्कोर है!' },
        { id: 'weekBar',       title: '📊 पिछले 7 दिन बार',  desc: 'दैनिक आमदनी बनाम खर्च बार चार्ट।' },
        { id: 'monthLine',     title: '📈 मासिक रुझान',      desc: 'माह दर माह रेखा चार्ट। विकास देखें!' },
        { id: 'inPie',         title: '🥧 आमदनी श्रेणियाँ', desc: 'कौन सा स्रोत सबसे ज़्यादा कमाता है।' },
        { id: 'outPie',        title: '🔴 खर्च श्रेणियाँ',  desc: 'पैसा कहाँ जाता है — सबसे बड़े खर्च केंद्र।' },
        { id: 'inCatBars',     title: '📊 आमदनी विवरण',     desc: 'हर श्रेणी की राशि के साथ बार।' },
        { id: 'outCatBars',    title: '📊 खर्च विवरण',      desc: 'कौन सी श्रेणी सबसे ज़्यादा बजट खाती है।' },
        { id: 'overallDoughnut',title: '🍩 समग्र अनुपात',   desc: 'आमदनी बनाम खर्च का समग्र डोनट चार्ट।' },
      ],
      zh: [
        { id: 'ms-in',         title: '💚 历史总收入',       desc: '自开始以来的累计收入 — 总收益汇总。' },
        { id: 'ms-out',        title: '🔴 历史总支出',       desc: '所有时间的总支出。与收入对比看全局。' },
        { id: 'ms-profit',     title: '✨ 历史总利润',       desc: '整个业务周期的净利润 — 这才是关键数字！' },
        { id: 'weekBar',       title: '📊 近7天柱状图',     desc: '近一周每日收支对比柱状图。' },
        { id: 'monthLine',     title: '📈 月度趋势',        desc: '逐月收支趋势折线图。发现增长！' },
        { id: 'inPie',         title: '🥧 收入类别',        desc: '各收入来源占比饼图 — 看清主要收入来源。' },
        { id: 'outPie',        title: '🔴 支出类别',        desc: '资金去向饼图 — 找出最大成本中心。' },
        { id: 'inCatBars',     title: '📊 收入明细',        desc: '各收入类别金额柱状对比，一目了然。' },
        { id: 'outCatBars',    title: '📊 支出明细',        desc: '哪些类别消耗预算最多 — 柱状对比。' },
        { id: 'overallDoughnut',title: '🍩 整体比例',       desc: '收支比例甜甜圈图。绿色说明你在赢！' },
      ],
      ja: [
        { id: 'ms-in',         title: '💚 累計収入',        desc: '開始以来の累計収入 — 総収益の合計です。' },
        { id: 'ms-out',        title: '🔴 累計支出',        desc: '全期間の総支出。収入と比較して全体像を。' },
        { id: 'ms-profit',     title: '✨ 累計純利益',       desc: 'ビジネス全期間の純利益 — 本当に大切な数字！' },
        { id: 'weekBar',       title: '📊 過去7日間棒グラフ',desc: '1週間の日別収支比較棒グラフ。' },
        { id: 'monthLine',     title: '📈 月別トレンド',    desc: '月ごとの収支推移折れ線グラフ。成長を確認！' },
        { id: 'inPie',         title: '🥧 収入カテゴリー',  desc: '収入源の円グラフ — 何が最も稼いでいるか。' },
        { id: 'outPie',        title: '🔴 支出カテゴリー',  desc: 'お金の流出先 — 最大のコストセンターを特定。' },
        { id: 'inCatBars',     title: '📊 収入内訳',        desc: '各収入カテゴリーの金額棒グラフ。' },
        { id: 'outCatBars',    title: '📊 支出内訳',        desc: '予算を最も消費するカテゴリーを確認。' },
        { id: 'overallDoughnut',title: '🍩 全体比率',       desc: '収支比率のドーナツグラフ。緑なら好調！' },
      ],
      ar: [
        { id: 'ms-in',         title: '💚 إجمالي الدخل',    desc: 'الدخل التراكمي منذ البداية — إجمالي كل الأرباح.' },
        { id: 'ms-out',        title: '🔴 إجمالي المصروفات',desc: 'إجمالي الإنفاق عبر الزمن. قارنه بالدخل.' },
        { id: 'ms-profit',     title: '✨ إجمالي الربح',    desc: 'صافي الربح عبر حياة العمل كاملاً!' },
        { id: 'weekBar',       title: '📊 آخر 7 أيام',     desc: 'مخطط شريطي للدخل والمصروفات اليومية.' },
        { id: 'monthLine',     title: '📈 الاتجاه الشهري', desc: 'مخطط خطي للاتجاهات الشهرية. اكتشف نموك!' },
        { id: 'inPie',         title: '🥧 فئات الدخل',     desc: 'مخطط دائري لمصادر الدخل.' },
        { id: 'outPie',        title: '🔴 فئات المصروفات', desc: 'أين يذهب المال — أكبر مراكز التكلفة.' },
        { id: 'inCatBars',     title: '📊 تفاصيل الدخل',   desc: 'أشرطة لكل فئة دخل بمبالغها.' },
        { id: 'outCatBars',    title: '📊 تفاصيل المصروفات',desc: 'أي الفئات تستنزف ميزانيتك أكثر.' },
        { id: 'overallDoughnut',title: '🍩 النسبة الإجمالية',desc: 'مخطط دونات لنسبة الدخل إلى المصروفات.' },
      ],
      fr: [
        { id: 'ms-in',         title: '💚 Revenus Totaux',  desc: 'Vos revenus cumulés depuis le début — le grand total gagné.' },
        { id: 'ms-out',        title: '🔴 Dépenses Totales',desc: 'Total des dépenses sur toute la période.' },
        { id: 'ms-profit',     title: '✨ Bénéfice Total',  desc: 'Bénéfice net sur toute la vie du business !' },
        { id: 'weekBar',       title: '📊 7 Derniers Jours',desc: 'Barres journalières revenus vs dépenses de la semaine.' },
        { id: 'monthLine',     title: '📈 Tendance Mensuelle',desc: 'Graphique linéaire mois par mois. Repérez la croissance !' },
        { id: 'inPie',         title: '🥧 Catégories Revenus',desc: 'Camembert des sources de revenus.' },
        { id: 'outPie',        title: '🔴 Catégories Dépenses',desc: 'Où va l\'argent — vos plus gros postes de coût.' },
        { id: 'inCatBars',     title: '📊 Détail Revenus',  desc: 'Barres par catégorie de revenus avec montants.' },
        { id: 'outCatBars',    title: '📊 Détail Dépenses', desc: 'Quelles catégories consomment le plus de budget.' },
        { id: 'overallDoughnut',title: '🍩 Ratio Global',   desc: 'Donut revenus vs dépenses. Vert = vous gagnez !' },
      ],
      de: [
        { id: 'ms-in',         title: '💚 Gesamteinnahmen', desc: 'Ihre kumulierten Einnahmen seit Beginn — alles Verdiente.' },
        { id: 'ms-out',        title: '🔴 Gesamtausgaben',  desc: 'Gesamtausgaben über alle Zeit. Mit Einnahmen vergleichen.' },
        { id: 'ms-profit',     title: '✨ Gesamtgewinn',    desc: 'Nettogewinn über die gesamte Geschäftslaufzeit!' },
        { id: 'weekBar',       title: '📊 Letzte 7 Tage',  desc: 'Tägliche Einnahmen vs Ausgaben als Balkendiagramm.' },
        { id: 'monthLine',     title: '📈 Monatstrend',     desc: 'Liniendiagramm Monat für Monat. Wachstum erkennen!' },
        { id: 'inPie',         title: '🥧 Einnahmekategorien',desc: 'Tortendiagramm der Einnahmequellen.' },
        { id: 'outPie',        title: '🔴 Ausgabekategorien',desc: 'Wohin das Geld geht — größte Kostenstellen.' },
        { id: 'inCatBars',     title: '📊 Einnahmen-Detail',desc: 'Balken pro Einnahmekategorie mit Beträgen.' },
        { id: 'outCatBars',    title: '📊 Ausgaben-Detail', desc: 'Welche Kategorien das Budget am meisten belasten.' },
        { id: 'overallDoughnut',title: '🍩 Gesamtverhältnis',desc: 'Donut: Einnahmen vs Ausgaben. Grün heißt Sie gewinnen!' },
      ],
      es: [
        { id: 'ms-in',         title: '💚 Ingresos Totales',desc: 'Tus ingresos acumulados desde el inicio — el total ganado.' },
        { id: 'ms-out',        title: '🔴 Gastos Totales',  desc: 'Total de gastos en todo el tiempo. Compara con ingresos.' },
        { id: 'ms-profit',     title: '✨ Beneficio Total', desc: '¡Beneficio neto a lo largo de toda la vida del negocio!' },
        { id: 'weekBar',       title: '📊 Últimos 7 Días', desc: 'Barras diarias ingresos vs gastos de la semana.' },
        { id: 'monthLine',     title: '📈 Tendencia Mensual',desc: 'Gráfico de líneas mes a mes. ¡Detecta tu crecimiento!' },
        { id: 'inPie',         title: '🥧 Categorías Ingresos',desc: 'Gráfico circular de fuentes de ingresos.' },
        { id: 'outPie',        title: '🔴 Categorías Gastos',desc: 'A dónde va el dinero — mayores centros de costo.' },
        { id: 'inCatBars',     title: '📊 Detalle Ingresos',desc: 'Barras por categoría de ingresos con montos.' },
        { id: 'outCatBars',    title: '📊 Detalle Gastos',  desc: 'Qué categorías consumen más presupuesto.' },
        { id: 'overallDoughnut',title: '🍩 Ratio Global',   desc: 'Donut de ingresos vs gastos. ¡Verde significa que estás ganando!' },
      ],
      pt: [
        { id: 'ms-in',         title: '💚 Receita Total',  desc: 'Sua receita acumulada desde o início — o total ganho.' },
        { id: 'ms-out',        title: '🔴 Despesas Totais',desc: 'Total de despesas em todo o tempo. Compare com a receita.' },
        { id: 'ms-profit',     title: '✨ Lucro Total',    desc: 'Lucro líquido ao longo de toda a vida do negócio!' },
        { id: 'weekBar',       title: '📊 Últimos 7 Dias',desc: 'Barras diárias de receita vs despesas da semana.' },
        { id: 'monthLine',     title: '📈 Tendência Mensal',desc: 'Gráfico de linhas mês a mês. Detecte seu crescimento!' },
        { id: 'inPie',         title: '🥧 Categorias de Receita',desc: 'Gráfico circular das fontes de receita.' },
        { id: 'outPie',        title: '🔴 Categorias de Despesas',desc: 'Para onde vai o dinheiro — maiores centros de custo.' },
        { id: 'inCatBars',     title: '📊 Detalhe de Receita',desc: 'Barras por categoria de receita com valores.' },
        { id: 'outCatBars',    title: '📊 Detalhe de Despesas',desc: 'Quais categorias consomem mais orçamento.' },
        { id: 'overallDoughnut',title: '🍩 Proporção Geral',desc: 'Rosca de receita vs despesas. Verde significa que você está ganhando!' },
      ],
      ko: [
        { id: 'ms-in',         title: '💚 누적 수입',       desc: '시작부터 현재까지의 누적 수입 — 총 수익 합계입니다.' },
        { id: 'ms-out',        title: '🔴 누적 지출',       desc: '전체 기간 총 지출. 수입과 비교해 전체 현황 파악.' },
        { id: 'ms-profit',     title: '✨ 누적 순이익',      desc: '전체 사업 기간의 순이익 — 가장 중요한 숫자!' },
        { id: 'weekBar',       title: '📊 최근 7일 막대',   desc: '지난 주 일별 수입 vs 지출 막대 차트.' },
        { id: 'monthLine',     title: '📈 월별 트렌드',     desc: '월별 수입/지출 추세 선 차트. 성장을 확인하세요!' },
        { id: 'inPie',         title: '🥧 수입 카테고리',   desc: '수입 원천 파이 차트 — 가장 많이 버는 항목 확인.' },
        { id: 'outPie',        title: '🔴 지출 카테고리',   desc: '돈이 어디로 나가는지 — 가장 큰 비용 센터.' },
        { id: 'inCatBars',     title: '📊 수입 상세',       desc: '수입 카테고리별 금액 막대 차트.' },
        { id: 'outCatBars',    title: '📊 지출 상세',       desc: '예산을 가장 많이 소비하는 카테고리 확인.' },
        { id: 'overallDoughnut',title: '🍩 전체 비율',      desc: '수입 vs 지출 도넛 차트. 초록이면 좋아요!' },
      ],
      ru: [
        { id: 'ms-in',         title: '💚 Суммарный Доход', desc: 'Накопленный доход с самого начала — итог всего заработанного.' },
        { id: 'ms-out',        title: '🔴 Суммарные Расходы',desc: 'Общие расходы за всё время. Сравните с доходом.' },
        { id: 'ms-profit',     title: '✨ Суммарная Прибыль',desc: 'Чистая прибыль за всё время бизнеса — главная цифра!' },
        { id: 'weekBar',       title: '📊 Последние 7 Дней',desc: 'Ежедневные доходы vs расходы за неделю.' },
        { id: 'monthLine',     title: '📈 Месячный Тренд',  desc: 'Линейный график помесячно. Следите за ростом!' },
        { id: 'inPie',         title: '🥧 Категории Дохода',desc: 'Круговой график источников дохода.' },
        { id: 'outPie',        title: '🔴 Категории Расходов',desc: 'Куда уходят деньги — крупнейшие центры затрат.' },
        { id: 'inCatBars',     title: '📊 Детализация Дохода',desc: 'Столбцы по категориям дохода с суммами.' },
        { id: 'outCatBars',    title: '📊 Детализация Расходов',desc: 'Какие категории потребляют бюджет больше всего.' },
        { id: 'overallDoughnut',title: '🍩 Общее Соотношение',desc: 'Пончик доходов и расходов. Зелёный — вы в плюсе!' },
      ],
    },

    /* ══════════════════════════════════════════════════════════════
       PARTNERS  (business-partners.html)
    ══════════════════════════════════════════════════════════════ */
    partners: {
      en: [
        { id: 'ps-in',       title: '💚 Total Income',        desc: 'All-time total business income — the pool from which profit is calculated and split.' },
        { id: 'ps-out',      title: '🔴 Total Expenses',      desc: 'All-time expenses deducted before splitting — shared costs come out first.' },
        { id: 'ps-profit',   title: '✨ Available to Split',  desc: 'Net profit available for distribution to all partners. This is the pot!' },
        { id: 'pc1',         title: '👥 Partner Count',       desc: 'Choose how many partners are in the business — 1 (solo), 2, or 3 partners.' },
        { id: 'splitEqual',  title: '⚖️ Split Type',          desc: 'Equal split divides profit evenly. Custom % lets each partner set their own share.' },
        { id: 'partnerInputs',title: '✏️ Partner Details',    desc: 'Enter each partner\'s name and percentage. Total must add up to 100%.' },
        { id: 'resultsBody', title: '💰 Split Results',       desc: 'See exactly how much each partner takes home based on their share percentage.' },
      ],
      hi: [
        { id: 'ps-in',       title: '💚 कुल आमदनी',          desc: 'पूरे समय की कुल व्यावसायिक आमदनी।' },
        { id: 'ps-out',      title: '🔴 कुल खर्च',           desc: 'बँटवारे से पहले कटे खर्च।' },
        { id: 'ps-profit',   title: '✨ बाँटने योग्य राशि',  desc: 'सभी साझेदारों के लिए उपलब्ध शुद्ध लाभ।' },
        { id: 'pc1',         title: '👥 साझेदारों की संख्या',desc: 'व्यवसाय में कितने साझेदार हैं — 1, 2 या 3।' },
        { id: 'splitEqual',  title: '⚖️ विभाजन प्रकार',     desc: 'समान = बराबर बँटवारा। कस्टम % = अपना हिस्सा तय करें।' },
        { id: 'partnerInputs',title: '✏️ साझेदार विवरण',    desc: 'हर साझेदार का नाम और % डालें। कुल 100% होना चाहिए।' },
        { id: 'resultsBody', title: '💰 विभाजन परिणाम',     desc: 'देखें हर साझेदार को कितना मिलता है।' },
      ],
      zh: [
        { id: 'ps-in',       title: '💚 总收入',             desc: '历史总业务收入 — 计算和分配利润的基础。' },
        { id: 'ps-out',      title: '🔴 总支出',             desc: '分配前扣除的历史总支出。' },
        { id: 'ps-profit',   title: '✨ 可分配金额',         desc: '所有合伙人可分配的净利润 — 这是分配池！' },
        { id: 'pc1',         title: '👥 合伙人数量',         desc: '选择合伙人数量 — 1人、2人或3人。' },
        { id: 'splitEqual',  title: '⚖️ 分配方式',          desc: '平均分配 = 均等分配。自定义% = 各自设定份额。' },
        { id: 'partnerInputs',title: '✏️ 合伙人信息',        desc: '输入每位合伙人姓名和百分比。总和必须为100%。' },
        { id: 'resultsBody', title: '💰 分配结果',           desc: '查看每位合伙人根据份额获得的具体金额。' },
      ],
      ja: [
        { id: 'ps-in',       title: '💚 総収入',             desc: '全期間のビジネス総収入 — 利益計算の基礎。' },
        { id: 'ps-out',      title: '🔴 総支出',             desc: '分配前に差し引かれる費用。' },
        { id: 'ps-profit',   title: '✨ 分配可能額',         desc: '全パートナーへの分配可能な純利益！' },
        { id: 'pc1',         title: '👥 パートナー数',       desc: '何人でビジネスを行うか — 1人、2人、3人。' },
        { id: 'splitEqual',  title: '⚖️ 分配タイプ',        desc: '均等分配 = 平等に。カスタム% = 各自で設定。' },
        { id: 'partnerInputs',title: '✏️ パートナー詳細',    desc: '各パートナーの名前と%を入力。合計100%必須。' },
        { id: 'resultsBody', title: '💰 分配結果',           desc: '各パートナーが受け取る金額を確認。' },
      ],
      ar: [
        { id: 'ps-in',       title: '💚 إجمالي الدخل',      desc: 'إجمالي دخل العمل عبر الزمن — أساس حساب الأرباح.' },
        { id: 'ps-out',      title: '🔴 إجمالي المصروفات',  desc: 'المصروفات المخصومة قبل التوزيع.' },
        { id: 'ps-profit',   title: '✨ المتاح للتوزيع',    desc: 'صافي الربح المتاح لجميع الشركاء.' },
        { id: 'pc1',         title: '👥 عدد الشركاء',       desc: 'اختر عدد الشركاء — 1 أو 2 أو 3.' },
        { id: 'splitEqual',  title: '⚖️ نوع التقسيم',      desc: 'متساوي = بالتساوي. مخصص% = كل شريك يحدد نسبته.' },
        { id: 'partnerInputs',title: '✏️ تفاصيل الشركاء',  desc: 'أدخل اسم ونسبة كل شريك. المجموع = 100%.' },
        { id: 'resultsBody', title: '💰 نتائج التقسيم',     desc: 'شاهد كم يأخذ كل شريك بناءً على نسبته.' },
      ],
      fr: [
        { id: 'ps-in',       title: '💚 Revenus Totaux',    desc: 'Revenus totaux du business — base de calcul des bénéfices.' },
        { id: 'ps-out',      title: '🔴 Dépenses Totales',  desc: 'Dépenses déduites avant partage.' },
        { id: 'ps-profit',   title: '✨ Disponible à Partager',desc: 'Bénéfice net disponible pour tous les associés.' },
        { id: 'pc1',         title: '👥 Nombre d\'Associés', desc: 'Combien d\'associés — 1, 2 ou 3.' },
        { id: 'splitEqual',  title: '⚖️ Type de Partage',   desc: 'Égal = parts égales. Personnalisé% = chacun fixe sa part.' },
        { id: 'partnerInputs',title: '✏️ Détails Associés', desc: 'Entrez nom et pourcentage de chaque associé. Total = 100%.' },
        { id: 'resultsBody', title: '💰 Résultats du Partage',desc: 'Voyez exactement ce que chaque associé reçoit.' },
      ],
      de: [
        { id: 'ps-in',       title: '💚 Gesamteinnahmen',   desc: 'Gesamte Unternehmenseinnahmen — Grundlage der Gewinnberechnung.' },
        { id: 'ps-out',      title: '🔴 Gesamtausgaben',    desc: 'Vor der Aufteilung abgezogene Ausgaben.' },
        { id: 'ps-profit',   title: '✨ Verteilbar',         desc: 'Nettopgewinn für alle Partner verfügbar.' },
        { id: 'pc1',         title: '👥 Partneranzahl',     desc: 'Wie viele Partner — 1, 2 oder 3.' },
        { id: 'splitEqual',  title: '⚖️ Aufteilungstyp',   desc: 'Gleich = gleiche Teile. Benutzerdefiniert% = individuell festlegen.' },
        { id: 'partnerInputs',title: '✏️ Partnerdetails',   desc: 'Name und Prozentsatz je Partner eingeben. Summe = 100%.' },
        { id: 'resultsBody', title: '💰 Aufteilungsergebnis',desc: 'Sehen Sie genau, was jeder Partner erhält.' },
      ],
      es: [
        { id: 'ps-in',       title: '💚 Ingresos Totales',  desc: 'Ingresos totales del negocio — base del cálculo de ganancias.' },
        { id: 'ps-out',      title: '🔴 Gastos Totales',    desc: 'Gastos deducidos antes del reparto.' },
        { id: 'ps-profit',   title: '✨ Disponible a Repartir',desc: 'Beneficio neto disponible para todos los socios.' },
        { id: 'pc1',         title: '👥 Número de Socios',  desc: 'Cuántos socios — 1, 2 o 3.' },
        { id: 'splitEqual',  title: '⚖️ Tipo de División',  desc: 'Igual = partes iguales. Personalizado% = cada uno fija su parte.' },
        { id: 'partnerInputs',title: '✏️ Detalles de Socios',desc: 'Ingresa nombre y porcentaje de cada socio. Total = 100%.' },
        { id: 'resultsBody', title: '💰 Resultados del Reparto',desc: 'Ve exactamente cuánto recibe cada socio.' },
      ],
      pt: [
        { id: 'ps-in',       title: '💚 Receita Total',     desc: 'Receita total do negócio — base do cálculo de lucros.' },
        { id: 'ps-out',      title: '🔴 Despesas Totais',   desc: 'Despesas deduzidas antes da divisão.' },
        { id: 'ps-profit',   title: '✨ Disponível para Dividir',desc: 'Lucro líquido disponível para todos os sócios.' },
        { id: 'pc1',         title: '👥 Número de Sócios',  desc: 'Quantos sócios — 1, 2 ou 3.' },
        { id: 'splitEqual',  title: '⚖️ Tipo de Divisão',   desc: 'Igual = partes iguais. Personalizado% = cada um define sua parte.' },
        { id: 'partnerInputs',title: '✏️ Detalhes dos Sócios',desc: 'Insira nome e porcentagem de cada sócio. Total = 100%.' },
        { id: 'resultsBody', title: '💰 Resultados da Divisão',desc: 'Veja exatamente quanto cada sócio recebe.' },
      ],
      ko: [
        { id: 'ps-in',       title: '💚 총 수입',            desc: '전체 사업 수입 — 수익 계산 및 분배의 기준.' },
        { id: 'ps-out',      title: '🔴 총 지출',            desc: '분배 전 차감되는 총 지출.' },
        { id: 'ps-profit',   title: '✨ 분배 가능 금액',      desc: '모든 파트너에게 분배 가능한 순이익입니다!' },
        { id: 'pc1',         title: '👥 파트너 수',           desc: '사업 파트너 수 선택 — 1인, 2인, 3인.' },
        { id: 'splitEqual',  title: '⚖️ 분배 유형',          desc: '균등 = 동일 분배. 맞춤% = 각자 지분 설정.' },
        { id: 'partnerInputs',title: '✏️ 파트너 정보',        desc: '각 파트너 이름과 %를 입력하세요. 합계 = 100%.' },
        { id: 'resultsBody', title: '💰 분배 결과',           desc: '각 파트너가 지분에 따라 받는 금액을 확인하세요.' },
      ],
      ru: [
        { id: 'ps-in',       title: '💚 Общий Доход',       desc: 'Общий доход бизнеса — основа расчёта и распределения прибыли.' },
        { id: 'ps-out',      title: '🔴 Общие Расходы',     desc: 'Расходы, вычтенные перед распределением.' },
        { id: 'ps-profit',   title: '✨ Доступно к Разделу',desc: 'Чистая прибыль для распределения между партнёрами.' },
        { id: 'pc1',         title: '👥 Количество Партнёров',desc: 'Сколько партнёров — 1, 2 или 3.' },
        { id: 'splitEqual',  title: '⚖️ Тип Раздела',       desc: 'Равный = поровну. Пользовательский% = каждый задаёт свою долю.' },
        { id: 'partnerInputs',title: '✏️ Данные Партнёров', desc: 'Введите имя и процент каждого партнёра. Сумма = 100%.' },
        { id: 'resultsBody', title: '💰 Результаты Раздела',desc: 'Посмотрите, сколько получает каждый партнёр.' },
      ],
    },

    /* ══════════════════════════════════════════════════════════════
       PROFILE  (business-profile.html)
    ══════════════════════════════════════════════════════════════ */
    profile: {
      en: [
        { id: 'bigAvatar',   title: '🐾 Your Profile',       desc: 'This is you! Your avatar initial, name, and email at a glance.' },
        { id: 'sm-in',       title: '💚 Business Income',    desc: 'Your total business income — pulling directly from all your transactions.' },
        { id: 'sm-out',      title: '🔴 Business Expenses',  desc: 'Total money spent. These stats update automatically as you add transactions.' },
        { id: 'sm-profit',   title: '✨ Net Profit',          desc: 'Your business profit — the number that shows how well you\'re doing overall.' },
        { id: 'sm-count',    title: '🔢 Total Transactions', desc: 'How many transactions you\'ve recorded in total. Every entry counts!' },
        { id: 'inp-name',    title: '✏️ Update Name',        desc: 'Change your display name here — it\'ll update everywhere in the app.' },
        { id: 'cur-pw',      title: '🔑 Change Password',    desc: 'Enter your current password, set a new one, confirm and save. Stay secure!' },
        { id: 'activityList',title: '📜 Recent Activity',    desc: 'A log of your recent logins and changes — great for spotting anything unusual.' },
      ],
      hi: [
        { id: 'bigAvatar',   title: '🐾 आपकी प्रोफ़ाइल',    desc: 'यह आप हैं! आपका अवतार, नाम और ईमेल।' },
        { id: 'sm-in',       title: '💚 व्यावसायिक आमदनी',  desc: 'आपके सभी लेनदेन से कुल व्यावसायिक आमदनी।' },
        { id: 'sm-out',      title: '🔴 व्यावसायिक खर्च',   desc: 'कुल खर्च — लेनदेन जोड़ने पर अपने आप अपडेट।' },
        { id: 'sm-profit',   title: '✨ शुद्ध लाभ',          desc: 'आपका व्यावसायिक लाभ — आपकी कुल सफलता।' },
        { id: 'sm-count',    title: '🔢 कुल लेनदेन',         desc: 'अब तक दर्ज किए गए लेनदेन की संख्या।' },
        { id: 'inp-name',    title: '✏️ नाम अपडेट करें',    desc: 'अपना प्रदर्शन नाम बदलें — सभी जगह अपडेट होगा।' },
        { id: 'cur-pw',      title: '🔑 पासवर्ड बदलें',     desc: 'वर्तमान पासवर्ड डालें, नया सेट करें और सुरक्षित रहें!' },
        { id: 'activityList',title: '📜 हाल की गतिविधि',   desc: 'हाल के लॉगिन और बदलावों का लॉग।' },
      ],
      zh: [
        { id: 'bigAvatar',   title: '🐾 您的个人资料',       desc: '这就是您！头像首字母、姓名和邮箱一览。' },
        { id: 'sm-in',       title: '💚 业务收入',           desc: '您所有交易的总业务收入。' },
        { id: 'sm-out',      title: '🔴 业务支出',           desc: '总支出 — 添加交易后自动更新。' },
        { id: 'sm-profit',   title: '✨ 净利润',             desc: '您的业务利润 — 展示整体表现的关键数字。' },
        { id: 'sm-count',    title: '🔢 总交易数',           desc: '您记录的交易总数。每笔都算！' },
        { id: 'inp-name',    title: '✏️ 更新姓名',           desc: '在此更改显示名称 — 全应用同步更新。' },
        { id: 'cur-pw',      title: '🔑 修改密码',           desc: '输入当前密码，设置新密码，确认并保存。保持安全！' },
        { id: 'activityList',title: '📜 最近活动',           desc: '最近登录和更改记录 — 方便发现异常。' },
      ],
      ja: [
        { id: 'bigAvatar',   title: '🐾 あなたのプロフィール',desc: 'これがあなたです！アバター、名前、メールを一目で。' },
        { id: 'sm-in',       title: '💚 ビジネス収入',       desc: 'すべての取引からの総ビジネス収入。' },
        { id: 'sm-out',      title: '🔴 ビジネス支出',       desc: '総支出 — 取引追加で自動更新。' },
        { id: 'sm-profit',   title: '✨ 純利益',             desc: 'ビジネスの利益 — 全体の成績を示す数字。' },
        { id: 'sm-count',    title: '🔢 総取引数',           desc: '記録した取引の総数。すべてがカウントされます！' },
        { id: 'inp-name',    title: '✏️ 名前を更新',         desc: '表示名をここで変更 — アプリ全体に反映されます。' },
        { id: 'cur-pw',      title: '🔑 パスワード変更',     desc: '現在のパスワード入力、新しいもの設定、安全に！' },
        { id: 'activityList',title: '📜 最近の活動',         desc: '最近のログインと変更ログ — 異常確認に便利。' },
      ],
      ar: [
        { id: 'bigAvatar',   title: '🐾 ملفك الشخصي',       desc: 'هذا أنت! صورتك الرمزية واسمك وبريدك الإلكتروني.' },
        { id: 'sm-in',       title: '💚 دخل العمل',          desc: 'إجمالي دخل عملك من جميع المعاملات.' },
        { id: 'sm-out',      title: '🔴 مصروفات العمل',     desc: 'إجمالي الإنفاق — يتحدث تلقائياً مع كل معاملة.' },
        { id: 'sm-profit',   title: '✨ صافي الربح',         desc: 'ربح عملك — الرقم الذي يُظهر أداءك العام.' },
        { id: 'sm-count',    title: '🔢 إجمالي المعاملات',  desc: 'عدد المعاملات المسجلة. كل قيد يُحسب!' },
        { id: 'inp-name',    title: '✏️ تحديث الاسم',       desc: 'غيّر اسمك هنا — يتحدث في كل مكان في التطبيق.' },
        { id: 'cur-pw',      title: '🔑 تغيير كلمة المرور', desc: 'أدخل كلمة المرور الحالية وعيّن الجديدة. ابقَ آمناً!' },
        { id: 'activityList',title: '📜 النشاط الأخير',     desc: 'سجل تسجيلات الدخول والتغييرات الأخيرة.' },
      ],
      fr: [
        { id: 'bigAvatar',   title: '🐾 Votre Profil',       desc: 'C\'est vous ! Avatar, nom et email en un coup d\'œil.' },
        { id: 'sm-in',       title: '💚 Revenus Business',   desc: 'Vos revenus business totaux de toutes vos transactions.' },
        { id: 'sm-out',      title: '🔴 Dépenses Business',  desc: 'Total dépensé — se met à jour automatiquement.' },
        { id: 'sm-profit',   title: '✨ Bénéfice Net',        desc: 'Votre bénéfice business — le chiffre clé de votre réussite.' },
        { id: 'sm-count',    title: '🔢 Transactions Totales',desc: 'Combien de transactions vous avez enregistrées. Tout compte !' },
        { id: 'inp-name',    title: '✏️ Mettre à Jour le Nom',desc: 'Changez votre nom ici — mis à jour partout dans l\'app.' },
        { id: 'cur-pw',      title: '🔑 Changer le Mot de Passe',desc: 'Entrez l\'actuel, définissez le nouveau, restez sécurisé !' },
        { id: 'activityList',title: '📜 Activité Récente',   desc: 'Journal des connexions et changements récents.' },
      ],
      de: [
        { id: 'bigAvatar',   title: '🐾 Ihr Profil',         desc: 'Das sind Sie! Avatar, Name und E-Mail auf einen Blick.' },
        { id: 'sm-in',       title: '💚 Business-Einnahmen', desc: 'Ihre gesamten Unternehmenseinnahmen aus allen Transaktionen.' },
        { id: 'sm-out',      title: '🔴 Business-Ausgaben',  desc: 'Gesamtausgaben — aktualisiert sich automatisch.' },
        { id: 'sm-profit',   title: '✨ Nettogewinn',         desc: 'Ihr Unternehmensgewinn — die Kennzahl Ihres Erfolgs.' },
        { id: 'sm-count',    title: '🔢 Transaktionen Gesamt',desc: 'Wie viele Transaktionen Sie erfasst haben. Jede zählt!' },
        { id: 'inp-name',    title: '✏️ Name Aktualisieren', desc: 'Namen hier ändern — wird überall in der App aktualisiert.' },
        { id: 'cur-pw',      title: '🔑 Passwort Ändern',    desc: 'Aktuelles eingeben, neues setzen, sicher bleiben!' },
        { id: 'activityList',title: '📜 Letzte Aktivitäten', desc: 'Protokoll der letzten Logins und Änderungen.' },
      ],
      es: [
        { id: 'bigAvatar',   title: '🐾 Tu Perfil',          desc: '¡Eres tú! Avatar, nombre y email de un vistazo.' },
        { id: 'sm-in',       title: '💚 Ingresos del Negocio',desc: 'Tus ingresos totales del negocio de todas las transacciones.' },
        { id: 'sm-out',      title: '🔴 Gastos del Negocio', desc: 'Total gastado — se actualiza automáticamente.' },
        { id: 'sm-profit',   title: '✨ Beneficio Neto',      desc: 'Tu beneficio del negocio — el número que muestra tu éxito.' },
        { id: 'sm-count',    title: '🔢 Total de Transacciones',desc: 'Cuántas transacciones has registrado. ¡Cada entrada cuenta!' },
        { id: 'inp-name',    title: '✏️ Actualizar Nombre',  desc: 'Cambia tu nombre aquí — se actualiza en toda la app.' },
        { id: 'cur-pw',      title: '🔑 Cambiar Contraseña', desc: 'Ingresa la actual, establece la nueva, ¡mantente seguro!' },
        { id: 'activityList',title: '📜 Actividad Reciente', desc: 'Registro de inicios de sesión y cambios recientes.' },
      ],
      pt: [
        { id: 'bigAvatar',   title: '🐾 Seu Perfil',         desc: 'É você! Avatar, nome e email de relance.' },
        { id: 'sm-in',       title: '💚 Receita do Negócio', desc: 'Sua receita total do negócio de todas as transações.' },
        { id: 'sm-out',      title: '🔴 Despesas do Negócio',desc: 'Total gasto — atualizado automaticamente.' },
        { id: 'sm-profit',   title: '✨ Lucro Líquido',       desc: 'Seu lucro do negócio — o número que mostra seu sucesso.' },
        { id: 'sm-count',    title: '🔢 Total de Transações', desc: 'Quantas transações você registrou. Cada entrada conta!' },
        { id: 'inp-name',    title: '✏️ Atualizar Nome',     desc: 'Mude seu nome aqui — atualiza em toda a app.' },
        { id: 'cur-pw',      title: '🔑 Mudar Senha',        desc: 'Digite a atual, defina a nova, mantenha-se seguro!' },
        { id: 'activityList',title: '📜 Atividade Recente',  desc: 'Registro de logins e mudanças recentes.' },
      ],
      ko: [
        { id: 'bigAvatar',   title: '🐾 내 프로필',           desc: '바로 당신입니다! 아바타, 이름, 이메일을 한눈에.' },
        { id: 'sm-in',       title: '💚 사업 수입',           desc: '모든 거래의 총 사업 수입입니다.' },
        { id: 'sm-out',      title: '🔴 사업 지출',           desc: '총 지출 — 거래 추가 시 자동 업데이트.' },
        { id: 'sm-profit',   title: '✨ 순이익',               desc: '사업 이익 — 전체 성과를 보여주는 핵심 숫자.' },
        { id: 'sm-count',    title: '🔢 총 거래 수',           desc: '기록한 총 거래 수. 모든 항목이 중요합니다!' },
        { id: 'inp-name',    title: '✏️ 이름 업데이트',        desc: '여기서 표시 이름 변경 — 앱 전체에 반영됩니다.' },
        { id: 'cur-pw',      title: '🔑 비밀번호 변경',        desc: '현재 비밀번호 입력, 새 비밀번호 설정, 안전 유지!' },
        { id: 'activityList',title: '📜 최근 활동',            desc: '최근 로그인 및 변경 기록 — 이상 징후 확인.' },
      ],
      ru: [
        { id: 'bigAvatar',   title: '🐾 Ваш Профиль',        desc: 'Это вы! Аватар, имя и почта с первого взгляда.' },
        { id: 'sm-in',       title: '💚 Доход Бизнеса',      desc: 'Ваш общий доход бизнеса из всех транзакций.' },
        { id: 'sm-out',      title: '🔴 Расходы Бизнеса',    desc: 'Общие расходы — обновляются автоматически.' },
        { id: 'sm-profit',   title: '✨ Чистая Прибыль',     desc: 'Прибыль бизнеса — число, показывающее ваш успех.' },
        { id: 'sm-count',    title: '🔢 Всего Транзакций',   desc: 'Сколько транзакций вы записали. Каждая важна!' },
        { id: 'inp-name',    title: '✏️ Обновить Имя',       desc: 'Измените имя здесь — обновится везде в приложении.' },
        { id: 'cur-pw',      title: '🔑 Сменить Пароль',     desc: 'Введите текущий, задайте новый, оставайтесь в безопасности!' },
        { id: 'activityList',title: '📜 Последняя Активность',desc: 'Журнал последних входов и изменений.' },
      ],
    },

    /* ══════════════════════════════════════════════════════════════
       REPORT  (business-report.html)
    ══════════════════════════════════════════════════════════════ */
    report: {
      en: [
        { id: 'selMonth',    title: '📅 Select Month',       desc: 'Choose any month to view its complete financial summary. Time travel through your data!' },
        { id: 's-in',        title: '💚 Monthly Income',     desc: 'Total income received during the selected month. Tap different months to compare.' },
        { id: 's-out',       title: '🔴 Monthly Expenses',   desc: 'Total expenses for the selected month — how much went out the door?' },
        { id: 's-profit',    title: '✨ Monthly Profit',      desc: 'Net profit for the chosen month. Positive = great month, negative = review needed!' },
        { id: 's-txn',       title: '🔢 Transaction Count',  desc: 'Number of transactions this month — high frequency means active business!' },
        { id: 'barChart',    title: '📊 Daily Bar Chart',    desc: 'Day-by-day income vs expense bars for the month. Spot your best and worst days.' },
        { id: 'inPie',       title: '🥧 Income Sources',     desc: 'What drove income this month? Pie chart breaks it down by category.' },
        { id: 'outPie',      title: '🔴 Expense Breakdown',  desc: 'Where did the money go this month? Each slice is a category.' },
        { id: 'txnList',     title: '📋 Monthly Transactions',desc: 'Every transaction for the selected month in one scrollable list.' },
        { id: 'partnerBox',  title: '🤝 Partner Summary',    desc: 'Partner profit split for this month — see each person\'s share at a glance.' },
      ],
      hi: [
        { id: 'selMonth',    title: '📅 महीना चुनें',        desc: 'किसी भी महीने का वित्तीय सारांश देखें।' },
        { id: 's-in',        title: '💚 मासिक आमदनी',       desc: 'चुने गए महीने की कुल आमदनी।' },
        { id: 's-out',       title: '🔴 मासिक खर्च',        desc: 'उस महीने का कुल खर्च।' },
        { id: 's-profit',    title: '✨ मासिक लाभ',         desc: 'चुने महीने का शुद्ध लाभ। सकारात्मक = अच्छा महीना!' },
        { id: 's-txn',       title: '🔢 लेनदेन संख्या',     desc: 'इस महीने के लेनदेन की संख्या।' },
        { id: 'barChart',    title: '📊 दैनिक बार चार्ट',  desc: 'महीने के हर दिन की आमदनी बनाम खर्च।' },
        { id: 'inPie',       title: '🥧 आमदनी स्रोत',      desc: 'इस महीने की आमदनी का स्रोतवार विश्लेषण।' },
        { id: 'outPie',      title: '🔴 खर्च विश्लेषण',    desc: 'इस महीने पैसा कहाँ गया — श्रेणीवार।' },
        { id: 'txnList',     title: '📋 मासिक लेनदेन',     desc: 'चुने महीने के सभी लेनदेन।' },
        { id: 'partnerBox',  title: '🤝 साझेदार सारांश',   desc: 'इस महीने का साझेदार लाभ विभाजन।' },
      ],
      zh: [
        { id: 'selMonth',    title: '📅 选择月份',           desc: '选择任意月份查看完整财务摘要。' },
        { id: 's-in',        title: '💚 月收入',             desc: '所选月份的总收入。切换月份进行对比。' },
        { id: 's-out',       title: '🔴 月支出',             desc: '所选月份的总支出 — 花了多少？' },
        { id: 's-profit',    title: '✨ 月利润',             desc: '所选月份的净利润。正数=好月份，负数=需审查！' },
        { id: 's-txn',       title: '🔢 交易笔数',           desc: '本月交易数量 — 频繁意味着业务活跃！' },
        { id: 'barChart',    title: '📊 每日柱状图',         desc: '月度每日收支对比柱状图。找出最好和最差的一天。' },
        { id: 'inPie',       title: '🥧 收入来源',           desc: '本月收入驱动因素？按类别饼图分析。' },
        { id: 'outPie',      title: '🔴 支出明细',           desc: '本月钱去哪了？每个扇形代表一个类别。' },
        { id: 'txnList',     title: '📋 月度交易',           desc: '所选月份所有交易的滚动列表。' },
        { id: 'partnerBox',  title: '🤝 合伙人摘要',         desc: '本月合伙人利润分配 — 一眼看清每人份额。' },
      ],
      ja: [
        { id: 'selMonth',    title: '📅 月選択',             desc: 'どの月でも選んで財務サマリーを確認できます。' },
        { id: 's-in',        title: '💚 月次収入',           desc: '選択した月の総収入。月を変えて比較できます。' },
        { id: 's-out',       title: '🔴 月次支出',           desc: 'その月の総支出 — いくら出ていったか？' },
        { id: 's-profit',    title: '✨ 月次純利益',          desc: '選択月の純利益。プラス=良い月、マイナス=要確認！' },
        { id: 's-txn',       title: '🔢 取引件数',           desc: 'この月の取引数 — 多いほど活発なビジネス！' },
        { id: 'barChart',    title: '📊 日別棒グラフ',       desc: '月の日別収支比較棒グラフ。最良・最悪の日を把握。' },
        { id: 'inPie',       title: '🥧 収入源',             desc: '今月の収入を牽引したのは何か？円グラフで確認。' },
        { id: 'outPie',      title: '🔴 支出内訳',           desc: '今月お金はどこへ？各スライスがカテゴリー。' },
        { id: 'txnList',     title: '📋 月次取引',           desc: '選択した月のすべての取引リスト。' },
        { id: 'partnerBox',  title: '🤝 パートナーサマリー', desc: '今月のパートナー利益分配 — 各自の取り分を確認。' },
      ],
      ar: [
        { id: 'selMonth',    title: '📅 اختر الشهر',        desc: 'اختر أي شهر لعرض ملخصه المالي الكامل.' },
        { id: 's-in',        title: '💚 دخل الشهر',         desc: 'إجمالي الدخل خلال الشهر المحدد.' },
        { id: 's-out',       title: '🔴 مصروفات الشهر',    desc: 'إجمالي المصروفات لهذا الشهر.' },
        { id: 's-profit',    title: '✨ ربح الشهر',         desc: 'صافي ربح الشهر. موجب = شهر ممتاز!' },
        { id: 's-txn',       title: '🔢 عدد المعاملات',    desc: 'عدد معاملات هذا الشهر.' },
        { id: 'barChart',    title: '📊 مخطط يومي',         desc: 'دخل مقابل مصروفات يومياً للشهر.' },
        { id: 'inPie',       title: '🥧 مصادر الدخل',      desc: 'ما الذي حرّك دخل هذا الشهر؟' },
        { id: 'outPie',      title: '🔴 تفاصيل المصروفات', desc: 'أين ذهب المال هذا الشهر؟' },
        { id: 'txnList',     title: '📋 معاملات الشهر',    desc: 'جميع معاملات الشهر المحدد.' },
        { id: 'partnerBox',  title: '🤝 ملخص الشركاء',     desc: 'توزيع أرباح الشركاء لهذا الشهر.' },
      ],
      fr: [
        { id: 'selMonth',    title: '📅 Sélectionner Mois', desc: 'Choisissez n\'importe quel mois pour voir son résumé financier.' },
        { id: 's-in',        title: '💚 Revenus Mensuels',  desc: 'Revenus totaux du mois sélectionné.' },
        { id: 's-out',       title: '🔴 Dépenses Mensuelles',desc: 'Dépenses totales pour le mois sélectionné.' },
        { id: 's-profit',    title: '✨ Bénéfice Mensuel',  desc: 'Bénéfice net du mois. Positif = super mois !' },
        { id: 's-txn',       title: '🔢 Nombre de Transactions',desc: 'Transactions ce mois — beaucoup = business actif !' },
        { id: 'barChart',    title: '📊 Graphique Journalier',desc: 'Barres revenus vs dépenses jour par jour.' },
        { id: 'inPie',       title: '🥧 Sources de Revenus',desc: 'Qu\'est-ce qui a généré des revenus ce mois ?' },
        { id: 'outPie',      title: '🔴 Détail Dépenses',   desc: 'Où est allé l\'argent ce mois ? Par catégorie.' },
        { id: 'txnList',     title: '📋 Transactions Mensuelles',desc: 'Toutes les transactions du mois en liste.' },
        { id: 'partnerBox',  title: '🤝 Résumé Associés',   desc: 'Partage des bénéfices entre associés ce mois.' },
      ],
      de: [
        { id: 'selMonth',    title: '📅 Monat Auswählen',   desc: 'Wählen Sie einen Monat für eine vollständige Finanzübersicht.' },
        { id: 's-in',        title: '💚 Monatliche Einnahmen',desc: 'Gesamteinnahmen des ausgewählten Monats.' },
        { id: 's-out',       title: '🔴 Monatliche Ausgaben',desc: 'Gesamtausgaben für den ausgewählten Monat.' },
        { id: 's-profit',    title: '✨ Monatsgewinn',       desc: 'Nettogewinn des Monats. Positiv = super Monat!' },
        { id: 's-txn',       title: '🔢 Transaktionsanzahl',desc: 'Transaktionen diesen Monat — viele = aktives Business!' },
        { id: 'barChart',    title: '📊 Tagesdiagramm',     desc: 'Tägliche Einnahmen vs Ausgaben für den Monat.' },
        { id: 'inPie',       title: '🥧 Einnahmequellen',   desc: 'Was hat diesen Monat Einnahmen generiert?' },
        { id: 'outPie',      title: '🔴 Ausgaben-Detail',   desc: 'Wohin ging das Geld diesen Monat?' },
        { id: 'txnList',     title: '📋 Monatstransaktionen',desc: 'Alle Transaktionen des Monats in einer Liste.' },
        { id: 'partnerBox',  title: '🤝 Partnerübersicht',  desc: 'Gewinnaufteilung der Partner für diesen Monat.' },
      ],
      es: [
        { id: 'selMonth',    title: '📅 Seleccionar Mes',   desc: 'Elige cualquier mes para ver su resumen financiero completo.' },
        { id: 's-in',        title: '💚 Ingresos Mensuales',desc: 'Ingresos totales del mes seleccionado.' },
        { id: 's-out',       title: '🔴 Gastos Mensuales',  desc: 'Gastos totales del mes seleccionado.' },
        { id: 's-profit',    title: '✨ Beneficio Mensual', desc: 'Beneficio neto del mes. ¡Positivo = gran mes!' },
        { id: 's-txn',       title: '🔢 Número de Transacciones',desc: '¡Transacciones este mes — muchas = negocio activo!' },
        { id: 'barChart',    title: '📊 Gráfico Diario',    desc: 'Barras de ingresos vs gastos día a día.' },
        { id: 'inPie',       title: '🥧 Fuentes de Ingresos',desc: '¿Qué generó ingresos este mes?' },
        { id: 'outPie',      title: '🔴 Detalle de Gastos', desc: '¿Adónde fue el dinero este mes?' },
        { id: 'txnList',     title: '📋 Transacciones Mensuales',desc: 'Todas las transacciones del mes en una lista.' },
        { id: 'partnerBox',  title: '🤝 Resumen de Socios', desc: 'División de ganancias entre socios este mes.' },
      ],
      pt: [
        { id: 'selMonth',    title: '📅 Selecionar Mês',    desc: 'Escolha qualquer mês para ver seu resumo financeiro completo.' },
        { id: 's-in',        title: '💚 Receita Mensal',    desc: 'Receita total do mês selecionado.' },
        { id: 's-out',       title: '🔴 Despesas Mensais',  desc: 'Despesas totais do mês selecionado.' },
        { id: 's-profit',    title: '✨ Lucro Mensal',       desc: 'Lucro líquido do mês. Positivo = ótimo mês!' },
        { id: 's-txn',       title: '🔢 Número de Transações',desc: 'Transações neste mês — muitas = negócio ativo!' },
        { id: 'barChart',    title: '📊 Gráfico Diário',    desc: 'Barras de receita vs despesas dia a dia.' },
        { id: 'inPie',       title: '🥧 Fontes de Receita', desc: 'O que gerou receita este mês?' },
        { id: 'outPie',      title: '🔴 Detalhe de Despesas',desc: 'Para onde foi o dinheiro este mês?' },
        { id: 'txnList',     title: '📋 Transações Mensais',desc: 'Todas as transações do mês em uma lista.' },
        { id: 'partnerBox',  title: '🤝 Resumo de Sócios',  desc: 'Divisão de lucros entre sócios este mês.' },
      ],
      ko: [
        { id: 'selMonth',    title: '📅 월 선택',            desc: '원하는 월을 선택해 완전한 재무 요약을 확인하세요.' },
        { id: 's-in',        title: '💚 월 수입',            desc: '선택한 월의 총 수입. 다른 달과 비교해보세요.' },
        { id: 's-out',       title: '🔴 월 지출',            desc: '선택한 월의 총 지출 — 얼마나 나갔나요?' },
        { id: 's-profit',    title: '✨ 월 이익',            desc: '선택한 달의 순이익. 양수 = 좋은 달!' },
        { id: 's-txn',       title: '🔢 거래 수',           desc: '이번 달 거래 수 — 많을수록 활발한 사업!' },
        { id: 'barChart',    title: '📊 일별 막대 차트',    desc: '이달의 일별 수입 vs 지출 막대 차트.' },
        { id: 'inPie',       title: '🥧 수입 원천',         desc: '이달 수입을 이끈 것은? 카테고리별 파이 차트.' },
        { id: 'outPie',      title: '🔴 지출 명세',         desc: '이달 돈이 어디로? 각 조각 = 카테고리.' },
        { id: 'txnList',     title: '📋 월별 거래',         desc: '선택한 달의 모든 거래 목록.' },
        { id: 'partnerBox',  title: '🤝 파트너 요약',       desc: '이달 파트너 수익 분배 — 각자의 몫 확인.' },
      ],
      ru: [
        { id: 'selMonth',    title: '📅 Выбрать Месяц',     desc: 'Выберите любой месяц для полного финансового обзора.' },
        { id: 's-in',        title: '💚 Доход за Месяц',    desc: 'Общий доход выбранного месяца.' },
        { id: 's-out',       title: '🔴 Расходы за Месяц',  desc: 'Общие расходы за выбранный месяц.' },
        { id: 's-profit',    title: '✨ Месячная Прибыль',  desc: 'Чистая прибыль месяца. Плюс = отличный месяц!' },
        { id: 's-txn',       title: '🔢 Количество Транзакций',desc: 'Транзакций этого месяца — много = активный бизнес!' },
        { id: 'barChart',    title: '📊 Дневной График',    desc: 'Ежедневные доходы vs расходы за месяц.' },
        { id: 'inPie',       title: '🥧 Источники Дохода',  desc: 'Что принесло доход в этом месяце?' },
        { id: 'outPie',      title: '🔴 Детализация Расходов',desc: 'Куда ушли деньги в этом месяце?' },
        { id: 'txnList',     title: '📋 Транзакции Месяца', desc: 'Все транзакции выбранного месяца списком.' },
        { id: 'partnerBox',  title: '🤝 Обзор Партнёров',   desc: 'Разделение прибыли партнёров за этот месяц.' },
      ],
    },

    /* ══════════════════════════════════════════════════════════════
       SETTINGS  (business-setting.html)
    ══════════════════════════════════════════════════════════════ */
    settings: {
      en: [
        { id: 'businessName',  title: '🏢 Business Info',     desc: 'Set your business name, owner name, and business type here. This personalises your whole app!' },
        { id: 'currencySelect',title: '💱 Currency',           desc: 'Choose your currency symbol. It applies to all amounts displayed across every page.' },
        { id: 'languageSelect',title: '🌐 Language',           desc: 'Pick your preferred language. Hi भाषा चुनें! The entire app updates instantly.' },
        { id: 'theme-dark',    title: '🎨 Theme',              desc: 'Dark theme is easy on the eyes. Light theme for bright environments — your choice!' },
        { id: 'pinInput',      title: '🔒 PIN Lock',           desc: 'Set a 4-digit PIN to protect your financial data. Confirm it and save — stay secure!' },
        { id: 'pc-1',          title: '🤝 Partner Split',      desc: 'Configure how many partners share profits. This syncs with the Partners page split.' },
        { id: 'opt-business',  title: '🔄 App Mode',           desc: 'Switch between Personal and Business mode. Business mode unlocks partner splits and business features.' },
      ],
      hi: [
        { id: 'businessName',  title: '🏢 व्यवसाय जानकारी',  desc: 'अपना व्यवसाय नाम, मालिक का नाम और प्रकार सेट करें।' },
        { id: 'currencySelect',title: '💱 मुद्रा',            desc: 'अपना मुद्रा प्रतीक चुनें — सभी पृष्ठों पर लागू होगा।' },
        { id: 'languageSelect',title: '🌐 भाषा',             desc: 'अपनी पसंदीदा भाषा चुनें। पूरा ऐप तुरंत अपडेट होगा।' },
        { id: 'theme-dark',    title: '🎨 थीम',              desc: 'डार्क थीम = आँखों के लिए आरामदायक। अपनी पसंद!' },
        { id: 'pinInput',      title: '🔒 PIN लॉक',          desc: '4 अंकों का PIN सेट करें — अपना डेटा सुरक्षित करें।' },
        { id: 'pc-1',          title: '🤝 साझेदार विभाजन',  desc: 'कितने साझेदार लाभ साझा करते हैं — यहाँ सेट करें।' },
        { id: 'opt-business',  title: '🔄 ऐप मोड',          desc: 'व्यक्तिगत और व्यावसायिक मोड के बीच स्विच करें।' },
      ],
      zh: [
        { id: 'businessName',  title: '🏢 业务信息',          desc: '在此设置业务名称、业主姓名和业务类型。' },
        { id: 'currencySelect',title: '💱 货币',              desc: '选择货币符号 — 适用于所有页面显示的金额。' },
        { id: 'languageSelect',title: '🌐 语言',              desc: '选择首选语言。整个应用立即更新。' },
        { id: 'theme-dark',    title: '🎨 主题',              desc: '深色主题护眼。亮色主题适合明亮环境。您来选！' },
        { id: 'pinInput',      title: '🔒 PIN锁',             desc: '设置4位PIN保护财务数据。确认并保存！' },
        { id: 'pc-1',          title: '🤝 合伙人分配',        desc: '配置多少合伙人分享利润 — 与合伙人页面同步。' },
        { id: 'opt-business',  title: '🔄 应用模式',          desc: '在个人和商业模式之间切换。商业模式解锁合伙人功能。' },
      ],
      ja: [
        { id: 'businessName',  title: '🏢 ビジネス情報',      desc: 'ビジネス名、オーナー名、業種をここで設定。' },
        { id: 'currencySelect',title: '💱 通貨',              desc: '通貨記号を選択 — 全ページの金額表示に適用。' },
        { id: 'languageSelect',title: '🌐 言語',              desc: '希望の言語を選択。アプリ全体が即時更新されます。' },
        { id: 'theme-dark',    title: '🎨 テーマ',            desc: 'ダーク=目に優しい。ライト=明るい環境向け。' },
        { id: 'pinInput',      title: '🔒 PINロック',         desc: '4桁PINで財務データを保護。確認して保存！' },
        { id: 'pc-1',          title: '🤝 パートナー分配',    desc: '何人のパートナーが利益を共有するか設定。' },
        { id: 'opt-business',  title: '🔄 アプリモード',      desc: '個人モードとビジネスモードを切り替え。' },
      ],
      ar: [
        { id: 'businessName',  title: '🏢 معلومات العمل',    desc: 'اضبط اسم العمل واسم المالك ونوع العمل هنا.' },
        { id: 'currencySelect',title: '💱 العملة',            desc: 'اختر رمز العملة — يُطبق على جميع الصفحات.' },
        { id: 'languageSelect',title: '🌐 اللغة',            desc: 'اختر لغتك المفضلة. يتحدث التطبيق فوراً.' },
        { id: 'theme-dark',    title: '🎨 السمة',            desc: 'داكن = مريح للعيون. فاتح = للبيئات المضيئة.' },
        { id: 'pinInput',      title: '🔒 قفل PIN',          desc: 'اضبط رمز PIN من 4 أرقام لحماية بياناتك.' },
        { id: 'pc-1',          title: '🤝 توزيع الشركاء',   desc: 'اضبط عدد الشركاء — يتزامن مع صفحة الشركاء.' },
        { id: 'opt-business',  title: '🔄 وضع التطبيق',     desc: 'بدّل بين الوضع الشخصي والتجاري.' },
      ],
      fr: [
        { id: 'businessName',  title: '🏢 Infos Business',   desc: 'Définissez le nom de votre entreprise, propriétaire et type.' },
        { id: 'currencySelect',title: '💱 Devise',            desc: 'Choisissez le symbole de devise — s\'applique partout.' },
        { id: 'languageSelect',title: '🌐 Langue',            desc: 'Choisissez votre langue préférée. L\'app se met à jour immédiatement.' },
        { id: 'theme-dark',    title: '🎨 Thème',            desc: 'Sombre = doux pour les yeux. Clair = environnements lumineux.' },
        { id: 'pinInput',      title: '🔒 Verrouillage PIN', desc: 'Définissez un PIN à 4 chiffres pour protéger vos données.' },
        { id: 'pc-1',          title: '🤝 Partage Associés', desc: 'Combien d\'associés partagent les bénéfices — synchronisé.' },
        { id: 'opt-business',  title: '🔄 Mode App',         desc: 'Basculez entre mode Personnel et Business.' },
      ],
      de: [
        { id: 'businessName',  title: '🏢 Business-Info',    desc: 'Unternehmensname, Inhaber und Typ hier festlegen.' },
        { id: 'currencySelect',title: '💱 Währung',           desc: 'Währungssymbol wählen — gilt für alle Seiten.' },
        { id: 'languageSelect',title: '🌐 Sprache',           desc: 'Bevorzugte Sprache wählen. App aktualisiert sofort.' },
        { id: 'theme-dark',    title: '🎨 Theme',             desc: 'Dunkel = augenschonend. Hell = helle Umgebungen.' },
        { id: 'pinInput',      title: '🔒 PIN-Sperre',       desc: '4-stellige PIN zum Schutz Ihrer Daten festlegen.' },
        { id: 'pc-1',          title: '🤝 Partner-Aufteilung',desc: 'Wie viele Partner teilen Gewinne — mit Partnerseite synchron.' },
        { id: 'opt-business',  title: '🔄 App-Modus',        desc: 'Zwischen Persönlich und Business-Modus wechseln.' },
      ],
      es: [
        { id: 'businessName',  title: '🏢 Info del Negocio', desc: 'Establece nombre del negocio, propietario y tipo aquí.' },
        { id: 'currencySelect',title: '💱 Moneda',            desc: 'Elige el símbolo de moneda — se aplica en todas las páginas.' },
        { id: 'languageSelect',title: '🌐 Idioma',            desc: 'Elige tu idioma preferido. ¡La app se actualiza al instante!' },
        { id: 'theme-dark',    title: '🎨 Tema',              desc: 'Oscuro = suave para los ojos. Claro = ambientes brillantes.' },
        { id: 'pinInput',      title: '🔒 Bloqueo PIN',       desc: 'Establece un PIN de 4 dígitos para proteger tus datos.' },
        { id: 'pc-1',          title: '🤝 División de Socios',desc: 'Cuántos socios comparten ganancias — sincronizado.' },
        { id: 'opt-business',  title: '🔄 Modo App',          desc: 'Cambia entre modo Personal y Empresarial.' },
      ],
      pt: [
        { id: 'businessName',  title: '🏢 Info do Negócio',  desc: 'Defina nome do negócio, proprietário e tipo aqui.' },
        { id: 'currencySelect',title: '💱 Moeda',             desc: 'Escolha o símbolo de moeda — aplica-se em todas as páginas.' },
        { id: 'languageSelect',title: '🌐 Idioma',            desc: 'Escolha seu idioma preferido. O app atualiza instantaneamente!' },
        { id: 'theme-dark',    title: '🎨 Tema',              desc: 'Escuro = suave para os olhos. Claro = ambientes brilhantes.' },
        { id: 'pinInput',      title: '🔒 Bloqueio PIN',      desc: 'Defina um PIN de 4 dígitos para proteger seus dados.' },
        { id: 'pc-1',          title: '🤝 Divisão de Sócios',desc: 'Quantos sócios compartilham lucros — sincronizado.' },
        { id: 'opt-business',  title: '🔄 Modo App',          desc: 'Alterne entre modo Pessoal e Empresarial.' },
      ],
      ko: [
        { id: 'businessName',  title: '🏢 사업 정보',         desc: '사업 이름, 소유자 이름, 사업 유형을 여기서 설정하세요.' },
        { id: 'currencySelect',title: '💱 통화',               desc: '통화 기호 선택 — 모든 페이지의 금액에 적용됩니다.' },
        { id: 'languageSelect',title: '🌐 언어',               desc: '선호 언어를 선택하세요. 앱이 즉시 업데이트됩니다!' },
        { id: 'theme-dark',    title: '🎨 테마',               desc: '다크 = 눈에 편안. 라이트 = 밝은 환경.' },
        { id: 'pinInput',      title: '🔒 PIN 잠금',           desc: '4자리 PIN으로 데이터 보호. 확인 후 저장!' },
        { id: 'pc-1',          title: '🤝 파트너 분배',        desc: '수익을 공유하는 파트너 수 설정 — 파트너 페이지와 동기화.' },
        { id: 'opt-business',  title: '🔄 앱 모드',            desc: '개인 모드와 사업 모드 간 전환.' },
      ],
      ru: [
        { id: 'businessName',  title: '🏢 Инфо о Бизнесе',   desc: 'Укажите название бизнеса, владельца и тип здесь.' },
        { id: 'currencySelect',title: '💱 Валюта',            desc: 'Выберите символ валюты — применяется на всех страницах.' },
        { id: 'languageSelect',title: '🌐 Язык',             desc: 'Выберите предпочтительный язык. Приложение обновится мгновенно!' },
        { id: 'theme-dark',    title: '🎨 Тема',             desc: 'Тёмная = щадит глаза. Светлая = для светлых условий.' },
        { id: 'pinInput',      title: '🔒 PIN-Блокировка',   desc: 'Задайте 4-значный PIN для защиты данных.' },
        { id: 'pc-1',          title: '🤝 Раздел Партнёров', desc: 'Сколько партнёров делят прибыль — синхронизировано.' },
        { id: 'opt-business',  title: '🔄 Режим Приложения', desc: 'Переключение между личным и бизнес-режимом.' },
      ],
    },
  };

  /* ─────────────────────────────────────────────
     2. PAGE DETECTION
  ───────────────────────────────────────────── */
  function detectPage() {
    const p = window.location.pathname.toLowerCase();
    if (p.includes('business-chart'))    return 'chart';
    if (p.includes('business-partners')) return 'partners';
    if (p.includes('business-profile'))  return 'profile';
    if (p.includes('business-report'))   return 'report';
    if (p.includes('business-setting'))  return 'settings';
    return 'dashboard'; // business.html
  }

  /* ─────────────────────────────────────────────
     3. LOTTIE LOADER
  ───────────────────────────────────────────── */
  let lottieAnim = null;
  let useFallback = false;

  function loadLottie(container, cb) {
    if (typeof lottie !== 'undefined') {
      try {
        lottieAnim = lottie.loadAnimation({
          container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'miumiu.json',
        });
        lottieAnim.addEventListener('data_failed', () => { useFallback = true; cb(); });
        lottieAnim.addEventListener('data_ready',  cb);
      } catch (e) { useFallback = true; cb(); }
    } else { useFallback = true; cb(); }
  }

  /* ─────────────────────────────────────────────
     4. DOM INJECTION — Miu Miu character + bubble
  ───────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('miu-tour-styles')) return;
    const s = document.createElement('style');
    s.id = 'miu-tour-styles';
    s.textContent = `
      /* ── Overlay ── */
      #miu-overlay {
        position: fixed; inset: 0; z-index: 99990;
        background: rgba(0,0,0,.45);
        backdrop-filter: blur(2px);
        opacity: 0; transition: opacity .35s;
        pointer-events: none;
      }
      #miu-overlay.visible { opacity: 1; pointer-events: auto; }

      /* ── Highlight ring ── */
      #miu-highlight {
        position: fixed; z-index: 99995;
        border-radius: 14px;
        box-shadow: 0 0 0 4px #c9a84c, 0 0 28px 6px rgba(201,168,76,.45);
        pointer-events: none;
        transition: all .4s cubic-bezier(.175,.885,.32,1.275);
        opacity: 0;
      }
      #miu-highlight.visible { opacity: 1; }

      /* ── Miu character ── */
      #miu-char {
        position: fixed; z-index: 99998;
        width: 90px; height: 90px;
        transition: all .5s cubic-bezier(.175,.885,.32,1.275);
        filter: drop-shadow(0 4px 14px rgba(0,0,0,.5));
        cursor: pointer;
      }
      #miu-char .miu-fallback {
        font-size: 58px; line-height: 90px; text-align: center;
        display: block; animation: miuBob 2s ease-in-out infinite;
      }
      @keyframes miuBob {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-8px); }
      }
      @keyframes miuWave {
        0%,100% { transform: rotate(0deg); }
        25%     { transform: rotate(-20deg); }
        75%     { transform: rotate(20deg); }
      }
      #miu-char.waving .miu-fallback { animation: miuWave .3s ease-in-out 4; }

      /* ── Speech bubble ── */
      #miu-bubble {
        position: fixed; z-index: 99999;
        background: #141f14;
        border: 1.5px solid rgba(201,168,76,.45);
        border-radius: 18px;
        padding: 18px 20px 14px;
        width: 280px;
        box-shadow: 0 12px 40px rgba(0,0,0,.55), 0 0 0 1px rgba(201,168,76,.12);
        transition: all .4s cubic-bezier(.175,.885,.32,1.275);
        opacity: 0; transform: scale(.85);
        pointer-events: none;
        font-family: 'DM Sans', sans-serif;
      }
      #miu-bubble.visible {
        opacity: 1; transform: scale(1);
        pointer-events: auto;
      }
      /* Tail */
      #miu-bubble::before {
        content:''; position:absolute;
        bottom: -9px; left: 36px;
        width: 16px; height: 16px;
        background: #141f14;
        border-right: 1.5px solid rgba(201,168,76,.45);
        border-bottom: 1.5px solid rgba(201,168,76,.45);
        transform: rotate(45deg);
        transition: left .3s, right .3s;
      }
      #miu-bubble.tail-right::before { left:auto; right:36px; }
      #miu-bubble.tail-top::before {
        bottom: auto; top: -9px;
        border-right: none; border-bottom: none;
        border-left: 1.5px solid rgba(201,168,76,.45);
        border-top: 1.5px solid rgba(201,168,76,.45);
      }

      #miu-bubble-title {
        font-family: 'DM Serif Display', serif;
        font-size: 15px; color: #c9a84c;
        margin-bottom: 7px; font-weight: 400;
      }
      #miu-bubble-desc {
        font-size: 13px; color: #c8d8b8; line-height: 1.55;
        margin-bottom: 14px;
      }

      /* Progress dots */
      #miu-dots {
        display: flex; gap: 6px; margin-bottom: 12px;
        flex-wrap: wrap;
      }
      .miu-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: rgba(201,168,76,.25);
        transition: background .25s, transform .25s;
        flex-shrink: 0;
      }
      .miu-dot.active {
        background: #c9a84c;
        transform: scale(1.3);
      }

      /* Buttons */
      #miu-btns { display: flex; gap: 8px; justify-content: flex-end; }
      .miu-btn {
        padding: 7px 16px; border-radius: 30px;
        border: 1.5px solid rgba(201,168,76,.4);
        font-size: 12px; font-weight: 600; cursor: pointer;
        transition: all .2s; letter-spacing: .02em;
        font-family: 'DM Sans', sans-serif;
      }
      .miu-btn-skip {
        background: transparent; color: #8aab7a;
      }
      .miu-btn-skip:hover { background: rgba(138,171,122,.12); color: #c8d8b8; }
      .miu-btn-next {
        background: #c9a84c; color: #080f08;
        border-color: #c9a84c;
      }
      .miu-btn-next:hover { background: #e0c070; }

      /* ── ? Button ── */
      #miu-help-btn {
        position: fixed; bottom: 22px; right: 22px;
        z-index: 99985;
        width: 46px; height: 46px; border-radius: 50%;
        background: #c9a84c; color: #080f08;
        border: none; font-size: 20px; font-weight: 700;
        cursor: pointer; box-shadow: 0 4px 18px rgba(201,168,76,.4);
        transition: transform .2s, box-shadow .2s;
        display: flex; align-items: center; justify-content: center;
        font-family: 'DM Serif Display', serif;
      }
      #miu-help-btn:hover { transform: scale(1.12); box-shadow: 0 6px 24px rgba(201,168,76,.55); }

      /* ── Highlight clip-path for non-highlighted elements ── */
      #miu-overlay {
        pointer-events: none;
      }
      #miu-overlay.visible {
        pointer-events: auto;
      }
    `;
    document.head.appendChild(s);
  }

  function injectDOM() {
    if (document.getElementById('miu-overlay')) return;

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'miu-overlay';
    document.body.appendChild(overlay);

    // Highlight ring
    const ring = document.createElement('div');
    ring.id = 'miu-highlight';
    document.body.appendChild(ring);

    // Miu character
    const char = document.createElement('div');
    char.id = 'miu-char';
    char.innerHTML = `<span class="miu-fallback">🦎</span>`;
    document.body.appendChild(char);

    // Speech bubble
    const bubble = document.createElement('div');
    bubble.id = 'miu-bubble';
    bubble.innerHTML = `
      <div id="miu-dots"></div>
      <div id="miu-bubble-title"></div>
      <div id="miu-bubble-desc"></div>
      <div id="miu-btns">
        <button class="miu-btn miu-btn-skip" onclick="HelpTour.end()">Skip ✕</button>
        <button class="miu-btn miu-btn-next" onclick="HelpTour.next()">Next →</button>
      </div>
    `;
    document.body.appendChild(bubble);

    // Lottie container inside char
    const lottieEl = document.createElement('div');
    lottieEl.id = 'miu-lottie';
    lottieEl.style.cssText = 'width:100%;height:100%;';
    char.insertBefore(lottieEl, char.firstChild);

    // ? button
    const btn = document.createElement('button');
    btn.id = 'miu-help-btn';
    btn.title = 'Help Tour';
    btn.textContent = '?';
    btn.onclick = () => HelpTour.start();
    document.body.appendChild(btn);

    // Load Lottie
    loadLottie(lottieEl, () => {
      if (useFallback) {
        lottieEl.style.display = 'none';
        char.querySelector('.miu-fallback').style.display = 'block';
      } else {
        char.querySelector('.miu-fallback').style.display = 'none';
      }
    });
  }

  /* ─────────────────────────────────────────────
     5. TOUR ENGINE
  ───────────────────────────────────────────── */
  let steps  = [];
  let current = -1;
  let active  = false;

  function getSteps() {
    const page = detectPage();
    const lang = LANG;
    const pageData = TOURS[page];
    if (!pageData) return [];
    return (pageData[lang] || pageData['en'] || []).filter(s => document.getElementById(s.id));
  }

  function getEl(id) { return document.getElementById(id); }

  function positionHighlight(el) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pad = 8;
    const ring = document.getElementById('miu-highlight');
    ring.style.left   = (r.left - pad) + 'px';
    ring.style.top    = (r.top  - pad) + 'px';
    ring.style.width  = (r.width  + pad * 2) + 'px';
    ring.style.height = (r.height + pad * 2) + 'px';
    ring.classList.add('visible');
  }

  function positionMiu(el) {
    if (!el) return;
    const r   = el.getBoundingClientRect();
    const char = document.getElementById('miu-char');
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const charW = 90, charH = 90;
    const bubW  = 300;

    // Place Miu near the element
    const spaceBelow = vh - r.bottom;
    const spaceAbove = r.top;
    let   mX, mY;

    if (spaceBelow >= charH + 20) {
      mY = r.bottom + 10;
      mX = Math.min(Math.max(r.left + r.width / 2 - charW / 2, 10), vw - charW - 10);
    } else if (spaceAbove >= charH + 20) {
      mY = r.top - charH - 10;
      mX = Math.min(Math.max(r.left + r.width / 2 - charW / 2, 10), vw - charW - 10);
    } else {
      mY = Math.min(Math.max(r.top + r.height / 2 - charH / 2, 10), vh - charH - 10);
      mX = r.left > vw / 2 ? r.left - charW - 14 : r.right + 14;
    }

    char.style.left = mX + 'px';
    char.style.top  = mY + 'px';

    // Position bubble relative to Miu
    positionBubble(mX, mY, charW, charH, vw, vh, bubW);
  }

  function positionBubble(mX, mY, charW, charH, vw, vh, bubW) {
    const bubble = document.getElementById('miu-bubble');
    const bubH   = bubble.offsetHeight || 160;
    let bX, bY;

    bubble.classList.remove('tail-right', 'tail-top');

    // Try right of Miu
    if (mX + charW + 10 + bubW <= vw - 10) {
      bX = mX + charW + 10;
      bY = Math.min(Math.max(mY, 10), vh - bubH - 10);
      bubble.classList.remove('tail-right');
    }
    // Try left of Miu
    else if (mX - 10 - bubW >= 10) {
      bX = mX - 10 - bubW;
      bY = Math.min(Math.max(mY, 10), vh - bubH - 10);
      bubble.classList.add('tail-right');
    }
    // Try above Miu
    else if (mY - 10 - bubH >= 10) {
      bX = Math.min(Math.max(mX - bubW / 2 + charW / 2, 10), vw - bubW - 10);
      bY = mY - 10 - bubH;
      bubble.classList.add('tail-top');
    }
    // Below Miu
    else {
      bX = Math.min(Math.max(mX - bubW / 2 + charW / 2, 10), vw - bubW - 10);
      bY = mY + charH + 10;
    }

    bubble.style.left = bX + 'px';
    bubble.style.top  = bY + 'px';
  }

  function updateDots(total, idx) {
    const c = document.getElementById('miu-dots');
    if (!c) return;
    c.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'miu-dot' + (i === idx ? ' active' : '');
      c.appendChild(d);
    }
  }

  function scrollToEl(el, cb) {
    if (!el) { cb(); return; }
    const r = el.getBoundingClientRect();
    const inView = r.top >= 60 && r.bottom <= window.innerHeight - 60;
    if (inView) { cb(); return; }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(cb, 450);
  }

  function showStep(idx) {
    const step = steps[idx];
    if (!step) return;
    const el = getEl(step.id);

    // Update bubble content
    document.getElementById('miu-bubble-title').textContent = step.title;
    document.getElementById('miu-bubble-desc').textContent  = step.desc;
    updateDots(steps.length, idx);

    // Last step: change Next → Finish
    const nextBtn = document.querySelector('.miu-btn-next');
    if (nextBtn) {
      nextBtn.textContent = idx === steps.length - 1 ? 'Finish 🎉' : 'Next →';
    }

    scrollToEl(el, () => {
      positionHighlight(el);
      positionMiu(el);
      document.getElementById('miu-bubble').classList.add('visible');
      document.getElementById('miu-overlay').classList.add('visible');
    });
  }

  function waveAndFade(cb) {
    const char = document.getElementById('miu-char');
    char.classList.add('waving');
    setTimeout(() => { char.classList.remove('waving'); if (cb) cb(); }, 1400);
  }

  /* ─────────────────────────────────────────────
     6. PUBLIC API
  ───────────────────────────────────────────── */
  window.HelpTour = {
    start() {
      steps   = getSteps();
      current = 0;
      active  = true;
      if (!steps.length) { console.warn('HelpTour: no matching step IDs found on this page.'); return; }
      document.getElementById('miu-char').style.opacity = '1';
      showStep(0);
    },
    next() {
      if (!active) return;
      current++;
      if (current >= steps.length) { HelpTour.end(); return; }
      showStep(current);
    },
    end() {
      active = false;
      const bubble  = document.getElementById('miu-bubble');
      const overlay = document.getElementById('miu-overlay');
      const ring    = document.getElementById('miu-highlight');

      bubble.classList.remove('visible');
      overlay.classList.remove('visible');
      ring.classList.remove('visible');

      waveAndFade(() => {
        document.getElementById('miu-char').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('miu-char').style.opacity = '1';
          document.getElementById('miu-char').style.left = '-200px';
        }, 600);
      });
    },
  };

  /* ─────────────────────────────────────────────
     7. INIT on DOM ready
  ───────────────────────────────────────────── */
  function init() {
    injectStyles();
    injectDOM();
    // Hide Miu off-screen initially
    const char = document.getElementById('miu-char');
    char.style.opacity = '0';
    char.style.left = '-200px';
    char.style.top  = '50%';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Reposition on scroll/resize
  window.addEventListener('resize', () => {
    if (active && steps[current]) showStep(current);
  });
  window.addEventListener('scroll', () => {
    if (active && steps[current]) {
      const el = getEl(steps[current].id);
      if (el) { positionHighlight(el); positionMiu(el); }
    }
  }, true);

})();