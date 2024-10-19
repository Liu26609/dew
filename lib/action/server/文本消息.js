export default class {
    constructor(cls, data) {
        const modifiedData = data.data.replace(/\$at/g, cls.At());
        cls.addLine(modifiedData);
        cls.send();
    }
}
