const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.render("cooking")
});

router.get('/signup', (req, res) => {
	res.render("signup")
});

router.get('/login', (req, res) => {
	res.render("login")
});
router.get('/About%20us', (req, res) => {
	res.render("About us")
});

router.get('/contactus', (req, res) => {
	res.render("contactus");
})
router.get('/Entrees', (req, res) => {
	res.render("Entrees")
});
router.get('/PlatsPrin', (req, res) => {
	res.render("PlatsPrin")
});
router.get('/Dessert', (req, res) => {
	res.render("Dessert")
});
router.get('/Miseenbou', (req, res) => {
	res.render("Miseenbou")
});
module.exports = router;