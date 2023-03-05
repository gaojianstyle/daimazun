const {createWorker} = require('tesseract.js');
const path = require('path');
require("../../../g/prototype/prototype.js");

// const worker = createWorker({
//   langPath: path.join(__dirname, '..', 'lang-data'),
//   logger: m => console.log(m),
// });
//
// (async () => {
//   await worker.load();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   const { data: { text } } = await worker.recognize(path.join(__dirname, '..', 'images', 'testocr.png'));
//   console.log(text);
//   await worker.terminate();
// })();

function str_to_long(str) {
    return str.g_string_replace_all(" ", "").g_string_replace_all("\n", "");
}


async function orc() {
    return await new Promise((resolve, reject) => {
        try {
            const worker = createWorker({
                langPath: path.join(__dirname, '..', 'lang-data'),
                logger: m => {
                    // console.log(m)
                },
            });
            (async () => {
                await worker.load();
                await worker.loadLanguage('chi_sim');
                await worker.initialize('chi_sim');
                const {data: {text}} = await worker.recognize(path.join(__dirname, '..', 'images', '1.png'));
                // console.log(str_to_long(text));
                resolve(text);
                await worker.terminate();
            })();
        } catch (e) {
            reject(false);
        }
    })
}



module.exports = {
    orc: orc
}



let food_add = [
    '鸡全蛋粉', '生活饮用水', '食用盐', '亚铁硫酸钠'
]

// let food_add_1 = {
//     "水": ["生活饮用水", "水"],
//     "食用盐": ["食用盐", "氯化钠", "nacl","岩盐"]
// }

/**
 * 从字符串中提取与数组中匹配的词条
 * @param r
 * @param food_add
 * @returns {*[]}
 */
function food_add_have(r, food_add) {
    let food_add_have = [];
    for (let i in food_add) {
        let value = food_add[i];
        if (r.indexOf(value) !== -1) {
            // console.log("含有")
            food_add_have.push(value)
        } else {
            // console.log("不含有")
        }
    }
    return food_add_have;
}

let img_src = path.join(__dirname, '..', 'images', '11.png')

orc().then((r) => {
    console.log(r)
    console.log(food_add_have(str_to_long(r), food_add))
})











