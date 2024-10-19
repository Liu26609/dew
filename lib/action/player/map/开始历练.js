import server from "../../../server";
export default class {
    constructor(cls, data) {
        console.log('开始历练', data);
        this.start(cls);
    }
    async start(cls) {
        await server.api('player/map/Start', { name: '' }, cls);
    }
}
