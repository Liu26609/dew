"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    log: function (...args) {
        let jump = false;
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            if (typeof (element) != 'string') {
                break;
            }
            if (element.includes('API implemented succ:')) {
                jump = true;
                return;
            }
        }
        if (jump) {
            return;
        }
        console.log(...args);
    },
    warn: function (...args) {
        console.error(...args);
    },
    error: function (...args) {
        console.error(...args);
    },
    debug: function (...args) {
        console.debug(...args);
    }
};
