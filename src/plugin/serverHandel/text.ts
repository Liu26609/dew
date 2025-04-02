import handel_base from "./handel_base"

export default class handelr_text extends handel_base  {
    constructor(data: any) {
        super(data)
    }
    start(data: any) {
        this.send(data, data.info.text)
    }
}


