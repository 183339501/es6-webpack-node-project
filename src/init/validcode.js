'use strict';
import Redis from "ioredis";

module.exports = function (done) {
	const debug = $.createDebug("init:validcode");
	const connection = new Redis($.config.get("validcode.redis"));
	const prefix = $.config.get("validcode.redis.prefix");
	$.validcode ={connection};
	$.validcode.generate = async function (data,ttl) {
		const json = JSON.stringify(data);
		const code = Date.now()+"."+$.utils.randomString(20);
		debug('generate: code=%s, json=%s', code, json);
		const key = prefix+code;
		await connection.setex(key,ttl,json);
		return code;
	}
	$.validcode.get = async function (code) {
		const key = prefix+code;
		const json = await connection.get(key);
		debug('get: code=%s, json=%s', code, json);
		if(!json) return false;
		const data = JSON.parse(json);
		await connection.del(key);
		return data;
	}
	done();
}