/*
 * @Author: daimazun.com gaojianstyle@163.com
 * @Date: 2023-02-27 10:45:37
 * @LastEditors: daimazun.com gaojianstyle@163.com
 * @LastEditTime: 2023-02-27 14:38:07
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
// const dmz = require('./index.js')
const dmz = require('./dist/index.js')

// console.log(dmz.demo.demo().echo('hello world!'))


let object_demo = {
    name: "小明",
    age: 18,
    friends: {
        name: '小红',
        age: 17
    }
}



function run_time(run) {
    console.log(`当前时间:${new Date()}`)
    let t1 = new Date();
    run()
    console.log('运行时间:' + (new Date() - t1));
}


run_time(() => {

})


run_time(() => {
    console.log(object_demo.g_object_to_json());
})


// run_time(() => {

// })

// run_time(() => {

// })

// run_time(() => {

// })

// run_time(() => {

// })
