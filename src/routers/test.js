'use strict';

const path = require("path");
module.exports = function (done) {
	$.router.get("/",function(req,res,next) {
		
		res.sendFile(path.resolve(__dirname,"../../frontend/index.html"));
	});
	done()
};