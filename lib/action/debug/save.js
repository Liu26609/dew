import server from "../../server";
export default class {
    constructor(cls) {
        server.api('debug/Save', {}, cls);
    }
}
