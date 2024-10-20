"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const PATH = require('path');
class xlsxToJson {
    constructor() {
        this.cfg = new Map();
    }
    init() {
        this.refData();
        // this.watch();
    }
    // private watch() {
    //     const filePath = './config'
    //     console.log(`正在监听 ${filePath}`);
    //     fs.watch(filePath, (event, filename) => {
    //         if (filename) {
    //             if (Date.now() - this.lastChangeTime < 1000) {
    //                 return;
    //             }
    //             this.lastChangeTime = Date.now();
    //             console.log(`${filename}文件发生更新`)
    //             this.refData();
    //         }
    //     })
    // }
    refData() {
        console.log(PATH.resolve('./xlsx/'));
        let paths = fs_1.default.readdirSync(PATH.resolve('./xlsx/'));
        for (let j = 0; j < paths.length; j++) {
            const fileName = paths[j];
            const workBook = xlsx_1.default.readFile(PATH.resolve('./xlsx/', fileName));
            for (let index = 0; index < workBook.SheetNames.length; index++) {
                const name = workBook.SheetNames[index];
                if (name.includes('~')) {
                    continue;
                }
                let sheet = workBook.Sheets[name];
                this.deleteRow(sheet, 0);
                let _outData = xlsx_1.default.utils.sheet_to_json(sheet);
                let typeKey = _outData[0];
                let outData = new Map();
                for (let i = 1; i < _outData.length; i++) {
                    const item = _outData[i];
                    let outItem = {};
                    for (const key in typeKey) {
                        const typeStr = typeKey[key];
                        const itemTypeStr = typeof (item[key]);
                        if (itemTypeStr == 'undefined' && !item[key]) {
                            if (key == 'id') {
                                outItem = undefined;
                                break;
                            }
                            switch (typeKey[key]) {
                                case 'String':
                                    item[key] = '';
                                    break;
                                case 'Num':
                                    item[key] = 0;
                                    break;
                                case 'Json':
                                    item[key] = '{}';
                                    break;
                                default:
                                    break;
                            }
                        }
                        try {
                            if (itemTypeStr != typeStr) {
                                switch (typeKey[key]) {
                                    case 'String':
                                        item[key] = item[key].toString();
                                        break;
                                    case 'Num':
                                        item[key] = parseFloat(item[key]);
                                        break;
                                    case 'Json':
                                        let _str = item[key];
                                        _str = _str.replace(/'/g, '"');
                                        try {
                                            item[key] = JSON.parse(_str);
                                        }
                                        catch (error) {
                                            debugger;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        catch (error) {
                            debugger;
                        }
                        outItem[key] = item[key];
                    }
                    if (outItem) {
                        outData.set(outItem.id, outItem);
                    }
                }
                // console.log(name,outData)
                this.cfg.set(name, outData);
                // app.setXlsxCfg(name, outData)
            }
        }
    }
    encodeCell(r, c) {
        return xlsx_1.default.utils.encode_cell({ r, c });
    }
    deleteRow(ws, index) {
        const range = xlsx_1.default.utils.decode_range(ws['!ref']);
        for (let row = index; row < range.e.r; row++) {
            for (let col = range.s.c; col <= range.e.c; col++) {
                ws[this.encodeCell(row, col)] = ws[this.encodeCell(row + 1, col)];
            }
        }
        range.e.r--;
        ws['!ref'] = xlsx_1.default.utils.encode_range(range.s, range.e);
    }
    deleteCol(ws, index) {
        const range = xlsx_1.default.utils.decode_range(ws['!ref']);
        for (let col = index; col < range.e.c; col++) {
            for (let row = range.s.r; row <= range.e.r; row++) {
                ws[this.encodeCell(row, col)] = ws[this.encodeCell(row, col + 1)];
            }
        }
        range.e.c--;
        ws['!ref'] = xlsx_1.default.utils.encode_range(range.s, range.e);
    }
}
exports.default = new xlsxToJson();
