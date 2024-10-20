"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_1 = __importDefault(require("nedb"));
class db {
    constructor() {
        this._dbMap = new Map();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // NeDB 会自动加载数据文件，无需额外初始化
        });
    }
    // 添加一个插入数据的方法
    insert(k, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            this.hasMap(k);
            return new Promise((resolve, reject) => {
                this._dbMap.get(k).insert(doc, (err, newDoc) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newDoc);
                    }
                });
            });
        });
    }
    hasMap(k) {
        if (!this._dbMap.has(k)) {
            const datastore = new nedb_1.default({ filename: `./db/${k}.json`, autoload: true });
            this._dbMap.set(k, datastore);
        }
    }
    // 添加一个查询数据的方法
    find(k, query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.hasMap(k);
            return new Promise((resolve, reject) => {
                this._dbMap.get(k).find(query, (err, docs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(docs);
                    }
                });
            });
        });
    }
    // 添加一个更新数据的方法
    update(k, query, update) {
        return __awaiter(this, void 0, void 0, function* () {
            this.hasMap(k);
            return new Promise((resolve, reject) => {
                this._dbMap.get(k).update(query, { $set: update }, { upsert: false, multi: false }, (err, numReplaced) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(numReplaced);
                    }
                });
            });
        });
    }
    // 添加一个删除数据的方法
    remove(k, query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.hasMap(k);
            return new Promise((resolve, reject) => {
                this._dbMap.get(k).remove(query, { multi: true }, (err, numRemoved) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(numRemoved);
                    }
                });
            });
        });
    }
}
exports.default = new db();
