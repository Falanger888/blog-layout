document.addEventListener('DOMContentLoaded', function () {
    // --- Мобильное меню ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    // --- Валидация формы ---
    const form = document.getElementById('order-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const nameError = nameInput.nextElementSibling;
    const phoneError = phoneInput.nextElementSibling;

    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Il nome è obbligatorio.';
            return false;
        } else if (nameInput.value.length < 2) {
            nameError.textContent = 'Il nome deve avere almeno 2 caratteri.';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }

    function validatePhone() {
        const phoneRegex = /^\d{8,15}$/;
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Il numero di telefono è obbligatorio.';
            return false;
        } else if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Inserisci un numero valido (solo numeri, 8-15 cifre).';
            return false;
        } else {
            phoneError.textContent = '';
            return true;
        }
    }

    // Валидация в реальном времени
    nameInput.addEventListener('input', validateName);
    phoneInput.addEventListener('input', validatePhone);

    // Отправка формы
    form.addEventListener('submit', function (event) {
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();

        if (!isNameValid || !isPhoneValid) {
            event.preventDefault();
        }
    });

    // --- Таймер ---
    function startTimer(durationInMinutes) {
        let timer = durationInMinutes * 60;
        const minutesElement = document.querySelector('.minutes');
        const secondsElement = document.querySelector('.seconds');

        function updateDisplay() {
            const minutes = parseInt(timer / 60, 10);
            const seconds = parseInt(timer % 60, 10);

            minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
            secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;

            if (--timer < 0) {
                clearInterval(intervalId);
                minutesElement.textContent = "00";
                secondsElement.textContent = "00";
            }
        }

        updateDisplay();
        const intervalId = setInterval(updateDisplay, 1000);
    }

    startTimer(30); // Таймер на 30 минут
});