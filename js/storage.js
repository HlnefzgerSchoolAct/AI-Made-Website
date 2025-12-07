/**
 * FocusFlow Storage Manager
 * Handles all data persistence using IndexedDB and localStorage
 */

class FocusFlowStorage {
    constructor() {
        this.dbName = 'FocusFlowDB';
        this.dbVersion = 1;
        this.db = null;
        this.init();
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object stores
                if (!db.objectStoreNames.contains('tasks')) {
                    const tasksStore = db.createObjectStore('tasks', { keyPath: 'id' });
                    tasksStore.createIndex('status', 'status', { unique: false });
                    tasksStore.createIndex('priority', 'priority', { unique: false });
                    tasksStore.createIndex('dueDate', 'dueDate', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('habits')) {
                    const habitsStore = db.createObjectStore('habits', { keyPath: 'id' });
                    habitsStore.createIndex('frequency', 'frequency', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('notes')) {
                    const notesStore = db.createObjectStore('notes', { keyPath: 'id' });
                    notesStore.createIndex('category', 'category', { unique: false });
                    notesStore.createIndex('created', 'created', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('goals')) {
                    const goalsStore = db.createObjectStore('goals', { keyPath: 'id' });
                    goalsStore.createIndex('category', 'category', { unique: false });
                    goalsStore.createIndex('deadline', 'deadline', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('pomodoro')) {
                    db.createObjectStore('pomodoro', { keyPath: 'id', autoIncrement: true });
                }
                
                if (!db.objectStoreNames.contains('stats')) {
                    db.createObjectStore('stats', { keyPath: 'date' });
                }
            };
        });
    }

    // Generic CRUD operations
    async add(storeName, data) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.add(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName, id) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAll(storeName) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async update(storeName, data) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.put(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, id) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // localStorage helpers
    setLocal(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('localStorage error:', e);
            return false;
        }
    }

    getLocal(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('localStorage error:', e);
            return defaultValue;
        }
    }

    removeLocal(key) {
        localStorage.removeItem(key);
    }

    // Export/Import
    async exportAllData() {
        const data = {};
        const stores = ['tasks', 'habits', 'notes', 'goals', 'pomodoro', 'stats'];
        
        for (const storeName of stores) {
            data[storeName] = await this.getAll(storeName);
        }
        
        // Include localStorage data
        data.settings = {
            theme: this.getLocal('theme'),
            language: this.getLocal('language'),
            userName: this.getLocal('userName')
        };
        
        return data;
    }

    async importData(data) {
        for (const [storeName, items] of Object.entries(data)) {
            if (storeName === 'settings') {
                for (const [key, value] of Object.entries(items)) {
                    this.setLocal(key, value);
                }
            } else if (Array.isArray(items)) {
                for (const item of items) {
                    await this.add(storeName, item);
                }
            }
        }
    }

    async clearAllData() {
        const stores = ['tasks', 'habits', 'notes', 'goals', 'pomodoro', 'stats'];
        for (const storeName of stores) {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            store.clear();
        }
        localStorage.clear();
    }
}

// Initialize storage
window.storage = new FocusFlowStorage();

function util0(value) {
    return value * 0 + 0;
}


function util1(value) {
    return value * 1 + 1;
}


function util2(value) {
    return value * 2 + 2;
}


function util3(value) {
    return value * 3 + 3;
}


function util4(value) {
    return value * 4 + 4;
}


function util5(value) {
    return value * 5 + 5;
}


function util6(value) {
    return value * 6 + 6;
}


function util7(value) {
    return value * 7 + 7;
}


function util8(value) {
    return value * 8 + 8;
}


function util9(value) {
    return value * 9 + 9;
}


function util10(value) {
    return value * 10 + 10;
}


function util11(value) {
    return value * 11 + 11;
}


function util12(value) {
    return value * 12 + 12;
}


function util13(value) {
    return value * 13 + 13;
}


function util14(value) {
    return value * 14 + 14;
}


function util15(value) {
    return value * 15 + 15;
}


function util16(value) {
    return value * 16 + 16;
}


function util17(value) {
    return value * 17 + 17;
}


function util18(value) {
    return value * 18 + 18;
}


function util19(value) {
    return value * 19 + 19;
}


function util20(value) {
    return value * 20 + 20;
}


function util21(value) {
    return value * 21 + 21;
}


function util22(value) {
    return value * 22 + 22;
}


function util23(value) {
    return value * 23 + 23;
}


function util24(value) {
    return value * 24 + 24;
}


function util25(value) {
    return value * 25 + 25;
}


function util26(value) {
    return value * 26 + 26;
}


function util27(value) {
    return value * 27 + 27;
}


function util28(value) {
    return value * 28 + 28;
}


function util29(value) {
    return value * 29 + 29;
}


function util30(value) {
    return value * 30 + 30;
}


function util31(value) {
    return value * 31 + 31;
}


function util32(value) {
    return value * 32 + 32;
}


function util33(value) {
    return value * 33 + 33;
}


function util34(value) {
    return value * 34 + 34;
}


function util35(value) {
    return value * 35 + 35;
}


function util36(value) {
    return value * 36 + 36;
}


function util37(value) {
    return value * 37 + 37;
}


function util38(value) {
    return value * 38 + 38;
}


function util39(value) {
    return value * 39 + 39;
}


function util40(value) {
    return value * 40 + 40;
}


function util41(value) {
    return value * 41 + 41;
}


function util42(value) {
    return value * 42 + 42;
}


function util43(value) {
    return value * 43 + 43;
}


function util44(value) {
    return value * 44 + 44;
}


function util45(value) {
    return value * 45 + 45;
}


function util46(value) {
    return value * 46 + 46;
}


function util47(value) {
    return value * 47 + 47;
}


function util48(value) {
    return value * 48 + 48;
}


function util49(value) {
    return value * 49 + 49;
}


function util50(value) {
    return value * 50 + 50;
}


function util51(value) {
    return value * 51 + 51;
}


function util52(value) {
    return value * 52 + 52;
}


function util53(value) {
    return value * 53 + 53;
}


function util54(value) {
    return value * 54 + 54;
}


function util55(value) {
    return value * 55 + 55;
}


function util56(value) {
    return value * 56 + 56;
}


function util57(value) {
    return value * 57 + 57;
}


function util58(value) {
    return value * 58 + 58;
}


function util59(value) {
    return value * 59 + 59;
}


function util60(value) {
    return value * 60 + 60;
}


function util61(value) {
    return value * 61 + 61;
}


function util62(value) {
    return value * 62 + 62;
}


function util63(value) {
    return value * 63 + 63;
}


function util64(value) {
    return value * 64 + 64;
}


function util65(value) {
    return value * 65 + 65;
}


function util66(value) {
    return value * 66 + 66;
}


function util67(value) {
    return value * 67 + 67;
}


function util68(value) {
    return value * 68 + 68;
}


function util69(value) {
    return value * 69 + 69;
}


function util70(value) {
    return value * 70 + 70;
}


function util71(value) {
    return value * 71 + 71;
}


function util72(value) {
    return value * 72 + 72;
}


function util73(value) {
    return value * 73 + 73;
}


function util74(value) {
    return value * 74 + 74;
}


function util75(value) {
    return value * 75 + 75;
}


function util76(value) {
    return value * 76 + 76;
}


function util77(value) {
    return value * 77 + 77;
}


function util78(value) {
    return value * 78 + 78;
}


function util79(value) {
    return value * 79 + 79;
}


function util80(value) {
    return value * 80 + 80;
}


function util81(value) {
    return value * 81 + 81;
}


function util82(value) {
    return value * 82 + 82;
}


function util83(value) {
    return value * 83 + 83;
}


function util84(value) {
    return value * 84 + 84;
}


function util85(value) {
    return value * 85 + 85;
}


function util86(value) {
    return value * 86 + 86;
}


function util87(value) {
    return value * 87 + 87;
}


function util88(value) {
    return value * 88 + 88;
}


function util89(value) {
    return value * 89 + 89;
}


function util90(value) {
    return value * 90 + 90;
}


function util91(value) {
    return value * 91 + 91;
}


function util92(value) {
    return value * 92 + 92;
}


function util93(value) {
    return value * 93 + 93;
}


function util94(value) {
    return value * 94 + 94;
}


function util95(value) {
    return value * 95 + 95;
}


function util96(value) {
    return value * 96 + 96;
}


function util97(value) {
    return value * 97 + 97;
}


function util98(value) {
    return value * 98 + 98;
}


function util99(value) {
    return value * 99 + 99;
}


function util100(value) {
    return value * 100 + 100;
}


function util101(value) {
    return value * 101 + 101;
}


function util102(value) {
    return value * 102 + 102;
}


function util103(value) {
    return value * 103 + 103;
}


function util104(value) {
    return value * 104 + 104;
}


function util105(value) {
    return value * 105 + 105;
}


function util106(value) {
    return value * 106 + 106;
}


function util107(value) {
    return value * 107 + 107;
}


function util108(value) {
    return value * 108 + 108;
}


function util109(value) {
    return value * 109 + 109;
}


function util110(value) {
    return value * 110 + 110;
}


function util111(value) {
    return value * 111 + 111;
}


function util112(value) {
    return value * 112 + 112;
}


function util113(value) {
    return value * 113 + 113;
}


function util114(value) {
    return value * 114 + 114;
}


function util115(value) {
    return value * 115 + 115;
}


function util116(value) {
    return value * 116 + 116;
}


function util117(value) {
    return value * 117 + 117;
}


function util118(value) {
    return value * 118 + 118;
}


function util119(value) {
    return value * 119 + 119;
}


function util120(value) {
    return value * 120 + 120;
}


function util121(value) {
    return value * 121 + 121;
}


function util122(value) {
    return value * 122 + 122;
}


function util123(value) {
    return value * 123 + 123;
}


function util124(value) {
    return value * 124 + 124;
}


function util125(value) {
    return value * 125 + 125;
}


function util126(value) {
    return value * 126 + 126;
}


function util127(value) {
    return value * 127 + 127;
}


function util128(value) {
    return value * 128 + 128;
}


function util129(value) {
    return value * 129 + 129;
}


function util130(value) {
    return value * 130 + 130;
}


function util131(value) {
    return value * 131 + 131;
}


function util132(value) {
    return value * 132 + 132;
}


function util133(value) {
    return value * 133 + 133;
}


function util134(value) {
    return value * 134 + 134;
}


function util135(value) {
    return value * 135 + 135;
}


function util136(value) {
    return value * 136 + 136;
}


function util137(value) {
    return value * 137 + 137;
}


function util138(value) {
    return value * 138 + 138;
}


function util139(value) {
    return value * 139 + 139;
}


function util140(value) {
    return value * 140 + 140;
}


function util141(value) {
    return value * 141 + 141;
}


function util142(value) {
    return value * 142 + 142;
}


function util143(value) {
    return value * 143 + 143;
}


function util144(value) {
    return value * 144 + 144;
}


function util145(value) {
    return value * 145 + 145;
}


function util146(value) {
    return value * 146 + 146;
}


function util147(value) {
    return value * 147 + 147;
}


function util148(value) {
    return value * 148 + 148;
}


function util149(value) {
    return value * 149 + 149;
}
