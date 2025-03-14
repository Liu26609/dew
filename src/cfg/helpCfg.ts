export let helpCfg = {
    commands: {
        help: {
            description: "显示帮助信息",
            shortcuts: {
                help: "帮助"
            },
            options: {
                help: "显示此信息",
                authority: "显示权限设置",
                showHidden: "查看隐藏的选项和指令"
            },
            messages: {
                "not-found": "指令未找到。",
                "hint-authority": "括号内为对应的最低权限等级",
                "hint-subcommand": "标有星号的表示含有子指令",
                "command-title": "📜指令提示ⓘ\n触发指令:{0}",
                "command-aliases": "别名：{0}。",
                "command-examples": "✦─✧🌰举个栗子✧─✦",
                "command-authority": "最低权限：{0} 级。",
                "subcommand-prolog": "✦─✧🌰相关指令✧─✦",
                "global-prolog": "当前可用的指令有{0}：",
                "global-epilog": "输入“{0}help 指令名”查看特定指令的语法和使用示例。",
                "available-options": "可用的选项有：",
                "available-options-with-authority": "可用的选项有（括号内为额外要求的权限等级）："
            }
        }
    }
};