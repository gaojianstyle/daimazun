# 喜欢就支持个棒棒糖吧!



|                             微信                             |                            支付宝                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://cdn.staticaly.com/gh/gaojianstyle/g-imgs@main/public/pay/pay-gaojian-weixin.png" style="width:70%;"> | <img src="https://cdn.staticaly.com/gh/gaojianstyle/g-imgs@main/public/pay/pay-gaojian-zhifubao.png" style="width:70%"> |



​	

# 主要期望

> **2022年10月12日 22:07:29** 
>
> 封装一些前后端都能使用的通用便捷方法
>
> **2022年10月17日 02:15:50**
>
> 封装后端通用便捷方法,去除黑魔法
>
> **2022年11月16日 18:07:51**
>
> 1. 封装后端通用方法，去除黑魔法。
> 2. 安全、高效的完成开发任务。
> 3. 减少所有无用的记忆,达到看到方法名即知用法.
> 4. 简化所有可以简化的操作.



# 特别说明

- 此框架仅适用于**后端**,前端框架移步至 [daimazun-web](https://www.npmjs.com/package/daimazun-web)  框架
- 此框架的 [Object原型链扩展](#Object原型链扩展) 功能部分和 [daimazun-web](https://www.npmjs.com/package/daimazun-web) 框架功能和更新保持一致



# 作者其他框架列表

**后端框架:**

- [daimazun](https://www.npmjs.com/package/daimazun) 

**前端框架:**

- [daimazun-web](https://www.npmjs.com/package/daimazun-web) 

**前后端通用框架:**

- [g-anything](https://www.npmjs.com/package/g-anything) 


# 安装

```
npm i daimazun
或
cnpm i daimazun
或
yarn add daimazun
```



# 引用

```JavaScript
const dmz = require("daimazun");
```



# 版本更新说明

| 版本   | 更新内容                                                     |
| ------ | ------------------------------------------------------------ |
| 1.0.34 | 增加基于5个离线库的ip解析方法:<br/>[ip_format(ip)](#ip_format(ip)) 这应该是目开源库能找到的最新、最全、最准、最优雅便捷的nodejs的ip解析库，光是离线库就用到了5个。<br/>解析内容包含了基础的洲国省市区、运营商、还包含了经纬度、以及经纬度的的精确半径、以及ip所属网段、甚至可以判定ip是否为代理和vpn等特征来判断是否存在攻击性,还有很多妙用的值，可结合自身自行探索。 |
| 1.0.35 | 增加基于身份证号离线库的两个关于身份证号的方法: <br/>[phone_format(phone)](#ip_format(ip)) 解析手机号的所有信息<br/>[idCard_format(idCard)](#手机号解析) 解析身份证号码<br/>[idCard_create(object)](#身份证号解析) 按照指定条件生成身份证号码,特殊情况下非常好用 |
| 1.0.36 | object原型链扩展新增:<br/>注: object模块中的方法都是前后端通用的,也就是说g_ocr方法前后端通用.<br/>[.g_str_match_arr(match_arr)](#.g_str_match_arr(match_arr))  从字符串中匹配数组存在的值,并返回数组.<br/>[g_ocr(img_src,to_string)](#g_ocr(img_src,to_string)) ocr 图片文字识别.<br/>修复说明文档的错误. |
| 1.0.37 | 修复前面所有版本的bug,修复1.0.34-1.0.36引用严重bug,增强稳定性,更新离线库,向下兼容,github源代码挂载,欢迎提交代码,让我们继续愉快的玩耍吧! |
| 1.0.38 | 补充前面版本缺失的重要原型链,修复1.0.37版本自动运行测试并打印的问题. |





# 目录

- **数据库**
  -  [class mysql](#mysql)
    - sql()	执行sql
  -  [class redis](#redis)
     -  set(key, val, timeout = 60 * 60) 写入键值对,过期时间单位 s
     -  get(key) 获取键值对
     -  has(key) 判断值是否存在
     -  get_all() 获取所有键值对
     -  get_all_like(like_key) 获取like匹配的key所有键值对
     -  get_keys() 获取所有的key,返回数组
     -  get_keys_like(like_key) 获取like匹配的key所有key,返回数组
     -  remove(key) 删除键值对
- **file**
  - [class ini](#ini)
    - write(object)   生成项目配置文件,每次调用都会重写ini文件
    - append(object)   创建文件、追加与修改ini文件中的数据节点
    - read()    读取文件,返回json对象
  
  - [class jsonfile](#jsonfile)
    - init(jsondata)	生成项目配置文件,每次调用都会重写文件
    - json_file_append(jsondata)    创建文件、追加与修改json文件中的json数据节点
    - json_file_read()    读取json文件,返回json对象
- **[class email](#email)**
- send(to_msg) 发送邮件 
- **[class img](#img)**
- img_to_base64(img_src) 	把本地图片(绝对路径)转换成 base64 数据
- **[g模块](#g)**
  - g_map_to_object(map)  map 转 json 对象
  - g_map_to_json(map) map 转 json 字符串
  - g_object_to_map(object)  json对象 转 map
  - g_object_to_json(param) json对象 转 json字符串
  - g_json_to_map (json) json字符串 转 map
  - g_string_replace_all(string, s1, s2) 替换字符串中的全部的指定字符串,将s1替换成s2
  - g_object_length(object) 返回json对象节点数
  - g_object_for(object, callback) 循环出json对象 value
  - g_object_keys_values_to_arr(object) 将 json对象 的 key和 value 分离成数组
  - g_arr_for(arr, callback) 循环数组对象节点
- **[Object原型链扩展](#Object原型链扩展)**
  - .g_map_to_object(map)  map 转 json 对象
  - .g_map_to_json(map) map 转 json 字符串
  - .g_object_to_map(object)  json对象 转 map
  - .g_object_to_json(param) json对象 转 json字符串
  - .g_json_to_map (json) json字符串 转 map
  - .g_string_replace_all(string, s1, s2) 替换字符串中的全部的指定字符串,将s1替换成s2
  - .g_object_length(object) 返回json对象节点数
  - .g_object_for(object, callback) 循环出json对象 value
  - .g_object_keys_values_to_arr(object) 将 json对象 的 key和 value 分离成数组
  - .g_arr_for(arr, callback) 循环数组对象节点
  - g_time() 获取当前时间点的全部信息
  - .g_time_format() 解析一个时间的全部信息
  - .g_time_ago(num) 一个时间点以前的信息
  - .g_time_add(num) 一个时间点以后的信息
  - g_time_between(time1,time2) 判断前者的时间是否在后者时间之前
  - g_time_diff(time1,time2) 计算两个时间差的所有详细信息
  - g_uuid() 生成唯一uuid
  - g_string_to_utf8_en(str) 将字符串中字符的ascii编码不是 32~126 (即所有英文字母和常用符号)的全部转换成utf8编码
  - g_string_to_utf8_cn(str) 将字符串中所有的汉字全部转换成utf8编码
  - g_string_to_utf8(str) 字符串中除了英文字母外所有字符都转换成utf8编码
  - g_utf8_to_string(str) 字符串中所有utf8编码都转换成字符
  - g_orm_insert(table_name, params_object_arr) object数组转sql insert语句
  - g_regular_folder(folder_name) 文件夹名称是否合法
  - g_random_string(len, charStr) 生成随机字符串
  - [.g_str_match_arr(match_arr)](#.g_str_match_arr(match_arr))  从字符串中匹配数组存在的值,并返回数组
  - [g_ocr(img_src,to_string)](#g_ocr(img_src,to_string))  ocr 图片文字识别
- **[n模块](#n模块)**
  - md5(p) 根据字符串或文件(路径)生成md5码
  - sha256(p) 根据字符串或文件(路径)生成sha256码
  - jwt(object, secret_key, time_out_s) 生成加密 token
  - jwt_de(token, secret_key) 解密 token
  -  [ip_format(ip)](#ip_format(ip)) 解析一个ip的所有信息,距离今为止应该是开源库上最全的ip解析，本地离线库的ops不是在线解析可比的
  -   [phone_format(phone)](#ip_format(ip)) 解析手机号的所有信息
  -  [idCard_format(idCard)](#手机号解析) 解析身份证号码
  -  [idCard_create(object)](#身份证号解析) 按照指定条件生成身份证号码


​			

​		

# 调用示例


```javascript
const dmz = require('daimazun');
```

## <a id="mysql">mysql 数据库</a>



数据库模型:

![417c930cb2c1eca948a3d2d21331901](https://gitee.com/gaojianstyle/img_md/raw/master/npm/daimazun/417c930cb2c1eca948a3d2d21331901.jpg)



```javascript
const dmz = require('daimazun');
let db = new dmz.mysql({
        host: 'localhost', //数据库地址
        port: '3306',//端口号
        user: 'root',//用户名
        password: '*****',//密码
        database: 'demo'//数据库名称,也可不指定数据库
    });

db.sql("select * from tabledemo2").then((r) => {
    console.log(r)
}).catch(e => {
    console.log('发生错误:', e)
})

db.sql("INSERT INTO tabledemo2 (id,uid) VALUES (12,2333332)").then((r) => {
    console.log(r)
}).catch(e => {
    console.log('发生错误:', e)
});

// 还可以这样,使用数组来代替sql中的 ? ,效果与上面等同
let sql_1 = "INSERT INTO tabledemo2 (id,uid) VALUES (?,?)";
db.sql(sql_1,[12,2333332]).then((r) => {
    console.log(r)
}).catch(e => {
    console.log('发生错误:', e)
});

db.sql("select * from tabledemo2").then((r) => {
    console.log(r)
}).catch(e => {
    console.log('发生错误:', e)
});

	
```



![](https://gitee.com/gaojianstyle/img_md/raw/master/npm/daimazun/309188b6cad9e71e9ec5be063dfd1a5.jpg)



可以搭配使用原型链扩展的 g_orm_insert 方法来搭配使用

```JavaScript
let arr1 = [
    {
        file_id: g_uuid(), // 主键,生成随机字符串代替
        originalFilename: "文件名",
        time_creat: Date.now().g_time_format().time
    },
    {
        file_id: g_uuid(), // 主键,生成随机字符串代替
        originalFilename: "文件名",
        time_creat: Date.now().g_time_format().time
    },
    {
        file_id: g_uuid(), // 主键,生成随机字符串代替
        originalFilename: "文件名",
        time_creat: Date.now().g_time_format().time
    },
]

await db.sql(g_orm_insert('file', arr1)).then((r) => {
    // console.log(r)
}).catch(e => {
    console.log('发生错误:', e)
    throw e;
})

console.log("object arr转换成insert sql语句:", g_orm_insert('file', arr1));
//object arr转换成insert sql语句: insert into file(time_creat,originalFilename,file_id) values('2022-11-10 02:12:36','文件名','da21aba0b49b4ff687628c64830944d1'),('2022-11-10 02:12:36','文件名','0cb4944bc2624138a6196922d1e6ae51'),('2022-11-10 02:12:36','文件名','a6bae584a30648709c67f7524cb2dcb1')
```



# <a id="redis">redis数据库</a>

封装redis数据库,去除了很多黑魔法,优雅的调用,目前这些方法已经够用,后续会封装更多方法.

```JavaScript
const dmz = require('daimazun');


let redis_db = {
    host: '127.0.0.1',
    port: '6379',
    password: ''
}
const redis = new dmz.redis(redis_db);

//或 const redis = new dmz.redis()  //效果和上面等同,默认参数与 redis_db 等同


/**
 * redis set
* @param {string} key 键
* @param {string} val 值
* @param {number} timeout 过期时间，单位 s
*/

redis.set("g_1",{name:4}, 30)
redis.set("g_134",{name:4}, 30)
redis.set("g_21",{name:4}, 30)
redis.set("g_155@163.com",{name:4}, 30)
redis.set("g_email_134654@163.com",{name:4}, 30)
redis.set("g_email_13334@163.com",{name:4}, 30)
redis.set("g_email_243234321@163.com",{name:4}, 30)
redis.set("g_email_15576578@163.com",{name:4}, 30)

// console.log()
redis.get("g_1").then(r=>{
    console.log(r);
})
// { name: 4 }

redis.has("g_1").then(r=>{
    console.log(r);
})
// true


redis.get_all().then(r=>{
    console.log(r)
})
// [
//   { key: 'g_email_13334@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'g_email_134654@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'g_134', value: '"{\\"name\\":4}"' },
//   { key: 'g_email_243234321@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'g_1', value: '"{\\"name\\":4}"' },
//   { key: 'hello', value: '"This is a value"' },
//   { key: 'g_email_15576578@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'color', value: '"red"' },
//   { key: 'g_155@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'hello22', value: '"This is a value"' },
//   { key: 'g_21', value: '"{\\"name\\":4}"' }
// ]


redis.get_keys().then(r=>{
    console.log(r)
})
//[
//   'g_email_13334@163.com',
//   'g_email_134654@163.com',
//   'g_134',
//   'g_email_243234321@163.com',
//   'g_1',
//   'hello',
//   'g_email_15576578@163.com',
//   'color',
//   'g_155@163.com',
//   'hello22',
//   'g_21'
// ]





redis.get_all_like(`*13*`).then(r=>{
    console.log(r)
})
//[
//   { key: 'g_email_13334@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'g_email_134654@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'g_134', value: '"{\\"name\\":4}"' }
// ]



redis.get_keys_like(`*_1*`).then(r=>{
    console.log(r)
})
// [
//   { key: 'g_email_13334@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'g_email_134654@163.com', value: '"{\\"name\\":4}"' },
//   { key: 'g_134', value: '"{\\"name\\":4}"' }
// ]

// 删除键值对
redis.remove("g_1")
```



# <a id="ini">ini</a>

(推荐) 最佳的配置文件解决方案,完美平替 jsonfile,一切都很优雅.

ps: 对 ini 文件结构不熟悉的看这里 [INI（文件扩展名）_百度百科 (baidu.com)](https://baike.baidu.com/item/INI/9212321) ,配合示例代码理解事半功倍.

```javascript
const dmz = require('daimazun');
let ini = new dmz.ini(path.join(__dirname, 'config.ini'));


let config = {
    name: 'gaojian',
    age: 25,
    app1: {
        mysql: {
            user: 'root',
            password: 'root'
        },
        mysql_2: {
            user: 'root2',
            password: 'root2'
        }
    }
}

/*
    * 重写: 每次调用都会清空原文件所有数据后重写,适合用于初始化文件
    * */
ini.write(config);
// config.ini 文件中的数据:
// name=gaojian
// age=25
//
// [app1.mysql]
// user=root
// password=root
//
// [app1.mysql_2]
// user=root2
// password=root2

let config_append = {
    name3: 92,
    ms: "这些都是追加的信息",
    mysql: {
        user: 1,
        b4: 2
    }
}

/*
* 追加与节点数据覆盖: 只会对相同节点的数据进行覆盖,并且对没有的节点进行数据追加
* */
ini.append(config_append)
// config.ini 文件中的数据:
// name=gaojian
// age=25
// name3=92
// ms=这些都是追加的信息
//
// [app1.mysql]
// user=root
// password=root
//
// [app1.mysql_2]
// user=root2
// password=root2
//
// [mysql]
// user=1
// b4=2

/*
* 读取文件
* */
console.log(ini.read());
// {
//   name: 'gaojian',
//   age: '25',
//   name3: '92',
//   ms: '这些都是追加的信息',
//   mysql: { user: '1', b4: '2' },
//   app1: {
//     mysql: { user: 'root', password: 'root' },
//     mysql_2: { user: 'root2', password: 'root2' }
//   }
// }
```



## <a id="jsonfile">jsonfile</a>

对json文件操作,对json文件中的节点操作封装,要注意的是所有的操作都是异步的.

ps: 目前还是有一点小缺陷,那就是数据没有做好格式化写入文件,程序调用没问题,但是人为打开文件来看和修改数据就需要格式化来方便人工阅读,这是唯一缺陷.所以封装了 ini 模块来解决机器和人工阅读直接的完美平替.

```javascript
const dmz = require('daimazun');
/**
 * jsonfile操作
 */
let file = './config_json/config33.json';
let jsonadd = {
    init: false,
    public: {
        mysql: {
            host: 'localhost', //数据库地址
            port: '3306',//端口号
            user: 'root',//用户名
            password: '****',//密码
            database: 'demo'//数据库名称
        }
    },
    object: {
        mysql: {
            host: 'localhost', //数据库地址
            port: '3306',//端口号
            user: 'root',//用户名
            password: '****',//密码
            database: 'demo'//数据库名称
        }
    },
    demo: "追加数据"
}
let jsonfile = new dmz.jsonfile(file);
/**
 * 初始化项目配置,每次都会将固定的json数据写入json文件
 * @param init_json
 * @returns {Promise<unknown>}
 */
jsonfile.init(jsonadd).then(r => {
    console.log('正确:', r)
}).catch(e => {
    console.log('错误:', e)
})

/**
 * 往json文件中更新,追加节点数据
 * @param json_append
 * @returns {Promise<unknown>} 追加后的文件数据
 * 可以代替json_file_read()读取数据,但性能不如前者不推荐
 */
jsonfile.json_file_append({dali: 12, demo2: "demo2追加的数据"}).then(r => {
    console.log("追加成功:", r)

}).catch(e => {
    console.log('错误:', e)
})

/**
 * 读取文件
 * @returns {Promise<unknown>}
 */
jsonfile.json_file_read().then(r => {
    console.log("json文件数据", r)
}).catch(e => {
    console.log('错误:', e)
})
```



# <a id="email">email</a>

封装发送邮件模块,内置了一个163邮箱账号用来demo使用,正常使用建议用自己的邮箱

```javascript
const dmz = require("daimazun");

let from = {
    host: 'smtp.163.com',
    port: 465,
    user: 'gaojian_daimazun@163.com',
    // 邮箱授权码
    pass: 'SGAGWJEDNOVIHMBS',
}

let to = {
    from: '收件人', // 发件人
    to: 'gaojianstyle@163.com, 12345678@qq.com', // 收件人
    cc: 'gaojianstyle@163.com',
    subject: 'Hello ✔', // 主题
    text: '默认-这是一封测试邮件12', // plain text body
    html: '<b>默认-这是一封测试邮件html</b>', // html body
    // 发送文件的文件路径数组,可为空,例如['D:/www/1.txt','D:/www/2.txt']
    attachments: []
}


let email = new dmz.email(from);

email.send(to).then(r => {
    console.log("发送成功:", r)
}).catch(e => {
    console.log("发送失败:", e)
});
```



# <a id="img">img</a>

对图片文件的一些操作

```javascript
const dmz = require('daimazun')

let img = dmz.img;

// 把本地图片(绝对路径)转换成 base64 数据
img.img_to_base64('D:/1.png').then(r => {
    console.log(r);
}).catch(e => {
    console.log("错误:", e)
})
```





# <a id="g">g模块</a>

g模块是前后端通用的模块,后面会单独创建一个前端npm包将此模块copy到前端包中



```JavaScript
const dmz = require("daimazun");
let g = dmz.g;

let json_data = {
    name: "小明",
    age: 25,
    height: 180
}
let json_string = g.g_object_to_json(json_data)
let map_data = g.g_object_to_map(json_data)
// 其他 prototype <=> map <=> json 三者互转同理调用即可
console.log(json_string, map_data)
// {"name":"小明","age":25,"height":180}
// { 'name' => '小明', 'age' => 25, 'height' => 180 }

console.log(g.g_object_length(json_data))
// 3

console.log(g.g_object_keys_values_to_arr(json_data))
// { keys: [ 'height', 'age', 'name' ], values: [ 180, 25, '小明' ] }

g.g_object_for(json_data, ((key, value) => {
    console.log(key, "---", value);
}));
// name --- 小明
// age --- 25
// height --- 180

g.g_arr_for(["小明", "小白", "小红"], (key, value) => {
    console.log(key, "---", value);
})
// 0 --- 小明
// 1 --- 小白
// 2 --- 小红
```



# <a id="Object原型链扩展">Object原型链扩展</a>

对JavaScript 的 Object 原型链进行方法扩展和封装，快速、便捷、优雅的调用.

前后端通用模块,将部分g模块方法添加到Object原型链上,并且不被for in等方法检索出而产生影响,优雅.

```javascript
require("daimazun");

let object_demo = {
    name: "小明",
    age: 18,
    friends: {
        name: '小红',
        age: 17
    }
}

// object 转 map
console.log(object_demo.g_object_to_map());
//  {
//   'name' => '小明',
//   'age' => 18,
//   'friends' => { name: '小红', age: 17 }
// }

// object 转 map 转 object
console.log(object_demo.g_object_to_map().g_map_to_object());
// { name: '小明', age: 18, friends: { name: '小红', age: 17 } }

//其他关于 map<=>object<=>json 字符串之间互转 同理调用即可,优雅~,唯一要注意的是每个后面都要带括号

// object 转 json 字符串 后, 将 字符串中所有的 8 全部替换成 99999
console.log(object_demo.g_object_to_json().g_string_replace_all(8, 99999));
// {"name":"小明","age":199999,"friends":{"name":"小红","age":17}}

// 将 object key与value 剥离,行程数组
console.log(object_demo.g_object_keys_values_to_arr());
// {
//   keys: [ 'friends', 'age', 'name' ],
//   values: [ { name: '小红', age: 17 }, 18, '小明' ]
// }

// 遍历 object
object_demo.g_object_for((key, value) => {
    console.log(key, '----', value)
})
// name ---- 小明
// age ---- 18
// friends ---- { name: '小红', age: 17 }

// 遍历数组
let arr_demo = [1, 2, 333, 444];
arr_demo.g_arr_for((key, value) => {
    console.log(key, "----", value)
})
// 0 ---- 1
// 1 ---- 2
// 2 ---- 333
// 3 ---- 444

// 返回 object 一阶节点数目
console.log(object_demo.g_object_length());
// 3



// for in 正常调用,优雅~
let list1 = [1, 2, 3, 45, 90]
for (let i in list1) {
    console.log(i)
}
// 0
// 1
// 2
// 3
// 4


///////////////////////////////////////


// 时间当前时间的所有信息
console.log('获取当前时间的全部信息',g_time(),`当前标准时间`,g_time().time)
//{
//   time: '2022-10-28 16:58:29',
//   time_s1: '2022-10-28 16:58:29.756',
//   time_s2: 'October 28 2022, 4:58:29 pm',
//   week: 5,
//   M: '10',
//   MM: '10',
//   MMM: 'Oct',
//   MMMM: 'October',
//   Q: '4',
//   D: '28',
//   DD: '28',
//   d: '5',
//   ddd: 'Fri',
//   dddd: '星期五',
//   w: '44',
//   A: 'PM',
//   a: 'pm',
//   YYYY: '2022',
//   YY: '22',
//   HH: '16',
//   H: '16',
//   hh: '04',
//   h: '4',
//   m: '58',
//   mm: '58',
//   s: '29',
//   ss: '29',
//   sss: '756',
//   X: '1666947509',
//   x: 1666947509756,
//   start_day: '2022-10-28 00:00:00',
//   start_week: '2022-10-23 00:00:00',
//   start_isoWeek: '2022-10-24 00:00:00',
//   start_month: '2022-10-01 00:00:00',
//   start_years: '2022-01-01 00:00:00',
//   end_day: '2022-10-28 23:59:59',
//   end_week: '2022-10-29 23:59:59',
//   end_isoWeek: '2022-10-30 23:59:59',
//   end_month: '2022-10-31 23:59:59',
//   end_years: '2022-12-31 23:59:59',
//   years: 2022,
//   months: '10',
//   date: 28,
//   hours: 16,
//   minutes: 58,
//   seconds: 29,
//   milliseconds: 756
// }

// 解析当前时间,获取当前时间点可以获得的所有信息
// 以时间或以时间戳为参数
console.log(('2022-10-28 16:19:54').g_time_format())
// 以时间戳为参数
// console.log((Date.now()).g_time_format())
//{
//   time: '2022-10-28 16:25:12', // 时间
//   time_s1: '2022-10-28 16:25:12.323', //精确到毫秒的时间
//   time_s2: 'October 28 2022, 4:25:12 pm', // 特殊标准化时间
//   week: 5, //星期几,1~7
//   M: '10',//单位月份
//   MM: '10',//双位月份
//   MMM: 'Oct',//缩写英文月份
//   MMMM: 'October',//月份,英文全称
//   Q: '4',//季度
//   D: '28',//天数,单位
//   DD: '28',//天数,双位
//   d: '5',//星期,1~7,字符串
//   ddd: 'Fri',//星期,英文缩写
//   dddd: '星期五',//星期,中文
//   w: '44',//年份中的第几周	如42：表示第42周
//   A: 'PM',//大写上午下午
//   a: 'pm',//小写上午下午
//   YYYY: '2022',//4位完整年份
//   YY: '22',//年份
//   HH: '16',//小时，24小时制，有前导零	00到23
//   H: '16',//小时，24小时制，无前导零	0到23
//   hh: '04',//小时，12小时制，有前导零	00到12
//   h: '4',//小时，12小时制，无前导零	00到12
//   m: '25',//没有前导零的分钟数	0到59
//   mm: '25',//有前导零的分钟数	00到59
//   s: '12',//没有前导零的秒数	1到59
//   ss: '12',//有前导零的描述	01到59
//   sss: '323',//毫秒精度
//   x: '1666945512',//时间戳,秒级精度
//   X: 1666945512323,//时间戳.毫秒级精度
//   start_day: '2022-10-28 00:00:00',// 当日最开始的时间
//   start_week: '2022-10-23 00:00:00',// 上周末最开始的时间
//   start_isoWeek: '2022-10-24 00:00:00',// 本周一最开始的时间
//   start_month: '2022-10-01 00:00:00',//本月的第一天
//   start_years: '2022-01-01 00:00:00',//今年的第一天
//   end_day: '2022-10-28 23:59:59',//今天最后的时间
//    end_week: '2022-10-30 23:59:59',//本周六最后的时间
//   end_isoWeek: '2022-10-30 23:59:59',//本周日最后时间
//   end_month: '2022-10-31 23:59:59',// 本页最后一天的最后时间
//   end_years: '2022-12-31 23:59:59',//当前时间点所处年份的最后一天
//   years: 2022,// 年份
//   months: '10',//月
//   date: 28,//日
//   hours: 16,//时
//   minutes: 25,//分
//   seconds: 12,//秒
//   milliseconds: 323//毫秒
// }


// 时间计算,计算指定时间以前的所有信息
console.log(('2022-10-28 16:19:54').g_time_ago(3))
//{
//   year: '2019-10-28 16:19:54', //3年前
//   month: '2022-07-28 16:19:54', //3个月前
//   week: '2022-10-25 16:19:54',   //3个星期前
//   day: '2022-10-25 16:19:54',    // 3天前
//   hour: '2022-10-28 13:19:54',   // 3个小时前
//   minute: '2022-10-28 16:16:54', //3分钟前
//   second: '2022-10-28 16:19:51', //3秒前
//   milliseconds: '2022-10-28 16:19:53.997' //3个时间戳单位以前
// }



// 时间计算,一个时间点的加
console.log(('2022-10-28 16:19:54').g_time_add(3))
// 参数含义和g_time_ago相同
//{
//   year: '2025-10-28 16:19:54',
//   month: '2023-01-28 16:19:54',
//   week: '2022-11-18 16:19:54',
//   day: '2022-10-31 16:19:54',
//   hour: '2022-10-28 19:19:54',
//   minute: '2022-10-28 16:22:54',
//   second: '2022-10-28 16:19:57',
//   milliseconds: '2022-10-28 16:19:54.003'
// }

// 判断前者的时间是否在后者时间之前
console.log(g_time_between("2022-10-28 16:47:35",'2022-10-29 16:47:42'))
// false


// 计算两个时间差的所有详细信息
console.log(g_time_diff("2024-10-29 16:47:35",'2022-10-28 16:47:42'))
//{
//   year: 2, // 相差年份
//   Q: 8,//相差季度
//   month: 24, //相差月份
//   week: 104,//相差星期数
//   day: 731,//相差天数
//   hour: 17567,//相差小时数
//   minute: 1054079,//相差多少分钟
//   second: 63244793,//相差多少秒
//   milliseconds: 63244793000//相差多少个毫秒,相差多少时间戳值
// }

console.log(g_uuid())
// 5df2e93056a011edb95a577e12987d21



let str = `{"content-disposition":"form-data; name=\"file4\"; filename=\"高にほんご.sql\"","content-type":"application/x-sql"}`;


let str = `{"content-disposition":"form-data; name=\"file4\"; filename=\"高にほんご.sql\"","content-type":"application/x-sql"}`;


console.log(g_string_to_utf8_cn(str))
console.log(g_string_to_utf8_en(str))
console.log(g_string_to_utf8(str))
console.log(g_utf8_to_string(g_string_to_utf8_en(str)))
//{"content-disposition":"form-data; name="file4"; filename="%E9%AB%98にほんご.sql"","content-type":"application/x-sql"}
// {"content-disposition":"form-data; name="file4"; filename="%E9%AB%98%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94.sql"","content-type":"application/x-sql"}
// %7B%22content-disposition%22:%22form-data;%20name=%22file4%22;%20filename=%22%E9%AB%98%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94.sql%22%22,%22content-type%22:%22application/x-sql%
// 22%7D
// {"content-disposition":"form-data; name="file4"; filename="高にほんご.sql"","content-type":"application/x-sql"}

// 判断文件是否是video
console.log(g_is_video("2..9.txt.mp3"));
// true
console.log(g_is_video("2..9.txt.mp4"));
// true


```



![](https://gitee.com/gaojianstyle/img_md/raw/master/npm/daimazun/309188b6cad9e71e9ec5be063dfd1a5.jpg)



可以搭配使用原型链扩展的 g_orm_insert 方法来搭配使用

```JavaScript
let arr1 = [
    {
        file_id: g_uuid(), // 主键,生成随机字符串代替
        originalFilename: "文件名",
        time_creat: Date.now().g_time_format().time
    },
    {
        file_id: g_uuid(), // 主键,生成随机字符串代替
        originalFilename: "文件名",
        time_creat: Date.now().g_time_format().time
    },
    {
        file_id: g_uuid(), // 主键,生成随机字符串代替
        originalFilename: "文件名",
        time_creat: Date.now().g_time_format().time
    },
]

await db.sql(g_orm_insert('file', arr1)).then((r) => {
    // console.log(r)
}).catch(e => {
    console.log('发生错误:', e)
    throw e;
})

console.log("object arr转换成insert sql语句:", g_orm_insert('file', arr1));
//object arr转换成insert sql语句: insert into file(time_creat,originalFilename,file_id) values('2022-11-10 02:12:36','文件名','da21aba0b49b4ff687628c64830944d1'),('2022-11-10 02:12:36','文件名','0cb4944bc2624138a6196922d1e6ae51'),('2022-11-10 02:12:36','文件名','a6bae584a30648709c67f7524cb2dcb1')

console.log("文件名合法吗?", g_regular_folder("con"), g_regular_folder("con11con2"), g_regular_folder("/con11con2"))
// 文件名合法吗? false true false
// 注: con 是系统保留文件夹名称,还有很多不一一列举



console.log("以小写与大写英文和数字,随机生成字符串:", g_random_string(30))
console.log("以数字,随机生成字符串:", g_random_string(30, 'number'))
console.log("以小写英文,随机生成字符串:", g_random_string(30, 'en'))
console.log("以小写与大写英文,随机生成字符串:", g_random_string(30, 'en_EN'))
console.log("以小写与数字,随机生成字符串:", g_random_string(30, 'en_number'))
console.log("以大写英文与数字,随机生成字符串:", g_random_string(30, 'EN_number'))
console.log("以指定的字符串生成,生成随机生成字符串:", g_random_string(30, '我爱你地球'))
// 以小写与大写英文和数字,随机生成字符串: cTowPTzg2aPBGCI4Lsi9ukGpFI5SuE
// 以数字,随机生成字符串: 469654837813175089919362756405
// 以小写英文,随机生成字符串: kuyqpjnarorphermoedagrvgsghrjs
// 以小写与大写英文,随机生成字符串: EUTnxbvdrYQHipCSATliDAsIngePgA
// 以小写与数字,随机生成字符串: ve8hie7bl1gghrmn2t71nu9dhbfoyi
// 以大写英文与数字,随机生成字符串: 6FWEYLC99WVA0O39Y8XIRIK1SBH4SK
// 以指定的字符串生成,生成随机生成字符串: 爱球地我地我爱你我我你你你你我地地球你地你我你你球你我爱你球
```

#### <a id=".g_str_match_arr(match_arr)">.g_str_match_arr(match_arr)</a>

从字符串中匹配数组存在的值,并返回数组

```JavaScript
// 从字符串中匹配数组存在的值,并返回数组
let str = "氯化钠 (Sodium chloride)，是一种无机离子化合物，化学式NaCl，无色立方结晶或细小结晶粉末，味咸。";
let match_arr = ["离子化合物", "食盐", "原子核", "电子", "无色"];
console.log(str.g_str_match_arr(match_arr));
// [ '离子化合物', '无色' ]
```

#### <a id="g_ocr(img_src,to_string)">g_ocr(img_src,to_string)</a>

ocr 图片文字识别

参数 img_src : 图片地址,可以是网络图片或本地图片

参数 to_string : true/false 将生成的结果中去除空格和换行符

```JavaScript

let img_src = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2Fa007a9b1eef97fbd431e6000b74133bad24133f5.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671793685&t=5fadd5691c060a78b113fe8bd94449de"

// 原格式输出
g_ocr(img_src, false).then(r => {
    console.log(r)
})
// 微 软 雅 黑
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// 0123456789


// 将生成的结果中去除空格和换行符
g_ocr(img_src, true).then(r => {
    console.log(r)
})
// 微软雅黑ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
```





# <a id="n模块">n模块</a>

封装开发常用方法

n模块是后端模块,仅在后端可用



```JavaScript
const dmz = require("daimazun");
let n = dmz.n;

//md5()和sha.n.sha()不存在的目录参数会判定为字符串,从而对字符串本身进行转码

// 文件存在,对文件本身进行转码
console.log(n.md5('D:/1.png'))
// dd7ec931179c4dcb6a8ffb8b8786d20b

// 文件不存在,对参数字符串进行转码
console.log(n.md5('2.txttt'))
// a3e8843f60e290bfc61151c2a04865fb

// 文件存在,对文件本身进行转码
console.log(n.sha256('D:/1.png'))
// 28809a4e294d99eebd2c2b55f124166807b4c81a8fdab308fdea7c24b16a208e

// 文件不存在,对参数字符串进行转码
console.log(n.sha256('1.pn0000g'))
// d2be08148cdd546de2fbde54e7cba4bb12b95694a0f644bfbf1d1d6eaa24b90c




// jwt 加密解密钥匙,千万不能泄露
let secret_key = "caYH0LsCOvddezmCPv3vV6pCwQM"

// 待加密内容
let obj = {
    user: "xiaoming",
    password: "123456"
}

// 生成的token存活时间,单位秒
let time_out_s = 60 * 30; //半小时

/**
 * 生成加密 token
 * @param object 需要加密的内容
 * @param secret_key 加密解密时需要的秘钥
 * @param time_out_s 过期时间,单位秒
 * @returns {*|boolean}
 了解jwt: https://blog.csdn.net/JavaMonsterr/article/details/125677466
 object 加密中的约定俗成(并非强制):
 iss（issuer）：JWT 签发方。
 iat（issued at time）：JWT 签发时间。
 sub（subject）：JWT 主题。
 aud（audience）：JWT 接收方。
 exp（expiration time）：JWT 的过期时间。
 nbf（not before time）：JWT 生效时间，早于该定义的时间的 JWT 不能被接受处理。
 jti（JWT ID）：JWT 唯一标识。
 */
// 生成的加密token
let token = n.jwt(obj,secret_key,time_out_s);

/**
 * 解密 token
 * @param token
 * @returns {boolean|*}
 */
// 使用秘钥来解密token
let detoken = n.jwt_de(token,secret_key);

let params = {
    token : token,
    detoken : detoken,
}

console.log("token的加密生成与解密",params)
//token的加密解密 {
//token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoieGlhb21pbmciLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY2ODU0NjY1NiwiZXhwIjoxNjY4NTQ4NDU2fQ.fYEAZ7ZLJGIQeTfywujjoAmrZTIWZ
// ZwM-agCyM5-vYM',
//   detoken: {
//     user: 'xiaoming',
//     password: '123456',
//     iat: 1668546656,
//     exp: 1668548456
//   }
// }
```





## <a id="ip_format(ip)">ip_format(ip) </a>

这应该是目开源库能找到的最新、最全、最准、最优雅便捷的nodejs的ip解析库，光是离线库就用到了5个。

解析内容包含了基础的洲国省市区、运营商、还包含了经纬度、以及经纬度的的精确半径、以及ip所属网段、甚至可以判定ip是否为代理和vpn等特征来判断是否存在攻击性,还有很多妙用的值，可结合自身自行探索。

基于离线库,不限调用次数,放心食用吧~~



这个方法确实废了我不少功夫,为了增加解析出信息的准确性,使用了5个离线ip库和两个npm ip解析包,对结果相互考证,并且还在github上找到并重构了一个10年未更新的npm库,而且去离线库官网和github上找最新的离线库资源,可谓煞费苦心.

**其他ip解析库存在的问题**

- 解析出来没有自己想要的参数
- npm 包中的ip离线库老旧,导致的解析结果不准确
- 离线ip库本身信息就不准
- 信息粘连,提取信息困难

**解决办法**

- 搜寻最新版ip解析离线库
- 多个ip离线解析库结果相互印证
- 重构npm ip解析包
- 保留所有解析后的原始信息,并增加多个包相互印证的结果

**使用到的ip离线库**

- qqwry_lastest.dat (大小:9.98MB)

- GeoIP2-ISP.mmdb  (大小:25.2MB)

- GeoLite2-ASN.mmdb (大小:7.58MB)

- GeoLite2-City.mmdb (大小:67.1MB)

- GeoLite2-Country.mmdb (大小:5.38MB)

  

qqwry_lastest.dat  使用纯真ip离线库的版本是2022年04月20日(截止2022年11月20日最新)

Geo系列的离线库使用的版本是2022年11月18日(截止2022年11月20日最新)

**返回参数准确性优先级**

返回的参数中有两个包解析包是额外添加的,但是这两个包的数据库老旧,导致他们两个的数据不是很准,但是我还是把他们以db_*的命名方式给列出来了,优先级如下:

精准度(从左往右,精确度依次降低): 

国内ip:

db_dmz  **>**  db_chunzheng1 > db_chunzheng2 > db_city  > db_country > db_asn > db_geo > db_isp

国外ip:

db_dmz  **>**   db_city  > db_country > db_asn > db_geo > db_isp > db_chunzheng1 > db_chunzheng2



数据返回参数结构说明

```JavaScript
{
  "db_dmz": {}, // 基于以下所有数据的产生的综合数据,精准度最高
  "db_chunzheng1": {},//基于qqwry_lastest.dat离线库,数据来源于自己封装的纯真ip解析框架
  "db_chunzheng2": {},//基于qqwry.dat离线库,但是离线库老旧,准度不佳,只做参考
  "db_GeoLite2": { //基于Geo系列离线库
    "db_geo": {},//基于Geo系列离线库,使用的是老旧的库,准不不佳,只做参考
    "db_country": {},//基于GeoLite2-Country.mmdb离线库
    "db_city": {},//基于GeoLite2-City.mmdb离线库
    "db_asn": {},//基于GeoLite2-ASN.mmdb离线库
    "db_isp": {}//基于GeoIP2-ISP.mmdb离线库
  }
}
```



### 使用

```JavaScript
const dmz = require('daimazun');
const n = dmz.n;

n.ip_format("27.115.83.255").then(r => {
    console.log(r)
}).catch(e => {
    console.log("发生错误:",e)
})

//{
//  "db_dmz": {
//    "ip": "27.115.83.255",
//    "isp": "上海大学", //运营归属,ips以此为准
//    "isp_abbr": '上海大学',//isp缩写
//    "isp_en": 'China Unicom Shanghai network',// isp 英文
//    "continent_code": "AS", //洲缩写
//    "continent": "亚洲",
//    "country_code": "CN",//国家缩写
//    "country": "中国",
//    "province": "上海市",//省
//    "city": "上海城区",//市
//    "area": "宝山区",//区
//    "address": "亚洲中国上海市宝山区上海大学",//完整地址
//    "ip_other_msg": {//ip的其他信息
//      "ip_int": 460542975,//数字化ip
//      "ip_range": [ //ip所属网络范围,即只要是这个网络ip范围的解析出的结果都一样
//        "27.115.64.0",//ip所属网络范围起始
//        "27.115.95.255"//ip所属网络范围结束
//      ],
//      "ip_range_ip_int": [//ip所属网络范围int版
//        460537856,//ip所属网络范围int版起始
//        460546047//ip所属网络范围int版结束
//      ],
//      "isInEuropeanUnion": false,//ip是否属于欧盟
//      "location": {
//        "accuracyRadius": 200,//经纬度误差范围
//        "latitude": 31.2222,//纬度
//        "longitude": 121.4581,//经度
//        "timeZone": "Asia/Shanghai"//ip地址所在时区
//      },
//      "traits": { //ip特征
//        "isAnonymous": false,//是否为匿名
//        "isAnonymousProxy": false,//是否为匿名代理
//        "isAnonymousVpn": false,//是否为匿名vpn
//        "isHostingProvider": false,//是否为托管服务提供商
//        "isLegitimateProxy": false,//是否为合法代理
//        "isPublicProxy": false,//是否为公共代理
//        "isResidentialProxy": false,//是否为住宅代理
//        "isSatelliteProvider": false,//是否为卫星提供商
//        "isTorExitNode": false,//是否为Tor出口节点
//        "ipAddress": "27.115.83.255",
//        "network": "27.115.0.0/17"//所属网段,即只要是这个网络ip范围的解析出的结果都一样
//      }
//    }
//  },
//  "db_chunzheng1": {
//    "int": 460542975,
//    "ip": "27.115.83.255",
//    "address": [
//      "上海市宝山区",
//      "上海大学"
//    ],
//    "net": "上海大学",
//    "areas": {
//      "area": [
//        "上海市",
//        "上海城区",
//        "宝山区",
//        ""
//      ],
//      "bounds": []
//    },
//    "province": "上海市",
//    "city": "上海城区",
//    "area": "宝山区"
//  },
//  "db_chunzheng2": {
//    "int": 460542975,
//    "ip": "27.115.83.255",
//    "Country": "上海市宝山区",
//    "Area": "上海大学"
//  },
//  "db_GeoLite2": {
//    "db_geo": {
//      "range": [
//        460537856,
//        460546047
//      ],
//      "country": "CN",
//      "region": "SH",
//      "eu": "0",
//      "timezone": "Asia/Shanghai",
//      "city": "Shanghai",
//      "ll": [
//        31.0449,
//        121.4012
//      ],
//      "metro": 0,
//      "area": 100
//    },
//    "db_country": {
//      "continent": {
//        "code": "AS",
//        "geonameId": 6255147,
//        "names": {
//          "de": "Asien",
//          "en": "Asia",
//          "es": "Asia",
//          "fr": "Asie",
//          "ja": "アジア",
//          "pt-BR": "Ásia",
//          "ru": "Азия",
//          "zh-CN": "亚洲"
//        }
//      },
//      "country": {
//        "geonameId": 1814991,
//        "isoCode": "CN",
//        "names": {
//          "de": "China",
//          "en": "China",
//          "es": "China",
//          "fr": "Chine",
//          "ja": "中国",
//          "pt-BR": "China",
//          "ru": "Китай",
//          "zh-CN": "中国"
//        }
//      },
//      "registeredCountry": {
//        "geonameId": 1814991,
//        "isoCode": "CN",
//        "names": {
//          "de": "China",
//          "en": "China",
//          "es": "China",
//          "fr": "Chine",
//          "ja": "中国",
//          "pt-BR": "China",
//          "ru": "Китай",
//          "zh-CN": "中国"
//        },
//        "isInEuropeanUnion": false
//      },
//      "traits": {
//        "isAnonymous": false,
//        "isAnonymousProxy": false,
//        "isAnonymousVpn": false,
//        "isHostingProvider": false,
//        "isLegitimateProxy": false,
//        "isPublicProxy": false,
//        "isResidentialProxy": false,
//        "isSatelliteProvider": false,
//        "isTorExitNode": false,
//        "ipAddress": "27.115.83.255",
//        "network": "27.115.0.0/17"
//      }
//    },
//    "db_city": {
//      "continent": {
//        "code": "AS",
//        "geonameId": 6255147,
//        "names": {
//          "de": "Asien",
//          "en": "Asia",
//          "es": "Asia",
//          "fr": "Asie",
//          "ja": "アジア",
//          "pt-BR": "Ásia",
//          "ru": "Азия",
//          "zh-CN": "亚洲"
//        }
//      },
//      "country": {
//        "geonameId": 1814991,
//        "isoCode": "CN",
//        "names": {
//          "de": "China",
//          "en": "China",
//          "es": "China",
//          "fr": "Chine",
//          "ja": "中国",
//          "pt-BR": "China",
//          "ru": "Китай",
//          "zh-CN": "中国"
//        }
//      },
//      "registeredCountry": {
//        "geonameId": 1814991,
//        "isoCode": "CN",
//        "names": {
//          "de": "China",
//          "en": "China",
//          "es": "China",
//          "fr": "Chine",
//          "ja": "中国",
//          "pt-BR": "China",
//          "ru": "Китай",
//          "zh-CN": "中国"
//        },
//        "isInEuropeanUnion": false
//      },
//      "traits": {
//        "isAnonymous": false,
//        "isAnonymousProxy": false,
//        "isAnonymousVpn": false,
//        "isHostingProvider": false,
//        "isLegitimateProxy": false,
//        "isPublicProxy": false,
//        "isResidentialProxy": false,
//        "isSatelliteProvider": false,
//        "isTorExitNode": false,
//        "ipAddress": "27.115.83.255",
//        "network": "27.115.0.0/17"
//      },
//      "city": {
//        "geonameId": 1796236,
//        "names": {
//          "de": "Shanghai",
//          "en": "Shanghai",
//          "es": "Shanghai",
//          "fr": "Shanghai",
//          "ja": "上海",
//          "pt-BR": "Xangai",
//          "ru": "Шанхай",
//          "zh-CN": "上海"
//        }
//      },
//      "location": {
//        "accuracyRadius": 200,
//        "latitude": 31.2222,
//        "longitude": 121.4581,
//        "timeZone": "Asia/Shanghai"
//      },
//      "subdivisions": [
//        {
//          "geonameId": 1796231,
//          "isoCode": "SH",
//          "names": {
//            "en": "Shanghai",
//            "fr": "Municipalité de Shanghai",
//            "pt-BR": "Xangai",
//            "zh-CN": "上海"
//          }
//        }
//      ]
//    },
//    "db_asn": {
//      "autonomousSystemNumber": 17621,
//      "autonomousSystemOrganization": "China Unicom Shanghai network",
//      "ipAddress": "27.115.83.255",
//      "network": "27.115.0.0/17"
//    },
//    "db_isp": {
//      "autonomousSystemNumber": 17621,
//      "autonomousSystemOrganization": "China Unicom Shanghai network",
//      "ipAddress": "27.115.83.255",
//      "network": "27.115.0.0/17",
//      "isp": "China Unicom Shanghai network",
//      "organization": "China Unicom Shanghai network"
//    }
//  }
//}


```

<a id="手机号解析">手机号码解析 </a>

```JavaScript
const dmz = require('daimazun');
const n = dmz.n;
console.log(n.phone_format("17888888888"))
//{
//   phone: '17888888888',
//   isp: '移动',
//   province: '北京',
//   city: '北京',
//   postcode: '100000',//邮编
//   areacode: '010'//拨号时的区号
// }
```

<a id="身份证号解析">身份证号解析 </a>

应该是目前开源库最准最全的,使用了两个离线库相互考证.

不但可以解析身份证号,而且可以根据五大条件来生成指定身份证号.

```JavaScript
const dmz = require('daimazun');
const n = dmz.n;
console.log(n.idCard_format('330305201105182636'))
//{
//   is_idCard: true, //参数是否是身份证号码
//   idCard_endNum: 6,//身份证号最后一位数字
//   idCard: '330305201105182636',
//   idCard_address_type: '大陆',//身份证号类别,大陆 或 港澳台
//   gender: '男',//性别
//   age: 11,//年龄
//   address: {
//     province: { code: '330000', text: '浙江省' },//省编号和省名
//     city: { code: '330300', text: '温州市' },//市编号和市名
//     area: { code: '330305', text: '洞头区' },//区编号和区名
//     all: { code: '330305', text: '浙江省温州市洞头区' }//完整编号和完整地址
//   },
//   birthDay: {
//     date: '2011/05/18',//出生日期,公历
//     nong: '2011/4/16',//出生日期,农历
//     year: '2011',//出生年份
//     month: '05',//出生月份
//     day: '18',//出生月份的天
//     week: '星期三',//出生当天星期几
//     zodiac: '金牛座',//星座
//     zodiac_zh: '兔'//生肖
//   }
// }

// 格外注意: idCard_create()方法是一个耗时操作
// 原理是批量生成身份证号,逐个递归解析,知道找出符合所有条件的身份证号后返回
// 所以输入的精度要求过高时有很可能无法找出符合条件的身份证号而返回 false
// 推荐只使用其中1-2个指定参数来生成身份证号.
console.log(n.idCard_create({
    age_range: [0,90],//指定年龄范围
    gender: "男",//指定性别
    address: "安徽",//指定地址中包含的字段
    zodiac: "金牛座",//指定星座
    zodiac_zh: "牛"//指定生肖
}))
// 推荐只使用其中1-2个指定参数来生成身份证号,例如:
console.log(n.idCard_create({
    address: "安徽",//指定地址中包含的字段
    zodiac_zh: "牛"//指定生肖
}))


//{
//   is_idCard: true,
//   idCard_endNum: 0,
//   idCard: '340611200904247310',
//   idCard_address_type: '大陆',
//   gender: '男',
//   age: 13,
//   address: {
//     province: { code: '340000', text: '安徽省' },
//     city: { code: '340600', text: '淮北市' },
//     area: { code: '340611', text: '郊区' },
//     all: { code: '340611', text: '安徽省淮北市郊区' }
//   },
//   birthDay: {
//     date: '2009/04/24',
//     nong: '2009/3/29',
//     year: '2009',
//     month: '04',
//     day: '24',
//     week: '星期五',
//     zodiac: '金牛座',
//     zodiac_zh: '牛'
//   }
// }
```

















