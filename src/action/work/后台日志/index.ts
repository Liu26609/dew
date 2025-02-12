// `<p>欢迎新韭菜进群<at id="${tg_data.new_chat_member.first_name}"></at>这个人邀请的<at id="${tg_data.from.first_name}"></at>千万现金点击就送<button text="我是傻逼" type="input">开始送钱</button><button text="扣1" type="input">领取地狱火</button>`

import actionCfg from "../../../cfg/actionCfg";

export default class{
    constructor(){
        actionCfg.push({
            key: "后台/预警检查",
            key_tips: '预警检查',
            tips: "预警检查",
            example: [
                "@bot 预警检查",
            ],
            path: 'work/后台日志/预警任务'
        })
        // actionCfg.push({
        //     key: "后台/订阅预警",
        //     key_tips: '订阅预警',
        //     tips: "订阅预警",
        //     example: [
        //         "@bot 订阅预警",
        //     ],
        //     path: 'work/后台日志/订阅预警'
        // })
        actionCfg.push({
            key: "后台/取消订阅",
            key_tips: '取消订阅',
            tips: "取消订阅",
            example: [
                "@bot 取消订阅",
            ],
            path: 'work/后台日志/取消订阅'
        })
        actionCfg.push({
            key: "后台/补偿关闭",
            key_tips: '补偿关闭',
            tips: "补偿关闭",
            example: [
                "@bot 补偿关闭",
            ],
            path: 'work/后台日志/补偿关闭'
        })
        actionCfg.push({
            key: "后台/补偿开启",
            key_tips: '补偿开启',
            tips: "补偿开启",
            example: [
                "@bot 补偿开启",
            ],
            path: 'work/后台日志/补偿开启'
        })
        actionCfg.push({
            key: "后台/补偿运行",
            key_tips: '补偿运行',
            tips: "补偿运行",
            example: [
                "@bot 补偿运行",
            ],
            path: 'work/后台日志/补偿运行'
        })

    }
}