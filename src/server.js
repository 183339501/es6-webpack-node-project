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
		debug("load env %s",env)
		const fn = require("../config/"+env+".js");
		if(typeof fn === "function"){
			$.config.load(path.resolve(__dirname,"../config",env+".js"));	
		} else{
			throw new Error(`module "${env}.js" must export as a function`)
		}
		
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

$.init((err) => {
	if(err) {
		console.log(err);
		process.exit(-1);
	} else {
		console.log("init");
	}
});

