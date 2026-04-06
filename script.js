// 1. Инициализация иконок Lucide (для рендеринга всех иконок из HTML)
lucide.createIcons();

// 2. Эффект плавного появления при загрузке (Reveal)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.reveal');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 150 * index); // Карточки вылетают по очереди
    });
    
    // Запуск AI-печати и ленты событий
    startAIAnalysis();
    generateActivityFeed();
    updateCPUUsage();
});

// 3. Фишка №1: Имитация AI-анализа (Тайпинг-эффект)
const aiMessages = [
    "Сканирование рынков... Найдена волатильность в паре BTC/USD.",
    "Анализ завершен. Рекомендуемая позиция: Удержание.",
    "Обнаружен паттерн 'Бычье поглощение' на таймфрейме 1H.",
    "Оптимизация портфеля... Риски снижены на 4.2%.",
    "Zenith Engine: Система работает в штатном режиме."
];

function startAIAnalysis() {
    const aiText = document.getElementById('aiText');
    let msgIndex = 0;
    
    setInterval(() => {
        aiText.style.opacity = '0';
        setTimeout(() => {
            aiText.innerText = aiMessages[msgIndex];
            aiText.style.opacity = '1';
            msgIndex = (msgIndex + 1) % aiMessages.length;
        }, 500);
    }, 4000);
}

// 4. Фишка №3: Динамическая лента активности
function generateActivityFeed() {
    const feed = document.getElementById('activityFeed');
    const activities = [
        { icon: 'arrow-up-right', text: 'Пополнение баланса', time: '2 мин. назад', color: '#10b981' },
        { icon: 'shopping-cart', text: 'Покупка Ethereum', time: '15 мин. назад', color: '#38bdf8' },
        { icon: 'shield', text: 'Новое устройство авторизовано', time: '1 час назад', color: '#a855f7' }
    ];

    feed.innerHTML = activities.map(act => `
        <div class="activity-item" style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
            <div style="background: ${act.color}20; color: ${act.color}; padding: 8px; border-radius: 10px;">
                <i data-lucide="${act.icon}" style="width: 18px; height: 18px;"></i>
            </div>
            <div style="flex: 1;">
                <p style="font-size: 14px; font-weight: 600;">${act.text}</p>
                <p style="font-size: 12px; color: #94a3b8;">${act.time}</p>
            </div>
        </div>
    `).join('');
    lucide.createIcons(); // Перерисовываем иконки в ленте
}

// 5. Главный график (Chart.js)
const ctx = document.getElementById('zenithChart').getContext('2d');
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

const zenithChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['01:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'],
        datasets: [{
            data: [65, 78, 72, 85, 81, 95, 92],
            borderColor: '#38bdf8',
            borderWidth: 3,
            fill: true,
            backgroundColor: gradient,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#64748b' } },
            x: { grid: { display: false }, ticks: { color: '#64748b' } }
        }
    }
});

// 6. Смена темы (Изменение CSS-переменной)
function changeTheme(color) {
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--accent-glow', color + '40');
    
    // Обновляем график под новый цвет
    zenithChart.data.datasets[0].borderColor = color;
    zenithChart.update();
    
    showNotification(`Тема изменена на ${color}`);
}

// 7. Уведомления (Toast)
function showNotification(msg) {
    const toast = document.getElementById('toast');
    const msgElement = document.getElementById('toastMsg');
    
    msgElement.innerText = msg;
    toast.style.right = '40px';
    
    setTimeout(() => {
        toast.style.right = '-400px';
    }, 3000);
}

// 8. Имитация пополнения баланса
let balance = 128450;
function triggerAction(type) {
    if (type === 'deposit') {
        balance += 1500;
        showNotification("Успешное пополнение: +$1,500.00");
    } else {
        balance -= 500;
        showNotification("Вывод средств обработан");
    }
    document.getElementById('mainBalance').innerText = `$${balance.toLocaleString()}.00`;
}

// 9. Имитация загрузки CPU в статус-баре
function updateCPUUsage() {
    const fill = document.getElementById('cpu-fill');
    setInterval(() => {
        const usage = Math.floor(Math.random() * (40 - 15) + 15);
        fill.style.width = usage + '%';
    }, 3000);
}
