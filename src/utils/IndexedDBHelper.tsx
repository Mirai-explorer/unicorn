type ObjectStoreMeta = {
    store: string;
    storeConfig: {
        keyPath: string;
        autoIncrement: boolean;
    };
    storeSchema: {
        name: string;
        keypath: string;
        options: {
            unique: boolean;
        };
    }[];
};

type IndexedDBConfig = {
    name: string;
    version: number;
    objectStoresMeta: ObjectStoreMeta[];
};

class IndexedDBHelper {
    private dbConfig: IndexedDBConfig;
    private db: IDBDatabase | null = null;

    constructor(config: IndexedDBConfig) {
        this.dbConfig = config;
    }

    // 打开数据库并升级
    private openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbConfig.name, this.dbConfig.version);

            // 数据库升级逻辑
            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBRequest).result as IDBDatabase; // 显式类型断言

                // 遍历并创建对象存储
                this.dbConfig.objectStoresMeta.forEach((storeMeta) => {
                    let store: IDBObjectStore; // 显式声明类型为 IDBObjectStore
                    if (!db.objectStoreNames.contains(storeMeta.store)) {
                        store = db.createObjectStore(storeMeta.store, storeMeta.storeConfig);

                        // 为对象存储创建索引
                        storeMeta.storeSchema.forEach((schema) => {
                            store.createIndex(schema.name, schema.keypath, schema.options);
                        });
                    }
                });
            };

            // 成功打开数据库
            request.onsuccess = (event) => {
                this.db = (event.target as IDBRequest).result as IDBDatabase; // 显式类型断言
                resolve(this.db);
            };

            // 打开数据库失败
            request.onerror = (event) => {
                reject(`Error opening database: ${event}`);
            };
        });
    }

    // 获取数据库
    private getDB(): Promise<IDBDatabase> {
        if (this.db) {
            return Promise.resolve(this.db);
        }
        return this.openDB();
    }

    // 插入数据
    public async insertData(storeName: string, data: object): Promise<any> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject(`Error inserting data: ${event}`);
            };
        });
    }

    // 获取数据
    public async getData(storeName: string, key: string): Promise<any> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject(`Error fetching data: ${event}`);
            };
        });
    }

    // 获取所有数据
    public async getAllData(storeName: string): Promise<any[]> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject(`Error fetching all data: ${event}`);
            };
        });
    }

    // 更新数据
    public async updateData(storeName: string, data: object): Promise<any> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject(`Error updating data: ${event}`);
            };
        });
    }

    // 删除数据
    public async deleteData(storeName: string, key: number): Promise<void> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(`Error deleting data: ${event}`);
            };
        });
    }

    // 清空存储
    public async clearStore(storeName: string): Promise<void> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(`Error clearing store: ${event}`);
            };
        });
    }
}

export default IndexedDBHelper;