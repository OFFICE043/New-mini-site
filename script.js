// Бұл файл index.html-ға <script> тегі арқылы қосылады және сайттың барлық интерактивтілігіне жауап береді

document.addEventListener('DOMContentLoaded', () => {
    // --- Керакли HTML элементларни топиб олиш ---
    const animeGrid = document.getElementById('anime-grid');
    const loading = document.getElementById('loading');
    const searchInput = document.getElementById('search-input');
    const mainTitle = document.getElementById('main-title');
    const loginButton = document.getElementById('login-button');
    const authModal = document.getElementById('auth-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // --- API билан ишлаш ---
    async function fetchAnime(url) {
        loading.style.display = 'block';
        animeGrid.innerHTML = '';

        try {
            const response = await fetch(url);
            const data = await response.json();
            loading.style.display = 'none';

            if (data.data && data.data.length > 0) {
                data.data.forEach(anime => {
                    const animeCard = `
                        <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-gray-700">
                            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" class="w-full h-64 object-cover">
                            <div class="p-3">
                                <h3 class="text-md font-bold text-white truncate">${anime.title}</h3>
                                <div class="flex justify-between items-center mt-2">
                                    <span class="text-sm text-yellow-400">★ ${anime.score || 'N/A'}</span>
                                    <span class="text-xs text-gray-400">${anime.year || ''}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    animeGrid.innerHTML += animeCard;
                });
            } else {
                animeGrid.innerHTML = `<p class="col-span-full text-center">Hech narsa topilmadi.</p>`;
            }
        } catch (error) {
            loading.style.display = 'none';
            animeGrid.innerHTML = `<p class="col-span-full text-center text-red-400">Ma'lumotlarni yuklashda xatolik yuz berdi.</p>`;
        }
    }

    function fetchTopAnime() {
        mainTitle.textContent = 'Ommabop animelar';
        fetchAnime('https://api.jikan.moe/v4/top/anime');
    }

    function searchAnime(query) {
        if (query.trim() === '') {
            fetchTopAnime();
            return;
        }
        mainTitle.textContent = `"${query}" uchun qidiruv natijalari`;
        fetchAnime(`https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity`);
    }

    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchAnime(e.target.value);
        }, 500);
    });

    // --- Модал ойна билан ишлаш ---
    loginButton.addEventListener('click', () => {
        authModal.classList.remove('hidden');
    });

    closeModalButton.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    authModal.addEventListener('click', (event) => {
        if (event.target === authModal) {
            authModal.classList.add('hidden');
        }
    });

    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (username === 'admin' && password === 'sky123') {
            alert('Xush kelibsiz, admin!');
            authModal.classList.add('hidden');
            loginForm.reset();
        } else {
            alert('Login yoki parol xato!');
        }
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Hozircha ro\'yxatdan o\'tish ishlamaydi.');
    });

    // --- Дастлабки юклаш ---
    fetchTopAnime();
});
