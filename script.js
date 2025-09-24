document.addEventListener('DOMContentLoaded', () => {
    // --- Негізгі элементтер ---
    const animeGrid = document.getElementById('anime-grid');
    const loading = document.getElementById('loading');
    const searchInput = document.getElementById('search-input');
    const mainTitle = document.getElementById('main-title');
    
    // --- Аутентификация терезесінің элементтері ---
    const loginButton = document.getElementById('login-button');
    const authModal = document.getElementById('auth-modal');
    
    // --- Аниме туралы толық ақпарат терезесі ---
    const detailsModal = document.getElementById('details-modal');
    const detailsModalContent = document.getElementById('details-modal-content');

    // --- API-дан анимелерді жүктеу ---
    async function fetchAnime(url) {
        // ... (бұл функцияның іші өзгеріссіз)
        // ... Тек карточканың ішіне жаңа overlay қосылды
        try {
            const response = await fetch(url);
            const data = await response.json();
            loading.style.display = 'none';
            animeGrid.innerHTML = '';

            data.data.forEach(anime => {
                const animeCard = `
                    <div class="anime-card group bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-gray-700/50 cursor-pointer relative" data-id="${anime.mal_id}">
                        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" class="w-full h-64 object-cover">
                        <div class="absolute inset-0 bg-black/70 overlay flex items-center justify-center">
                            <button class="text-white text-lg font-bold flex items-center gap-2 ko-rish-btn" data-id="${anime.mal_id}">
                                <i class="fa-solid fa-play"></i> Ko'rish
                            </button>
                        </div>
                        <div class="p-3">
                            <h3 class="text-md font-bold text-white truncate" title="${anime.title}">${anime.title}</h3>
                            <div class="flex justify-between items-center mt-2">
                                <span class="text-sm text-yellow-400 font-bold">★ ${anime.score || 'N/A'}</span>
                                <span class="text-xs text-gray-400">${anime.year || ''}</span>
                            </div>
                        </div>
                    </div>
                `;
                animeGrid.innerHTML += animeCard;
            });
        } catch (error) { /* ... */ }
    }
    fetchAnime('https://api.jikan.moe/v4/top/anime'); // Бастапқы жүктеу

    // --- "Ko'rish" батырмасын басқанда толық ақпаратты көрсету ---
    animeGrid.addEventListener('click', (e) => {
        const targetButton = e.target.closest('.ko-rish-btn');
        if (targetButton) {
            const animeId = targetButton.dataset.id;
            openDetailsModal(animeId);
        }
    });

    async function openDetailsModal(animeId) {
        detailsModal.classList.remove('hidden');
        detailsModal.classList.add('flex');
        detailsModalContent.innerHTML = '<p class="text-center p-10">Ma\'lumotlar yuklanmoqda...</p>';

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
            const { data: anime } = await response.json();

            detailsModalContent.innerHTML = `
                <button id="close-details-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-50">&times;</button>
                <div class="w-full">
                    <div class="h-80 relative">
                        <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover opacity-30">
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    </div>
                    <div class="p-6 -mt-32 relative">
                        <h2 class="text-3xl font-bold text-white">${anime.title_english || anime.title}</h2>
                        <div class="flex items-center gap-4 text-gray-400 text-sm mt-2">
                            <span>★ ${anime.score}</span>
                            <span>${anime.year}</span>
                            <span>${anime.status}</span>
                        </div>
                        <p class="mt-4 text-gray-300 leading-relaxed">${anime.synopsis}</p>
                        
                        <h3 class="text-xl font-bold text-white mt-6 mb-4">Tomosha qilish</h3>
                        <div class="video-player-container relative rounded-lg overflow-hidden">
                            <video id="video-player" class="w-full" src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"></video>
                            <div class="custom-controls absolute inset-0 flex flex-col justify-between p-4">
                                <div></div> <div class="flex items-center justify-center">
                                    <button id="seek-backward" class="text-white text-2xl p-2"><i class="fas fa-backward"></i></button>
                                    <button id="play-pause" class="text-white text-4xl p-2 mx-4"><i class="fas fa-play"></i></button>
                                    <button id="seek-forward" class="text-white text-2xl p-2"><i class="fas fa-forward"></i></button>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <button id="volume-btn" class="text-white"><i class="fas fa-volume-high"></i></button>
                                        <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="1" class="w-24">
                                    </div>
                                    <span id="video-time" class="text-white text-sm">0:00 / 0:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            setupVideoPlayer();
            document.getElementById('close-details-modal').addEventListener('click', () => {
                detailsModal.classList.add('hidden');
                detailsModal.classList.remove('flex');
            });

        } catch (error) {
            detailsModalContent.innerHTML = '<p class="text-center p-10 text-red-400">Xatolik yuz berdi.</p>';
        }
    }
    
    // --- Видео плеер логикасы ---
    function setupVideoPlayer() {
        const video = document.getElementById('video-player');
        const playPauseBtn = document.getElementById('play-pause');
        const seekBackwardBtn = document.getElementById('seek-backward');
        const seekForwardBtn = document.getElementById('seek-forward');
        const volumeBtn = document.getElementById('volume-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const videoTime = document.getElementById('video-time');

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        seekBackwardBtn.addEventListener('click', () => { video.currentTime -= 10; });
        seekForwardBtn.addEventListener('click', () => { video.currentTime += 10; });
        volumeSlider.addEventListener('input', (e) => { video.volume = e.target.value; });
        
        video.addEventListener('timeupdate', () => {
             const currentTime = new Date(video.currentTime * 1000).toISOString().substr(14, 5);
             const duration = new Date(video.duration * 1000).toISOString().substr(14, 5);
             videoTime.textContent = `${currentTime} / ${duration}`;
        });
    }

    // --- Аутентификация терезесінің логикасы (өзгеріссіз) ---
    // ... (бұрынғы script.js-тегі кодты осында қоясыз)
});
