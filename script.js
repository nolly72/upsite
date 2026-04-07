/**
 * NOLLY P1LS - Vice City Edition Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AI ASSISTANT (VICE STYLE) ---
    const botMsgs = document.getElementById('bot-messages');
    const botOpts = document.getElementById('bot-options');
    const botUI = document.getElementById('bot-ui');

    const botTree = {
        start: {
            msg: "Добро пожаловать в неоновую реальность. Я твой Vice-ассистент. Что подсказать?",
            options: [
                { text: "Кто выступает скоро?", next: "soon_lineup" },
                { text: "Как забронировать VIP?", next: "vip_info" },
                { text: "Какой сегодня вайб?", next: "vibe" },
                { text: "Меню кухни и бара", next: "menu_bot" }
            ]
        },
        soon_lineup: {
            msg: "Нас ждет разнос: FEDUK, SALUKI и секретный 666 DAY. Показать даты?",
            options: [
                { text: "Да, покажи афишу", next: "action_scroll_soon" },
                { text: "В начало", next: "start" }
            ]
        },
        vip_info: {
            msg: "VIP в NOLLY P1LS — это приватность и лучший вид на сцену. Показать схему?",
            options: [
                { text: "Открыть карту", next: "action_map" },
                { text: "Узнать про депозиты", next: "prices" }
            ]
        },
        prices: {
            msg: "Депозиты в VIP-зоне начинаются от 150.000₽. Это полный сервис и отдельный бар.",
            options: [{ text: "Понял, спасибо", next: "start" }]
        },
        vibe: {
            msg: "Сегодня Москва превращается в Майами 80-х. Глубокий хаус, неон и коктейли. Готов?",
            options: [{ text: "Всегда готов!", next: "start" }]
        },
        menu_bot: {
            msg: "Wagyu, устрицы и ледяной Dom Perignon уже ждут. Показать меню?",
            options: [{ text: "Скролл к меню", next: "action_scroll_menu" }]
        },
        // Экшн-триггеры
        action_map: { msg: "Разворачиваю чертеж клуба...", options: [{ text: "Ок", next: "start" }] },
        action_scroll_soon: { msg: "Листаю к анонсам...", options: [{ text: "Ок", next: "start" }] },
        action_scroll_menu: { msg: "Открываю барную карту...", options: [{ text: "Ок", next: "start" }] }
    };

    function botStep(key) {
        if (key === "action_map") openVipMap();
        if (key === "action_scroll_soon") scrollToSection('soon');
        if (key === "action_scroll_menu") scrollToSection('menu');

        const step = botTree[key] || botTree.start;
        botMsgs.innerHTML += `<div style="color:var(--cyan); margin-bottom:12px; font-weight:700;">VICE: ${step.msg}</div>`;
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

    // --- 2. ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ (REVEAL АНИМАЦИЯ) ---
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
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        if (!x[2]) e.target.value = x[1] ? '+7' : '';
        else e.target.value = '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });

    document.getElementById('bookingForm').onsubmit = (e) => {
        e.preventDefault();
        alert('VICE CONFIRMED! Ваша заявка в NOLLY P1LS принята. Ожидайте звонка хостес.');
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
});
