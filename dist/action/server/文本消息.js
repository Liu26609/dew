"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(cls, data) {
        const modifiedData = data.data.replace(/\$at/g, cls.At());
        cls.addLine(modifiedData);
        cls.send();
    }
}
exports.default = default_1;
