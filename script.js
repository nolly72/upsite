/**
 * NOLLY P1LS - Official Logic
 * Полный функционал: Бронирование, Новости, Плавный скролл
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. ПОИСК ГЛАВНЫХ ЭЛЕМЕНТОВ
    const modal = document.getElementById('bookingModal');
    const bookingForm = document.getElementById('bookingForm');
    const phoneInput = document.getElementById('phone');

    // 2. ПЛАВНАЯ НАВИГАЦИЯ К СЕКЦИЯМ
    // Срабатывает при клике на кнопку "НОВОСТИ"
    window.scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Отступ под шапку сайта
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // 3. ФУНКЦИИ МОДАЛЬНОГО ОКНА (ОТКРЫТЬ / ЗАКРЫТЬ)
    window.openBooking = () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Запрещаем скролл страницы

        // Эффект плавного появления контента
        const content = modal.querySelector('.modal-content');
        content.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            content.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            content.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);
    };

    window.closeBooking = () => {
        const content = modal.querySelector('.modal-content');
        content.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Возвращаем скролл страницы
        }, 300);
    };

    // Закрытие при клике мимо окна
    window.onclick = (event) => {
        if (event.target === modal) {
            closeBooking();
        }
    };

    // 4. МАСКА ДЛЯ ВВОДА ТЕЛЕФОНА
    // Автоматически добавляет +7, скобки и дефисы
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Только цифры
        let formatted = "";

        if (value.length > 0) {
            formatted = "+7 ";
            if (value.length > 1) {
                formatted += "(" + value.substring(1, 4);
            }
            if (value.length > 4) {
                formatted += ") " + value.substring(4, 7);
            }
            if (value.length > 7) {
                formatted += "-" + value.substring(7, 9);
            }
            if (value.length > 9) {
                formatted += "-" + value.substring(9, 11);
            }
        }
        e.target.value = formatted;
    });

    // 5. ОБРАБОТКА ФОРМЫ БРОНИРОВАНИЯ
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = bookingForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        
        // Визуальная имитация отправки
        submitBtn.innerText = 'ОТПРАВКА...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            // Успешный результат
            alert(`SOSA! Заявка в NOLLY P1LS принята.\nНаш менеджер наберет вас на номер ${phoneInput.value}.\nУвидимся ночью!`);
            
            // Сброс всех полей
            bookingForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            closeBooking();
        }, 1500);
    });
});
