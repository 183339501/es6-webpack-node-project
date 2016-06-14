import "./base";


$.init((err) => {
	if(err) {
		console.log(err);
		process.exit(-1);
	} else {
		console.log("init");
	}
});

