/**
 * NOLLY P1LS - Official Logic & AI Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ЛОГИКА ИИ-БОТА ---
    const botMessages = document.getElementById('bot-messages');
    const botOptions = document.getElementById('bot-options');
    const botBody = document.getElementById('bot-body');

    // База знаний бота (Вопросы и Ответы)
    const aiData = {
        start: {
            msg: "Салют! Я виртуальный хостес NOLLY P1LS. Чем могу помочь?",
            options: [
                { text: "Как забронировать стол?", next: "booking" },
                { text: "Какой сегодня дресс-код?", next: "dresscode" },
                { text: "Кто выступает в пятницу?", next: "lineup" }
            ]
        },
        booking: {
            msg: "Бронирование доступно через кнопку RESERVE в меню или прямо на схеме столов. Какие условия интересуют?",
            options: [
                { text: "Депозит за стол", next: "deposit" },
                { text: "VIP-локации", next: "vip_info" },
                { text: "Назад", next: "start" }
            ]
        },
        deposit: {
            msg: "Депозиты начинаются от 50.000₽ за малый стол и от 150.000₽ за ложу. Хотите посмотреть свободные места?",
            options: [
                { text: "Да, открыть схему", next: "open_map_action" },
                { text: "Нужен менеджер", next: "manager" }
            ]
        },
        vip_info: {
            msg: "Наши VIP-ложи находятся на втором уровне с отдельным баром и выходом на Backstage. Интересует приватность?",
            options: [
                { text: "Да, сколько мест?", next: "vip_capacity" },
                { text: "Назад", next: "start" }
            ]
        },
        vip_capacity: {
            msg: "VIP-ложи вмещают до 12 человек. В стоимость входит личный официант и охрана.",
            options: [{ text: "Окей, понял", next: "start" }]
        },
        dresscode: {
            msg: "Мы ценим стиль. Сегодня у нас Black Tie & Fashion Forward. Никакого спорта и масс-маркета.",
            options: [{ text: "А в кроссовках можно?", next: "shoes" }]
        },
        shoes: {
            msg: "Только если это лимитированные коллаборации. Фейс-контроль очень строгий.",
            options: [{ text: "Принято", next: "start" }]
        },
        lineup: {
            msg: "В эту пятницу у нас OG BUDA. На следующей — MAYOT. Ждем тебя на разнос!",
            options: [{ text: "Круто, спасибо!", next: "start" }]
        },
        manager: {
            msg: "Менеджер ответит вам по номеру в форме бронирования. Оставьте заявку!",
            options: [{ text: "Ок", next: "start" }]
        }
    };

    function renderStep(stepKey) {
        if (stepKey === "open_map_action") {
            openMap();
            stepKey = "start";
        }
        
        const data = aiData[stepKey];
        botMessages.innerHTML += `<div class="bot-msg bot">${data.msg}</div>`;
        botOptions.innerHTML = '';
        
        data.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerText = opt.text;
            btn.onclick = () => {
                botMessages.innerHTML += `<div class="bot-msg user-msg">${opt.text}</div>`;
                setTimeout(() => renderStep(opt.next), 500);
                botMessages.scrollTop = botMessages.scrollHeight;
            };
            botOptions.appendChild(btn);
        });
        botMessages.scrollTop = botMessages.scrollHeight;
    }

    window.toggleBot = () => {
        const isHidden = botBody.style.display === 'none' || botBody.style.display === '';
        botBody.style.display = isHidden ? 'flex' : 'none';
        if (isHidden && botMessages.innerHTML === '') renderStep('start');
    };

    // --- 2. СХЕМА КЛУБА (МОДАЛКИ) ---
    const mapModal = document.getElementById('mapModal');
    
    window.openMap = () => {
        mapModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closeMap = () => {
        mapModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // --- 3. ПЛАВНЫЙ СКРОЛЛ ---
    window.scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    // --- 4. КЛИКИ ПО СТОЛАМ ---
    document.querySelectorAll('.table.free').forEach(table => {
        table.onclick = () => {
            alert(`Стол №${table.innerText} выбран. Переходим к бронированию...`);
            closeMap();
            openBooking(); // функция из старого кода, убедись что она есть
        };
    });

    // --- 5. УПРАВЛЕНИЕ МОДАЛКОЙ БРОНИ ---
    // (Повторяем для автономности файла)
    const bookingModal = document.getElementById('bookingModal');
    window.openBooking = () => {
        if(bookingModal) bookingModal.style.display = 'block';
    };
    window.closeBooking = () => {
        if(bookingModal) bookingModal.style.display = 'none';
    };

    // Закрытие модалок по клику вне окна
    window.onclick = (e) => {
        if (e.target == mapModal) closeMap();
        if (e.target == bookingModal) closeBooking();
    };
});
