class g {
    constructor() {
    }

    /**
     * map 转 object
     * @param map
     */
    g_map_to_object(map) {
        // @ts-ignore
        return Array.from(map).reduce((obj, [key, value]) =>
                // @ts-ignore
                Object.assign(obj, {[key]: value})
            , {});
    }

    /**
     * map 转 json字符串
     * @param map
     */
    g_map_to_json(map) {
        // @ts-ignore
        let object = Array.from(map).reduce((obj, [key, value]) =>
                // @ts-ignore
                Object.assign(obj, {[key]: value})
            , {});
        return JSON.stringify(object)
    }

    /**
     * object 转 map
     * @param param
     */
    g_object_to_map(object) {
        return new Map(Object.entries(object));
    }

    /**
     * object 转 json 字符串
     * @param param
     */
    g_object_to_json(object) {
        return JSON.stringify(object);
    }

    /**
     * json字符串 转 map
     * @param json
     */
    g_json_to_map(json) {
        let object = JSON.parse(json);
        return new Map(Object.entries(object));
    }

    /**
     * json字符串 转 object
     * @param json
     */
    g_json_to_object(json) {
        return JSON.parse(json);
    }

    /**
     * 替换全部的字符串
     * @param string
     * @param s1
     * @param s2
     */
    g_string_replace_all(string, s1, s2) {
        return string.replace(new RegExp(s1, "gm"), s2);
    };

    /**
     * 返回object长度
     * @param object
     */
    g_object_length(object) {
        let map = new Map(Object.entries(object));
        return map.size;
    }

    /**
     * object 循环出 value
     * ps: 之所以需要这个函数是因为 for in 会遍历出原型链
     *      或者使用其他的for循环方法,那就太麻烦了违背初衷,
     *      干脆在原型链中写入循环方法
     * https://www.jb51.net/article/203542.htm
     * @param object
     * @param callback
     */
    g_object_for(object, callback) {
        try {
            /**
             * https://www.cnblogs.com/chenguangliang/p/6678564.html
             * 不循环原型链
             */
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    let value = eval("object." + key);
                    callback(key, value);
                }
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 将 object 的 key和 value 分离成数组
     * @param object
     */
    g_object_keys_values_to_arr(object) {
        try {
            let keys = []
            let values = []
            /**
             * https://www.cnblogs.com/chenguangliang/p/6678564.html
             * 不循环原型链
             */
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    let value = eval("object." + key);
                    keys.unshift(key);
                    values.unshift(value);
                }
            }
            return {
                keys: keys,
                values: values
            }
        } catch (e) {
            return false;
        }
    }

    /**
     * 循环数据
     * ps: 因为原型链的关系,for in 使用会暴露原型链,特以此方法代替for循环
     * 但是,没有用原型链的情况下这个可有可无
     * @param arr
     * @param callback
     */
    g_arr_for(arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            callback(i, arr[i]);
        }
    }

}


module.exports = {
    g
}



























