import server from "../../server";
export default class {
    constructor(cls) {
        this.init(cls);
    }
    async init(cls) {
        server.api('battle/Out', {}, cls);
    }
}
