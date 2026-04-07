/**
 * NOLLY P1LS - Ultimate Night Vibe Logic
 * Full System: Artist DB + AI Bot + VIP Map + Booking
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. РАСШИРЕННАЯ БАЗА ДАННЫХ АРТИСТОВ ---
    const artistsData = {
        buda: {
            name: "OG BUDA",
            date: "10 МАЯ 2026",
            price: "3200₽",
            time: "01:30 - 02:30",
            desc: "Григорий Ляхов, более известный как OG Buda — лидер объединения Melon Music. Он принес в Россию звук Детройта и заставил всех полюбить сложный неймдроппинг. Его шоу в P1LS — это не просто концерт, а закрытая тусовка 'для своих' с мощнейшей энергетикой.",
            clubShow: "Специальный сет с участием секретных гостей из Melon Music. Готовьтесь к самому громкому слэму на Патриках."
        },
        mayot: {
            name: "MAYOT",
            date: "17 МАЯ 2026",
            price: "2900₽",
            time: "01:00 - 02:00",
            desc: "Артем Маёт — главный романтик и экспериментатор новой волны. От агрессивного трэпа до мелодичного R&B. В этот вечер клуб погрузится в неоновый туман под звуки 'Ghetto Garden'.",
            clubShow: "Визуальное шоу 'Flower Vibe'. Весь зал будет украшен живыми цветами и залит розовым неоном."
        },
        platina: {
            name: "ПЛАТИНА",
            date: "24 МАЯ 2026",
            price: "3500₽",
            time: "02:00 - 03:00",
            desc: "Роберт Платина — икона стиля и создатель легендарного вайба 'Sosa Muzik'. Артист, чей голос стал синонимом роскошной ночной жизни. Его появление — редкий эксклюзив для элитарного сообщества P1LS.",
            clubShow: "Презентация эксклюзивных аранжировок. Только тяжелый люкс и чистый звук Void."
        },
        feduk: {
            name: "FEDUK",
            date: "31 МАЯ 2026",
            price: "3100₽",
            time: "01:00 - 02:00",
            desc: "Федор Инсаров — артист, который не нуждается в представлении. От 'Розового вина' до хаус-экспериментов. Его музыка идеально резонирует с концепцией Moscow Night в нашем клубе.",
            clubShow: "Летний Live-сет. Первый глоток жаркого сезона под открытым небом или в главном зале."
        },
        saluki: {
            name: "SALUKI",
            date: "05 ИЮНЯ 2026",
            price: "3300₽",
            time: "02:15 - 03:15",
            desc: "Сеня SALUKI — архитектор звука. Его музыка — это слоеный пирог из смыслов, битов и атмосферы. В P1LS он представит программу, адаптированную под ночной клубный грув.",
            clubShow: "Иммерсивное шоу 'WILD EAST'. Свет и звук будут синхронизированы с каждым ударом сердца."
        },
        666: {
            name: "666 DAY",
            date: "06 ИЮНЯ 2026",
            price: "5000₽",
            time: "22:00 - 06:00",
            desc: "Финальная точка сезона. День, когда реальность NOLLY P1LS достигнет своего пика. Имена артистов будут открываться каждый час.",
            clubShow: "Total Black Event. Вход только в черном. Весь клуб станет одной большой VIP-ложей."
        }
    };

    // --- 2. МОДАЛКА АРТИСТА ---
    const artistModal = document.getElementById('artistModal');
    const detailsContainer = document.getElementById('artist-details');

    window.openArtistModal = (id) => {
        const data = artistsData[id];
        if (!data) return;

        detailsContainer.innerHTML = `
            <div class="modal-artist-head">
                <div>
                    <h2 class="cyan">${data.name}</h2>
                    <p style="color:var(--pink); font-weight:700;">${data.date}</p>
                </div>
                <div class="modal-price">ВХОД: ${data.price}</div>
            </div>
            <div class="modal-desc-text">
                <p style="margin-bottom:20px; font-size: 0.9rem; line-height: 1.6;">${data.desc}</p>
                <div class="modal-club-info">
                    <p><strong>START:</strong> ${data.time}</p>
                    <p><strong>LOCATION:</strong> MALAYA BRONNAYA, PATRIKI</p>
                    <p><strong>DRESS:</strong> NOLLY STYLE / BLACK LUXE</p>
                    <p style="margin-top:15px; color:var(--cyan); font-style: italic;">${data.clubShow}</p>
                </div>
            </div>
            <button class="btn-glow-pink" onclick="closeArtistModal(); openBooking();" style="margin-top:25px;">ЗАБРОНИРОВАТЬ МЕСТО</button>
        `;
        artistModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closeArtistModal = () => {
        artistModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // --- 3. AI ASSISTANT (VIBE LOGIC) ---
    const botMsgs = document.getElementById('bot-messages');
    const botOpts = document.getElementById('bot-options');
    const botUI = document.getElementById('bot-ui');

    const botTree = {
        start: {
            msg: "Привет! Я твой гид по ночной реальности NOLLY P1LS. Что тебя интересует?",
            options: [
                { text: "Афиша выступлений", next: "soon_lineup" },
                { text: "Бронь VIP стола", next: "vip_info" },
                { text: "Дресс-код и вход", next: "dresscode" }
            ]
        },
        soon_lineup: {
            msg: "Ближайшие ночи: OG BUDA, MAYOT, ПЛАТИНА. Скоро: FEDUK и SALUKI. Показать даты?",
            options: [{ text: "Да, покажи афишу", next: "action_scroll_soon" }, { text: "В начало", next: "start" }]
        },
        vip_info: {
            msg: "VIP в NOLLY P1LS — это статус и приватность. Депозиты от 150.000₽. Показать схему?",
            options: [{ text: "Открыть Blueprint", next: "action_map" }, { text: "Забронировать", next: "action_book" }]
        },
        dresscode: {
            msg: "Наш стиль: Night Moscow x LA Luxury. 18+, FC/DC. В спортивках вход закрыт.",
            options: [{ text: "Принято", next: "start" }]
        },
        action_map: { msg: "Разворачиваю чертежи VIP-зоны...", options: [{ text: "Ок", next: "start" }] },
        action_scroll_soon: { msg: "Листаю к анонсам...", options: [{ text: "Ок", next: "start" }] },
        action_book: { msg: "Открываю форму резерва...", options: [{ text: "Ок", next: "start" }] }
    };

    function botStep(key) {
        if (key === "action_map") openVipMap();
        if (key === "action_scroll_soon") scrollToSection('soon');
        if (key === "action_book") openBooking();

        const step = botTree[key] || botTree.start;
        botMsgs.innerHTML += `<div class="bot-msg-in"><span>ASSISTANT:</span> ${step.msg}</div>`;
        botOpts.innerHTML = '';
        step.options.forEach(o => {
            const b = document.createElement('button');
            b.innerText = o.text;
            b.onclick = () => {
                botMsgs.innerHTML += `<div class="bot-msg-out"><span>ВЫ:</span> ${o.text}</div>`;
                setTimeout(() => botStep(o.next), 500);
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

    // --- 4. МОДАЛКИ И СКРОЛЛ ---
    const vipModal = document.getElementById('vipModal');
    const bookModal = document.getElementById('bookModal');

    window.openVipMap = () => { vipModal.style.display = 'block'; document.body.style.overflow = 'hidden'; };
    window.closeVipMap = () => { vipModal.style.display = 'none'; document.body.style.overflow = 'auto'; };
    window.openBooking = () => { bookModal.style.display = 'block'; document.body.style.overflow = 'hidden'; };
    window.closeBooking = () => { bookModal.style.display = 'none'; document.body.style.overflow = 'auto'; };

    window.scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };

    window.onclick = (e) => {
        if (e.target == vipModal) closeVipMap();
        if (e.target == bookModal) closeBooking();
        if (e.target == artistModal) closeArtistModal();
    };

    // Плавное появление элементов
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "1s ease-out";
        observer.observe(el);
    });

    // Маска телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 0) e.target.value = '+7 (' + v.substring(1,4) + ') ' + v.substring(4,7) + '-' + v.substring(7,11);
        });
    }

    // Форма бронирования
    document.getElementById('bookingForm').onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        alert(`SOSA, ${name}! Заявка в NOLLY P1LS принята. Ожидайте звонка консьержа.`);
        closeBooking();
    };

    // Выбор стола на карте
    document.querySelectorAll('.table-group').forEach(t => {
        t.onclick = () => {
            const body = t.querySelector('.t-body');
            if (body.classList.contains('free')) {
                alert(`Стол №${body.innerText} выбран. Переходим к оформлению.`);
                closeVipMap();
                openBooking();
            } else {
                alert('Этот стол уже забронирован под приватное мероприятие.');
            }
        };
    });

    const ballsBtn = document.querySelector('.balls-btn');
    if (ballsBtn) ballsBtn.onclick = () => alert('LOVE IS IN THE AIR. SEE YOU AT NOLLY P1LS <3');
});
