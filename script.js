heredocument.addEventListener('DOMContentLoaded', () => {
    // Керакли элементларни топиб оламиз
    const loginButton = document.getElementById('login-button');
    const authModal = document.getElementById('auth-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // "Kirish" тугмаси босилганда ойнани очамиз
    loginButton.addEventListener('click', () => {
        authModal.classList.remove('hidden');
    });

    // "Х" тугмаси босилганда ойнани ёпамиз
    closeModalButton.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    // Ойнанинг ташқариси босилганда уни ёпамиз
    authModal.addEventListener('click', (event) => {
        if (event.target === authModal) {
            authModal.classList.add('hidden');
        }
    });

    // "Kirish" табига ўтиш
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    // "Ro'yxatdan o'tish" табига ўтиш
    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Логин формасини текшириш
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Саҳифани қайта юкланишини олдини оламиз
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Админни текширамиз
        if (username === 'admin' && password === 'sky123') {
            alert('Xush kelibsiz, admin!');
            authModal.classList.add('hidden'); // Ойнани ёпамиз
            loginForm.reset(); // Формани тозалаймиз
        } else {
            alert('Login yoki parol xato!');
        }
    });

    // (Келажакда рўйхатдан ўтиш логикаси шу ерга қўшилади)
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Hozircha ro\'yxatdan o\'tish ishlamaydi.');
    });

});
