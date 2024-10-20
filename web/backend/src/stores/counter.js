"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCounterStore = void 0;
const vue_1 = require("vue");
const pinia_1 = require("pinia");
exports.useCounterStore = (0, pinia_1.defineStore)('counter', () => {
    const count = (0, vue_1.ref)(0);
    const doubleCount = (0, vue_1.computed)(() => count.value * 2);
    function increment() {
        count.value++;
    }
    return { count, doubleCount, increment };
});
