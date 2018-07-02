global.data = "";
exports.sendinfo = function(req,res){
	data = req.body;
	return res.send("Redirecting");
	};
exports.second = function(req,res){
	return res.render("secondpage.ejs",{data:data});
	};
exports.third = function(req,res){
	return res.render("thirdpage.ejs",{data:data});
	};
exports.test = function(req,res){
	res.render("test.ejs");
};