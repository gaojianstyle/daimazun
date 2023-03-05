const sha256File = require("sha256-file");
const jwt = require("jsonwebtoken");
const libqqwry = require("lib-qqwry");
const fs = require("fs-extra");
const path = require('path');
const geoip = require("geoip-lite");
require("../g/prototype/prototype.js");
const { Reader } = require("@maxmind/geoip2-node");
const ip33 = require("./ip/ip.js");
const phone_k = require("./phone/phone.js");
const idCard_k = require("./idCard/idCard.js");


class n {
    constructor() {
        this.fs = require("fs-extra");
    }

    /**
     * 提取字符串或文件的md5编码
     * @param params
     * @returns {*}
     */
    md5(params) {
        let md5 = require('md5');
        if (!this.fs.existsSync(params)) {
            return md5(params);
        }
        let data = this.fs.readFileSync(params, 'utf-8');
        return md5(data);
    }

    /**
     * 提取字符串或文件的sha256编码
     * @param params
     * @returns {*}
     */
    sha256(params) {
        // console.log("我无语了")
        // let sha256 = require('sha256')
        // if (!this.fs.existsSync(params)) {
        //     return sha256.x2(params);
        // }
        // let data = this.fs.readFileSync(params, 'utf-8');
        // return sha256.x2(data);
        var sha256File = require('sha256-file');
        if (!this.fs.existsSync(params)) {
            return sha256File(params);
        }
        let data = this.fs.readFileSync(params, 'utf-8');
        return sha256File(params);
    }

    /**
     * 生成加密 token
     * @param object 需要加密的内容
     * @param secret_key 加密解密时需要的秘钥
     * @param time_out_s 过期时间,单位秒
     * @returns {*|boolean}
     了解jwt: https://blog.csdn.net/JavaMonsterr/article/details/125677466
     object 加密中的约定俗成:
     iss（issuer）：JWT 签发方。
     iat（issued at time）：JWT 签发时间。
     sub（subject）：JWT 主题。
     aud（audience）：JWT 接收方。
     exp（expiration time）：JWT 的过期时间。
     nbf（not before time）：JWT 生效时间，早于该定义的时间的 JWT 不能被接受处理。
     jti（JWT ID）：JWT 唯一标识。
     */
    jwt(object, secret_key, time_out_s) {
        try {
            return jwt.sign(object, secret_key, { expiresIn: time_out_s })
        } catch (e) {
            return false;
        }
    }

    /**
     * 解密 token
     * @param token
     * @returns {boolean|*}
     */
    jwt_de(token, secret_key) {
        try {
            return jwt.verify(token, secret_key);
        } catch (e) {
            return false;
        }
    }

    /**
     * 解析ip的所有信息,离线库,开源库中最全的~~
     * @param ip
     * @returns {Promise<unknown>}
     */
    async ip_format(ip) {
        return await new Promise(async function (resolve, reject) {
            try {
                const begin = new Date();
                const libqqwry = require('lib-qqwry');
                const qqwry = libqqwry() //初始化IP库解析器
                // qqwry.speed(); //启用急速模式; 原理就是将数据写入到内存中,别启用,调用次数多了就特别卡就算了而且几乎没有什么效果

                var ip_chunzhen = qqwry.searchIP(ip); //查询IP信息
                // {
                //   int: 3395773962,
                //   ip: '202.103.102.10',
                //   Country: '湖南省衡阳市',
                //   Area: '电信'
                // }

                const geoip = require('geoip-lite');
                const geo = geoip.lookup(ip);
                // {
                //     range: [ 989298688, 989306879 ],
                //     country: 'CN',
                //     region: 'SH',
                //     eu: '0',
                //     timezone: 'Asia/Shanghai',
                //     city: 'Shanghai',
                //     ll: [ 31.0449, 121.4012 ],
                //     metro: 0,
                //     area: 20
                //  }

                // 官方的sdk
                // const Reader = require('@maxmind/geoip2-node').Reader;
                // Reader.open('../data/ip/GeoIP2-ISP.mmdb', {}).then(reader => {
                //     console.log(reader.country(ip));
                // });
                const Reader = require('@maxmind/geoip2-node').Reader;

                /**
                 * GeoLite2-City.mmdb
                 */
                const dbBuffer = fs.readFileSync(path.join(__dirname, '../data/ip/GeoLite2-City.mmdb'));
                const reader_City = Reader.openBuffer(dbBuffer).city(ip);
                // console.log("11111111111111111111111111", reader_City.city(ip), JSON.stringify(reader_City.city(ip)));
                // console.log(reader.anonymousIP(ip))
                // console.log(reader.connectionType(ip))
                /**
                 * GeoLite2-ASN.mmdb
                 * 完全可以代替isp,而且精度比isp准
                 */
                let reader_ASN = await Reader.open(path.join(__dirname, '../data/ip/GeoLite2-ASN.mmdb')).then(reader => {
                    const response = reader.asn(ip);
                    // console.log("222222222222222222222222222222222", response)
                    // console.log(response.autonomousSystemNumber); // 217
                    // console.log(response.autonomousSystemOrganization); // 'University of Minnesota'
                    return response;
                });
                /**
                 * GeoLite2-Country.mmdb
                 */
                let reader_Country = await Reader.open(path.join(__dirname, '../data/ip/GeoLite2-Country.mmdb')).then(reader => {
                    const response = reader.country(ip);
                    // console.log("3333333333333333333333333333", response)
                    // console.log(response.country.isoCode); // 'US'
                    return response;
                });
                /**
                 * isp
                 */
                let reader_isp = await Reader.open(path.join(__dirname, '../data/ip/GeoIP2-ISP.mmdb')).then(reader => {
                    const response = reader.isp(ip);
                    // console.log("44444444444444444444444444444444444", response)
                    // console.log(response.autonomousSystemNumber); // 217
                    // console.log(response.autonomousSystemOrganization); // 'University of Minnesota'
                    // console.log(response.isp); // 'University of Minnesota'
                    // console.log(response.organization); // 'University of Minnesota'
                    //
                    // console.log(response.ipAddress); // '128.101.101.101'
                    return response;
                });
                // /**
                //  * 纯真ip库
                //  */
                // const {QQwry} = require('qqwry-lite');
                // const db = new QQwry(path.join(__dirname, '../data/ip/qqwry_lastest.dat')); // 自定义IP数据
                // const chunzheng2 = db.searchIP(ip);
                // // console.log(db.searchIP(ip));

                /**
                 * 我自己写的解析纯真ip库
                 */
                const ip33 = require("./ip/ip.js");
                let myip = new ip33.ip(ip);
                const chunzheng1 = myip.msg()


                let ipMsg = {
                    ip: geoip.pretty(ip),
                    isp: chunzheng1.address[1],
                    // isp 缩写
                    isp_abbr: ip_chunzhen.Area,
                    // isp 英文
                    isp_en: JSON.parse(JSON.stringify(reader_ASN)).autonomousSystemOrganization,
                    // 大陆编码
                    continent_code: JSON.parse(JSON.stringify(reader_City)).continent.code,
                    continent: JSON.parse(JSON.stringify(reader_City)).continent.names.g_object_to_map().get('zh-CN'),
                    // 国家编码
                    country_code: JSON.parse(JSON.stringify(reader_City)).country.isoCode,
                    // 国家
                    country: JSON.parse(JSON.stringify(reader_City)).country.names.g_object_to_map().get('zh-CN'),
                    // 省份
                    province: chunzheng1.areas.area[0],
                    // 城市
                    city: chunzheng1.areas.area[1],
                    // 区
                    area: chunzheng1.areas.area[2],

                }
                if (ipMsg.city === '') {
                    ipMsg.city = chunzheng1.address[0]
                }
                ipMsg.address = ipMsg.continent + ipMsg.country + chunzheng1.address.join('');
                ipMsg.ip_other_msg = {
                    ip_int: chunzheng1.int,
                    // ip范围
                    ip_range: [libqqwry.intToIP(geo.range[0]), libqqwry.intToIP(geo.range[1])],
                    ip_range_ip_int: geo.range,
                    // ip是否属于欧盟
                    isInEuropeanUnion: JSON.parse(JSON.stringify(reader_City)).registeredCountry.isInEuropeanUnion,
                    // 经纬度
                    location: JSON.parse(JSON.stringify(reader_City)).location,
                    //
                    traits: JSON.parse(JSON.stringify(reader_City)).traits,
                };


                //最终返回的数据
                let r_msg = {
                    // "Little-Endian":libqqwry.ipEndianChange(ip1.int),
                    db_dmz: {
                        ...ipMsg
                    },
                    db_chunzheng1: chunzheng1,
                    db_chunzheng2: ip_chunzhen,
                    // chunzheng3: chunzheng2,
                    db_GeoLite2: {
                        db_geo: geo,
                        db_country: JSON.parse(JSON.stringify(reader_Country)),
                        db_city: JSON.parse(JSON.stringify(reader_City)),
                        db_asn: JSON.parse(JSON.stringify(reader_ASN)),
                        db_isp: JSON.parse(JSON.stringify(reader_isp)),
                    }
                };

                const end = new Date();
                // console.log("耗时:", (end - begin) / 1000);
                resolve(r_msg);
            } catch (e) {
                console.log(e);
                reject(false);
            }
        })
    }

    /**
     * 解析手机号的所有信息
     * @param phone
     * @returns {{province: string, phone: *, city: string, postcode: string, net: string, areacode: string}}
     */
    phone_format(phone) {
        const phone_k = require('./phone/phone.js')
        return phone_k.phone_format(phone)
    }

    /**
     * 解析身份证号码
     * @param idCard
     * @returns {{is_idCard: (boolean|*)}|{birthDay: {date: *, zodiac_zh: *, week: *, month: *, year: *, zodiac: *|undefined|string, nong: *, day: *}, address: {area: *, all: {code, text}, province: *, city: (string|CityRecord|((ipAddress: string) => Promise<City>)|((ipAddress: string) => City)|string|*)}, gender: string, is_idCard: *, idCard, idCard_address_type: (string|*), idCard_endNum, age: *}}
     */
    idCard_format(idCard) {
        const idCard_k = require('./idCard/idCard.js')
        return new idCard_k.idCard(idCard).idCard_format();
    }

    /**
     * 按照指定条件生成身份证号码
     * @param object
     * @returns {*|{is_idCard: (boolean|boolean)}|{birthDay: {date: *, zodiac_zh: *, week: *, month: *, year: *, zodiac: *|undefined|string, nong: *, day: *}, address: {area: *, all: {code, text}, province: *, city: (string|CityRecord|((ipAddress: string) => Promise<City>)|((ipAddress: string) => City)|string|*)}, gender: string, is_idCard: *, idCard, idCard_address_type: (string|*), idCard_endNum, age: *}}
     */
    idCard_create(object) {
        const idCard_k = require('./idCard/idCard.js')
        //先随便传参一个身份证号
        return new idCard_k.idCard('330305201105182636').idCard_create(object);
    }


}

module.exports = {
    n: n
};




// ! 测试/////////////////////////////////////////////////////////////////////

function test() {
    ///////////////////////
    let n_test = new n();
    console.log(n_test.phone_format("17856901519"))
    n_test.ip_format("27.115.83.255").then(r => {
        console.log(r)
    })

    console.log(n_test.phone_format("13516401724"))
    //{
    //   phone: '17888888888',
    //   isp: '移动',
    //   province: '北京',
    //   city: '北京',
    //   postcode: '100000',
    //   areacode: '010'
    // }
    console.log(n_test.idCard_format('330305201105182636'))
    //{
    //   is_idCard: true,
    //   idCard_endNum: 6,
    //   idCard: '330305201105182636',
    //   idCard_address_type: '大陆',
    //   gender: '男',
    //   age: 11,
    //   address: {
    //     province: { code: '330000', text: '浙江省' },
    //     city: { code: '330300', text: '温州市' },
    //     area: { code: '330305', text: '洞头区' },
    //     all: { code: '330305', text: '浙江省温州市洞头区' }
    //   },
    //   birthDay: {
    //     date: '2011/05/18',
    //     nong: '2011/4/16',
    //     year: '2011',
    //     month: '05',
    //     day: '18',
    //     week: '星期三',
    //     zodiac: '金牛座',
    //     zodiac_zh: '兔'
    //   }
    // }
    console.log(n_test.idCard_create({
        age_range: [0, 90],
        gender: "男",
        address: "安徽",
        zodiac: "",// 金牛座
        zodiac_zh: ""// 牛
    }))

    function is_null(params) {
        try {
            if (params === undefined
                || params === null
                || params === ''
            ) {
                return true;
            }
        } catch (e) {
            console.log(e)
            return e;
        }
    }

    let num;
    num = null;
    let num1;


    // import { createWorker } from 'tesseract.js';
    const Tesseract = require('tesseract.js')
    const { createWorker } = require("tesseract.js");

    https://github.com/naptha/tessdata/tree/gh-pages/4.0.0

    // 微 软 雅 黑 字 体
    var img_src = ''
    // let img_src = 'https://img0.baidu.com/it/u=2764866256,2243193474&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=386';
    // img_src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13957040277%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671714382&t=dcbeb2e330f00dee04d8c5784ac69cc5'
    // img_src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.itc.cn%2Fq_70%2Fimages03%2F20201114%2F185832c1971d4d8a9319dd236dfb49a2.jpeg&refer=http%3A%2F%2Fp2.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671714382&t=0bf88d8c76194abb81be7469e20a7152'
    // img_src = 'https://img-blog.csdnimg.cn/img_convert/59084c9b45a0c1c52e4fc388424c9027.png'
    img_src = './images/1.png'


    // // console.log(worker)
    // Tesseract.recognize(
    //     img_src,
    //     'chi_sim', //eng
    //     { logger: m => console.log(m) }
    // ).then(({ data: { text } }) => {
    //     console.log(text);
    // })

    //


    async function ocr(img_src, to_string = false) {
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






    // console.log("是否为空:", num, is_null(num))


}


// test()















