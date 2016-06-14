/**
 * Created by pengyao on 16/6/14.
 */
'use strict'
import createDebug from 'debug';
import path from "path";
import Projectcore from "project-core";

const $ = global.$ = new Projectcore();

//创建Debug函数

$.createDebug = function (name) {
    return createDebug("debuginfo:"+name);
}
const debug = $.createDebug("server");

//加载配置文件
$.init.add((done) => {
    $.config.load(path.resolve(__dirname,"config.js"));
    const env = process.env.NODE_ENV||null;
    if(env) {
        env.split(",").forEach(e=>{
            debug("load env %s",e)
            const fn = require("../config/"+e+".js");
            if(typeof fn === "function"){
                $.config.load(path.resolve(__dirname,"../config",e+".js"));
            } else{
                throw new Error(`module "${e}.js" must export as a function`)
            }
        })


    }
    $.env = env;
    done();
});
//初始化MongodDB
$.init.load(path.resolve(__dirname,"init","mongodb.js"))
//加载Models
$.init.load(path.resolve(__dirname,"models"));
//加载method
$.init.load(path.resolve(__dirname,"methods"));
//加载express
$.init.load(path.resolve(__dirname,"init","express.js"));
//加载中间件
$.init.load(path.resolve(__dirname,"widget"));
//加载路由
$.init.load(path.resolve(__dirname,"routers"));

//加载频率限制
$.init.load(path.resolve(__dirname,"init","limiter.js"));

$.init.load(path.resolve(__dirname,"init","validcode.js"));