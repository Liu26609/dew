class faker_name {
    // 修仙风格的姓氏
    private familyNames = [
        '云', '玄', '清', '逍', '青', '紫', '白', '赤', '金', '墨',
        '风', '雪', '雨', '月', '星', '天', '灵', '仙', '道', '幻',
        '沧', '洛', '流', '空', '叶', '剑', '寒', '霜', '夜', '明'
    ];

    // 修仙风格的名字字符 (1-2字)
    private givenNames = [
        '尘', '羽', '真', '元', '虚', '空', '道', '灵', '仙', '玄',
        '天', '云', '月', '星', '风', '雪', '剑', '心', '梦', '影',
        '霄', '渊', '明', '光', '清', '虹', '青', '鸿', '远', '然',
        '逸', '飞', '扬', '尘', '枫', '露', '霜', '寒', '烟', '雾',
        '天地', '玄黄', '清风', '明月', '星辰', '云霄', '剑心', '梦影',
        '仙灵', '道真', '虚空', '寒霜', '青云', '紫电', '流光', '幻影'
    ];
    public get name():string{
        return this.getRandomChineseName()
    }
    private getRandomChineseName(): string {
        const familyName = this.familyNames[Math.floor(Math.random() * this.familyNames.length)];
        const givenName = this.givenNames[Math.floor(Math.random() * this.givenNames.length)];
        
        // 如果名字总长度超过4个字符，就重新生成
        if ((familyName + givenName).length > 4) {
            return this.getRandomChineseName();
        }
        
        return familyName + givenName;
    }

    constructor(){

    }
}
export default new faker_name();