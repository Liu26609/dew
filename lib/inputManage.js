"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const common_1 = __importDefault(require("./lib/common"));
const ET_1 = __importStar(require("./lib/ET"));
const server_1 = __importDefault(require("./server"));
class inputManage {
    wait_inputskipMap = new Map();
    messageMap = new Map();
    constructor() {
    }
    init() {
        ET_1.default.listen(ET_1.ET_K.input_message, this.input_msg.bind(this));
        server_1.default.lisentMsg('Action', async (data) => {
            console.log('收到server消息', data);
            let cls = this.messageMap.get(data.messageId);
            if (!cls) {
                console.log('server-引用消息不存在');
                return;
            }
            const classPath = path.resolve(__dirname, `./action/server/${data.template}`);
            common_1.default.importClass(classPath, [cls, data]);
        }, this);
    }
    skip(id, jude) {
        if (jude) {
            this.wait_inputskipMap.set(id, true);
        }
        else {
            this.wait_inputskipMap.delete(id);
        }
    }
    get_msg(id) {
        return this.messageMap.get(id);
    }
    input_msg(cls) {
        if (this.wait_inputskipMap.has(cls.get_userId())) {
            console.log('skip');
            return;
        }
        this.messageMap.set(cls.get_msgId(), cls);
        // 根据配置分析内容
        // let str = cls.get_content();
        // let matchCont = 0;
        // for (let index = 0; index < actionCfg.length; index++) {
        //     const element = actionCfg[index];
        //     if (element.match_rule == matchRule.完全匹配) {
        //         if (str == element.key) {
        //             ++matchCont;
        //             const classPath = path.resolve(__dirname, `./action/${element.path}`);
        //             common.importClass(classPath, [cls])
        //         }
        //     }
        //     if (element.match_rule == matchRule.正则匹配) {
        //         let reg = new RegExp(element.key);
        //         if (reg.test(str)) {
        //             ++matchCont;
        //             const classPath = path.resolve(__dirname, `./action/${element.path}`);
        //             common.importClass(classPath, [cls]);
        //         }
        //     }
        // }
        // if (!matchCont) {
        //     server.api('Miss', {}, cls)
        // }
    }
}
exports.default = new inputManage();
