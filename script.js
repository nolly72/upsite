/**
 * NOLLY P1LS - Official Club Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ЛОГИКА ИИ-БОТА ---
    const messagesContainer = document.getElementById('messages');
    const optionsContainer = document.getElementById('options');
    const botUI = document.getElementById('bot-ui');

    // База данных бота
    const botLogic = {
        start: {
            msg: "Добро пожаловать в NOLLY P1LS. Я твой проводник в мир ночи. Что подсказать?",
            options: [
                { text: "Как попасть в VIP?", next: "vip_access" },
                { text: "Какой дресс-код?", next: "dress" },
                { text: "Кто сегодня за пультом?", next: "lineup" }
            ]
        },
        vip_access: {
            msg: "VIP-доступ открывает вход в ложи и на Backstage. Столы бронируются по депозиту. Показать схему?",
            options: [
                { text: "Да, покажи столы", next: "action_open_vip" },
                { text: "Условия депозита", next: "deposit" }
            ]
        },
        deposit: {
            msg: "Депозит за стол в VIP-зоне начинается от 100.000₽. В стоимость включен личный хостес и охрана.",
            options: [{ text: "Понял, спасибо", next: "start" }]
        },
        dress: {
            msg: "Мы за стиль. Black Tie, Fashion Archive или элитный Streetwear. В спортивках вход закрыт.",
            options: [{ text: "А в костюме можно?", next: "suit" }]
        },
        suit: {
            msg: "Костюм — идеальный выбор. Наши двери открыты для тебя.",
            options: [{ text: "Отлично", next: "start" }]
        },
        lineup: {
            msg: "Сегодня ждем OG BUDA. На следующей неделе — MAYOT и ПЛАТИНА. Будет жарко.",
            options: [{ text: "Забронировать место", next: "action_open_book" }]
        },
        action_open_vip: { msg: "Открываю схему VIP-зала...", options: [{ text: "Ок", next: "start" }] },
        action_open_book: { msg: "Открываю форму бронирования...", options: [{ text: "Ок", next: "start" }] }
    };

    function showBotStep(stepKey) {
        // Выполнение действий, если шаг — это экшн
        if (stepKey === "action_open_vip") { openVipMap(); }
        if (stepKey === "action_open_book") { openBooking(); }

        const step = botLogic[stepKey] || botLogic.start;
        messagesContainer.innerHTML += `<div style="margin-bottom:10px; color:#00f3ff;">AI: ${step.msg}</div>`;
        optionsContainer.innerHTML = '';

        step.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerText = opt.text;
            btn.onclick = () => {
                messagesContainer.innerHTML += `<div style="margin-bottom:10px; text-align:right;">Вы: ${opt.text}</div>`;
                setTimeout(() => showBotStep(opt.next), 400);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            };
            optionsContainer.appendChild(btn);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    window.toggleBot = () => {
        const isClosed = botUI.style.display === 'none' || botUI.style.display === '';
        botUI.style.display = isClosed ? 'flex' : 'none';
        if (isClosed && messagesContainer.innerHTML === '') showBotStep('start');
    };

    // --- 2. УПРАВЛЕНИЕ МОДАЛКАМИ ---
    const vipModal = document.getElementById('vipModal');
    const bookModal = document.getElementById('bookModal');

    window.openVipMap = () => { vipModal.style.display = 'block'; document.body.style.overflow = 'hidden'; };
    window.closeVipMap = () => { vipModal.style.display = 'none'; document.body.style.overflow = 'auto'; };

    window.openBooking = () => { bookModal.style.display = 'block'; document.body.style.overflow = 'hidden'; };
    window.closeBooking = () => { bookModal.style.display = 'none'; document.body.style.overflow = 'auto'; };

    // Закрытие по клику вне окна
    window.onclick = (e) => {
        if (e.target == vipModal) closeVipMap();
        if (e.target == bookModal) closeBooking();
    };

    // --- 3. СКРОЛЛ И ФОРМА ---
    window.scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };

    const phone = document.getElementById('phone');
    phone.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 0) e.target.value = '+7 (' + v.substring(1,4) + ') ' + v.substring(4,7) + '-' + v.substring(7,9) + '-' + v.substring(9,11);
    });

    document.getElementById('bookForm').onsubmit = (e) => {
        e.preventDefault();
        alert('SOSA! Заявка принята. Ожидайте звонка от NOLLY P1LS.');
        closeBooking();
    };

    // Клики по свободным столам
    document.querySelectorAll('.t.free').forEach(t => {
        t.onclick = () => {
            alert(`Стол №${t.innerText} выбран.`);
            closeVipMap();
            openBooking();
        };
    });
});
