import { Context, Schema } from 'koishi'
import { unity } from './lib/unity/unity'
import { test_battle } from './lib/battle/test.battle'
import word from './lib/word'
import { battle_d } from './lib/battle/battle'
import { battle_group } from './lib/face/FACE_BODY'
import common from './lib/common'
import message from './trigger/message'
import bot_logic from './trigger/bot_logic'
export const name = 'dew-bot'

export interface Config {
  测试参数: string
}
export let logger: any
export const Config: Schema<Config> = Schema.object({
  测试参数: Schema.string().default('测试')
})

export function apply(ctx: Context) {
  logger = ctx.logger('[game]')
  console.log('[bot]启动',ctx)
  // write your plugin here
  word.start();

  let test = new test_battle();
  ctx.on('message', async (session) => {
    new bot_logic(session)
    return;
    let bt = new battle_d();
    for (let i = 0; i < 10; i++) {
      let u_1 = test.create_unity();
      u_1.name = `玩家${i}`;
      console.log(u_1)
      let b_1 = test.create_unity()
      b_1.name = `敌人${i}`;
      bt.join(battle_group.主场, u_1)
      bt.join(battle_group.客场, b_1)
    }
    bt.start();

  })
}