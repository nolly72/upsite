// 1. Инициализация иконок Lucide
lucide.createIcons();

// 2. Данные устройств (Имитация базы данных)
const devices = [
    { id: 1, name: 'Система освещения', room: 'Гостиная', icon: 'sun', status: true },
    { id: 2, name: 'Климат-контроль', room: 'Весь дом', icon: 'wind', status: true },
    { id: 3, name: 'Аудиосистема Hi-Fi', room: 'Спальня', icon: 'music', status: false },
    { id: 4, name: 'Умные шторы', room: 'Кухня', icon: 'layers', status: false }
];

// 3. Рендер устройств в "Быстрый доступ"
const devicesContainer = document.getElementById('devices-container');

function renderDevices() {
    devicesContainer.innerHTML = devices.map(device => `
        <div onclick="toggleDevice(${device.id})" class="device-item ${device.status ? 'active-device-luxury' : ''} glass-card" style="padding: 15px; margin-bottom: 10px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-radius: 20px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <i data-lucide="${device.icon}" style="width: 20px; height: 20px;"></i>
                <div>
                    <p style="font-weight: 600; font-size: 14px;">${device.name}</p>
                    <p style="font-size: 11px; opacity: 0.6;">${device.room}</p>
                </div>
            </div>
            <div class="status-indicator" style="width: 8px; height: 8px; border-radius: 50%; background: ${device.status ? '#fff' : '#94a3b8'}; box-shadow: ${device.status ? '0 0 10px #fff' : 'none'};"></div>
        </div>
    `).join('');
    
    // Перерисовываем иконки после обновления HTML
    lucide.createIcons();
}

function toggleDevice(id) {
    const device = devices.find(d => d.id === id);
    if (device) {
        device.status = !device.status;
        renderDevices();
        console.log(`Устройство "${device.name}" теперь ${device.status ? 'ВКЛ' : 'ВЫКЛ'}`);
    }
}

// 4. Логика управления температурой
const tempSlider = document.getElementById('temp-slider');
const tempVal = document.getElementById('temp-val');

tempSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    tempVal.innerText = value;
    
    // Эффект свечения в зависимости от температуры (холодно - синий, тепло - красный)
    const circle = document.querySelector('.temp-circle');
    const hue = 200 - (value - 16) * 10; // Меняем оттенок
    circle.style.borderColor = `hsl(${hue}, 80%, 60%)`;
    circle.style.boxShadow = `0 0 30px hsla(${hue}, 80%, 60%, 0.3)`;
});

// 5. Переключение темной/светлой темы
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Сохраняем выбор пользователя (опционально для портфолио - это плюс)
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 6. Отрисовка премиального графика (Chart.js)
const ctx = document.getElementById('luxuryChart').getContext('2d');

// Создаем градиент для графика
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

const luxuryChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [{
            label: 'Потребление kW',
            data: [1.1, 1.8, 1.5, 2.2, 1.9, 2.8, 2.4],
            borderColor: '#3b82f6',
            borderWidth: 4,
            fill: true,
            backgroundColor: gradient,
            tension: 0.4, // Плавные линии
            pointBackgroundColor: '#fff',
            pointBorderColor: '#3b82f6',
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                display: false, // Убираем сетку для чистоты
                beginAtZero: true
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { family: 'Inter' } }
            }
        }
    }
});

// 7. Имитация "живых" уведомлений
setTimeout(() => {
    console.log("System: Все системы работают корректно.");
}, 2000);

// Запуск рендера при загрузке
document.addEventListener('DOMContentLoaded', () => {
    renderDevices();
    
    // Проверка сохраненной темы
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
});
