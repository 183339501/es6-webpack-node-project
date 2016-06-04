/**
 * Created by pengyao on 16/6/4.
 */
'use strict';
module.exports = function (done) {

    function formatQuery(obj,query){
        if(query.type) obj.query = query.type;
        if("isRead" in query) obj.isRead = parseBoolean(query.isRead);
        return obj;
    }

    function parseBoolean(bool){
        switch(String(bool)) {
            case 'true':
            case '1':
            case 'on':
                return true;
            default:
                return false;
        }
    }

    //消息通知总数
    $.router.get("/api/notification/count",$.checkLogin,async function (req,res,next){
        const query = formatQuery({to:req.session.user._id},req.query);
        const count = await $.method("notification.count").call(query);
        res.apiSuccess({count});
    });

    //消息通知列表
    $.router.get("/api/notification/list",$.checkLogin,async function (req,res,next){
        const query = formatQuery({to:req.session.user._id},req.query);
        const count = await $.method("notification.count").call(query);
        if(req.query.skip) query.skip = req.query.skip;
        if(req.query.limit) query.limit = req.query.limit;
        const list = await $.method("notification.list").call(query)
        res.apiSuccess({count,list});
    });

    $.router.get("/api/notification/:id/read",$.checkLogin,async function (req,res,next){

        const ret = await $.method("notification.setRead").call({
            to:req.session.user._id,
            _id:req.params.id
        })
        res.apiSuccess({ret});
    });

    done()
};