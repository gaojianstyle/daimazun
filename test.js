/*
 * @Author: daimazun.com gaojianstyle@163.com
 * @Date: 2023-02-27 10:45:37
 * @LastEditors: daimazun.com gaojianstyle@163.com
 * @LastEditTime: 2023-03-06 01:21:19
 * @FilePath: \daimazun\test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: 代码尊 gaojianstyle@163.com
 * @Date: 2023-02-27 01:32:02
 * @LastEditors: 代码尊 gaojianstyle@163.com
 * @LastEditTime: 2023-02-27 01:57:35
 * @FilePath: \daimazun\test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: 代码尊 gaojianstyle@163.com
 * @Date: 2023-02-27 01:32:02
 * @LastEditors: 代码尊 gaojianstyle@163.com
 * @LastEditTime: 2023-02-27 01:34:42
 * @FilePath: \daimazun\test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// var dmz = require('./dist/index.js')
const { demo } = require('./index.js');
var dmz = require('./index.js')
const n = dmz.n;

let object_demo = {
    name: "小明",
    age: 18,
    friends: {
        name: '小红',
        age: 17
    }
}



async function run_time(run) {
    console.log(`当前时间:${new Date()}`)
    let t1 = new Date();
    run();

    console.log('运行时间:' + (new Date() - t1));
}


// run_time(() => {
//     console.log(object_demo.g_object_to_json());
// })


// run_time(() => {
//     // const n = dmz.n;

//     // // n.ip_format("27.115.83.255").then(r => {
//     // //     console.log(r)
//     // // }).catch(e => {
//     // //     console.log("发生错误:", e)
//     // // })
//     // console.log(n.phone_format("17888888888"))
// })







// run_time(() => {
//     let from = {
//         host: 'smtp.163.com',
//         port: 465,
//         user: 'gaojian_daimazun@163.com',
//         // 邮箱授权码
//         pass: 'SGAGWJEDNOVIHMBS',
//     }

//     let to = {
//         from: '收件人', // 发件人
//         to: 'gaojianstyle@163.com, 1875238798@qq.com', // 收件人
//         cc: 'gaojianstyle@163.com',
//         subject: 'Hello ✔', // 主题
//         text: '默认-这是一封测试邮件12', // plain text body
//         html: '<b>默认-这是一封测试邮件html</b>', // html body
//         // 发送文件的文件路径数组,可为空,例如['D:/www/1.txt','D:/www/2.txt']
//         attachments: []
//     }


//     let email = new dmz.email(from);

//     email.send(to).then(r => {
//         console.log("发送成功:", r)
//     }).catch(e => {
//         console.log("发送失败:", e)
//     });
// })



// run_time(() => {
//     let img_src = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2Fa007a9b1eef97fbd431e6000b74133bad24133f5.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671793685&t=5fadd5691c060a78b113fe8bd94449de"

//     // 原格式输出
//     g_ocr(img_src, false).then(r => {
//         console.log(r)
//     })
//     // 微 软 雅 黑
//     // ABCDEFGHIJKLMNOPQRSTUVWXYZ
//     // 0123456789
// })




async function demo1() {
    console.log(`当前时间:${new Date()}`)
    let t1 = new Date();
    ////////////////////////////////////////////////////////
    await n.ip_format("27.115.83.255").then(r => {
        // resolve(r.g_object_to_json())
        console.log(r.g_object_to_json().g_json_to_map())
    }).catch(e => {
        console.log("发生错误:", e)
    })
    /////////////////////////////////////////////////////////
    console.log('运行时间:' + (new Date() - t1));
}

demo1()





// run_time(() => {

// })
