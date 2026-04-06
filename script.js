// 1. Инициализация иконок Lucide
lucide.createIcons();

// 2. БАЗА ДАННЫХ ФУНКЦИЙ (40+ рабочих кнопок)
const auraDatabase = {
    climate: [
        { name: 'Увлажнение воздуха', icon: 'droplets' },
        { name: 'Ионизация серебром', icon: 'wind' },
        { name: 'Очистка HEPA-13', icon: 'filter' },
        { name: 'Подогрев пола (Зал)', icon: 'thermometer-sun' },
        { name: 'Проветривание', icon: 'refresh-cw' },
        { name: 'Ночной бриз', icon: 'moon' },
        { name: 'Осушение стекол', icon: 'cloud-rain' }
    ],
    security: [
        { name: 'Периметр под охрану', icon: 'shield-alert' },
        { name: 'Анти-протечка Aqua', icon: 'waves' },
        { name: 'Блокировка лифта', icon: 'lock' },
        { name: 'Облачная запись 4K', icon: 'video' },
        { name: 'Датчик качества газа', icon: 'alert-triangle' },
        { name: 'Имитация жизни', icon: 'users' },
        { name: 'Face ID Контроль', icon: 'eye' }
    ],
    lighting: [
        { name: 'Тотальный блэкаут', icon: 'power' },
        { name: 'Сцена "Чтение"', icon: 'book-open' },
        { name: 'Вечерний Амбиент', icon: 'sunset' },
        { name: 'Кино-режим RGB', icon: 'clapperboard' },
        { name: 'Максимальная яркость', icon: 'sun' },
        { name: 'Подсветка ступеней', icon: 'grip-horizontal' },
        { name: 'Аврора (Градиент)', icon: 'palette' }
    ]
};

// 3. ЛОГИКА ИИ-АССИСТЕНТА (10 премиальных ответов)
const aiBrain = {
    questions: [
        "Статус системы?", "Кто в гостиной?", "Экономия за день", 
        "Безопасность окон", "Сварить кофе", "Прогноз Aura", 
        "Сценарий Романтик", "Выключить всё", "Защита авто", "Relax музыка"
    ],
    answers: [
        "Все узлы NOLLY AURA функционируют штатно. Ошибок нет.",
        "Датчики движения в гостиной не фиксируют активности.",
        "Сегодня ИИ сэкономил вам 2.4 кВт электроэнергии.",
        "Все окна закрыты и поставлены на электронную блокировку.",
        "Кофемашина прогрета. Ваш эспрессо будет готов через 45 сек.",
        "Завтра в Москве солнечно, +21°C. Рекомендую легкий стиль.",
        "Сценарий активен: свет приглушен, шторы закрыты на 80%.",
        "Система переходит в режим сна. Все приборы обесточены.",
        "Гаражные ворота закрыты. Датчик вибрации авто активен.",
        "Запускаю плейлист 'Luxury Lounge' во всех зонах дома."
    ]
};

// 4. ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ
function switchPage(pageId) {
    // Скрываем все страницы
    document.querySelectorAll('.content-page').forEach(p => p.classList.remove('active'));
    // Убираем активный класс у кнопок меню
    document.querySelectorAll('.nav-item, .tab-btn').forEach(btn => btn.classList.remove('active'));

    // Показываем нужную страницу
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // Рендерим кнопки, если это раздел управления
        if (auraDatabase[pageId]) renderLuxuryGrid(pageId);
    }

    // Делаем кнопку активной
    document.querySelectorAll(`[onclick="switchPage('${pageId}')"]`).forEach(el => el.classList.add('active'));
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 5. РЕНДЕР КНОПОК УПРАВЛЕНИЯ
function renderLuxuryGrid(type) {
    const grid = document.getElementById(`${type}-grid`);
    if (!grid) return;

    grid.innerHTML = auraDatabase[type].map(item => `
        <div class="ctrl-btn-luxury glass" onclick="notif('${item.name} успешно активно')">
            <i data-lucide="${item.icon}"></i>
            <span>${item.name}</span>
        </div>
    `).join('');
    lucide.createIcons();
}

// 6. СИСТЕМА УВЕДОМЛЕНИЙ (Toast)
function notif(msg) {
    const root = document.getElementById('toast-root');
    const toast = document.createElement('div');
    toast.className = 'toast-aura';
    toast.innerText = msg;
    root.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 7. СЕРВИСЫ
function handleService(type) {
    const serviceMap = {
        taxi: "🚕 Бизнес-класс Яндекс Такси прибудет через 4 мин.",
        food: "🍱 Ваш заказ в Яндекс Лавка принят и собирается.",
        fun: "🎭 Подбираю лучшие мероприятия в Москве на вечер..."
    };
    notif(serviceMap[type]);
}

// 8. ИИ ЧАТ
function toggleAIChat() {
    const chat = document.getElementById('ai-interface');
    const isHidden = chat.style.display === 'none' || !chat.style.display;
    chat.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) renderAIHints();
}

function renderAIHints() {
    const hints = document.getElementById('ai-hints');
    hints.innerHTML = aiBrain.questions.map((q, i) => `
        <button class="mode-pill" onclick="askAI(${i})">${q}</button>
    `).join('');
}

function askAI(idx) {
    const msgBox = document.getElementById('ai-messages');
    msgBox.innerHTML += `<div class="msg user">${aiBrain.questions[idx]}</div>`;
    
    setTimeout(() => {
        msgBox.innerHTML += `<div class="msg bot">${aiBrain.answers[idx]}</div>`;
        msgBox.scrollTop = msgBox.scrollHeight;
    }, 500);
}

// 9. СЛАЙДЕР ТЕМПЕРАТУРЫ
const tempSlider = document.getElementById('temp-slider');
if (tempSlider) {
    tempSlider.addEventListener('input', (e) => {
        document.getElementById('temp-val').innerText = e.target.value;
    });
}

// 10. ПРЕМИАЛЬНЫЙ ГРАФИК
const ctx = document.getElementById('luxuryChart');
if (ctx) {
    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                data: [0.8, 1.5, 1.2, 2.3, 1.4, 2.9, 2.1],
                borderColor: '#3b82f6',
                borderWidth: 4,
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
}

// Инициализация стартовых виджетов
document.addEventListener('DOMContentLoaded', () => {
    const activeList = document.getElementById('active-list');
    activeList.innerHTML = `
        <div class="nav-item glass" style="padding: 15px; margin-bottom: 10px;">
            <i data-lucide="music" class="text-gradient"></i> <span>Lo-Fi Chill Radio</span>
        </div>
        <div class="nav-item glass" style="padding: 15px;">
            <i data-lucide="shield" style="color: #10b981;"></i> <span>Периметр защищен</span>
        </div>
    `;
    lucide.createIcons();
});
