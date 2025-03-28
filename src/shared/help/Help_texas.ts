export class Help_texas {
    deck: {
        suit: string;
        rank: string;
    }[];
    static HandRanks = {
        皇家同花顺: 10,
        同花顺: 9,
        四条: 8,
        葫芦: 7,
        同花: 6,
        顺子: 5,
        三条: 4,
        两对: 3,
        一对: 2,
        高牌: 1
    };
    constructor() {
        this.deck = this.initializeDeck();
    }

    initializeDeck() {
        const suits = ['♠', '♥', '♦', '♣']; // 使用Unicode字符表示花色[4](@ref)
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        // 生成标准52张牌组[1,4](@ref)
        let deck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                deck.push({ suit, rank }); // 存储为对象便于后续牌型判断
            }
        }
        return deck;
    }

    shuffledDeck() {
        // Fisher-Yates洗牌算法实现[5](@ref)
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        return this.deck; // 返回副本避免原始牌组被修改
    }
    // 核心判断逻辑
    evaluateHand(playerHand: any[], communityCards: any[]) {
        const allCards = [...playerHand, ...communityCards];
        const rankCount = new Map<string, number>();
        const suitCount = new Map<string, number>();

        // 统计点数和花色
        allCards.forEach(card => {
            rankCount.set(card.rank, (rankCount.get(card.rank) || 0) + 1);
            suitCount.set(card.suit, (suitCount.get(card.suit) || 0) + 1);
        });

        // 转换点数到数值（A=14）
        const rankValues = allCards.map(card => 
            card.rank === 'A' ? 14 : 
            card.rank === 'K' ? 13 :
            card.rank === 'Q' ? 12 :
            card.rank === 'J' ? 11 :
            parseInt(card.rank)
        ).sort((a, b) => b - a);

        // 判断各牌型（按优先级顺序）
        if (this.isRoyalFlush(allCards)) return { rank: Help_texas.HandRanks.皇家同花顺 };
        if (this.isStraightFlush(allCards)) return { rank: Help_texas.HandRanks.同花顺 };
        if (this.isFourOfAKind(rankCount)) return { rank: Help_texas.HandRanks.四条 };
        if (this.isFullHouse(rankCount)) return { rank: Help_texas.HandRanks.葫芦 };
        if (this.isFlush(suitCount)) return { rank: Help_texas.HandRanks.同花 };
        if (this.isStraight(rankValues)) return { rank: Help_texas.HandRanks.顺子 };
        if (this.isThreeOfAKind(rankCount)) return { rank: Help_texas.HandRanks.三条 };
        if (this.isTwoPair(rankCount)) return { rank: Help_texas.HandRanks.两对 };
        if (this.isOnePair(rankCount)) return { rank: Help_texas.HandRanks.一对 };
        return { rank: Help_texas.HandRanks.高牌, highCards: rankValues.slice(0,5) };
    }

    // 具体判断方法（示例实现两个）
    private isStraightFlush(cards: any[]): boolean {
        const flushCards = this.getFlushCards(cards);
        if (!flushCards) return false;
        return this.isStraight(flushCards.map(c => this.getRankValue(c.rank)));
    }

    private isFourOfAKind(rankCount: Map<string, number>): boolean {
        return Array.from(rankCount.values()).includes(4);
    }

    private isRoyalFlush(cards: any[]): boolean {
        const flushCards = this.getFlushCards(cards);
        if (!flushCards) return false;
        const ranks = flushCards.map(c => c.rank).sort();
        return ranks.includes('10') && ranks.includes('J') && ranks.includes('Q') && 
               ranks.includes('K') && ranks.includes('A');
    }

    private isFlush(suitCount: Map<string, number>): boolean {
        return Array.from(suitCount.values()).some(count => count >= 5);
    }

    private isStraight(rankValues: number[]): boolean {
        const unique = [...new Set(rankValues)].sort((a,b) => b-a);
        // 处理A-2-3-4-5的特殊情况
        if (unique.join(',').includes('14,5,4,3,2')) return true;
        
        for (let i = 0; i <= unique.length - 5; i++) {
            if (unique[i] - unique[i+4] === 4) return true;
        }
        return false;
    }

    private isFullHouse(rankCount: Map<string, number>): boolean {
        const counts = Array.from(rankCount.values()).sort((a,b) => b-a);
        return counts[0] === 3 && counts[1] >= 2;
    }

    private isThreeOfAKind(rankCount: Map<string, number>): boolean {
        return Array.from(rankCount.values()).includes(3);
    }

    private isTwoPair(rankCount: Map<string, number>): boolean {
        return Array.from(rankCount.values()).filter(c => c === 2).length >= 2;
    }

    private isOnePair(rankCount: Map<string, number>): boolean {
        return Array.from(rankCount.values()).includes(2);
    }

    // 辅助方法
    private getFlushCards(cards: any[]): any[] | null {
        const suitCount = new Map<string, number>();
        cards.forEach(c => suitCount.set(c.suit, (suitCount.get(c.suit) || 0) + 1));
        
        const flushSuit = Array.from(suitCount.entries()).find(([_, count]) => count >= 5)?.[0];
        if (!flushSuit) return null;
        
        return cards.filter(c => c.suit === flushSuit)
                    .sort((a, b) => this.getRankValue(b.rank) - this.getRankValue(a.rank))
                    .slice(0, 5);
    }

    private getRankValue(rank: string): number {
        const values: { [key: string]: number } = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
            '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };
        return values[rank];
    }
}
