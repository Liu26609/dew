//道具
export interface Item {
    emoji: string,
    icon:string,
    // 道具ID
    id: string;
    // 道具名称
    name: string;
    // 道具描述
    desc: string;
    // 道具分类
    type: ItemType;
    // 数量
    count: number;
    // 道具数据
    data: any;
  }
  export enum ItemType {
    资源 = 'resource',
    // 装备
    装备 = 'equipment',
    // 消耗品
    消耗品 = 'consumable',
    // 消耗品 - 不可叠加
    技能书 = 'skill_book',
    // 宠物蛋
    宠物蛋 = 'pet_egg',
    // 血统卷轴
    血统卷轴 = 'talent_book',
    // 盲盒
    盲盒 = 'box',
  }