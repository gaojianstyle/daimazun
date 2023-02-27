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



const demo = require("./demo/demo.js");
const file = require("./file/file.js");
const root = require("./root/root.js");
const email = require("./email/email.js");
const mysql = require("./mysql/mysql.js");
const jsonfile = require("./file/jsonfile/jsonfile.js");
const g = require("./g/g.js");
const img = require("./img/img.js");
const ini = require("./file/ini/ini.js");
// Object prototype 原型链扩展
require("./g/prototype/prototype.js");
const f = require("./f/f.js");
const n = require("./n/n.js");
const redis = require("./redis/redis.js")

module.exports = {
    root: root.root,
    demo: demo.demo,
    email: email.email,
    mysql: mysql.mysql,
    file: file.file,
    jsonfile: jsonfile.jsonfile,
    g: new g.g,
    img: new img.img,
    ini: ini.ini,
    f: new f.f,
    n: new n.n,
    redis: redis.redis
}
