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
const master_1 = __importDefault(require("./master"));
const xlsxToJson_1 = __importDefault(require("./model/xlsxToJson"));
const db_1 = __importDefault(require("./model/db/db"));
const test_battle_1 = require("./master/lib/battle/test.battle");
const battle_1 = require("./master/lib/battle/battle");
const FACE_BODY_1 = require("./master/lib/face/FACE_BODY");
const word_1 = __importDefault(require("./master/lib/word"));
const http = require('https');
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        xlsxToJson_1.default.init();
        yield db_1.default.init();
        // await server_mail.startServer(true);
        word_1.default.start();
        yield master_1.default.startServer();
        let t = new test_battle_1.test_battle();
        let a = t.create_unity();
        let b = t.create_unity();
        let c = new battle_1.battle();
        c.join(FACE_BODY_1.battle_group.主场, a);
        c.join(FACE_BODY_1.battle_group.客场, b);
        c.join(FACE_BODY_1.battle_group.客场, t.create_unity());
        // let ls = {
        //     game_over: (b: battle) => {
        //         let sklog = b.get_log(a.get_group())
        //         console.log('战斗结束', sklog)
        //         a.addItem(Item_Type.经验,999)
        //     }
        // }
        // c.set_listen(ls)
        c.start();
        // await server_rank.startServer(true);
        // Pull()
    });
}
function Pull() {
    return __awaiter(this, void 0, void 0, function* () {
        // 请求get 地址https://v1.hitokoto.cn/
        http.get("https://v1.hitokoto.cn/", (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => __awaiter(this, void 0, void 0, function* () {
                let result = JSON.parse(data);
                // let res = await db.sql(`INSERT INTO oneMore (str, auth)
                // SELECT ?, ?
                // FROM dual
                // WHERE NOT EXISTS (SELECT * FROM oneMore WHERE str = ?)`, [result.hitokoto, result.from, result.hitokoto]);
                console.log(result.hitokoto);
            }));
        }).on('error', (err) => {
            console.error('Error fetching hitokoto:', err);
        });
        // setTimeout(() => {
        //     Pull()
        // }, app.random(1000,5000))
    });
}
start();
