/**
 * NOLLY P1LS - Official Script
 * Магия фонарика + Анимация появления
 */

document.addEventListener('DOMContentLoaded', () => {
    const spotlight = document.querySelector('.spotlight');
    const cards = document.querySelectorAll('.card');

    // 1. Управление фонариком (Spotlight)
    // Используем переменную, чтобы обновлять координаты только если мышь реально двигалась
    let mouseX = 0;
    let mouseY = 0;

    const updateSpotlight = (e) => {
        // Проверяем, не мобильное ли это устройство (на тачскринах фонарик мешает)
        if (window.innerWidth > 1024) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Используем requestAnimationFrame для максимальной плавности (60 FPS)
            requestAnimationFrame(() => {
                document.documentElement.style.setProperty('--x', `${mouseX}px`);
                document.documentElement.style.setProperty('--y', `${mouseY}px`);
            });
        }
    };

    window.addEventListener('mousemove', updateSpotlight);

    // 2. Анимация появления карточек при скролле (Scroll Reveal)
    // Это создает эффект "дорогого" сайта, когда контент плавно выплывает
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Сработает, когда 10% карточки покажется на экране
    });

    cards.forEach(card => {
        // Начальное состояние для анимации (можно также прописать в CSS)
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
        
        revealOnScroll.observe(card);
    });

    // 3. Параллакс эффект для фото внутри карточек
    // Когда ведешь мышкой по карточке, фото внутри слегка смещается
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const img = card.querySelector('.bg-img');
            if (img && window.innerWidth > 1024) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // положение мыши внутри карточки
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const moveX = (x - centerX) / 25;
                const moveY = (y - centerY) / 25;

                img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
            }
        });

        // Возвращаем фото в центр, когда мышь уходит
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.bg-img');
            if (img) {
                img.style.transform = `scale(1) translate(0, 0)`;
            }
        });
    });
});

// 4. Дополнительный CSS класс для анимации появления (добавляется через JS)
// Ты можешь добавить это в style.css, но для надежности оставим логику тут
const style = document.createElement('style');
style.innerHTML = `
    .card.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
