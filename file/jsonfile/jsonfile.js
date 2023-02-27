const fs = require("fs-extra");

class jsonfile {
    constructor(json_file_src) {
        this.json_file_src = json_file_src;
    }

    /**
     * 初始化项目配置
     * https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/remove.md
     * @param init_json
     * @returns {Promise<unknown>}
     */
    async init(init_json) {
        return await new Promise((resolve, reject) => {
            try {
                const fs = require('fs-extra');
                let file = this.json_file_src;
                fs.remove(file).then(() => {
                    // 创建json并写入初始化json数据
                    fs.outputJson(file, {...init_json}).then(r => {
                        resolve(true)
                    })
                })
            } catch (e) {
                reject('参数错误');
            }
        })
    }

    /**
     * 往json文件中更新,追加节点数据
     * @param json_append
     * @returns {Promise<unknown>}
     */
    async json_file_append(json_append) {
        return await new Promise((resolve, reject) => {
            try {
                const fs = require('fs-extra');
                let file = this.json_file_src;
                fs.readJson(file)
                    .then(packageObj => {
                        fs.remove(file).then(() => {
                            // 创建json并写入初始化json数据
                            fs.outputJson(file, {...packageObj, ...json_append}).then(r => {
                                // resolve(true)
                                fs.readJson(file)
                                    .then(packageObj => {
                                        resolve(packageObj);
                                    })
                            })
                        })
                    })
                    .catch(err => {
                        reject(err)
                    })
            } catch (e) {
                reject(false);
            }
        })
    }

    /**
     * 读取文件
     * @returns {Promise<unknown>}
     */
    async json_file_read() {
        return await new Promise((resolve, reject) => {
            try {
                const fs = require('fs-extra');
                let file = this.json_file_src;
                fs.readJson(file)
                    .then(packageObj => {
                        resolve(packageObj);
                    })
                    .catch(err => {
                        reject(err)
                    })
            } catch (e) {
                reject(false);
            }
        })
    }
}


module.exports = {
    jsonfile
}

