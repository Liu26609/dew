import server from "../../server";
export default class {
    constructor(cls) {
        server.api('debug/Pvp', {}, cls);
    }
}
