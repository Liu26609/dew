
import mysql from 'mysql2'
class db {
    connection: any
    private lastActive: number = Date.now();
    constructor() {

    }
    async init() {
        // await this.createConnection()

    }
    createConnection() {
        // this.connection = mysql.createPool({
        //     host: '43.136.14.72',
        //     user: 'rank',
        //     password: 'F7dw7dEHwPiLJKjJ',
        //     database: 'rank',
        //     waitForConnections: true,
        // });
        // this.connection = mysql.createPool({
        //     host: '43.136.14.72',
        //     user: 'dev',
        //     password: 'WjiYLnsZwGBpSW2R',
        //     database: 'dev',
        //     waitForConnections: true,
        // });
        // setInterval(() => {
        //     this.sql(`select  1`, [])
        // }, 1000)
    }
    async sql(sql: string, arry: any[]): Promise<any[]> {
        debugger;
        return new Promise(async (resolve, reject) => {
            const attemptQuery = async () => {
                this.connection.getConnection((err, connection) => {
                    if (err) {
                        setTimeout(() => attemptQuery(), 100); // 间隔100毫秒后重试
                        return;
                    }
                    connection.query(sql, arry, (error, results, fields) => {
                        connection.release(); // 释放连接
                        if (error) {
                            console.error(sql, error);
                            setTimeout(() => attemptQuery(), 500); // 间隔100毫秒后重试
                            return;
                        }
                        this.lastActive = Date.now();
                        resolve(results);
                    });
                });
            };
    
            attemptQuery();
        });
    }
}
export default new db();