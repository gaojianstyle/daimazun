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
const dmz = require('./index.js')

// console.log(dmz.demo.demo().echo('hello world!'))


let object_demo = {
    name: "小明",
    age: 18,
    friends: {
        name: '小红',
        age: 17
    }
}
// var startTime = timestamp1; // timestamp1 is the first timestamp in milliseconds 
// var endTime = timestamp2; // timestamp2 is the second timestamp in milliseconds

// // Calculate difference 
// var diffMilliseconds = endTime - startTime;

// // Convert to human-readable date 
// var diffSeconds = Math.round(diffMilliseconds / 1000); // Round to nearest second
// var diffMinutes = diffSeconds / 60;
// var diffHours = diffMinutes / 60;
// var diffDays = diffHours / 24;



var t1 = new Date();

// object 转 map
console.log(object_demo.g_object_to_json().g_json_to_map().g_map_to_json().g_json_to_object());

console.log('time:' + (new Date() - t1));







