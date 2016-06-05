/**
 * Created by pengyao on 16/6/5.
 */
'use strict';
import ejs from "ejs";
import path from "path";
import rd from "rd";
import fs from "fs";
import nodemailer from "nodemailer";

module.exports = function (done) {

    $.smtp = nodemailer.createTransport($.config.get('smtp'), {
        from: $.config.get('smtp.auth.user')
    });

    const templates = {}
    rd.eachFileFilterSync(path.resolve(__dirname, "../../email_templates"), /\.html$/, (f,s)=>{
        const name = path.basename(f,".html");//获取模板名字
        const html = fs.readFileSync(f).toString();//获取模板内容
        templates[name] = ejs.compile(html);
    });

    $.method("mail.send").check({
        to : {required:true},
        subject : {required:true},
        html: {required:true}
    });

    //发送邮件
    $.method("mail.send").register(function (params,callback) {
        $.smtp.sendMail(params,callback);
    });

    $.method("mail.sendTemplate").check({
        to : {required:true},
        subject : {required:true},
        template: {required:true}
    });

    //发送邮件模板
    $.method("mail.sendTemplate").register(async function (params) {
        const t = templates[params.template];
        if(!t) throw new Error(`"{$params.template}"不存在`);
        const html = t(params.data||{});
        return $.method("mail.send").call({
            to:params.to,
            subject:params.subject,
            html:html
        })
    });
    done();
}