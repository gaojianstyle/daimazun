


class img {
    constructor() {
        this.fs = require("fs");
    }
    /**
     * 将图片转化为 base64
     * @param img_src
     * @returns {Promise<unknown>}
     */
    img_to_base64 = async (img_src) => {
        return await new Promise(((resolve, reject) => {
            this.fs.readFile(img_src, 'binary', function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    const buffer = new Buffer.from(data, 'binary');
                    let base64 = 'data: image/' + 'png' + ';base64,' + buffer.toString('base64');
                    resolve(base64);
                }
            });
        }))
    }
}


module.exports = {
    img
}


// //把图片转换成base64
// img_to_base64('http://4dn.net/vx.jpg').then(base64 => {
//     console.log(base64)
// }, err => {
//     console.log(err)
// })
//
