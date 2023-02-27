// +----------------------------------------------------------------------
// | AutoNavi JavaScript API
// +----------------------------------------------------------------------
// | Copyright (c) 2012 http://Amap.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed AutoNavi
// +----------------------------------------------------------------------
// | Author: yhostc <yhostc@gmail.com>
// +----------------------------------------------------------------------
const path = require('path')
/**
 +------------------------------------------------------------------------------
 * IP转经纬度类
 * 基于cz88.net的纯真数据库、高德坐标系
 +------------------------------------------------------------------------------
 */
var fs = require('fs'),
    iconv = require('iconv-lite'),
    relation = {}, partion = {};


var geodat = null,
    indexFirst = 0,
    indexLast = 0,
    ipRegexp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

function ipToInt32(ip) {
    var result = ipRegexp.exec(ip);
    if (result) {
        return parseInt(result[1]) * 16777216
            + parseInt(result[2]) * 65536
            + parseInt(result[3]) * 256
            + parseInt(result[4]);
    }
    return false;
}

function searchIndex(intip) {
    var index_top = indexLast,
        index_bottom = indexFirst,
        record,
        index_current = parseInt((index_top - index_bottom) / 7 / 2) * 7 + index_bottom;
    do {
        record = geodat.readUInt32LE(index_current);
        if (record > intip) {
            index_top = index_current;
            index_current = parseInt((index_top - index_bottom) / 14) * 7 + index_bottom;
        } else {
            index_bottom = index_current;
            index_current = parseInt((index_top - index_bottom) / 14) * 7 + index_bottom;
        }
    } while (index_bottom < index_current);

    return geodat.readUInt32LE(index_current + 4) % 16777216;
}

function pushString(array, addr) {
    if (addr == 0) {
        array.push('未知');
        return 0;
    }
    var buf = new Buffer(255);
    var stringEnd = addr;
    while (geodat[stringEnd]) {
        stringEnd++;
    }
    array.push(iconv.decode(geodat.slice(addr, stringEnd), 'GBK').replace('CZ88.NET', ''));
    return stringEnd;
}

// 加载IP数据库
try {
    geodat = fs.readFileSync(path.join(__dirname, '..\\..\\data\\ip\\qqwry_lastest.dat'));
    // console.log(geodat)
    if (geodat) {
        indexFirst = geodat.readUInt32LE(0);
        indexLast = geodat.readUInt32LE(4);
    }
} catch (err) {
    console.error(err);
}

// 加载关联数据文件
relation = eval('(' + fs.readFileSync(__dirname + '/data/relation.json', 'utf8') + ')');
// 加载行政区划数据文件
partion = eval('(' + fs.readFileSync(__dirname + '/data/partion.json', 'utf8') + ')');


//对外提供接口，查询IP
exports.getAddress = function (ip) {
    var intip = ipToInt32(ip);
    if (intip) {
        var addr = searchIndex(intip),
            redirectMode = geodat.readUInt8(addr += 4), redirectAddr, tmpAddr, geo = [];
        if (redirectMode == 1) {
            redirectAddr = geodat.readUInt32LE(addr + 1) % 16777216;
            if (geodat.readUInt8(redirectAddr) == 2) {
                pushString(geo, geodat.readUInt32LE(redirectAddr + 1) % 16777216);
                tmpAddr = redirectAddr + 4;
            } else {
                tmpAddr = pushString(geo, redirectAddr) + 1;
            }
        } else if (redirectMode == 2) {
            pushString(geo, geodat.readUInt32LE(addr + 1) % 16777216);
            tmpAddr = addr + 4;
        } else {
            tmpAddr = pushString(geo, addr) + 1;
        }
        redirectMode = geodat.readUInt8(tmpAddr);
        if (redirectMode == 2 || redirectMode == 1) {
            pushString(geo, geodat.readUInt32LE(tmpAddr + 1) % 16777216);
        } else {
            pushString(geo, tmpAddr);
        }
        return geo;
    }
    return ['error', ''];
}

// 对外提供接口，获取IP对应城市
exports.getArea = function (ip) {
    var address = this.getAddress(ip);
    if (relation[address[0]]) {
        return relation[address[0]];
    }
    // return '中国'; // 我改的
    return relation[address[0]];
}


// 对外提供接口，获取IP对应Bounds
exports.getBounds = function (ip) {
    var area = this.getArea(ip);
    return partion[area];
}
//////////////////////////////////////////////////////////////////////////////

class ip {
    constructor(ip) {
        this.ip = ip;
    }
    ipToInt32() {
        let ip = this.ip;
        var result = ipRegexp.exec(ip);
        if (result) {
            return parseInt(result[1]) * 16777216
                + parseInt(result[2]) * 65536
                + parseInt(result[3]) * 256
                + parseInt(result[4]);
        }
        return false;
    }
    searchIndex() {
        let intip = this.ip;
        var index_top = indexLast,
            index_bottom = indexFirst,
            record,
            index_current = parseInt((index_top - index_bottom) / 7 / 2) * 7 + index_bottom;
        do {
            record = geodat.readUInt32LE(index_current);
            if (record > intip) {
                index_top = index_current;
                index_current = parseInt((index_top - index_bottom) / 14) * 7 + index_bottom;
            } else {
                index_bottom = index_current;
                index_current = parseInt((index_top - index_bottom) / 14) * 7 + index_bottom;
            }
        } while (index_bottom < index_current);

        return geodat.readUInt32LE(index_current + 4) % 16777216;
    }
    getAddress() {
        let ip = this.ip;
        var intip = ipToInt32(ip);
        if (intip) {
            var addr = searchIndex(intip),
                redirectMode = geodat.readUInt8(addr += 4), redirectAddr, tmpAddr, geo = [];
            if (redirectMode == 1) {
                redirectAddr = geodat.readUInt32LE(addr + 1) % 16777216;
                if (geodat.readUInt8(redirectAddr) == 2) {
                    pushString(geo, geodat.readUInt32LE(redirectAddr + 1) % 16777216);
                    tmpAddr = redirectAddr + 4;
                } else {
                    tmpAddr = pushString(geo, redirectAddr) + 1;
                }
            } else if (redirectMode == 2) {
                pushString(geo, geodat.readUInt32LE(addr + 1) % 16777216);
                tmpAddr = addr + 4;
            } else {
                tmpAddr = pushString(geo, addr) + 1;
            }
            redirectMode = geodat.readUInt8(tmpAddr);
            if (redirectMode == 2 || redirectMode == 1) {
                pushString(geo, geodat.readUInt32LE(tmpAddr + 1) % 16777216);
            } else {
                pushString(geo, tmpAddr);
            }
            return geo;
        }
        return ['error', ''];
    }
    getArea() {
        let ip = this.ip;
        var address = this.getAddress(ip);
        if (relation[address[0]]) {
            return relation[address[0]];
        }
        // return '中国';
        return relation[address[0]];
    }
    getBounds(ip) {
        ip = this.ip;
        var area = this.getArea(ip);
        return partion[area];
    }
    msg() {
        function isNull(obj) {
            if (JSON.stringify(obj) === null) {
                return true;
            } else {
                return false;
            }
        }

        let that = this;


        function jx_getArea(num) {
            let a = that.getArea() || ''
            if (a === '') {
                return ''
            } else {
                return that.getArea().area[num]
            }
        }

        return {
            int: this.ipToInt32(),
            ip: this.ip,
            address: this.getAddress(),
            net: this.getAddress()[1],
            areas: this.getArea() || {},
            // 省
            province: jx_getArea(0),
            // 市
            city: jx_getArea(1),
            // 区
            area: jx_getArea(2),
            // 经纬度范围
            bounds: this.getBounds()
        }
    }
}

module.exports = {
    ip: ip
};


////////////////////////////////////////////////////////////////////////////////

let ip_address = '112.53.233.0';

let ips = new ip(ip_address)
console.log(ips.ipToInt32())
console.log(ips.searchIndex())
console.log(ips.getAddress())
console.log(ips.getArea())
console.log(ips.getBounds())
console.log(ips.msg())

var ips1 = [
    '114.48.198.220',
    '127.0.0.1',
    '114.247.50.32',
    '42.121.18.30',
    '116.255.159.28',
    '175.41.22.214',
    '113.46.75.217',
    '61.134.36.43',
    '60.247.103.19',
    '106.155.177.79',
    '60.84.104.199',
    '110.75.173.26',
    '114.138.236.192',
    '255.146.13.80',
    '230.68.58.59',
    '117.69.234.14',
    '233.235.99.138',
    '242.148.224.221',
    '110.75.195.1'
];

//
// for(let i in ips1){
//     // console.log(i,ips1[i])
//     let value = ips1[i]
//     let ips2 = new ip(value)
//     console.log(`${JSON.stringify(ips2.msg())}`)
//     // console.log(`${ips2.msg()}`);
// }
