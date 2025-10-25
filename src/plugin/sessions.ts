import { Context, Session } from "koishi";

class sessions {
    sessions: Map<string, Session<never, never, Context>> = new Map();
    constructor() {
        this.sessions = new Map();
    }
    init(ctx: Context) {
        ctx.on('dispose', () => {
            console.log('sessions clear');
            this.clear();
        })
    }
    /**
     * 
     * @param key userid
     * @param value 会话
     */
    set(key: string, value: any) {
        this.sessions.set(key, value);
    }
    get(key: string) {
        return this.sessions.get(key);
    }
    delete(key: string) {
        this.sessions.delete(key);
    }
    clear() {
        this.sessions.clear();
    }
    size() {
        return this.sessions.size;
    }
    

}
export default new sessions();
