import { IClassMessage } from "../../face";

/**
 * 数据格式： I战斗结束Data
 * 由于此文件在 shared 文件夹，不能引用服务器类型定义
 * 以下类型定义仅用于说明数据结构，实际使用时通过 any 接收
 */

/** 战斗胜者枚举 */
enum IBattleWinner {
    主场胜利 = 0,
    客场胜利 = 1,
    平局 = 2,
}
class class_battleLog {
    constructor() {
        return this;
    }
    
    /** 格式化战斗日志数据为文本 */
    analysis(data: IClassMessage): string {
        const battleData = data.content;
        
        if (!battleData) {
            return '战斗数据为空\n';
        }
        
        let result = '';
        
        /** 战斗结果 */
        result += this.formatBattleResult(battleData);
        
        /** Flarum战斗日志链接 */
        if (battleData.flarumUrl) {
            result += `📋战斗日志：${battleData.flarumUrl}\n`;
        }
        
        /** 奖励信息 */
        result += this.formatRewards(battleData);
        
        return result;
    }
    
    /** 格式化战斗结果 */
    private formatBattleResult(battleData: any): string {
        let result = '';
        
        /** 优先使用个性化战斗结果 */
        const personalResult = battleData.personalResult;
        if (personalResult?.emoji && personalResult?.text) {
            result += ` ┄━═${personalResult.emoji}${personalResult.text}═━┄\n`;
            result += `⏱️ 战斗回合：${battleData.totalRounds}\n`;
            return result;
        }

        /** 战斗结果 */
        const winner = battleData.winner;
        let winnerText = '未知';
        let emoji = '❓';
        
        switch (winner) {
            case IBattleWinner.主场胜利:
                winnerText = '主场胜利';
                emoji = '🎉';
                break;
            case IBattleWinner.客场胜利:
                winnerText = '客场胜利';
                emoji = '💀';
                break;
            case IBattleWinner.平局:
                winnerText = '旗鼓相当';
                emoji = '🤝';
                break;
        }
        
        result += ` ┄━═${emoji}${winnerText}═━┄\n`;
        result += `⏱️ 战斗回合：${battleData.totalRounds}\n`;
        
        return result;
    }
    
    /** 格式化奖励信息 */
    private formatRewards(battleData: any): string {
        let result = '';
        
        if (!battleData.rewards) {
            return result;
        }
        
        /** rewards 是一个 Map<string, I单位奖励> */
        const rewards = battleData.rewards;
        
        /** 检查是否有奖励 */
        let hasRewards = false;
        if (rewards instanceof Map && rewards.size > 0) {
            hasRewards = true;
        } else if (typeof rewards === 'object' && Object.keys(rewards).length > 0) {
            hasRewards = true;
        }
        
        if (!hasRewards) {
            return result;
        }
        
        /** 添加战斗收获分隔线 */
        result += ` ┄━═🎉战斗收获═━┄\n`;
        
        /** 遍历奖励 */
        const rewardsIterator = rewards instanceof Map ? rewards.entries() : Object.entries(rewards);
        
        for (const [unitId, unitReward] of rewardsIterator) {
            if (!unitReward) continue;
            
            /** 显示所有奖励物品 */
            if (unitReward.items && unitReward.items.length > 0) {
                unitReward.items.forEach((item: any) => {
                    result += `${item.icon}${item.name}+${item.count}\n`;
                });
            }
        }
        
        return result;
    }
}

export default new class_battleLog();