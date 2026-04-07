/**
 * NOLLY P1LS - Official Night Vibe Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AI ASSISTANT (VIBE LOGIC) ---
    const botMsgs = document.getElementById('bot-messages');
    const botOpts = document.getElementById('bot-options');
    const botUI = document.getElementById('bot-ui');

    const botTree = {
        start: {
            msg: "Привет! Я твой гид по ночной реальности NOLLY P1LS. Что тебя интересует?",
            options: [
                { text: "Афиша выступлений", next: "soon_lineup" },
                { text: "Бронь VIP стола", next: "vip_info" },
                { text: "Меню кухни и бара", next: "menu_bot" },
                { text: "Какой дресс-код?", next: "dresscode" }
            ]
        },
        soon_lineup: {
            msg: "Ближайшие ночи обещают быть жаркими: FEDUK, SALUKI и секретный 666 DAY. Показать даты?",
            options: [
                { text: "Да, пролистай вниз", next: "action_scroll_soon" },
                { text: "В начало", next: "start" }
            ]
        },
        vip_info: {
            msg: "VIP в NOLLY P1LS — это статус, приватность и лучший звук. Показать карту?",
            options: [
                { text: "Открыть Blueprint", next: "action_map" },
                { text: "Узнать депозиты", next: "prices" }
            ]
        },
        prices: {
            msg: "Депозиты начинаются от 150.000₽ в зависимости от расположения. Менеджер наберет тебя после брони.",
            options: [{ text: "Окей, забронировать", next: "action_book" }]
        },
        dresscode: {
            msg: "Наш стиль: Night Moscow x LA Luxury. Black Tie, Fashion Archive или элитный Streetwear. В спорте вход закрыт.",
            options: [{ text: "Принято", next: "start" }]
        },
        menu_bot: {
            msg: "15 видов изысканных блюд и 15 позиций элитного бара уже ждут тебя. Показать меню?",
            options: [{ text: "Да, скролл к меню", next: "action_scroll_menu" }]
        },
        // Триггеры действий
        action_map: { msg: "Открываю схему VIP-зала...", options: [{ text: "Ок", next: "start" }] },
        action_scroll_soon: { msg: "Листаю к будущим ивентам...", options: [{ text: "Ок", next: "start" }] },
        action_scroll_menu: { msg: "Открываю барную карту...", options: [{ text: "Ок", next: "start" }] },
        action_book: { msg: "Открываю форму резерва...", options: [{ text: "Ок", next: "start" }] }
    };

    function botStep(key) {
        if (key === "action_map") openVipMap();
        if (key === "action_scroll_soon") scrollToSection('soon');
        if (key === "action_scroll_menu") scrollToSection('menu');
        if (key === "action_book") openBooking();

        const step = botTree[key] || botTree.start;
        botMsgs.innerHTML += `<div style="color:var(--cyan); margin-bottom:12px; font-weight:700;">ASSISTANT: ${step.msg}</div>`;
        botOpts.innerHTML = '';

        step.options.forEach(o => {
            const b = document.createElement('button');
            b.innerText = o.text;
            b.onclick = () => {
                botMsgs.innerHTML += `<div style="text-align:right; margin-bottom:12px; color:var(--pink);">ВЫ: ${o.text}</div>`;
                setTimeout(() => botStep(o.next), 400);
                botMsgs.scrollTop = botMsgs.scrollHeight;
            };
            botOpts.appendChild(b);
        });
        botMsgs.scrollTop = botMsgs.scrollHeight;
    }

    window.toggleBot = () => {
        const isHidden = botUI.style.display === 'none' || botUI.style.display === '';
        botUI.style.display = isHidden ? 'flex' : 'none';
        if (isHidden && botMsgs.innerHTML === '') botStep('start');
    };

    // --- 2. ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ (REVEAL) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. УПРАВЛЕНИЕ МОДАЛКАМИ ---
    const vipModal = document.getElementById('vipModal');
    const bookModal = document.getElementById('bookModal');

    window.openVipMap = () => { vipModal.style.display = 'block'; document.body.style.overflow = 'hidden'; };
    window.closeVipMap = () => { vipModal.style.display = 'none'; document.body.style.overflow = 'auto'; };

    window.openBooking = () => { bookModal.style.display = 'block'; document.body.style.overflow = 'hidden'; };
    window.closeBooking = () => { bookModal.style.display = 'none'; document.body.style.overflow = 'auto'; };

    window.onclick = (e) => {
        if (e.target == vipModal) closeVipMap();
        if (e.target == bookModal) closeBooking();
    };

    // --- 4. НАВИГАЦИЯ И МАСКА ТЕЛЕФОНА ---
    window.scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };

    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 0) e.target.value = '+7 (' + v.substring(1,4) + ') ' + v.substring(4,7) + '-' + v.substring(7,11);
    });

    document.getElementById('bookingForm').onsubmit = (e) => {
        e.preventDefault();
        alert('SOSA! Заявка в NOLLY P1LS принята. Ожидайте звонка от нашего хостес.');
        closeBooking();
    };

    // Интерактив столов
    document.querySelectorAll('.t-item.free').forEach(t => {
        t.onclick = () => {
            alert(`Стол №${t.innerText} выбран. Переходим к бронированию.`);
            closeVipMap();
            openBooking();
        };
    });

    // Кнопка BALLS <3
    const ballsBtn = document.querySelector('.balls-btn');
    if (ballsBtn) {
        ballsBtn.onclick = () => {
            alert('LOVE IS IN THE AIR. SEE YOU AT NOLLY P1LS <3');
        };
    }
});
