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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = require('fs');
const path = require('path');
class default_1 {
    constructor(cls) {
        // cls.addLine(`正式服打包开始`)
        // cls.send();
        //    C:\Users\admin\Desktop\Gamecoca_Web_Client
        // this.zip(cls)
        this.start(cls);
    }
    zip(cls) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    zip_cilent(cls) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Change directory to C:\Users\admin\Desktop\Gamecoca_Web_Client
                process.chdir('C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client');
                // Execute the build command
                (0, child_process_1.exec)('npm run build:prod', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log('stdout', stdout);
                    cls.addLine(`打包完成`);
                    cls.send();
                });
            }
            catch (err) {
                console.error(`chdir error: ${err}`);
                cls.addLine(`打包失败: 详细信息请查看控制台`);
                cls.send();
            }
        });
    }
    zip_server(cls) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Change directory to C:\Users\admin\Desktop\Gamecoca_Web_Client
                process.chdir('C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client');
                // Execute the build command
                (0, child_process_1.exec)('npm run build:prod', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log('stdout', stdout);
                    cls.addLine(`打包完成<file src="C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client\\webClient-dev-1.0.217.zip"></file>`);
                    cls.send();
                });
            }
            catch (err) {
                console.error(`chdir error: ${err}`);
                cls.addLine(`打包失败: 详细信息请查看控制台`);
                cls.send();
            }
        });
    }
    start(cls) {
        return __awaiter(this, void 0, void 0, function* () {
            // this.zip_cilent(cls)
            cls.session.send(`<button text="扣1" type="input">领取地狱火</button>`);
            // cls.send();
        });
    }
}
exports.default = default_1;
