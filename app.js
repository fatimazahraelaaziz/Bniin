const express = require('express');
const app = express();

const mysql = require('mysql');

const dotenv = require('dotenv');

const path = require('path');

const cookieParser = require('cookie-parser');
const { getMaxListeners } = require('process');

dotenv.config({path:"./.env"});

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname,"./public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const nodemailer = require("nodemailer")
app.use(cookieParser());
app.set("view engine", "hbs");

db.connect((error) => {
	if (error) {
		console.log(error);
	}
	console.log('Mysql Connected...');
})

app.use("/", require("./routes/pages"))
app.use("/auth", require("./routes/auth"))

app.get("/contactus", (req, res) => {
	res.sendFile( __dirname + "/contactus");
})

app.post("/contactus", (req, res) => {
	console.log(req.body);
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: 'bniiin437@gmail.com',
			pass: 'Bnin12345',
		}
	})

	const mailOptions = {
		from: req.body.email,
		to: 'bniiin437@gmail.com',
		subject: `Message from ${req.body.email}: ${req.body.subject}`,
		text: req.body.message,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			console.log(error);
			res.send('error');
		}else{
			console.log('Email sent: ' + info.response);
			res.send('success');
		}
})
})
app.listen(5009); //connect to port 5008