/**
 * Created by pengyao on 16/6/5.
 */
'use strict';
import nodemailer from "nodemailer";

module.exports = function (done) {

    $.smtp = nodemailer.createTransport($.config.get('smtp'), {
        from: $.config.get('smtp.auth.user')
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
    
    done();
}