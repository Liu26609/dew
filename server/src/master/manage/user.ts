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
        let data = await db.find('user', { id: onlyid })
        if(data.length == 0){
            return undefined
        }
        debugger;
    }
    create(onlyid: string) {
        let u = new player();
        u.id = onlyid;
        this.userMap.set(onlyid, u);
        console.log('创建用户:', onlyid)
        db.insert('user', u)
        return u;
    }
}
export default new user()