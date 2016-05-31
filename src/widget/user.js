/**
 * Created by pengyao on 16/5/15.
 */
/**中间件**/
'use strict';


module.exports = function (done) {
    $.checkLogin = function (req,res,next){
        if(!req.session.user){
            return next(new Error("please login firstly"))
        }
        next();
    };

    $.checkTopicAuthor = async function (req,res,next) {
        const topic = await $.method("topic.get").call({_id:req.params.topic_id});
        if(!topic) return next(new Error(`topic ${req.params.topic_id} does not exists` ));
        if(topic.author._id.toString() != req.session.user._id.toString()){
            return next(new Error("没有权限"))
        }
        req.topic = topic;
        next();
    }
    done();
}