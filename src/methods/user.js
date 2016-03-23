'use strict';
import validator from "validator";

module.exports = function (done) {
	$.method("user.add").check({
		name : {required:true,validate : (v) => validator.isLength(v,{min:4,max:20})&&/^[a-zA-Z]/.test(v)},
		email : {required:true,validate : (v) => validator.isEmail(v)},
		password: {require:true,validator:(v) => validator.isLength(v,{min:6})}
	})
	$.method("user.add").register(async function(params,callback) {
		params.name = params.name.toLowerCase();
		// callback(params)
		{
			const user = await $.method("user.get").call({name:params.name});
			if(user) return callback(new Error(`user ${params.name} already exists`));
		}
		{
			const user = await $.method("user.get").call({email:params.email});
			if(user) return callback(new Error(`user ${params.email} already exists`));
		}
		params.password = $.utils.encryptPassword(params.password.toString());
		const user = $.model.User(params);
		user.save(callback);
	});
	$.method("user.get").check({
		_id : {validate : (v) => validator.isMongodId(v)},
		name : {validate : (v) => validator.isLength(v,{min:4,max:20})&&/^[a-zA-Z]/.test(v)},
		email : {validate : (v) => validator.isEmail(v)}
	});
	$.method("user.get").register(async function (params,callback){
		const query = {};
		if(params._id) {
			query._id = params._id
		}else if(params.name){
			query.name = params.name;	
		} else if(params.email){
			query.email = params.email
		} else {
			return callback(new Error("missing parameter _id||name||email"))
		}

		$.model.User.findOne(query,callback);
	})

	$.method("user.update").check({
		_id : {validate : (v) => validator.isMongodId(v)},
		name : {validate : (v) => validator.isLength(v,{min:4,max:20})&&/^[a-zA-Z]/.test(v)},
		email : {validate : (v) => validator.isEmail(v)}
	})
	$.method("user.update").register(async function (params,callback){
		const update = {};
		const user = await $.method("user.get").call(params);
		// console.log("用户",user)
		if(!user){
			return callback(new Error("user does not exists "));
		}

		if(params.name && user.name !== params.name) update.name = params.name;
		if(params.email && user.email!== params.email) update.email= params.email;
		if(params.password && user.password !== params.password) update.password = params.password;
		if(params.nickname && user.nickname !== params.nickname) update.nickname = params.nickname;
		if(params.about && user.about !== params.about) update.about = params.about;
		$.model.User.update({_id:user._id},{$set:update},callback);
	})
	done();
};