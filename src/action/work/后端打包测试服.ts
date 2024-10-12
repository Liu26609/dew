import server from "../../server";
import message from "../../trigger/message";
import { exec } from 'child_process';
import Client from 'ssh2-sftp-client';
const fs = require('fs');
const path = require('path');

export default class {
    constructor(cls: message) {
        cls.addLine(`后端测试服打包开始`)
        cls.send();
        //    C:\Users\admin\Desktop\Gamecoca_Web_Client
        this.zip(cls)
    }
    async zip(cls: message) {
        process.chdir('C:\\Users\\admin\\Desktop\\\Gamecoca_Web_Backend_Client');
        exec('node zip-dist.js dev', async (error, stdout, stderr) => {
            if (error) {
            console.error(`exec error: ${error}`);
            return;
            }
            console.log('stdout', stdout);
            cls.addLine(`打包完成: ${stdout}`);
            cls.send();
            // Change directory to C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client
            process.chdir('C:\\Users\\admin\\Desktop\\\Gamecoca_Web_Backend_Client');
            // 将文件上传到 sftp://47.76.131.222
            const sftp = new Client();
            const localDir = 'C:\\Users\\admin\\Desktop\\\Gamecoca_Web_Backend_Client\\dist';
            const remoteDir = '/home/CMD/nginx/game/backend/';

            try {
            await sftp.connect({
                host: '47.76.131.222',
                port: '22',
                username: 'root',
                password: 'Cmd2024!.'
            });

            const uploadDirectory = async (localDir: string, remoteDir: string) => {
                const files = fs.readdirSync(localDir);

                for (const file of files) {
                const localFilePath = path.join(localDir, file);
                const remoteFilePath = path.join(remoteDir, file).replace(/\\/g, '/');
                const stats = fs.statSync(localFilePath);

                if (stats.isDirectory()) {
                    await sftp.mkdir(remoteFilePath, true);
                    await uploadDirectory(localFilePath, remoteFilePath);
                } else {
                    await sftp.put(localFilePath, remoteFilePath);
                }
                }
            };

            await uploadDirectory(localDir, remoteDir);

            console.log('All files uploaded successfully');
            cls.addLine(`文件上传完成 后端测试服${stdout}`);
            cls.send();
            } catch (err) {
            console.error(`SFTP error: ${err.message}`);
            cls.addLine(`文件上传失败: ${err.message}`);
            cls.send();
            } finally {
            sftp.end();
            }
        });
    }

    async start(cls: message) {
        try {
            // Change directory to C:\Users\admin\Desktop\Gamecoca_Web_Client
            process.chdir('C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client');
            // Execute the build command
            exec('npm run build:dev', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log('stdout', stdout)
                cls.addLine(`打包完成`)
                cls.send();

                // Command execution completed
            });
        } catch (err) {
            console.error(`chdir error: ${err}`);
            cls.addLine(`打包失败: 详细信息请查看控制台`)
            cls.send();
        }
    }
}