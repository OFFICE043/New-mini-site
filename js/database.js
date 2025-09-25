// Database операциялары (MongoDB Atlas симуляциясы)
class DatabaseManager {
    constructor() {
        this.isInitialized = false;
        this.connectionStatus = 'disconnected';
        this.init();
    }
    
    // Дерекқорды инициализациялау
    async init() {
        Utils.log('Database initialization started...');
        
        try {
            // Қосылым симуляциясы
            this.connectionStatus = 'connecting';
            await this.simulateConnection();
            
            // Негізгі деректерді тексеру және жүктеу
            await this.ensureDefaultData();
            
            this.connectionStatus = 'connected';
            this.isInitialized = true;
            
            Utils.log('Database initialized successfully');
            
        } catch (error) {
            this.connectionStatus = 'error';
            Utils.error('Database initialization failed', error);
            throw error;
        }
    }
    
    // Қосылым симуляциясы
    async simulateConnection() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
    
    // Негізгі деректерді тексеру
    async ensureDefaultData() {
        // Аниме деректерін тексеру
        if (!localStorage.getItem(CONFIG.STORAGE_KEYS.animes)) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.animes, JSON.stringify(CONFIG.DEFAULT_ANIMES));
            Utils.log('Default animes data loaded');
        }
        
        // Пайдаланушы деректерін тексеру
        if (!localStorage.getItem(CONFIG.STORAGE_KEYS.users)) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.users, JSON.stringify(CONFIG.DEFAULT_USERS));
            Utils.log('Default users data loaded');
        }
        
        // Жүйе параметрлерін тексеру
        if (!localStorage.getItem(CONFIG.STORAGE_KEYS.settings)) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.settings, JSON.stringify(CONFIG.SYSTEM_SETTINGS));
            Utils.log('Default settings loaded');
        }
    }
    
    // Қосылым күйін алу
    getConnectionStatus() {
        return this.connectionStatus;
    }
    
    // ==================== ANIME CRUD ОПЕРАЦИЯЛАР ====================
    
    // Барлық анимелерді алу
    async getAnimes(filters = {}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let animes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]');
                    
                    // Фильтрлерді қолдану
                    if (filters.category && filters.category !== 'all') {
                        animes = animes.filter(anime => anime.category === filters.category);
                    }
                    
                    if (filters.search) {
                        const searchLower = filters.search.toLowerCase();
                        animes = animes.filter(anime => 
                            anime.title.toLowerCase().includes(searchLower) ||
                            anime.code.toLowerCase().includes(searchLower) ||
                            anime.description.toLowerCase().includes(searchLower)
                        );
                    }
                    
                    if (filters.status) {
                        animes = animes.filter(anime => anime.status === filters.status);
                    }
                    
                    // Сұрыптау
                    if (filters.sortBy) {
                        animes.sort((a, b) => {
                            switch (filters.sortBy) {
                                case 'newest':
                                    return new Date(b.addedDate) - new Date(a.addedDate);
                                case 'rating':
                                    return b.rating - a.rating;
                                case 'views':
                                    return b.totalViews - a.totalViews;
                                case 'episodes':
                                    return b.episodes.length - a.episodes.length;
                                case 'title':
                                    return a.title.localeCompare(b.title);
                                default:
                                    return 0;
                            }
                        });
                    }
                    
                    // Пагинация
                    if (filters.page && filters.limit) {
                        const start = (filters.page - 1) * filters.limit;
                        const end = start + filters.limit;
                        animes = animes.slice(start, end);
                    }
                    
                    Utils.log(`Retrieved ${animes.length} animes with filters`, filters);
                    resolve(animes);
                    
                } catch (error) {
                    Utils.error('Error getting animes', error);
                    reject(error);
                }
            }, 300);
        });
    }
    
    // ID бойынша аниме алу
    async getAnimeById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const animes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]');
                    const anime = animes.find(a => a.id == id);
                    
                    if (anime) {
                        Utils.log(`Retrieved anime: ${anime.title}`);
                        resolve(anime);
                    } else {
                        reject(new Error('Аниме табылмады'));
                    }
                    
                } catch (error) {
                    Utils.error('Error getting anime by ID', error);
                    reject(error);
                }
            }, 200);
        });
    }
    
    // Жаңа аниме қосу
    async createAnime(animeData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const animes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]');
                    
                    // ID бар екенін тексеру
                    if (animes.find(a => a.code === animeData.code)) {
                        reject(new Error('Бұл код бұрыннан қолданылған'));
                        return;
                    }
                    
                    // Жаңа аниме құру
                    const newAnime = {
                        id: Utils.generateId(),
                        ...animeData,
                        totalViews: 0,
                        addedDate: new Date().toISOString().split('T')[0],
                        episodes: animeData.episodes || []
                    };
                    
                    animes.push(newAnime);
                    localStorage.setItem(CONFIG.STORAGE_KEYS.animes, JSON.stringify(animes));
                    
                    Utils.log(`Created new anime: ${newAnime.title}`);
                    resolve(newAnime);
                    
                } catch (error) {
                    Utils.error('Error creating anime', error);
                    reject(error);
                }
            }, 500);
        });
    }
    
    // Анимені жаңарту
    async updateAnime(id, updates) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const animes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]');
                    const index = animes.findIndex(a => a.id == id);
                    
                    if (index === -1) {
                        reject(new Error('Аниме табылмады'));
                        return;
                    }
                    
                    // Жаңарту
                    animes[index] = { ...animes[index], ...updates };
                    localStorage.setItem(CONFIG.STORAGE_KEYS.animes, JSON.stringify(animes));
                    
                    Utils.log(`Updated anime: ${animes[index].title}`);
                    resolve(animes[index]);
                    
                } catch (error) {
                    Utils.error('Error updating anime', error);
                    reject(error);
                }
            }, 500);
        });
    }
    
    // Анимені өшіру
    async deleteAnime(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const animes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]');
                    const filteredAnimes = animes.filter(a => a.id != id);
                    
                    if (animes.length === filteredAnimes.length) {
                        reject(new Error('Аниме табылмады'));
                        return;
                    }
                    
                    localStorage.setItem(CONFIG.STORAGE_KEYS.animes, JSON.stringify(filteredAnimes));
                    
                    Utils.log(`Deleted anime with ID: ${id}`);
                    resolve(true);
                    
                } catch (error) {
                    Utils.error('Error deleting anime', error);
                    reject(error);
                }
            }, 500);
        });
    }
    
    // ==================== USER CRUD ОПЕРАЦИЯЛАР ====================
    
    // Барлық пайдаланушыларды алу
    async getUsers(filters = {}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.users) || '[]');
                    
                    // Паролды жасыру
                    users = users.map(user => {
                        const { password, ...safeUser } = user;
                        return safeUser;
                    });
                    
                    // Фильтрлер
                    if (filters.role) {
                        users = users.filter(user => user.role === filters.role);
                    }
                    
                    if (filters.banned !== undefined) {
                        users = users.filter(user => user.banned === filters.banned);
                    }
                    
                    Utils.log(`Retrieved ${users.length} users`);
                    resolve(users);
                    
                } catch (error) {
                    Utils.error('Error getting users', error);
                    reject(error);
                }
            }, 300);
        });
    }
    
    // Пайдаланушы жасау
    async createUser(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.users) || '[]');
                    
                    // Бірдей username тексеру
                    if (users.find(u => u.username === userData.username)) {
                        reject(new Error('Бұл пайдаланушы аты бұрыннан бар'));
                        return;
                    }
                    
                    // Бірдей email тексеру
                    if (users.find(u => u.email === userData.email)) {
                        reject(new Error('Бұл email бұрыннан тіркелген'));
                        return;
                    }
                    
                    // Валидация
                    if (!Utils.isValidEmail(userData.email)) {
                        reject(new Error('Email форматы дұрыс емес'));
                        return;
                    }
                    
                    if (userData.username.length < CONFIG.VALIDATION.username.minLength) {
                        reject(new Error(`Пайдаланушы аты кемінде ${CONFIG.VALIDATION.username.minLength} таңбадан тұруы керек`));
                        return;
                    }
                    
                    // Жаңа пайдаланушы
                    const newUser = {
                        id: Utils.generateId(),
                        username: userData.username,
                        email: userData.email,
                        password: userData.password, // Нақты жобада хэштеу керек
                        role: userData.role || CONFIG.USER_ROLES.USER,
                        banned: false,
                        joinDate: new Date().toISOString().split('T')[0],
                        lastActive: new Date().toISOString().split('T')[0],
                        avatar: null,
                      preferences: {
                            language: "kk",
                            notifications: true,
                            autoplay: false
                        }
                    };
                    
                    users.push(newUser);
                    localStorage.setItem(CONFIG.STORAGE_KEYS.users, JSON.stringify(users));
                    
                    // Қауіпсіз нұсқаны қайтару (паролсыз)
                    const { password, ...safeUser } = newUser;
                    
                    Utils.log(`Created new user: ${newUser.username}`);
                    resolve(safeUser);
                    
                } catch (error) {
                    Utils.error('Error creating user', error);
                    reject(error);
                }
            }, 500);
        });
    }
    
    // Пайдаланушыны жаңарту
    async updateUser(id, updates) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.users) || '[]');
                    const index = users.findIndex(u => u.id == id);
                    
                    if (index === -1) {
                        reject(new Error('Пайдаланушы табылмады'));
                        return;
                    }
                    
                    // Жаңарту
                    users[index] = { ...users[index], ...updates };
                    localStorage.setItem(CONFIG.STORAGE_KEYS.users, JSON.stringify(users));
                    
                    // Қауіпсіз нұсқа
                    const { password, ...safeUser } = users[index];
                    
                    Utils.log(`Updated user: ${users[index].username}`);
                    resolve(safeUser);
                    
                } catch (error) {
                    Utils.error('Error updating user', error);
                    reject(error);
                }
            }, 500);
        });
    }
    
    // Аутентификация
    async authenticateUser(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.users) || '[]');
                    const user = users.find(u => u.username === username && u.password === password);
                    
                    if (!user) {
                        reject(new Error('Қате пайдаланушы аты немесе парол'));
                        return;
                    }
                    
                    if (user.banned) {
                        reject(new Error('Сіздің есептік жазбаңыз блокталған'));
                        return;
                    }
                    
                    // Соңғы белсенділікті жаңарту
                    user.lastActive = new Date().toISOString().split('T')[0];
                    const updatedUsers = users.map(u => u.id === user.id ? user : u);
                    localStorage.setItem(CONFIG.STORAGE_KEYS.users, JSON.stringify(updatedUsers));
                    
                    // Қауіпсіз нұсқа
                    const { password: _, ...safeUser } = user;
                    
                    Utils.log(`User authenticated: ${user.username}`);
                    resolve(safeUser);
                    
                } catch (error) {
                    Utils.error('Error authenticating user', error);
                    reject(error);
                }
            }, 800);
        });
    }
    
    // ==================== EPISODES ОПЕРАЦИЯЛАР ====================
    
    // Бөлім қосу
    async addEpisode(animeId, episodeData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const animes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]');
                    const animeIndex = animes.findIndex(a => a.id == animeId);
                    
                    if (animeIndex === -1) {
                        reject(new Error('Аниме табылмады'));
                        return;
                    }
                    
                    // Бөлім нөмірін тексеру
                    if (animes[animeIndex].episodes.find(e => e.number === episodeData.number)) {
                        reject(new Error('Бұл нөмірлі бөлім бұрыннан бар'));
                        return;
                    }
                    
                    const newEpisode = {
                        id: Utils.generateId(),
                        ...episodeData,
                        views: 0,
                        addedDate: new Date().toISOString().split('T')[0]
                    };
                    
                    animes[animeIndex].episodes.push(newEpisode);
                    animes[animeIndex].episodes.sort((a, b) => a.number - b.number);
                    
                    localStorage.setItem(CONFIG.STORAGE_KEYS.animes, JSON.stringify(animes));
                    
                    Utils.log(`Added episode ${newEpisode.number} to ${animes[animeIndex].title}`);
                    resolve(newEpisode);
                    
                } catch (error) {
                    Utils.error('Error adding episode', error);
                    reject(error);
                }
            }, 500);
        });
    }
    
    // Көру санын арттыру
    async incrementViews(animeId, episodeId = null) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const animes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]');
                    const animeIndex = animes.findIndex(a => a.id == animeId);
                    
                    if (animeIndex === -1) {
                        reject(new Error('Аниме табылмады'));
                        return;
                    }
                    
                    // Жалпы көру санын арттыру
                    animes[animeIndex].totalViews += 1;
                    
                    // Бөлім көру санын арттыру
                    if (episodeId) {
                        const episodeIndex = animes[animeIndex].episodes.findIndex(e => e.id == episodeId || e.number == episodeId);
                        if (episodeIndex !== -1) {
                            animes[animeIndex].episodes[episodeIndex].views += 1;
                        }
                    }
                    
                    localStorage.setItem(CONFIG.STORAGE_KEYS.animes, JSON.stringify(animes));
                    
                    Utils.log(`Incremented views for anime: ${animes[animeIndex].title}`);
                    resolve(animes[animeIndex]);
                    
                } catch (error) {
                    Utils.error('Error incrementing views', error);
                    reject(error);
                }
            }, 200);
        });
    }
    
    // ==================== STATISTICS ====================
    
    async getStatistics() {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const [animes, users] = await Promise.all([
                        this.getAnimes(),
                        this.getUsers()
                    ]);
                    
                    const stats = {
                        totalAnimes: animes.length,
                        totalEpisodes: animes.reduce((sum, anime) => sum + anime.episodes.length, 0),
                        totalUsers: users.length,
                        totalViews: animes.reduce((sum, anime) => sum + anime.totalViews, 0),
                        activeUsers: users.filter(u => !u.banned).length,
                        bannedUsers: users.filter(u => u.banned).length,
                        adminUsers: users.filter(u => u.role === 'admin').length,
                        moderatorUsers: users.filter(u => u.role === 'moderator').length,
                        regularUsers: users.filter(u => u.role === 'user').length,
                        ongoingAnimes: animes.filter(a => a.status === 'Жалғасуда').length,
                        completedAnimes: animes.filter(a => a.status === 'Аяқталды').length,
                        categoriesStats: CONFIG.CATEGORIES.map(cat => ({
                            name: cat.name,
                            title: cat.title,
                            count: animes.filter(a => a.category === cat.name).length
                        })),
                        recentActivity: await this.getRecentActivity()
                    };
                    
                    Utils.log('Statistics generated', stats);
                    resolve(stats);
                    
                } catch (error) {
                    Utils.error('Error getting statistics', error);
                    reject(error);
                }
            }, 400);
        });
    }
    
    // Соңғы белсенділікті алу
    async getRecentActivity() {
        return new Promise((resolve) => {
            // Симуляцияланған белсенділік деректері
            const activities = [
                {
                    type: 'anime_added',
                    message: 'Жаңа аниме "Attack on Titan" қосылды',
                    time: '2 сағат бұрын',
                    indicator: 'indicator-green'
                },
                {
                    type: 'user_banned',
                    message: 'testuser пайдаланушысы блокталды',
                    time: '4 сағат бұрын',
                    indicator: 'indicator-blue'
                },
                {
                    type: 'episode_added',
                    message: 'Жаңа бөлім "Naruto EP3" жүктелді',
                    time: '1 күн бұрын',
                    indicator: 'indicator-purple'
                },
                {
                    type: 'user_registered',
                    message: 'Жаңа пайдаланушы тіркелді',
                    time: '2 күн бұрын',
                    indicator: 'indicator-green'
                }
            ];
            
            setTimeout(() => resolve(activities), 100);
        });
    }
    
    // ==================== SEARCH ====================
    
    async searchAnimes(query) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const animes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]');
                    const searchLower = query.toLowerCase();
                    
                    const results = animes.filter(anime => 
                        anime.title.toLowerCase().includes(searchLower) ||
                        anime.code.toLowerCase().includes(searchLower) ||
                        anime.description.toLowerCase().includes(searchLower) ||
                        anime.genre?.some(g => g.toLowerCase().includes(searchLower))
                    );
                    
                    Utils.log(`Search for "${query}" returned ${results.length} results`);
                    resolve(results);
                    
                } catch (error) {
                    Utils.error('Error searching animes', error);
                    reject(error);
                }
            }, 300);
        });
    }
    
    // ==================== BACKUP & RESTORE ====================
    
    async createBackup() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const backup = {
                        timestamp: new Date().toISOString(),
                        version: CONFIG.SYSTEM_SETTINGS.version,
                        data: {
                            animes: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.animes) || '[]'),
                            users: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.users) || '[]'),
                            settings: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.settings) || '{}')
                        }
                    };
                    
                    const backupString = JSON.stringify(backup, null, 2);
                    const blob = new Blob([backupString], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `animesite-backup-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    Utils.log('Backup created successfully');
                    resolve(true);
                    
                } catch (error) {
                    Utils.error('Error creating backup', error);
                    reject(error);
                }
            }, 500);
        });
    }
    
    // ==================== UTILITY METHODS ====================
    
    // Деректерді тазалау
    async clearAllData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                Object.values(CONFIG.STORAGE_KEYS).forEach(key => {
                    localStorage.removeItem(key);
                });
                
                Utils.log('All data cleared');
                resolve(true);
            }, 200);
        });
    }
    
    // Деректерді қалпына келтіру
    async resetToDefault() {
        return new Promise((resolve) => {
            setTimeout(async () => {
                await this.clearAllData();
                await this.ensureDefaultData();
                
                Utils.log('Data reset to default');
                resolve(true);
            }, 500);
        });
    }
}

// Дерекқор экземплярын жасау
const db = new DatabaseManager();

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DatabaseManager;
                }
