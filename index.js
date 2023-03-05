/*
 * @Author: daimazun.com gaojianstyle@163.com
 * @Date: 2023-02-27 10:45:37
 * @LastEditors: daimazun.com gaojianstyle@163.com
 * @LastEditTime: 2023-03-06 00:07:49
 * @FilePath: \daimazun\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// function is_node() {
//     if (typeof window === 'object') {
//         // window只存在于浏览器端
//         return false;
//     } else if (Object.prototype.toString.call(process) === '[object process]') {
//         //判断procss
//         return true;
//     }
// }
//
// if (is_node()) {
//     const demo = require("./demo/demo.js");
//     const file = require("./file/file.js");
//     const root = require("./root/root.js");
//     const email = require("./email/email.js");
//     const mysql = require("./mysql/mysql.js");
//     const jsonfile = require("./file/jsonfile/jsonfile.js");
//     const g = require("./g/g.js");
//     const img = require("./img/img.js");
//     const ini = require("./file/ini/ini.js");
//     // Object prototype 原型链扩展
//     require("./g/prototype/prototype.js");
//     const f = require("./f/f.js");
//     const n = require("./n/n.js");
//
//     module.exports = {
//         root: root.root,
//         demo: demo.demo,
//         email: email.email,
//         mysql: mysql.mysql,
//         file: file.file,
//         jsonfile: jsonfile.jsonfile,
//         g: new g.g,
//         img: new img.img,
//         ini: ini.ini,
//         f: new f.f,
//         n: new n.n
//     }
// } else {
//     require("./g/prototype/prototype.js");
// }
//


// Object prototype 原型链扩展
require("./g/prototype/prototype.js"); //!此模块使用g-anything模块代替
const root = require("./root/root.js");
const demo = require("./demo/demo.js");
const file = require("./file/file.js");
const email = require("./email/email.js");
const mysql = require("./mysql/mysql.js");
const jsonfile = require("./file/jsonfile/jsonfile.js");
const g = require("./g/g.js");
const img = require("./img/img.js");
const ini = require("./file/ini/ini.js");
const f = require("./f/f.js");
const n = require("./n/n.js");
const redis = require("./redis/redis.js")

module.exports = {
    root: root.root,
    demo: demo.demo,
    file: file.file,
    email: email.email,
    mysql: mysql.mysql,
    jsonfile: jsonfile.jsonfile,
    g: new g.g,
    img: new img.img,
    ini: ini.ini,
    f: new f.f,
    n: new n.n,
    redis: redis.redis
}





