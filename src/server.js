'use strict'

import path from "path";
import Projectcore from "project-core";

const $ = global.$ = new Projectcore();

//加载配置文件
$.init.add((done) => {
	$.config.load(path.resolve(__dirname,"config.js"));
	const env = process.env.NODE_ENV||null;
	if(env) {
		$.config.load(path.resolve(__dirname,"../config",env+".js"));
	}
	$.env = env;
	done()	
});
//初始化MongodDB
$.init.load(path.resolve(__dirname,"init","mongodb.js"))

//加载Models
$.init.load(path.resolve(__dirname,"models"))
$.init((err) => {
	if(err) {
		console.log(err);
		process.exit(-1);
	} else {
		console.log("init");
	}
});
 const item = new $.model.User({
 	name : "py",
 	password:"123456",
 	nickname : "测试用户"
 });
 item.save(console.log)
