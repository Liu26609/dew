import { IClassMessage } from "../../face";

/**
 * 数据格式： ISkillData
 * 由于此文件在 shared 文件夹，不能引用服务器类型定义
 * 以下类型定义仅用于说明数据结构，实际使用时通过 any 接收
 */

/**
 * 技能类型枚举（本地定义，用于格式化）
 */
enum ISkillType {
    主动技能 = 0,
    被动技能 = 1,
    光环技能 = 2
}

class class_skillDetail {
    constructor() {
        return this;
    }
    
    /** 格式化技能详情数据为文本 */
    analysis(data: IClassMessage): string {
        const skillData = data.content;
        
        if (!skillData) {
            return '技能数据为空\n';
        }
        
        let result = '';
        
        /** 技能基本信息 */
        result += this.formatSkillBasicInfo(skillData);
        
        /** 冷却时间信息 */
        result += this.formatCooldownInfo(skillData);
        
        /** 技能消耗 */
        if (skillData.costs && skillData.costs.length > 0) {
            result += this.formatSkillCosts(skillData.costs);
        }
        
        /** 技能效果列表 - 已移除，因为效果展示过于复杂 */
        // if (skillData.effect && skillData.effect.length > 0) {
        //     result += this.formatSkillEffects(skillData.effect);
        // }
        
        return result;
    }
    
    /** 格式化技能基本信息 */
    private formatSkillBasicInfo(skillData: any): string {
        let result = '';
        
        /** 标题 */
        const skillTypeText = this.getSkillTypeText(skillData.type);
        result += ` ┄━═${skillData.emoji || '⚡'}技能详情═━┄\n`;
        
        /** 技能名称 */
        result += `${skillData.emoji || '⚡'} ${skillData.name || '未命名技能'}\n`;
        
        /** 技能类型 */
        result += `类型：${skillTypeText}\n`;
        
        /** 技能描述 */
        if (skillData.desc) {
            /** 先显示故事描述，再显示技术描述 */
            const storyDesc = skillData.storyDesc || '';
            const desc = storyDesc ? `${storyDesc}。${skillData.desc}` : skillData.desc;
            result += `效果：${desc}\n`;
        }
        
        return result;
    }
    
    /** 格式化冷却时间信息 */
    private formatCooldownInfo(skillData: any): string {
        let result = '';
        
        /** 如果有冷却时间 */
        if (skillData.cd !== undefined && skillData.cd !== null && skillData.cd > 0) {
            result += `冷却时间：${skillData.cd}回合`;
            result += '\n';
        } else {
            /** 无冷却时间 */
            result += `冷却时间：无\n`;
        }
        
        return result;
    }
    
    /** 格式化技能消耗 */
    private formatSkillCosts(costs: any[]): string {
        let result = '';
        result += `消耗：`;
        
        const costTexts: string[] = [];
        for (const cost of costs) {
            if (cost.type === 'mp') {
                costTexts.push(`魔法值 ${cost.value}`);
            } else if (cost.type === 'hp') {
                costTexts.push(`生命值 ${cost.value}`);
            } else if (cost.type === 'energy') {
                costTexts.push(`能量 ${cost.value}`);
            } else {
                costTexts.push(`${cost.type} ${cost.value}`);
            }
        }
        
        result += costTexts.join('、') + '\n';
        return result;
    }
    
    /** 格式化技能效果列表 */
    private formatSkillEffects(effects: any[]): string {
        let result = '';
        result += `效果：\n`;
        
        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i];
            const effectDesc = this.formatEffectDescription(effect);
            result += `  ${i + 1}. ${effectDesc}\n`;
        }
        
        return result;
    }
    
    /** 格式化单个效果的描述 */
    private formatEffectDescription(effect: any): string {
        if (!effect || !effect.type) {
            return '未知效果';
        }
        
        let desc = effect.type;
        
        /** 根据效果类型添加简要描述 */
        if (effect.data) {
            if (effect.data.damage !== undefined) {
                desc += ` 造成${effect.data.damage}点伤害`;
            } else if (effect.data.heal !== undefined) {
                desc += ` 恢复${effect.data.heal}点生命值`;
            } else if (effect.data.shield !== undefined) {
                desc += ` 提供${effect.data.shield}点护盾`;
            } else if (effect.data.statusName) {
                desc += ` 添加状态：${effect.data.statusName}`;
                if (effect.data.duration) {
                    desc += ` (${effect.data.duration}回合)`;
                }
            }
        }
        
        /** 如果有条件 */
        if (effect.conditions && effect.conditions.length > 0) {
            desc += ' [有条件触发]';
        }
        
        return desc;
    }
    
    /** 获取技能类型文本 */
    private getSkillTypeText(type: number): string {
        switch (type) {
            case ISkillType.主动技能:
                return '主动技能';
            case ISkillType.被动技能:
                return '被动技能';
            case ISkillType.光环技能:
                return '光环技能';
            default:
                return '未知类型';
        }
    }
}

export default new class_skillDetail();

