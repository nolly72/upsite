/**
 * NOLLY P1LS - Ultimate Club Logic & AI Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ЛОГИКА ИИ-БОТА (Расширенная база знаний) ---
    const botMsgs = document.getElementById('bot-msgs');
    const botOpts = document.getElementById('bot-opts');
    const botUI = document.getElementById('bot-ui');

    const botTree = {
        start: {
            msg: "Салют! Я нейро-хостес NOLLY P1LS. Чем могу помочь?",
            options: [
                { text: "Забронировать VIP", next: "vip_go" },
                { text: "Посмотреть меню", next: "menu_view" },
                { text: "Кто сегодня?", next: "artists" }
            ]
        },
        vip_go: {
            msg: "VIP-зона — это приватность и лучший звук. Показать карту столов?",
            options: [
                { text: "Да, покажи карту", next: "action_map" },
                { text: "Какие депозиты?", next: "prices" }
            ]
        },
        prices: {
            msg: "Депозиты: столы у танцпола от 80к, ложи от 200к. Бронируем?",
            options: [
                { text: "Да, форму брони", next: "action_book" },
                { text: "В начало", next: "start" }
            ]
        },
        menu_view: {
            msg: "У нас 10 эксклюзивных блюд и 10 авторских коктейлей. Что именно интересно?",
            options: [
                { text: "Кухня (Wagyu, Устрицы...)", next: "kitchen" },
                { text: "Бар (Crystal Shot, Dom Perignon...)", next: "bar" }
            ]
        },
        kitchen: {
            msg: "Наш шеф рекомендует Wagyu Steak и Lobster Roll. Показать весь список?",
            options: [{ text: "Скролл к меню", next: "action_scroll_menu" }]
        },
        bar: {
            msg: "В баре 10 топовых позиций: от авторских шотов до Dom Perignon.",
            options: [{ text: "Скролл к бару", next: "action_scroll_menu" }]
        },
        artists: {
            msg: "Сегодня на сцене OG BUDA. На след. неделе — MAYOT и ПЛАТИНА. Ждем тебя!",
            options: [{ text: "Супер", next: "start" }]
        },
        action_map: { msg: "Открываю blueprint клуба...", options: [{ text: "Ок", next: "start" }] },
        action_book: { msg: "Открываю форму...", options: [{ text: "Ок", next: "start" }] },
        action_scroll_menu: { msg: "Спускаемся в ресторан...", options: [{ text: "Ок", next: "start" }] }
    };

    function botStep(key) {
        // Выполнение действий триггеров
        if (key === "action_map") openVipMap();
        if (key === "action_book") openBooking();
        if (key === "action_scroll_menu") scrollToSection('menu');

        const step = botTree[key] || botTree.start;
        botMsgs.innerHTML += `<div style="color:var(--n-blue); margin-bottom:10px;">AI: ${step.msg}</div>`;
        botOpts.innerHTML = '';

        step.options.forEach(o => {
            const b = document.createElement('button');
            b.innerText = o.text;
            b.onclick = () => {
                botMsgs.innerHTML += `<div style="text-align:right; margin-bottom:10px; color:var(--n-pink);">Вы: ${o.text}</div>`;
                setTimeout(() => botStep(o.next), 300);
                botMsgs.scrollTop = botMsgs.scrollHeight;
            };
            botOpts.appendChild(b);
        });
        botMsgs.scrollTop = botMsgs.scrollHeight;
    }

    window.toggleBot = () => {
        const hide = botUI.style.display === 'none' || botUI.style.display === '';
        botUI.style.display = hide ? 'flex' : 'none';
        if (hide && botMsgs.innerHTML === '') botStep('start');
    };

    // --- 2. МОДАЛЬНЫЕ ОКНА (VIP КАРТА И БРОНЬ) ---
    const vModal = document.getElementById('vipModal');
    const bModal = document.getElementById('bookModal');

    window.openVipMap = () => { 
        vModal.style.display = 'block'; 
        document.body.style.overflow = 'hidden'; 
    };
    window.closeVipMap = () => { 
        vModal.style.display = 'none'; 
        document.body.style.overflow = 'auto'; 
    };

    window.openBooking = () => { 
        bModal.style.display = 'block'; 
        document.body.style.overflow = 'hidden'; 
    };
    window.closeBooking = () => { 
        bModal.style.display = 'none'; 
        document.body.style.overflow = 'auto'; 
    };

    // Закрытие по клику вне контента
    window.onclick = (e) => {
        if (e.target == vModal) closeVipMap();
        if (e.target == bModal) closeBooking();
    };

    // --- 3. НАВИГАЦИЯ И ФОРМА ---
    window.scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
    };

    // Маска телефона для формы
    const tel = document.getElementById('phone');
    if (tel) {
        tel.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 0) e.target.value = '+7 (' + v.substring(1,4) + ') ' + v.substring(4,7) + '-' + v.substring(7,11);
        });
    }

    document.getElementById('resForm').onsubmit = (e) => {
        e.preventDefault();
        alert('SOSA! Заявка в NOLLY P1LS принята. Скоро наберем!');
        closeBooking();
    };

    // Интерактив столов на карте
    document.querySelectorAll('.tbl.free').forEach(t => {
        t.onclick = () => {
            alert(`Стол №${t.querySelector('span').innerText} выбран.`);
            closeVipMap();
            openBooking();
        };
    });

    // Кнопка BALLS <3
    const ballsBtn = document.querySelector('.balls-btn');
    if (ballsBtn) {
        ballsBtn.onclick = () => {
            alert('LOVE IS IN THE AIR <3');
        };
    }
});
