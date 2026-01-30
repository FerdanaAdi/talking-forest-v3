/**
 * Player Character & Profile Management
 * Handles character creation, stats, and local storage sync
 */

const STORAGE_KEY = 'talking_forest_player_v3';

export const Player = {
    data: {
        name: 'Ranger Baru',
        gender: 'male', // male, female
        ageGroup: 'child', // child, teen, adult, elder
        avatar: 'assets/images/avatars/bibit.png',
        level: 1,
        xp: 0,
        badges: [],
        inventory: [], // Collected seeds/items
        garden: [], // Planted trees
        completedQuests: [],
        isNewPlayer: true
    },

    init() {
        this.load();
        console.log("Player System Initialized. Is New?", this.data.isNewPlayer);
    },

    load() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            this.data = { ...this.data, ...JSON.parse(stored) };
            this.data.isNewPlayer = false; // If data exists, not new
        } else {
            this.data.isNewPlayer = true;
        }
    },

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        // TODO: Sync to Firebase if online
    },

    createCharacter(name, gender, ageGroup, avatarUrl) {
        this.data.name = name;
        this.data.gender = gender;
        this.data.ageGroup = ageGroup;
        this.data.avatar = avatarUrl;
        this.data.isNewPlayer = false;
        this.save();
        
        // Dispatch event for UI updates
        window.dispatchEvent(new CustomEvent('player-updated', { detail: this.data }));
    },

    addXp(amount) {
        this.data.xp += amount;
        // Check level up logic (imported from gamification.js later)
        this.save();
    },

    addToInventory(item) {
        if (!this.data.inventory.find(i => i.id === item.id)) {
            this.data.inventory.push(item);
            this.save();
            return true;
        }
        return false;
    }
};

// Auto-init
Player.init();
