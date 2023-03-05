const fs = require('fs');


const idCard_01 = require('idcard');
const idCard_02 = require('js-idcard');


class idCard {
    constructor(idCard) {
        this.idCard = idCard;
    }

    idCard_format() {
        let idCard = this.idCard;
        let msg_01 = idCard_01.info(idCard);
        let msg_02 = idCard_02.all(idCard);
        let r = {
            is_idCard: msg_01.valid
        }
        if (msg_01.valid === false) {
            return r;
        }
        r = {
            ...r,
            idCard_endNum: msg_02.endNum,
            idCard: idCard,
            idCard_address_type: msg_01.cardText,// 大陆 or 港澳台
            gender: msg_02.sex,
            age: msg_01.age,
            address: {
                province: msg_01.province,
                city: msg_01.city,
                area: msg_01.area,
                all: {
                    code: msg_01.area.code,
                    text: msg_01.address
                },
            },
            birthDay: {
                ...msg_02.birthDay
            }
        }
        return r;
    }

    idCard_format_01(idCard) {
        let msg_01 = idCard_01.info(idCard);
        let msg_02 = idCard_02.all(idCard);
        let r = {
            is_idCard: msg_01.valid
        }
        if (msg_01.valid === false) {
            return r;
        }
        r = {
            ...r,
            idCard_endNum: msg_02.endNum,
            idCard: idCard,
            idCard_address_type: msg_01.cardText,// 大陆 or 港澳台
            gender: msg_02.sex,
            age: msg_01.age,
            address: {
                province: msg_01.province,
                city: msg_01.city,
                area: msg_01.area,
                all: {
                    code: msg_01.area.code,
                    text: msg_01.address
                },
            },
            birthDay: {
                ...msg_02.birthDay
            }
        }
        return r;
    }

    idCard_create(params) {
        try {
            let p = {
                address: params.address || '',
                age_range: params.age_range || '',
                gender: params.gender || '',
                zodiac: params.zodiac || '',
                zodiac_zh: params.zodiac_zh || '',
            }
            let r = this.idCard_format_01(idCard_01.generateIdcard());
            // 递归处理
            if (
                typeof (r.birthDay.zodiac_zh) === 'undefined'
                || p.address !== '' && r.address.all.text.indexOf(p.address) === -1
                || p.age_range !== '' && r.age >= p.age_range[1]
                || p.age_range !== '' && r.age <= p.age_range[0]
                || p.gender !== '' && r.gender !== p.gender
                || p.zodiac !== '' && r.birthDay.zodiac !== p.zodiac
                || p.zodiac_zh !== '' && r.birthDay.zodiac_zh !== p.zodiac_zh
            ) {
                return this.idCard_create(p);
            }
            return r;
        } catch (e) {
            // console.log(e);
            return false;
        }
    }

}


module.exports = {
    idCard: idCard
}

///////测试调用////////////////////////////
// let idCard_demo = '330305201105182636';
// let idc = new idCard(idCard_demo);
// console.log(idc.idCard_format(idCard))
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
/////////////////////////////////////////////////////
// console.log(idc.idCard_create({
//     age_range: [18,19],
//     gender: "男",
//     address: "安徽",
//     zodiac: "金牛座",
//     zodiac_zh: "牛"
// }));

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
