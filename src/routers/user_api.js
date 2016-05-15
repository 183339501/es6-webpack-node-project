'use strict';


module.exports = function (done) {
	//当前登陆的用户信息
	$.router.post("/api/login_user",async function(req,res,next) {
		res.json({user:req.session.user,token:req.session.logout_token});
	});
	//用户登陆
	$.router.post("/api/login",async function(req,res,next) {
		// try{
		if(!req.body.password) return next(new Error("请输入密码"));
		const user = await $.method("user.get").call(req.body);
		if(!user) return next(new Error('用户不存在'));
		if(!$.utils.validatePassword(req.body.password,user.password)){
			return next(new Error("密码不正确"));
		}

		req.session.user = user;
		req.session.logout_token = $.utils.randomString(20);
		res.apiSuccess({token:req.session.logout_token});
		// }catch(err){
			// next(err);
		// }
	});

	//用户退出
	$.router.get("/api/logout",async function (req,res,next){
		if(req.session.logout_token && req.query.token !== req.session.logout_token){
			return next(new Error("无效的token"));
		}	

		delete req.session.user;
		delete req.session.logout_token;
		res.apiSuccess({info:"退出成功"});
	})

	//用户注册
	$.router.post("/api/signup",async function (req,res,next){
		const user = await $.method("user.add").call(req.body);
		res.apiSuccess({user:user});
	})
	done()
};