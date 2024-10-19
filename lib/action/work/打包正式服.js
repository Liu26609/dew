import { exec } from 'child_process';
const fs = require('fs');
const path = require('path');
export default class {
    constructor(cls) {
        // cls.addLine(`正式服打包开始`)
        // cls.send();
        //    C:\Users\admin\Desktop\Gamecoca_Web_Client
        // this.zip(cls)
        this.start(cls);
    }
    async zip(cls) {
    }
    async zip_cilent(cls) {
        try {
            // Change directory to C:\Users\admin\Desktop\Gamecoca_Web_Client
            process.chdir('C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client');
            // Execute the build command
            exec('npm run build:prod', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log('stdout', stdout);
                cls.addLine(`打包完成`);
                cls.send();
            });
        }
        catch (err) {
            console.error(`chdir error: ${err}`);
            cls.addLine(`打包失败: 详细信息请查看控制台`);
            cls.send();
        }
    }
    async zip_server(cls) {
        try {
            // Change directory to C:\Users\admin\Desktop\Gamecoca_Web_Client
            process.chdir('C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client');
            // Execute the build command
            exec('npm run build:prod', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log('stdout', stdout);
                cls.addLine(`打包完成<file src="C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client\\webClient-dev-1.0.217.zip"></file>`);
                cls.send();
            });
        }
        catch (err) {
            console.error(`chdir error: ${err}`);
            cls.addLine(`打包失败: 详细信息请查看控制台`);
            cls.send();
        }
    }
    async start(cls) {
        // this.zip_cilent(cls)
        cls.session.send(`<button text="扣1" type="input">领取地狱火</button>`);
        // cls.send();
    }
}
