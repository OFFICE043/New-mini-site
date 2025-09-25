// Жобаның негізгі конфигурациясы
const CONFIG = {
    // API базалық URL (production үшін нақты backend URL-ін қойыңыз)
    API_BASE_URL: 'http://localhost:3000/api',
    
    // MongoDB Atlas қосылым параметрлері (backend арқылы)
    DATABASE_CONFIG: {
        name: 'anime_site',
        collections: {
            animes: 'animes',
            users: 'users',
            episodes: 'episodes',
            views: 'views'
        }
    },
    
    // Сынақ видео URL-дері
    SAMPLE_VIDEOS: {
        video1: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        video2: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        video3: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    
    // Аниме санаттары
    CATEGORIES: [
        { id: 1, name: 'shonen', title: 'Shonen', color: 'badge-shonen', description: 'Жас ер балаларға арналған' },
        { id: 2, name: 'adventure', title: 'Adventure', color: 'badge-adventure', description: 'Саяхат пен шытырман оқиғалар' },
        { id: 3, name: 'romance', title: 'Romance', color: 'badge-romance', description: 'Махаббат туралы оқиғалар' },
        { id: 4, name: 'action', title: 'Action', color: 'badge-action', description: 'Әрекет пен күрес' },
        { id: 5, name: 'comedy', title: 'Comedy', color: 'badge-comedy', description: 'Күлкілі және қызықты' },
        { id: 6, name: 'drama', title: 'Drama', color: 'badge-drama', description: 'Драмалық оқиғалар' }
    ],
    
    // Пайдаланушы рөлдері
    USER_ROLES: {
        USER: 'user',
        MODERATOR: 'moderator', 
        ADMIN: 'admin'
    },
    
    // Аниме статустары
    ANIME_STATUS: {
        ONGOING: 'Жалғасуда',
        COMPLETED: 'Аяқталды',
        PAUSED: 'Тоқтатылды',
        ANNOUNCED: 'Жарияланды'
    },
    
    // Локализация
    TEXTS: {
        kk: {
            loading: 'Жүктелуде...',
            search_placeholder: 'Аниме іздеу...',
            login: 'Кіру',
            register: 'Тіркелу',
            logout: 'Шығу',
            play: 'Көру',
            download: 'Жүктеп алу',
            episodes: 'Бөлімдер',
            rating: 'Рейтинг',
            year: 'Жыл',
            status: 'Күй',
            category: 'Санат',
            all_categories: 'Барлық санаттар',
            sort_by: 'Сұрыптау',
            newest: 'Жаңа',
            views: 'Көрушілер',
            admin_panel: 'Админ панелі',
            statistics: 'Статистика',
            anime_management: 'Аниме басқару',
            user_management: 'Пайдаланушылар',
            categories: 'Санаттар',
            security: 'Қауіпсіздік'
        }
    },
    
    // Сұрыптау опциялары  
    SORT_OPTIONS: [
        { value: 'newest', label: 'Жаңа қосылған', key: 'addedDate' },
        { value: 'rating', label: 'Рейтинг бойынша', key: 'rating' },
        { value: 'views', label: 'Көрушілер саны', key: 'totalViews' },
        { value: 'episodes', label: 'Бөлімдер саны', key: 'episodes.length' },
        { value: 'title', label: 'Атау бойынша', key: 'title' }
    ],
    
    // Бетке көрсетілетін аниме саны
    ITEMS_PER_PAGE: 12,
    
    // Сынақ деректері
    DEFAULT_ANIMES: [
        {
            id: 1,
            title: "Naruto Shippuden",
            code: "NS001",
            category: "shonen",
            image: "https://via.placeholder.com/400x600/8B5CF6/ffffff?text=Naruto+Shippuden",
            episodes: [
                { 
                    id: 1,
                    number: 1, 
                    title: "Қайтыш", 
                    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", 
                    downloadUrl: "#", 
                    duration: "24:15", 
                    views: 1250,
                    addedDate: "2024-01-15"
                },
                { 
                    id: 2,
                    number: 2, 
                    title: "Жаңа күш", 
                    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", 
                    downloadUrl: "#", 
                    duration: "23:45", 
                    views: 980,
                    addedDate: "2024-01-16"
                },
                { 
                    id: 3,
                    number: 3, 
                    title: "Жаулар", 
                    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
                    downloadUrl: "#", 
                    duration: "25:10", 
                    views: 876,
                    addedDate: "2024-01-17"
                }
            ],
            description: "Ниндзя дүниесіндегі ең күшті оқиға. Naruto өз арманына жету үшін күреседі және достарын қорғау үшін барлық күшін салады.",
            rating: 9.2,
            year: 2023,
            status: "Жалғасуда",
            totalViews: 15420,
            addedDate: "2024-01-15",
            genre: ["Action", "Adventure", "Martial Arts"],
            studio: "Pierrot",
            director: "Hayato Date"
        },
        {
            id: 2,
            title: "One Piece",
            code: "OP001",
            category: "adventure",
            image: "https://via.placeholder.com/400x600/3B82F6/ffffff?text=One+Piece",
            episodes: [
                { 
                    id: 4,
                    number: 1, 
                    title: "Жаңа басталым", 
                    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", 
                    downloadUrl: "#", 
                    duration: "22:30", 
                    views: 2100,
                    addedDate: "2024-01-20"
                },
                { 
                    id: 5,
                    number: 2, 
                    title: "Теңіз саяхаты", 
                    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", 
                    downloadUrl: "#", 
                    duration: "23:15", 
                    views: 1850,
                    addedDate: "2024-01-21"
                }
            ],
            description: "Теңіз қорғаушылары туралы керемет оқиға. Luffy және оның командасы One Piece қазынасын іздейді.",
            rating: 9.5,
            year: 2023,
            status: "Жалғасуда",
            totalViews: 28750,
            addedDate: "2024-01-20",
            genre: ["Adventure", "Comedy", "Drama"],
            studio: "Toei Animation",
            director: "Eiichiro Oda"
        },
        {
            id: 3,
            title: "Attack on Titan",
            code: "AOT001",
            category: "action",
            image: "https://via.placeholder.com/400x600/EF4444/ffffff?text=Attack+on+Titan",
            episodes: [
                { 
                    id: 6,
                    number: 1, 
                    title: "Титандар шабуылы", 
                    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
                    downloadUrl: "#", 
                    duration: "24:00", 
                    views: 3200,
                    addedDate: "2024-02-01"
                },
                { 
                    id: 7,
                    number: 2, 
                    title: "Адамзат жеңілісі", 
                    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", 
                    downloadUrl: "#", 
                    duration: "24:30", 
                    views: 2890,
                    addedDate: "2024-02-02"
                }
            ],
            description: "Титандармен күрес туралы қорқынышты және қызық оқиға. Адамзат өмір сүру үшін күреседі.",
            rating: 9.8,
            year: 2023,
            status: "Аяқталды",
            totalViews: 35600,
            addedDate: "2024-02-01",
            genre: ["Action", "Drama", "Horror"],
            studio: "MAPPA",
            director: "Tetsuro Araki"
        },
        {
            id: 4,
            title: "Demon Slayer",
            code: "DS001",
            category: "action",
            image: "https://via.placeholder.com/400x600/EC4899/ffffff?text=Demon+Slayer",
            episodes: [
                { 
                    id: 8,
                    number: 1, 
                    title: "Жестокостка толы жер", 
                    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", 
                    downloadUrl: "#", 
                    duration: "23:40", 
                    views: 2750,
                    addedDate: "2024-02-05"
                }
            ],
            description: "Жындар мен адамдар арасындағы соғыс туралы қызу оқиға.",
            rating: 9.3,
            year: 2024,
            status: "Жалғасуда",
            totalViews: 22100,
            addedDate: "2024-02-05",
            genre: ["Action", "Supernatural", "Historical"],
            studio: "Ufotable",
            director: "Haruo Sotozaki"
        }
    ],
    
    // Сынақ пайдаланушылар
    DEFAULT_USERS: [
        { 
            id: 1, 
            username: "admin", 
            email: "admin@animesite.kz", 
            password: "admin", // Нақты жобада hash қолдану керек
            role: "admin", 
            banned: false, 
            joinDate: "2023-12-01", 
            lastActive: "2024-09-25",
            avatar: null,
            preferences: {
                language: "kk",
                notifications: true,
                autoplay: true
            }
        },
        { 
            id: 2, 
            username: "user1", 
            email: "user1@example.com", 
            password: "user1",
            role: "user", 
            banned: false, 
            joinDate: "2024-01-10", 
            lastActive: "2024-09-25",
            avatar: null,
            preferences: {
                language: "kk",
                notifications: true,
                autoplay: false
            }
        },
        { 
            id: 3, 
            username: "moderator1", 
            email: "mod@animesite.kz", 
            password: "mod123",
            role: "moderator", 
            banned: false, 
            joinDate: "2024-02-15", 
            lastActive: "2024-09-24",
            avatar: null,
            preferences: {
                language: "kk",
                notifications: true,
                autoplay: true
            }
        },
        { 
            id: 4, 
            username: "testuser", 
            email: "test@example.com", 
            password: "test123",
            role: "user", 
            banned: true, 
            joinDate: "2024-03-01", 
            lastActive: "2024-09-10",
            avatar: null,
            banReason: "Ереже бұзған",
            preferences: {
                language: "kk",
                notifications: false,
                autoplay: false
            }
        }
    ],
    
    // Жүйе параметрлері
    SYSTEM_SETTINGS: {
        siteName: "AnimeSite",
        siteDescription: "Professional Anime Platform",
        version: "1.0.0",
        maintenanceMode: false,
        registrationEnabled: true,
        guestAccess: true,
        maxFileSize: 100, // MB
        allowedVideoFormats: ['mp4', 'webm', 'ogg'],
        allowedImageFormats: ['jpg', 'jpeg', 'png', 'webp']
    },
    
    // Локальді сақтау кілттері
    STORAGE_KEYS: {
        currentUser: 'anime_site_user',
        animes: 'anime_site_animes',
        users: 'anime_site_users',
        settings: 'anime_site_settings',
        watchHistory: 'anime_site_watch_history',
        favorites: 'anime_site_favorites'
    },
    
    // Дебаг режимі
    DEBUG_MODE: true,
    
    // Валидация ережелері
    VALIDATION: {
        username: {
            minLength: 3,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9_]+$/
        },
        password: {
            minLength: 6,
            maxLength: 50,
            requireSpecialChar: false
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        animeTitle: {
            minLength: 1,
            maxLength: 100
        },
        animeCode: {
            minLength: 3,
            maxLength: 10,
            pattern: /^[A-Z0-9]+$/
        }
    }
};

// Utility функциялар
const Utils = {
    // Қауіпсіз элемент алу
    getElementById: (id) => {
        const element = document.getElementById(id);
        if (!element && CONFIG.DEBUG_MODE) {
            console.warn(`Element with id "${id}" not found`);
        }
        return element;
    },
    
    // Уақытты форматтау
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    
    // Санды форматтау
    formatNumber: (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },
    
    // Кездейсоқ ID генерациялау
    generateId: () => {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },
    
    // Дебаг логы
    log: (message, data = null) => {
        if (CONFIG.DEBUG_MODE) {
            console.log(`[AnimeSite] ${message}`, data);
        }
    },
    
    // Қате логы
    error: (message, error = null) => {
        if (CONFIG.DEBUG_MODE) {
            console.error(`[AnimeSite Error] ${message}`, error);
        }
    },
    
    // Элементке класс қосу/алып тастау
    toggleClass: (element, className) => {
        if (element) {
            element.classList.toggle(className);
        }
    },
    
    // Мәтінді қысқарту
    truncateText: (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    },
    
    // URL валидациясы
    isValidUrl: (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    },
    
    // Email валидациясы  
    isValidEmail: (email) => {
        return CONFIG.VALIDATION.email.pattern.test(email);
    },
    
    // Жылдам DOM құру
    createElement: (tag, className = '', innerHTML = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }
};

// Экспорт (егер модуль жүйесі болса)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, Utils };
                  }
