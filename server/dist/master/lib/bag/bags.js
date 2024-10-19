"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shareFace_1 = require("../../../shared/shareFace");
class bags {
    // 增加索引map
    constructor() {
        this.items = [];
    }
    _resData(data) {
        if (!data)
            return;
        if (data.items) {
            this.items = data.items;
        }
        ;
    }
    addItem(data) {
        switch (data.type) {
            case shareFace_1.Item_Type.技能书:
                data.name = data.data.name;
                data.cont = 1;
                break;
            default:
                break;
        }
        this.items.push(data);
    }
}
exports.default = bags;
