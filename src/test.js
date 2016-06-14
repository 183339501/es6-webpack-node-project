'use strict'

import request from "supertest";
import "./base"

// 清空Redis数据
$.init.add(done => {
    $.limiter.connection.keys($.config.get('limiter.redis.prefix') + '*', (err, keys) => {
        if (err) return done(err);
        if (keys.length > 0) {
            $.limiter.connection.del(keys, done);
        } else {
            done();
        }
    });
});

$.init((err) => {
    if(err) {
        console.log(err);
        process.exit(-1);
    } else {
        console.log("init");
    }
});

function makeRequest(method,path,params){
    return new Promise((resolve,reject)=>{
        $.ready(err=>{

            params = params||{};
            let req = request($.express)[method](path);
            if(method==='get'||method==='head'){
                req = req.query(params);
            } else {
                req = req.send(params);
            }

            req.expect(200).end((err, res) => {
                if (err) return reject(err);

                if (res.body.success) {
                    resolve(res.body.result);
                } else {
                    reject(new Error(res.body.error));
                }
            });
        })
    })
}

function generateRequestMethod(method){
    return function (path,params) {
        return makeRequest(method,path,params);
    }
}

export default  {
    get : generateRequestMethod("get"),
    post : generateRequestMethod("post"),
    put : generateRequestMethod("put"),
    delete : generateRequestMethod("delete")
}