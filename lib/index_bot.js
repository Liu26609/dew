import { Schema } from 'koishi';
export const name = 'dew-bot';
export let logger;
export const Config = Schema.object({
    测试参数: Schema.string().default('测试')
});
export function apply(ctx) {
    logger = ctx.logger('[game]');
    // write your plugin here
    let ls = [
        'telegram/callback-query',
        'telegram/channel-post', //
        'telegram/chat-join-request',
        'telegram/chat-member',
        'telegram/chosen-inline-result',
        'telegram/edited-channel-post',
        'telegram/edited-message',
        'telegram/inline-query',
        'telegram/message',
        'telegram/my-chat-member', //
        'telegram/poll-answer',
        'telegram/poll',
        'telegram/pre-checkout-query',
        'telegram/shipping-query'
    ];
    for (let i = 0; i < ls.length; i++) {
        ctx.on(ls[i], async (session) => {
            console.log(`接受到消息类型:${ls[i]},${session}`);
            console.log(session);
        });
    }
    ctx.on('telegram/channel-post', async (session) => {
        console.log('标题修改');
    });
    ctx.on('message', async (session) => {
        let tg_data = session.event._data.message;
        if (tg_data.new_chat_title) {
            session.send(`<p>狗日的群主<at id="${tg_data.from.username}"></at>把群名修改成了<strong>"${tg_data.new_chat_title}"</strong><button text="玩原神玩的" type="input">启动</button>`);
        }
        if (tg_data.new_chat_member) {
            // if(tg_data.new_chat_member.is_bot){
            //   return;
            // }
            session.send(`<p>欢迎新韭菜进群<at id="${tg_data.new_chat_member.first_name}"></at>这个人邀请的<at id="${tg_data.from.first_name}"></at>千万现金点击就送<button text="我是傻逼" type="input">开始送钱</button><button text="扣1" type="input">领取地狱火</button>`);
        }
        if (session.content.length < 2) {
            console.log(session);
            console.log('接受到短消息');
            return;
        }
        // console.log("获取到信息:",session.content);
        // return;
        // 发送图片
        session.send(`
 <p>游戏大厅 <strong>"GameCoca"</strong>全新赌场上线了，真人荷官在线发牌！专为喜欢<strong>Spine</strong>动画风格游戏和<strong>Slot</strong>老虎机游戏的玩家设计</p>
 
 <a href="https://www.gamecoca.com">❤❤❤千万现金点击就送❤❤❤</a>
  <button href="https://www.gamecoca.com/" type="link">GameCoca启动！</button>`);
        // let bt = new battle_d();
        // for (let i = 0; i < 10; i++) {
        //   let u_1 = test.create_unity();
        //   u_1.name = `玩家${i}`;
        //   console.log(u_1)
        //   let b_1 = test.create_unity()
        //   b_1.name = `敌人${i}`;
        //   bt.join(battle_group.主场, u_1)
        //   bt.join(battle_group.客场, b_1)
        // }
        // bt.start();
    });
}
