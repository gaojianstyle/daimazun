class email {
    /**
     * 2022年9月23日 11:01:43
     * 发送邮件
     * @param from
     */
    constructor(from) {
        this.from = from ?? ''

        const nodemailer = require('nodemailer');
        // 开启一个 SMTP 连接池
        this.transporter = nodemailer.createTransport({
            host: this.from.host || 'smtp.163.com',
            secureConnection: true, // use SSL
            port: this.from.port || 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: this.from.user || 'gaojian_daimazun@163.com',
                pass: this.from.pass || 'SGAGWJEDNOVIHMBS' // 邮箱授权码
            }
        });
    }

    /**
     * 发送邮件
     * @param to
     * @returns {Promise<bool>}
     */
    async send(to) {
        // 设置邮件内容（谁发送什么给谁）
        var mailOptions = {
            // 发件人
            from: `"${to.from}" <${this.from.user}>` || '收件人',
            to: to.to || 'gaojianstyle@163.com, 1875238798@qq.com', // 收件人
            cc: to.cc || 'gaojianstyle@163.com',
            subject: to.subject || 'Hello ✔', // 主题
            text: to.text || '默认-这是一封测试邮件', // plain text body
            html: to.html || '<b>默认-这是一封测试邮件html</b>', // html body
            // 下面是发送附件，不需要就注释掉
            attachments: to.attachments || [
                // {
                //     filename: 'test.md',
                //     path: './test.md'
                // },
                // {
                //     filename: 'content',
                //     content: '发送内容'
                // }
            ]
        };

        // 使用先前创建的传输器的 sendMail 方法传递消息对象
        return await new Promise((resolve, reject) => {
            try {
                this.transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        // console.log("==邮件发送失败==");
                        reject(err);
                    } else {
                        // console.log('==邮件发送成功==',err,info);
                        resolve(info);
                    }
                });
            } catch (e) {
                reject('参数错误');
            }
        });
    }
}

module.exports = {
    email
}

// const dmz = require('daimazun');
// var from = {
//     host: req?.query?.host || 'smtp.163.com',
//     port: req?.query?.port || 465,
//     user: req?.query?.user || 'gaojian_daimazun@163.com',
//     // 邮箱授权码
//     pass: req?.query?.pass || 'SGAGWJEDNOVIHMBS',
// }
//
// var to = {
//     from: req?.query?.from || '收件人', // 发件人
//     to: req?.query?.to || 'gaojianstyle@163.com, 1875238798@qq.com', // 收件人
//     cc: req?.query?.cc || 'gaojianstyle@163.com',
//     subject: req?.query?.subject || 'Hello ✔', // 主题
//     text: req?.query?.text || '默认-这是一封测试邮件12', // plain text body
//     html: req?.query?.html || '<b>默认-这是一封测试邮件html</b>', // html body
//     attachments: req?.query?.attachments || []
// }
//
//
// new dmz.email(from).send(to).then(r => {
//     let jsonfile = {
//         code: 10000,
//         msg: '成功',
//         data: {}
//     }
//     jsonfile.data.from = {...from}
//     jsonfile.data.to = {...to}
//     res.send(jsonfile)
// }).catch(e=>{
//     let jsonfile = {
//         code: 10001,
//         msg: '失败',
//     }
//     res.send(jsonfile)
// });

