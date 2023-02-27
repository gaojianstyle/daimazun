class mysql {
    constructor(db) {
        // this.mysql = require('mysql');
        this.db = db;
    }

    async sql(sql, arr = []) {
        const that = this;
        return await new Promise(function (resolve, reject) {
            try {
                let mysql = require('mysql');
                let connection = mysql.createConnection(that.db);
                connection.connect();
                connection.query(sql, arr, function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                    // if (error) {
                    //     reject(error);
                    // }else{
                    //     resolve(results);
                    // }
                    // resolve(JSON.parse(JSON.stringify(results)));
                });
                connection.end();
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = {
    mysql
}

/**
 * 使用方法
 */
// let db = new mysql({
//     host: 'localhost', //数据库地址
//     port: '3306',//端口号
//     user: 'root',//用户名
//     password: 'gaojian.gj',//密码
//     database: 'demo'//数据库名称
// }).sql('select * from tabledemo111').then((r) => {
//     console.log('什么东西')
//     console.log(r)
// }).catch(e => {
//     console.log('发生错误1111111111111111111111111111:', e)
//     res.send('发生错误')
// })
