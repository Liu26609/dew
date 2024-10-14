import db from "../../model/db/db";
import { player } from "../lib/unity/player"

class user {
    userMap: Map<string, player> = new Map();
    constructor() {

    }
    locaHas(onlyid: string) {
        return this.userMap.get(onlyid)
    }
    async sqHas(onlyid: string) {
        let data = await db.find('user', { onlyid: onlyid })
        if(data.length == 0){
            return undefined
        }
        debugger;
    }
    create(onlyid: string) {
        let u = new player();
        u.id = onlyid;
        this.userMap.set(onlyid, u);
        return new player();
    }
}
export default new user()