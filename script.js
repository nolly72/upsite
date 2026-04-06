// 1. Инициализация иконок Lucide
lucide.createIcons();

// 2. ДАННЫЕ ДЛЯ БЕГУЩЕЙ СТРОКИ (Много монет, без Nolly)
const marketCoins = [
    {n: 'BTC', p: '68,432', c: '+2.4%'}, {n: 'ETH', p: '3,541', c: '+1.8%'},
    {n: 'SOL', p: '145.2', c: '-0.5%'}, {n: 'BNB', p: '591.3', c: '+0.2%'},
    {n: 'ADA', p: '0.45', c: '+4.1%'}, {n: 'XRP', p: '0.61', c: '-1.2%'},
    {n: 'DOT', p: '7.21', c: '+0.8%'}, {n: 'AVAX', p: '35.4', c: '+2.5%'},
    {n: 'LINK', p: '18.2', c: '+1.1%'}, {n: 'NEAR', p: '6.80', c: '+3.4%'},
    {n: 'MATIC', p: '0.72', c: '-0.3%'}, {n: 'LTC', p: '82.15', c: '+1.5%'}
];

const tickerBox = document.getElementById('webticker');
tickerBox.innerHTML = [...marketCoins, ...marketCoins].map(coin => `
    <div class="ticker__item">
        <span style="color: #fff; font-weight: 800;">${coin.n}</span>
        <span>$${coin.p}</span>
        <span style="color: ${coin.c.includes('+') ? '#10b981' : '#f43f5e'}">${coin.c}</span>
    </div>
`).join('');

// 3. КОНТЕНТ ВСЕХ РАЗДЕЛОВ (Наполнение информацией)
const pageData = {
    dashboard: `
        <div class="page-header"><h1>Dashboard</h1><p>Обзор вашего капитала и динамика роста в реальном времени</p></div>
        <div class="grid">
            <div class="card">
                <div class="card-title">Net Worth Balance</div>
                <div class="big-value">$124,500.00</div>
                <div class="status-tag">↑ +14.2% (за 30 дней)</div>
            </div>
            <div class="card">
                <div class="card-title">Profit & Loss (P&L)</div>
                <div class="big-value" style="color: #10b981;">+$4,210.40</div>
                <p style="color: var(--text-dim); font-size: 14px;">Ваш доход за последние 24 часа</p>
            </div>
            <div class="card">
                <div class="card-title">AI Market Analysis</div>
                <div id="ai-status" style="font-size: 16px; font-weight: 600; color: var(--accent); margin: 10px 0;">Сканирование трендов...</div>
                <div style="height:4px; background:rgba(255,255,255,0.05); border-radius:10px; margin-top:20px;">
                    <div id="ai-progress-bar" style="width:30%; height:100%; background:var(--accent); transition: 1s ease; box-shadow: 0 0 10px var(--accent);"></div>
                </div>
            </div>
            <div class="card chart-container">
                <div class="card-title">Zenith Growth Curve</div>
                <canvas id="mainChart"></canvas>
            </div>
        </div>
    `,
    analytics: `
        <div class="page-header"><h1>Analytics</h1><p>Подробная статистика распределения ваших активов и рисков</p></div>
        <div class="grid">
            <div class="card">
                <div class="card-title">Portfolio Allocation</div>
                <div style="margin-top: 20px;">
                    <p style="font-size: 14px; margin-bottom: 10px;">Bitcoin (BTC) <span style="float:right;">62%</span></p>
                    <div style="height:6px; background:#38bdf820; border-radius:10px;"><div style="width:62%; height:100%; background:#38bdf8; border-radius:10px;"></div></div>
                    <p style="font-size: 14px; margin: 15px 0 10px;">Ethereum (ETH) <span style="float:right;">28%</span></p>
                    <div style="height:6px; background:#10b98120; border-radius:10px;"><div style="width:28%; height:100%; background:#10b981; border-radius:10px;"></div></div>
                    <p style="font-size: 14px; margin: 15px 0 10px;">Altcoins <span style="float:right;">10%</span></p>
                    <div style="height:6px; background:#a855f720; border-radius:10px;"><div style="width:10%; height:100%; background:#a855f7; border-radius:10px;"></div></div>
                </div>
            </div>
            <div class="card">
                <div class="card-title">Market Sentiment</div>
                <div class="big-value" style="color: #fbbf24;">Greed</div>
                <p>Индекс страха и жадности: 72/100. Рынок находится в фазе активного роста.</p>
            </div>
            <div class="card">
                <div class="card-title">Trading Volume</div>
                <div class="big-value">$3.8B</div>
                <p>Суммарный объем торгов по вашим парам вырос на 8% за последние 12 часов.</p>
            </div>
        </div>
    `,
    appearance: `
        <div class="page-header"><h1>Appearance</h1><p>Персонализация внешнего вида вашей панели Zenith</p></div>
        <div class="grid">
            <div class="card">
                <div class="card-title">Accent Palette</div>
                <p style="margin-bottom: 20px;">Выберите акцентный цвет для кнопок и графиков:</p>
                <div style="display:flex; gap:15px;">
                    <div onclick="setTheme('#38bdf8')" style="width:45px; height:45px; background:#38bdf8; border-radius:50%; cursor:pointer; border: 3px solid #fff;"></div>
                    <div onclick="setTheme('#10b981')" style="width:45px; height:45px; background:#10b981; border-radius:50%; cursor:pointer;"></div>
                    <div onclick="setTheme('#a855f7')" style="width:45px; height:45px; background:#a855f7; border-radius:50%; cursor:pointer;"></div>
                    <div onclick="setTheme('#fbbf24')" style="width:45px; height:45px; background:#fbbf24; border-radius:50%; cursor:pointer;"></div>
                </div>
            </div>
            <div class="card">
                <div class="card-title">Interface Style</div>
                <div class="big-value">Glass Pro</div>
                <p>Используется эффект матового стекла (Blur: 40px). Все углы скруглены по стандарту Zenith UI.</p>
            </div>
        </div>
    `,
    security: `
        <div class="page-header"><h1>Security</h1><p>Защита ваших активов и история безопасности</p></div>
        <div class="grid">
            <div class="card" style="border-left: 5px solid #10b981;">
                <div class="card-title">Security Shield</div>
                <div class="big-value" style="color: #10b981;">Protected</div>
                <p>2FA авторизация, SSL шифрование и AES-256 защита ключей активны.</p>
            </div>
            <div class="card">
                <div class="card-title">Identity Verification</div>
                <div class="status-tag" style="background: #38bdf810; color: #38bdf8;">KYC VERIFIED</div>
                <p style="margin-top: 15px;">Ваша личность подтверждена. Лимиты на вывод средств увеличены до $100k/день.</p>
            </div>
            <div class="card">
                <div class="card-title">Login History</div>
                <div style="font-size: 14px; color: var(--text-dim);">
                    <p style="margin-bottom: 8px;">• Сегодня, 14:20 — Москва, RU</p>
                    <p style="margin-bottom: 8px;">• Вчера, 10:15 — Москва, RU</p>
                    <p>• 05.10.2023 — Санкт-Петербург, RU</p>
                </div>
            </div>
        </div>
    `
};

// 4. НАВИГАЦИЯ (SPA Logic)
function navigation(pageId, event) {
    if(event) event.preventDefault();
    
    const routerView = document.getElementById('router-view');
    routerView.innerHTML = pageData[pageId];
    
    // Обновляем активный пункт меню
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if(event) {
        event.currentTarget.classList.add('active');
    } else {
        document.querySelector(`.nav-link`).classList.add('active');
    }

    lucide.createIcons();
    if(pageId === 'dashboard') {
        initChart();
        startAI();
    }
    showToast(`Переход в раздел: ${pageId.toUpperCase()}`);
}

// 5. ГРАФИК (Chart.js)
let activeChart;
function initChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    
    if(activeChart) activeChart.destroy();

    activeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['01:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'],
            datasets: [{
                data:,
                borderColor: accentColor,
                borderWidth: 4,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
                backgroundColor: `${accentColor}10`
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b', font: {family: 'Geologica'} } },
                y: { display: false }
            }
        }
    });
}

// 6. AI ИМИТАЦИЯ
function startAI() {
    const statusText = document.getElementById('ai-status');
    const progressBar = document.getElementById('ai-progress-bar');
    const logs = ["Анализ ордеров...", "Поиск паттернов...", "Zenith: Оптимально", "Рынок стабилен"];
    
    let i = 0;
    setInterval(() => {
        if(statusText && progressBar) {
            statusText.innerText = logs[i];
            progressBar.style.width = Math.floor(Math.random() * 90 + 10) + "%";
            i = (i + 1) % logs.length;
        }
    }, 4000);
}

// 7. СИСТЕМНЫЕ ФУНКЦИИ
function setTheme(color) {
    document.documentElement.style.setProperty('--accent', color);
    showToast("Цветовая схема обновлена");
    if(document.getElementById('mainChart')) initChart();
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.right = '30px';
    setTimeout(() => { toast.style.right = '-450px'; }, 3000);
}

function action(type) {
    if(type === 'connect') {
        showToast("Подключение MetaMask...");
        setTimeout(() => showToast("Ошибка: Установите расширение"), 2000);
    }
}

// ЗАПУСК ПО УМОЛЧАНИЮ
navigation('dashboard');
