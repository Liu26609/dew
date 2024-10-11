import app from "../../../app";
import god from "../../../god";
import { prop_PetEgg } from "../../../model/bag/prop_PetEgg";
import { prop_base } from "../../../model/bag/prop_base";
import { player, wallet_key } from "../../../model/fight/body/player";
import { logger } from "../../../model/server/logger";
import { Tpl_auction, template } from "../../../shared/master/MsgAction";
import manage_user from "./manage_user";

class manage_auction {
    _downTime: number = 20;
    private timer?;
    auctionNow?: { name: string, uuid: string, item: prop_base };
    auctionList: { name: string, uuid: string, item: prop_base }[] = []

    nowPrice!: { name: string, uuid: string, price: number };
    priceList: { name: string, uuid: string, price: number }[] = []
    constructor() {

    }
    /**
     * 检测拍卖品是否已经到时间成交
     */
    private checkTime() {

    }
    private updateDownTime() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this._downTime = 60;
        if (this.auctionNow) {
            this._downTime = this.auctionNow.item.value * this.auctionNow.item.num * 1
            if (this._downTime > 60 * 5) {
                this._downTime = 60 * 5;
            }
        }
        this.timer = setInterval(() => {
            this.deal();
        }, 1000)
    }
    private deal() {
        if (this._downTime > 0) {
            this._downTime -= 1;
            return;
        }
        if (!this.auctionNow) {
            clearTimeout(this.timer)
            return;
        }
        logger.debug('拍卖行成交')
        let auctionInfo = this.auctionNow;
        let priceInfo = this.nowPrice;
        god.send({ uuid: 'sys', name: '交易所' }, priceInfo.uuid, '交易所拍卖', `恭喜你,拍卖获得${auctionInfo.item.getStyleName()}x${auctionInfo.item.num}`, [auctionInfo.item]);

        let online = manage_user.locaHas(auctionInfo.uuid)
        priceInfo.price = Math.ceil(priceInfo.price * 0.8);
        if (online) {
            online.wallet_change(wallet_key.gold, priceInfo.price)
            god.send({ uuid: 'sys', name: '交易所' }, auctionInfo.uuid, '交易所拍卖', `恭喜你,${priceInfo.name}拍下了您的${auctionInfo.item.getStyleName()},获得金币X${priceInfo.price}(已扣除20%手续费),已自动转入钱包`, []);
        } else {
            let item = app.createCfgItem('prop-15', 0, '系统邮件');
            item.set_cont(Math.floor(priceInfo.price))
            god.send({ uuid: 'sys', name: '交易所' }, auctionInfo.uuid, '交易所拍卖', `恭喜你,${priceInfo.name}拍下了您的${auctionInfo.item.getStyleName()},获得金币X${priceInfo.price}(已扣除20%手续费)`, [item]);
        }
        this.sellStart();
    }
    look(tag: player): Tpl_auction {
        let auctionNow = this.auctionNow;
        let sellItem = auctionNow ? auctionNow.item : undefined;
        let item_template: any = undefined;
        let item_data = {}
        if (sellItem) {
            let info = sellItem.look(tag);
            item_template = info.template;
            item_data = info.data;
        }
        return {
            id: app.v4(),
            playerCont: manage_user.getOnlineCont(),
            downTime: this._downTime,
            item_info: {
                item_template: item_template,
                item_data: item_data
            },
            nowPrice: this.nowPrice,
            priceList: this.priceList
        }
    }
    sellStart() {
        let info = this.auctionList.shift()
        this.auctionNow = info
        if (!info) {
            return;
        }
        this.priceList = [];
        // 通知全服玩家一次拍卖行有新物品
        this.sysPrice();
        this.updateDownTime();
        manage_user.sendAllMsg(template.default, `拍卖行:${info.item.getStyleName()}x${info.item.num}开始拍卖!`)
    }
    private sysPrice() {
        if (!this.auctionNow) {
            debugger;
            return;
        }
        let val = app.random(1, (this.auctionNow.item.value * this.auctionNow.item.num) * 0.5)
        if (this.auctionNow.item instanceof prop_PetEgg) {
            val = app.random(50, 100);
        }else{
            val = Math.ceil(val);
        }
        this.nowPrice = { name: '主神商店', uuid: 'sys', price: val }
        this.priceList.push({ name: '主神商店', uuid: 'sys', price: val })
    }
    sell(name: string, uuid: string, item: prop_base, cont: number) {
        let _item = app.createItem(item);
        _item.set_cont(cont);
        console.log(`${name}上架了商品${_item.getStyleName()}X${_item.num}`)
        this.auctionList.push({
            name: name,
            uuid: uuid,
            item: _item
        })
        if (!this.auctionNow) {
            this.sellStart();
            return;
        }
    }
    price(uuid: string, name: string, price: number) {
        if (!this.auctionNow) {
            return
        }
        this.updateDownTime();
        price = this.nowPrice.price + price
        // 退回上一个人的钱
        if (this.nowPrice.uuid != 'sys') {
            let online = manage_user.locaHas(this.nowPrice.uuid)
            if (online) {
                online.sendMsg(template.default, `交易所:[${name}]已出价${price},您的金币已退回`)
                online.wallet_change(wallet_key.gold, this.nowPrice.price)
            } else {
                let item = app.createCfgItem('prop-15', 0, '系统邮件');
                item.set_cont(this.nowPrice.price)
                god.send({ uuid: 'sys', name: '交易所' }, this.nowPrice.uuid, '交易所拍卖', `已有更高出价,您的金币已退回`, [item]);
            }
        }
        this.nowPrice = {
            name: name,
            uuid: uuid,
            price: price,
        }
        this.priceList.unshift({
            name: name,
            uuid: uuid,
            price: price,
        })
    }
}
export default new manage_auction();