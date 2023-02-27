const redis_1 = require('redis');
const async = require("async");

/**
 * 封装 redis 操作
 * 官网: https://www.npmjs.com/package/redis/v/3.1.2
 * 参考1: https://blog.csdn.net/qq_40323256/article/details/127736549
 * 参考2: http://t.zoukankan.com/fslnet-p-10529202.html
 */
class redis {
    constructor(redis_db = {
            host: '127.0.0.1',
            port: '6379',
            password: ''
        }) {

        this.redis_db = redis_db;

        this.client = redis_1.createClient(this.redis_db.port, this.redis_db.host ,{auth_pass:this.redis_db.password});
        // if(this.redis_db !== ''){
        //     this.client.auth(this.redis_db.password);
        // }

        this.client.on('error', function(err){
            // console.error('Redis error:', err);
        });

        this.redisClient = this.client;
        ////////////////////
        // No further commands will be processed
        // 断开连接,以后扩展时可能用上,暂时先留在这
        // client.end(true);
    }

    /**
     * redis 写入键值对
     * @param {string} key 键
     * @param {string} val 值
     * @param {number} timeout 过期时间，单位 s
     */
    set(key, val, timeout = 60 * 60) {
        const client = this.client;
        // key = JSON.stringify(key);
        if (typeof val === 'object') {
            val = JSON.stringify(val)
        }
        client.set(key, val)
        client.expire(key, timeout)
    }


    /**
     * 获取键值对
     * @param key
     * @returns {Promise<unknown>}
     */
    async get(key) {
        return await new Promise((resolve, reject) => {
            try {
                this.redisClient.get(key, (err, val) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    if (val == null) {
                        resolve(null)
                        return
                    }

                    try {
                        resolve(
                            JSON.parse(val)
                        )
                    } catch (ex) {
                        resolve(val)
                    }
                })
            }catch (e) {
                console.log(e)
                resolve(e)
            }
        })
    }

    /**
     * 判断值是否存在
     * @param key
     * @returns {Promise<unknown>}
     */
    async has(key) {
        return await new Promise((resolve, reject) => {
            this.redisClient.get(key, (err, val) => {
                if (err) {
                    reject(err)
                    return
                }
                if (val == null) {
                    resolve(false)
                    return
                }

                try {
                    resolve(
                        true
                    )
                } catch (ex) {
                    resolve(true)
                }
            })
        })
    }

    /**
     * 获取所有键值对
     * @returns {Promise<unknown>}
     */
    async get_all() {
        const redisClient = this.redisClient
        return await new Promise((resolve, reject) => {
            redisClient.keys("*", (err, keys) => {
                if (keys) {
                    async.map(keys, function (key, cb) {
                        redisClient.get(key, function (error, value) {
                            if (error) return cb(error);
                            var dongle = {};
                            dongle['key'] = key;
                            dongle['value'] = JSON.stringify(value);
                            cb(null, dongle);
                        });
                    }, function (error, results) {
                        if (error) return console.log(error);
                        resolve(results)
                    });
                }
            })
        })
    }

    /**
     * 获取like匹配的key所有键值对
     * @param like_key
     * @returns {Promise<unknown>}
     */
    async get_all_like(like_key) {
        const redisClient = this.redisClient
        return await new Promise((resolve, reject) => {
            redisClient.keys(`${like_key}`, (err, keys) => {
                if (keys) {
                    async.map(keys, function (key, cb) {
                        redisClient.get(key, function (error, value) {
                            if (error) return cb(error);
                            var dongle = {};
                            dongle['key'] = key;
                            dongle['value'] = JSON.stringify(value);
                            cb(null, dongle);
                        });
                    }, function (error, results) {
                        if (error) return console.log(error);
                        resolve(results)
                    });
                }
            })
        })
    }

    /**
     * 获取所有的key,返回数组
     * @returns {Promise<unknown>}
     */
    async get_keys() {
        return await new Promise((resolve, reject) => {
            this.redisClient.keys("*", (err, keys) => {
                if (err) {
                    reject(err)
                    return
                }
                try {
                    resolve(
                        keys
                    )
                } catch (ex) {
                    resolve(keys)
                }
            })
        })
    }

    /**
     * 获取like匹配的key所有key,返回数组
     * @param like_key
     * @returns {Promise<unknown>}
     */
    async get_keys_like(like_key) {
        return await new Promise((resolve, reject) => {
            this.redisClient.keys(`${like_key}`, (err, keys) => {
                if (err) {
                    reject(err)
                    return
                }
                try {
                    resolve(
                        keys
                    )
                } catch (ex) {
                    resolve(keys)
                }
            })
        })
    }

    /**
     * 删除键值对
     * @param key
     */
    remove(key){
        this.client.del(key)
    }





}

module.exports = {
    redis
}
