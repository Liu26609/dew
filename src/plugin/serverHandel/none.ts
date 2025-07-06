import handel_base from "./handel_base"

export default class handelr_none extends handel_base {
    constructor(data: any) {
        super(data)
    }
    async start(data: any) {
        console.log('handelr_none:::', data)
    }
}

