// 1. Инициализация иконок Lucide
lucide.createIcons();

// 2. Глобальные переменные проекта
let balance = 42850.00;
const themes = [
    { name: 'Sky Blue', color: '#38bdf8' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Violet', color: '#a855f7' },
    { name: 'Amber', color: '#fbbf24' }
];
let currentThemeIdx = 0;

// 3. Запуск при загрузке страницы
window.onload = () => {
    // Анимация появления карточек (Reveal Effect)
    document.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 150);
    });

    initMainChart();
    startAIProcess();
    updateSystemStats();
};

// 4. Фишка: Имитация работы AI (Нейросеть)
function startAIProcess() {
    const aiOutput = document.getElementById('ai-output');
    const aiBar = document.getElementById('ai-progress');
    const scenarios = [
        "Анализ волатильности рынка...",
        "Оптимизация кредитного плеча: 2.5x",
        "Zenith Core: Сигнал на покупку NOLLY",
        "Обнаружен паттерн 'Золотой крест'",
        "Безопасность: Проверка транзакций..."
    ];

    let step = 0;
    setInterval(() => {
        // Меняем текст и заполняем прогресс-бар случайным образом
        aiOutput.style.opacity = 0;
        setTimeout(() => {
            aiOutput.innerText = scenarios[step];
            aiOutput.style.opacity = 1;
            aiBar.style.width = Math.floor(Math.random() * 80 + 20) + "%";
            step = (step + 1) % scenarios.length;
        }, 500);
    }, 4500);
}

// 5. Фишка: Динамическая смена темы (Appearance)
document.getElementById('theme-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    currentThemeIdx = (currentThemeIdx + 1) % themes.length;
    const newTheme = themes[currentThemeIdx];
    
    // Меняем CSS-переменную основного цвета
    document.documentElement.style.setProperty('--accent', newTheme.color);
    document.documentElement.style.setProperty('--accent-glow', newTheme.color + '40');
    
    showToast(`Стиль изменен: ${newTheme.name}`);
    updateChartColor(newTheme.color);
});

// 6. Логика кнопок (Инвестиции и Экспорт)
function triggerAction(type) {
    const history = document.getElementById('history-list');
    const entry = document.createElement('div');
    entry.className = 'history-item reveal visible';
    entry.style.cssText = "display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border); font-size:14px; animation: slideIn 0.3s ease-out;";

    if (type === 'deposit') {
        balance += 1250;
        document.getElementById('balance-val').innerText = `$${balance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
        entry.innerHTML = `<span>Пополнение активов</span> <span class="up">+$1,250.00</span>`;
        showToast("Транзакция успешно подтверждена");
    } else if (type === 'export') {
        entry.innerHTML = `<span>Выгрузка отчета</span> <span style="color:var(--accent)">PDF/JSON</span>`;
        showToast("Отчет Zenith Core сформирован");
    }

    // Удаляем текст "пусто", если он есть
    const empty = history.querySelector('.empty-state');
    if (empty) empty.remove();

    history.prepend(entry);
}

// 7. Работа с графиком (Chart.js)
let mainChart;
function initMainChart() {
    const ctx = document.getElementById('zenithChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['01:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'],
            datasets: [{
                data: [32000, 38500, 36000, 42850, 41000, 48000, 52000],
                borderColor: '#38bdf8',
                borderWidth: 3,
                fill: true,
                backgroundColor: gradient,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 11 } } },
                y: { grid: { color: 'rgba(255,255,255,0.02)' }, ticks: { display: false } }
            }
        }
    });
}

function updateChartColor(color) {
    if (mainChart) {
        mainChart.data.datasets[0].borderColor = color;
        mainChart.update();
    }
}

// 8. Уведомления (Toast)
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.right = '30px';
    
    setTimeout(() => {
        toast.style.right = '-400px';
    }, 3000);
}

// 9. Имитация системных данных (CPU/Network)
function updateSystemStats() {
    setInterval(() => {
        const btcItem = document.querySelector('.ticker__item');
        // Небольшая имитация изменения цены в тикере
        if (btcItem) {
            const currentPrice = 68432 + Math.floor(Math.random() * 100 - 50);
            btcItem.innerHTML = `BTC: $${currentPrice.toLocaleString()} <span class="up">+2.4%</span>`;
        }
    }, 5000);
}
