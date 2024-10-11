import { Logger } from "tsrpc"
export let logger: Logger = {
    log: function (...args: any[]): void {
        let jump = false;
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            if (typeof (element) != 'string') {
                break;
            }
            if (element.includes('API implemented succ:')) {
                jump = true;
                return;
            }
        }
        if(jump){
            return;
        }
        console.log(...args)
    },
    warn: function (...args: any[]): void {
        console.error(...args)
    },
    error: function (...args: any[]): void {
        console.error(...args)
    },
    debug: function (...args: any[]): void {
        console.debug(...args)
    }
}