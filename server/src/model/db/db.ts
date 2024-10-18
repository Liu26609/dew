import Datastore from 'nedb';

class db {
    private _dbMap: Map<string, Datastore> = new Map();
    constructor() {
      
    }

    async init() {
        // NeDB 会自动加载数据文件，无需额外初始化
    }
    // 添加一个插入数据的方法
    async insert(k: string, doc: any): Promise<any> {
        this.hasMap(k)
        return new Promise((resolve, reject) => {
            this._dbMap.get(k).insert(doc, (err, newDoc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newDoc);
                }
            });
        });
    }
    private hasMap(k:string){
        if (!this._dbMap.has(k)) {
            const datastore = new Datastore({ filename: `./db/${k}.json`, autoload: true });
            this._dbMap.set(k, datastore);
        }
    }
    // 添加一个查询数据的方法
    async find(k: string, query: any): Promise<any[]> {
        this.hasMap(k)
        return new Promise((resolve, reject) => {
            this._dbMap.get(k).find(query, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    // 添加一个更新数据的方法
    async update(k: string, query: any, update: any): Promise<number> {
        this.hasMap(k)
        return new Promise((resolve, reject) => {
            this._dbMap.get(k).update(query, { $set: update }, { upsert: false, multi: false }, (err, numReplaced) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numReplaced);
                }
            });
        });
    }

    // 添加一个删除数据的方法
    async remove(k: string, query: any): Promise<number> {
        this.hasMap(k)
        return new Promise((resolve, reject) => {
            this._dbMap.get(k).remove(query, { multi: true }, (err, numRemoved) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numRemoved);
                }
            });
        });
    }
}

export default new db();