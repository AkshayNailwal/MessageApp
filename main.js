const express = require('express');
const users = require('./routes/router');
const path = require('path');
const bodyParser = require('body-parser');
const contacts = require('./data/contacts.json');
require('dotenv').config();


const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
if(accountSid && authToken) {
	const client = require('twilio')(accountSid, authToken);
	
	const app = express();
	app.set('views', path.join(__dirname, "/views"));
	app.set('view engine', 'ejs');
	
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	
	app.post("/sendmsg", function (req, res) {
		// send message via twilio api
		client.messages.create({
			body: req.body.msg,
			from: process.env.TWILIO_NUMBER,
			to: req.body.info.phoneno
		}, (err, message)=>{
			if(err){
				res.status(400);
				res.send({error: err.toString()});
			} else{
				if(message.errorCode){
					res.status(400);
					res.send({error: message.errorMessage});
				}
				else{
					res.send({msg: "Sent Successfully"});
				}
			}
		})
	});
	
	
	// routes
	app.get("/first", function (req, res) {
		res.render("firstpage.ejs", {data: contacts.contacts});
	});
	app.post("/sendinfo", users.sendinfo);
	app.get("/second", users.second);
	app.post("/third", users.third);
	app.get("/test", users.test);
	app.listen(process.env.PORT);
}
else {
	console.log("Please provide the account sid and auth token for twilio api");
}
