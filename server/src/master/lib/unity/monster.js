"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monster = void 0;
const body_base_1 = require("./base/body_base");
class monster extends body_base_1.body_base {
    constructor(data) {
        super();
        this.init(data);
    }
    init(data) {
        this._reload(data);
    }
}
exports.monster = monster;
