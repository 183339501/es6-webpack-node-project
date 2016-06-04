/**
 * Created by pengyao on 16/6/04.
 */
'use strict';
import validator from "validator";

module.exports = function (done) {

    $.method("notification.add").check({
        from : {required:true,validate : (v) => validator.isMongoId(String(v))},
        to : {required:true,validate : (v) => validator.isMongoId(String(v))},
        type: {required:true,validate : (v) => typeof v==='string'&&v}
    });
    //添加消息通知
    $.method("notification.add").register(async function (params) {
        const notify = new $.model.Notification(params);
        notify.createdAt = new Date();
        notify.isRead = false;
        return notify.save();
    });


    //消息通知列表
    $.method("notification.list").check({
        from : {validate : (v) => validator.isMongoId(String(v))},
        to : {validate : (v) => validator.isMongoId(String(v))},
        type: {validate : (v) => typeof v==='string'&&v},
        skip : {validate:(v) => v >= 0},
        limit: {validate:(v) => v > 0}
    });

    //消息通知列表
    $.method("notification.list").register(async function (params) {
        const query = {};
        if (params.from) query.from = params.from
        if(params.to) query.to = params.to;
        if(params.type) query.type = params.type;
        if('isRead' in params) query.isRead = params.isRead;
        const ret = $.model.Notification.find(query)
        .populate({
            path:"from",
            model:"User",
            select:"nickname"
        })
        .populate({
            path:"to",
            model:"User",
            select:"nickname"
        });

        if(params.skip) ret.skip(Number(params.skip));

        if(params.limit) ret.limit(Number(params.limit));
        ret.sort({_id:-1});

        return ret
    });

    //消息通知总数
    $.method("notification.count").check({
        from : {validate : (v) => validator.isMongoId(String(v))},
        to : {validate : (v) => validator.isMongoId(String(v))},
        type: {validate : (v) => typeof v==='string'&&v}
    });

    //消息通知总数
    $.method("notification.count").register(async function (params) {
        const query = {};
        if (params.from) query.from = params.from
        if(params.to) query.to = params.to;
        if(params.type) query.type = params.type;
        if('isRead' in params) query.isRead = params.isRead;
        const ret = $.model.Notification.count(query);

        return ret
    });

    $.method("notification.delete").check({
        _id : {required:true,validate : (v) => validator.isMongoId(String(v))},
         to: {required:true,validate : (v) => validator.isMongoId(String(v))}
    });

    //删除消息通知
    $.method("notification.delete").register(async function (params) {
        return $.model.Notification.remove(params);
    });

    $.method("notification.setRead").check({
        _id : {required:true,validate : (v) => validator.isMongoId(String(v))},
        to: {required:true,validate : (v) => validator.isMongoId(String(v))}
    });

    //更新消息通知
    $.method("notification.setRead").register(async function (params) {
        return $.model.Notification.update(params,{
            $set:{isRead:true,readAt:new Date}
        })
    });


    done();
}