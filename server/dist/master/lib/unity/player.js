"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.player = void 0;
const word_1 = __importDefault(require("../word"));
const body_base_1 = require("./base/body_base");
class player extends body_base_1.body_base {
    constructor(data) {
        super();
        this._mapid = undefined;
        this._battleCall = undefined;
        this.init(data);
    }
    set_mapid(id) {
        this.getMap().leave(this.id);
        this._mapid = id;
    }
    get_mapid() {
        return this._mapid;
    }
    getMap() {
        return word_1.default.getMap(this._mapid);
    }
    set_battleCall(call) {
        this._battleCall = call;
    }
    get_battleCall() {
        if (this._battleCall) {
            return this._battleCall(this);
        }
        return undefined;
    }
    init(data) {
        this._reload(data);
    }
    active() {
        super.active();
        let id = this.get_mapid();
        let map = word_1.default.getMap(id);
        map.active(this.id);
    }
}
exports.player = player;
