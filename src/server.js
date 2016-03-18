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

$.init((err) => {
	if(err) {
		console.log(err);
		process.exit(-1);
	} else {
		console.log("init");
	}
})
