import server from "../../server";
export default class {
    constructor(cls) {
        this.init(cls);
    }
    async init(cls) {
        let res = await server.api('battle/Battle', {}, cls);
        console.log(res);
    }
}
