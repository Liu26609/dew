import message from "../../trigger/message";

export default class {
    constructor(cls:message){
        cls.addLine('@everyone')
        cls.send()
    }
}