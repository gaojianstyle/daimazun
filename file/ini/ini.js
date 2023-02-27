class ini {
    constructor(ini_src) {
        this.ini = require('ini');
        this.fs = require('fs-extra');
        this.ini_src = ini_src;
    }

    /**
     * 创建,写入
     * @param object
     * @param opt
     * @returns {boolean|*}
     */
    write = (object) => {
        try {
            // 创建目标文件夹层级
            let opt = '';
            this.fs.outputFileSync(this.ini_src, this.ini.stringify(object, {section: opt}));
            return true;
        } catch (e) {
            console.log(e)
            return e;
        }
    }
    /**
     * 创建,追加,修改
     * @param object
     * @param opt
     * @returns {boolean|*}
     */
    append = (object) => {
        try {
            // 创建目标文件夹层级
            this.fs.outputFileSync(this.ini_src);
            let opt = '';
            // 文件不存在
            if (!this.fs.existsSync(this.ini_src)) {
                this.fs.writeFileSync(this.ini_src, this.ini.stringify({}, {section: opt}));
            }
            let object_r = this.ini.parse(this.fs.readFileSync(this.ini_src, 'utf-8'));
            object_r = JSON.parse(JSON.stringify(object_r))
            object = {...object_r, ...object};
            console.log(object)
            this.fs.writeFileSync(this.ini_src, this.ini.stringify(object, {section: opt}));
            return true;
        } catch (e) {
            console.log(e)
            return e;
        }
    }
    /**
     * 读取内容
     * @returns object
     */
    read = () => {
        try {
            // 文件不存在
            if (!this.fs.existsSync(this.ini_src)) {
                return false;
            }
            let object_r = this.ini.parse(this.fs.readFileSync(this.ini_src, 'utf-8'));
            return JSON.parse(JSON.stringify(object_r))
        } catch (e) {
            console.log(e)
            return e;
        }
    }

}


module.exports = {
    ini
};


/**
 * 调用示例
 */

// const dmz = require('daimazun');
// const path = require("path");
// let ini = new dmz.ini(path.join(__dirname, 'config.ini'));
//
//
// let config = {
//     name: 'gaojian',
//     age: 25,
//     app1: {
//         mysql: {
//             user: 'root',
//             password: 'root'
//         },
//         mysql_2: {
//             user: 'root2',
//             password: 'root2'
//         }
//     }
// }
//
// /*
// * 重写: 每次调用都会清空原文件所有数据后重写,适合用于初始化文件
// *
// * */
// ini.write(config);
// // config.ini 文件中的数据:
// // name=gaojian
// // age=25
// //
// // [app1.mysql]
// // user=root
// // password=root
// //
// // [app1.mysql_2]
// // user=root2
// // password=root2
//
// let config_append = {
//     name3: 92,
//     ms: "这些都是追加的信息",
//     mysql: {
//         user: 1,
//         b4: 2
//     }
// }
// /*
// * 追加与节点数据覆盖: 只会对相同节点的数据进行覆盖,并且对没有的节点进行数据追加
// *
// * */
// ini.append(config_append)
// // config.ini 文件中的数据:
// // name=gaojian
// // age=25
// // name3=92
// // ms=这些都是追加的信息
// //
// // [app1.mysql]
// // user=root
// // password=root
// //
// // [app1.mysql_2]
// // user=root2
// // password=root2
// //
// // [mysql]
// // user=1
// // b4=2
// /*
// * 读取文件
// * */
// console.log(ini.read());
// // {
// //   name: 'gaojian',
// //   age: '25',
// //   name3: '92',
// //   ms: '这些都是追加的信息',
// //   mysql: { user: '1', b4: '2' },
// //   app1: {
// //     mysql: { user: 'root', password: 'root' },
// //     mysql_2: { user: 'root2', password: 'root2' }
// //   }
// // }

