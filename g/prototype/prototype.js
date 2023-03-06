/*
* 怎么在原型链上添加属性且不会被for in 检索
* https://www.zhihu.com/question/64046262/answer/215893191
* https://blog.csdn.net/qq_54527592/article/details/119084505
* */
// Object.defineProperty(Object.prototype, "x", {
//     enumerable: false, //控制属性是否可以枚举，默认值是false, 妈妈再也不用担心被 for in 出来啦~
//     writable: false, //控制属性是否可以被修改，默认值是false
//     configurable: false, //控制属性是否可以被删除，默认值是false
//     value: function () {
//         console.log('aa小公主', this)
//     }
// });


// var fs = require("fs-extra");
// const fss = require("fs");
// const path = require("path");
// const md5 = require("md5");
// const {v4: uuidv4} = require("uuid");
// const moment = require("moment");


const { createWorker } = require("tesseract.js");
/**
 * map 转 prototype
 * @param map
 */
Object.defineProperty(Object.prototype, "g_map_to_object", {
    value: function () {
        return Array.from(this).reduce((obj, [key, value]) =>
            // @ts-ignore
            Object.assign(obj, { [key]: value })
            , {});
    }
});

/**
 * map 转 json字符串
 * @param map
 */
Object.defineProperty(Object.prototype, "g_map_to_json", {
    value: function () {
        let object = Array.from(this).reduce((obj, [key, value]) =>
            // @ts-ignore
            Object.assign(obj, { [key]: value })
            , {});
        return JSON.stringify(object)
    }
});

/**
 * object 转 map
 * @param object
 */
Object.defineProperty(Object.prototype, "g_object_to_map", {
    value: function () {
        return new Map(Object.entries(this));
    }
});


/**
 * object 转 json 字符串
 * @param param
 */
Object.defineProperty(Object.prototype, "g_object_to_json", {
    value: function () {
        return JSON.stringify(this);
    }
});


/**
 * json字符串 转 map
 * @param json
 */
Object.defineProperty(Object.prototype, "g_json_to_map", {
    value: function () {
        let object = JSON.parse(this);
        return new Map(Object.entries(object));
    }
});


/**
 * json字符串 转 object
 * @param json
 */
Object.defineProperty(Object.prototype, "g_json_to_object", {
    value: function () {
        return JSON.parse(this);
    }
});


/**
 * 替换全部的字符串
 * @param s1
 * @param s2
 */
Object.defineProperty(Object.prototype, "g_string_replace_all", {
    value: function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    }
});


/**
 * 返回object长度
 * @param object
 */
Object.defineProperty(Object.prototype, "g_object_length", {
    value: function () {
        let map = new Map(Object.entries(this));
        return map.size;
    }
});


/**
 * object 循环出 value
 * ps: 之所以需要这个函数是因为 for in 会遍历出原型链
 *      或者使用其他的for循环方法,那就太麻烦了违背初衷,
 *      干脆在原型链中写入循环方法
 * https://www.jb51.net/article/203542.htm
 * @param object
 * @param callback
 */
Object.defineProperty(Object.prototype, "g_object_for", {
    value: function (callback) {
        try {
            /**
             * https://www.cnblogs.com/chenguangliang/p/6678564.html
             * 不循环原型链
             */
            // for (let key in this) {
            //     if (this.hasOwnProperty(key)) {
            //         let value = eval("this." + key);
            //         callback(key, value);
            //     }
            // }
            Object.keys(this).forEach((key, index) => {
                callback(key, this[key]);
            })
            return true;
        } catch (e) {
            return false;
        }
    }
});


/**
 * 将 object 的 key和 value 分离成数组
 * @param object
 */
Object.defineProperty(Object.prototype, "g_object_keys_values_to_arr", {
    value: function () {
        try {
            let keys = []
            let values = []
            /**
             * https://www.cnblogs.com/chenguangliang/p/6678564.html
             * 不循环原型链
             */
            for (let key in this) {
                if (this.hasOwnProperty(key)) {
                    let value = eval("this." + key);
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
});


/**
 * 循环数据
 * ps: 因为原型链的关系,for in 使用会暴露原型链,特以此方法代替for循环
 * 但是,没有用原型链的情况下这个可有可无
 * @param arr
 * @param callback
 */
Object.defineProperty(Object.prototype, "g_arr_for", {
    value: function (callback) {
        for (let i in this) {
            callback(i, this[i]);
        }
    }
});

/**
 * uuid
 */
Object.defineProperty(Object.prototype, "g_uuid", {
    value: function () {
        // const uuid = require('uuid');
        const { v4: uuidv4 } = require('uuid');
        // uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        return uuidv4().replace(new RegExp('-', "gm"), '');
    }
});

/**
 * 获取当时间信息
 */
Object.defineProperty(Object.prototype, "g_time", {
    value: function (callback) {
        let moment = require('moment');
        // 关闭提示,不符合中国人思维习惯的统统关掉!!
        moment.suppressDeprecationWarnings = true;
        moment.locale('cn', {
            weekdays: [
                "星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
            ]
        });
        let time = Date.now();

        let msg = {}
        let msg1 = {
            time: moment(time).format('YYYY-MM-DD HH:mm:ss'),
            time_s1: moment(time).format('YYYY-MM-DD HH:mm:ss.SSS'),
            time_s2: moment(time).format('MMMM Do YYYY, h:mm:ss a'),
            // Y: time.format('YYYY'),
            // M: time.format('MM'),
            // D: time.format('DD'),
            // h: time.format('HH'),
            // m: time.format('mm'),
            // s: time.format('ss'),
            // sss: time.format('SSS'),
            // （星期六为 6）
            week: moment(time).day(),
            M: moment(time).format('M'),
            MM: moment(time).format('MM'),
            MMM: moment(time).format('MMM'),
            MMMM: moment(time).format('MMMM'),
            // 季度
            Q: moment(time).format('Q'),
            D: moment(time).format('D'),
            DD: moment(time).format('DD'),
            d: moment(time).format('d'),
            ddd: moment(time).format('ddd'),
            dddd: moment(time).format('dddd'),
            w: moment(time).format('w'),
            A: moment(time).format('A'),
            a: moment(time).format('a'),
            YYYY: moment(time).format('YYYY'),
            YY: moment(time).format('YY'),
            HH: moment(time).format('HH'),
            H: moment(time).format('H'),
            hh: moment(time).format('hh'),
            h: moment(time).format('h'),
            m: moment(time).format('m'),
            mm: moment(time).format('mm'),
            s: moment(time).format('s'),
            ss: moment(time).format('ss'),
            sss: moment(time).format('SSS'),
            X: moment(time).format('X'),
            x: moment(time).valueOf(),
            // 获取今天0时0分0秒
            start_day: moment(time).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            // 获取本周第一天(周日)0时0分0秒
            start_week: moment(time).startOf('week').format('YYYY-MM-DD HH:mm:ss'),
            // 获取本周周一0时0分0秒
            start_isoWeek: moment(time).startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss'),
            start_month: moment(time).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
            start_years: moment(time).startOf('years').format('YYYY-MM-DD HH:mm:ss'),

            end_day: moment(time).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            // 本周6最后的时间
            end_week: moment(time).endOf('weeks').format('YYYY-MM-DD HH:mm:ss'),
            // 本周日最后的时间
            end_isoWeek: moment(time).endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss'),
            end_month: moment(time).endOf('month').format('YYYY-MM-DD HH:mm:ss'),
            end_years: moment(time).endOf('years').format('YYYY-MM-DD HH:mm:ss'),

        }
        msg = { ...msg1, ...moment(time).toObject() }
        msg.months = moment(time).format('MM');
        // 处理黑魔法,星期天为0就是黑魔法,给我变回来!
        if (msg.week === 0) {
            msg.week = 7
        }
        return msg;
    }
});


/**
 * 解析时间
 * https://blog.csdn.net/yuan_jlj/article/details/117294481
 */
Object.defineProperty(Object.prototype, "g_time_format", {
    value: function () {
        let moment = require('moment');
        // 关闭提示,不符合中国人思维习惯的统统关掉!!
        moment.suppressDeprecationWarnings = true;
        moment.locale('cn', {
            weekdays: [
                "星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
            ]
        });
        let msg = {}
        let msg1 = {
            time: moment(this).format('YYYY-MM-DD HH:mm:ss'),
            time_s1: moment(this).format('YYYY-MM-DD HH:mm:ss.SSS'),
            time_s2: moment(this).format('MMMM Do YYYY, h:mm:ss a'),
            // Y: time.format('YYYY'),
            // M: time.format('MM'),
            // D: time.format('DD'),
            // h: time.format('HH'),
            // m: time.format('mm'),
            // s: time.format('ss'),
            // （星期六为 6）
            week: moment(this).day(),
            M: moment(this).format('M'),
            MM: moment(this).format('MM'),
            MMM: moment(this).format('MMM'),
            MMMM: moment(this).format('MMMM'),
            // 季度
            Q: moment(this).format('Q'),
            D: moment(this).format('D'),
            DD: moment(this).format('DD'),
            d: moment(this).format('d'),
            ddd: moment(this).format('ddd'),
            dddd: moment(this).format('dddd'),
            w: moment(this).format('w'),
            A: moment(this).format('A'),
            a: moment(this).format('a'),
            YYYY: moment(this).format('YYYY'),
            YY: moment(this).format('YY'),
            HH: moment(this).format('HH'),
            H: moment(this).format('H'),
            hh: moment(this).format('hh'),
            h: moment(this).format('h'),
            m: moment(this).format('m'),
            mm: moment(this).format('mm'),
            s: moment(this).format('s'),
            ss: moment(this).format('ss'),
            sss: moment(this).format('SSS'),
            x: moment(this).format('X'),
            X: moment(this).valueOf(),
            // 获取今天0时0分0秒
            start_day: moment(this).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            // 获取本周第一天(周日)0时0分0秒
            start_week: moment(this).startOf('week').format('YYYY-MM-DD HH:mm:ss'),
            // 获取本周周一0时0分0秒
            start_isoWeek: moment(this).startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss'),
            start_month: moment(this).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
            start_years: moment(this).startOf('years').format('YYYY-MM-DD HH:mm:ss'),

            end_day: moment(this).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            //
            end_week: moment(this).endOf('week').format('YYYY-MM-DD HH:mm:ss'),
            //
            end_isoWeek: moment(this).endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss'),
            end_month: moment(this).endOf('month').format('YYYY-MM-DD HH:mm:ss'),
            end_years: moment(this).endOf('years').format('YYYY-MM-DD HH:mm:ss'),

        }
        msg = { ...msg1, ...moment(this).toObject() }
        msg.months = moment(this).format('MM');
        // 处理黑魔法,星期天为0就是黑魔法,给我变回来!
        if (msg.week === 0) {
            msg.week = 7
        }
        return msg;
    }
});

/**
 * 判断一个日期是否在两个日期之间 between
 */
Object.defineProperty(Object.prototype, "g_time_between", {
    value: function (time_begin, time_end) {
        let moment = require('moment');
        // 关闭提示,不符合中国人思维习惯的统统关掉!!
        moment.suppressDeprecationWarnings = true;
        return moment(this).isBetween(time_begin, time_end); // true
    }
});


/**
 * 日期之前的时间
 */
Object.defineProperty(Object.prototype, "g_time_ago", {
    value: function (num) {
        let moment = require('moment');
        // 关闭提示,不符合中国人思维习惯的统统关掉!!
        moment.suppressDeprecationWarnings = true;
        // console.log('时间obj333333333333333333',moment().toObject())
        return {
            year: moment(this).subtract(num, 'years').format('YYYY-MM-DD HH:mm:ss'),
            month: moment(this).subtract(num, 'months').format('YYYY-MM-DD HH:mm:ss'),
            week: moment(this).subtract(num, 'days').format('YYYY-MM-DD HH:mm:ss'),
            day: moment(this).subtract(num, 'days').format('YYYY-MM-DD HH:mm:ss'),
            hour: moment(this).subtract(num, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            minute: moment(this).subtract(num, 'minute').format('YYYY-MM-DD HH:mm:ss'),
            second: moment(this).subtract(num, 'second').format('YYYY-MM-DD HH:mm:ss'),
            milliseconds: moment(this).subtract(num, 'milliseconds').format('YYYY-MM-DD HH:mm:ss.SSS')
        }
    }
});

/**
 * 日期之后的时间
 */
Object.defineProperty(Object.prototype, "g_time_add", {
    value: function (num) {
        let moment = require('moment');
        // 关闭提示,不符合中国人思维习惯的统统关掉!!
        moment.suppressDeprecationWarnings = true;
        // console.log('时间obj333333333333333333',moment().toObject())
        return {
            year: moment(this).add(num, 'years').format('YYYY-MM-DD HH:mm:ss'),
            month: moment(this).add(num, 'months').format('YYYY-MM-DD HH:mm:ss'),
            week: moment(this).add(num, 'week').format('YYYY-MM-DD HH:mm:ss'),
            day: moment(this).add(num, 'days').format('YYYY-MM-DD HH:mm:ss'),
            hour: moment(this).add(num, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            minute: moment(this).add(num, 'minute').format('YYYY-MM-DD HH:mm:ss'),
            second: moment(this).add(num, 'second').format('YYYY-MM-DD HH:mm:ss'),
            milliseconds: moment(this).add(num, 'milliseconds').format('YYYY-MM-DD HH:mm:ss.SSS')
        }
    }
});

/**
 * 计算时间差
 */
Object.defineProperty(Object.prototype, "g_time_diff", {
    value: function (time_begin, time_end) {
        let moment = require('moment');
        // 关闭提示,不符合中国人思维习惯的统统关掉!!
        moment.suppressDeprecationWarnings = true;
        let msg = {
            year: moment(time_begin).diff(moment(time_end), 'years'),
            Q: moment(time_begin).diff(moment(time_end), 'Q'),
            month: moment(time_begin).diff(moment(time_end), 'months'),
            week: moment(time_begin).diff(moment(time_end), 'weeks'),
            day: moment(time_begin).diff(moment(time_end), 'days'),
            hour: moment(time_begin).diff(moment(time_end), 'hour'),
            minute: moment(time_begin).diff(moment(time_end), 'minutes'),
            second: moment(time_begin).diff(moment(time_end), 'second'),
            milliseconds: moment(time_begin).diff(moment(time_end), 'milliseconds'),
        }
        // msg.time_diff = `${msg.year}-${msg.month-(msg.year*12)}-${msg.day-((msg.month-(msg.year*12))*30)}`;
        // msg.time_diff =  moment( msg.time_diff).format('YY-MM-DD HH:mm:ss');
        return msg;
    }
});


/**
 * 将字符串中字符的ascii编码不是 32~126 (即所有英文字母和常用符号)的全部转换成utf8编码
 * @param str
 * @returns {string}
 */
Object.defineProperty(Object.prototype, "g_string_to_utf8_en", {
    value: function (str) {
        function isChinese(temp) {
            var re = /[^\u4E00-\u9FA5]/;
            if (re.test(temp)) return false;
            return true;
        }

        function is_utf_c(temp) {
            if ((temp.charCodeAt(0)) >= 32 && (temp.charCodeAt(0)) <= 126) {
                return true;
            }
            return false;
        }

        let arr = [...str];
        let arr2 = [];
        for (let i in arr) {
            // console.log(arr[i].charCodeAt(0),is_utf_c(arr[i]))
            if (!is_utf_c(arr[i])) {
                // alert('该字符串是中文');
                arr2.push(encodeURI(arr[i]))
            } else {
                arr2.push((arr[i]))
            }
        }
        return arr2.join('');
    }
});


/**
 * 将字符串中所有的汉字全部转换成utf8编码
 * @param str
 * @returns {string}
 */
Object.defineProperty(Object.prototype, "g_string_to_utf8_cn", {
    value: function (str) {
        function isChinese(temp) {
            var re = /[^\u4E00-\u9FA5]/;
            if (re.test(temp)) return false;
            return true;
        }

        let arr = [...str];
        let arr2 = [];
        for (let i in arr) {
            if (isChinese(arr[i])) {
                // alert('该字符串是中文');
                arr2.push(encodeURI(arr[i]))
            } else {
                arr2.push((arr[i]))
            }
        }
        return arr2.join('');
    }

});


/**
 * 字符串中除了英文字母外所有字符都转换成utf8编码
 */
Object.defineProperty(Object.prototype, "g_string_to_utf8", {
    value: function (str) {
        return encodeURI(str);
    }
});


/**
 * 字符串中所有utf8编码都转换成字符
 */
Object.defineProperty(Object.prototype, "g_utf8_to_string", {
    value: function (str) {
        return decodeURI(str);
    }
});


/**
 * 判断问价是否是video
 */
Object.defineProperty(Object.prototype, "g_is_video", {
    value: function (file_name) {
        //用来验证的后缀，如果还有其它格式，可以添加在right_type;
        let type = [
            "avi", "wmv", "mpg", "mpeg", "mov"
            , "rm", "ram", "swf", "flv", "mp4", "mp3"
            , "wma", "avi", "rm", "rmvb", "flv", "mpg"
            , "mkv", "m4a"
        ]
        // 获取文件的后缀
        let file_type = file_name.split('.').pop();
        // console.log(file_type)
        return type.includes(file_type);
    }
});


/**
 * 判断问价是否是video
 */
Object.defineProperty(Object.prototype, "g_is_img", {
    value: function (file_name) {
        //用来验证的后缀，如果还有其它格式，可以添加在right_type;
        let type = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
        // 获取文件的后缀
        let file_type = file_name.split('.').pop();
        // console.log(file_type)
        return type.includes(file_type);
    }
});


/**
 * object arr 转换成 insert sql语句
 */
Object.defineProperty(Object.prototype, "g_orm_insert", {
    value: function (table_name, params_object_arr) {
        let arr1 = [];
        for (let i in params_object_arr) {
            let value = params_object_arr[i];
            let sql_data = `('${value.g_object_keys_values_to_arr().values.join("','")}')`;
            arr1.push(sql_data);
        }
        return `insert into ${table_name}(${params_object_arr[0].g_object_keys_values_to_arr().keys.join(",")}) values` + arr1.join(",");
    }
});


/**
 * 文件夹名称是否合法
 */
Object.defineProperty(Object.prototype, "g_regular_folder", {
    value: function (file_name) {
        // 系统保留等文件夹名称
        let arr1 = [
            'PRN', 'prn',
            'AUX', 'aux',
            'NUL', 'nul',
            'CON', 'con',
            'COM1', 'con1',
            'COM2', 'con2',
            'COM3', 'con3',
            'COM4', 'con4',
            'COM5', 'con5',
            'COM6', 'con6',
            'COM7', 'con7',
            'COM8', 'con8',
            'COM9', 'con9',
            'LPT1', 'lpt1',
            'LPT2', 'lpt2',
            'LPT3', 'lpt3',
            'LPT4', 'lpt4',
            'LPT5', 'lpt5',
            'LPT6', 'lpt6',
            'LPT7', 'lpt7',
            'LPT8', 'lpt8',
            'LPT9', 'lpt9',
        ]
        // 文件名不能包含的字符串
        let arr2 = [
            '\\', '/', ':', '*', '?', '\"', '<', '>', '|'
        ]
        for (let i in arr1) {
            if (file_name === arr1[i]) {
                return false;
            }
        }
        for (let i in arr2) {
            if (file_name.indexOf(arr2[i]) !== -1) {
                return false;
            }
        }
        return true;
    }
});


/**
 * 生成随机字符串
 * @param len 指定生成字符串长度
 * @param charStr
 */
Object.defineProperty(Object.prototype, "g_random_string", {
    value: function (len, charStr = null) {
        let _charStr = ''
        if (charStr === null) {
            _charStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        } else if (charStr === 'number') {
            _charStr = '0123456789';
        } else if (charStr === 'en') {
            _charStr = 'abcdefghijklmnopqrstuvwxyz';
        } else if (charStr === 'EN') {
            _charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (charStr === 'en_EN') {
            _charStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (charStr === 'en_number') {
            _charStr = 'abcdefghijklmnopqrstuvwxyz0123456789';
        } else if (charStr === 'EN_number') {
            _charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        } else {
            _charStr = charStr
        }

        for (let i = 0; i < 5; i++) {
            _charStr = _charStr + _charStr
        }


        let min = 0,
            max = _charStr.length - 1,
            _str = '';                    //定义随机字符串 变量


        //判断是否指定长度，否则默认长度为15
        len = len || 15;
        //循环生成字符串
        for (var i = 0, index; i < len; i++) {
            index = (function (randomIndexFunc, i) {
                return randomIndexFunc(min, max, i, randomIndexFunc);
            })(function (min, max, i, _self) {
                let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
                    numStart = _charStr.length - 10;
                if (i == 0 && indexTemp >= numStart) {
                    if (charStr === 'number') {
                    } else {
                        indexTemp = _self(min, max, i, _self);
                    }
                }
                return indexTemp;
            }, i);
            _str += _charStr[index];
        }
        return _str;
    }
});


/**
 * ocr 图片文字识别
 */
Object.defineProperty(Object.prototype, "g_ocr", {
    value: async function ocr(img_src, to_string = false) {
        return await new Promise((resolve, reject) => {
            try {
                const { createWorker } = require('tesseract.js')
                const worker = createWorker({
                    // langPath: '../../data/ocr',
                    logger: m => {
                        // console.log(m)
                    }
                });
                (async () => {
                    await worker.load();
                    await worker.loadLanguage('chi_sim');
                    await worker.initialize('chi_sim');
                    const { data: { text } } = await worker.recognize(img_src);
                    // console.log(text);
                    // 去除字符串中的空格和换行符
                    if (to_string) {
                        resolve(text.g_string_replace_all(" ", "").g_string_replace_all("\n", ""));
                    } else {
                        resolve(text);
                    }
                    await worker.terminate();
                })();

            } catch (e) {
                console.log(e)
                reject(false);
            }
        })
    }
});


/**
 * 从字符串中提取与数组中匹配的词条
 */
Object.defineProperty(Object.prototype, "g_str_match_arr", {
    value: function (match_arr) {
        let food_add_have = [];
        for (let i in match_arr) {
            let value = match_arr[i];
            if (this.indexOf(value) !== -1) {
                // console.log("含有")
                food_add_have.push(value)
            } else {
                // console.log("不含有")
            }
        }
        return food_add_have;
    }
});

