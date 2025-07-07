import handel_base from "./handel_base"

export default class handelr_text extends handel_base {
    constructor(data: any) {
        super(data)
    }
    async start(data: any) {
        await this.send(data, data.data)
    }
}


