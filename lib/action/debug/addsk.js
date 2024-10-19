import server from "../../server";
const path = require('path');
export default class {
    constructor(cls) {
        server.api('debug/bag/Skill', { name: '大招' }, cls);
    }
}
