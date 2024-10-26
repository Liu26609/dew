"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const removeAnsiCodes = (str) => {
    return str.replace(/\x1b\[[0-9;]*m/g, '');
};
exports.logger = {
    log: function (...args) {
        const cleanArgs = args.map(arg => typeof arg === 'string' ? removeAnsiCodes(arg) : arg);
        console.log(...cleanArgs);
    },
    warn: function (...args) {
        const cleanArgs = args.map(arg => typeof arg === 'string' ? removeAnsiCodes(arg) : arg);
        console.warn(...cleanArgs);
    },
    error: function (...args) {
        const cleanArgs = args.map(arg => typeof arg === 'string' ? removeAnsiCodes(arg) : arg);
        console.error(...cleanArgs);
    },
    debug: function (...args) {
        const cleanArgs = args.map(arg => typeof arg === 'string' ? removeAnsiCodes(arg) : arg);
        console.debug(...cleanArgs);
    }
};
