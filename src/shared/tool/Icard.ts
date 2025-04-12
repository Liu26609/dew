//文字样式基础结构
export class Icard {
    list:string[] = [];
    constructor() {

    }
    l(text:string){
        this.list.push(text);
    }
    title(text:string){
        const maxLength = 20; // 定义标题的最大长度
        const totalLength = maxLength - text.length;
        const paddingLength = Math.floor(totalLength / 2);
        const paddedText = '-'.repeat(paddingLength) + text + '-'.repeat(totalLength - paddingLength);
        this.list.push(paddedText);
    }
    //两个Icard合并
    merge(card:Icard){
        this.list.push(...card.list);
    }
    getText(){
        return this.list.join('\n');
    }
}
