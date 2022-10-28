var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});





router.get('/about', function(req, res, next) {
  res.render('about', {page:'About Us', menuId:'about'});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});
router.get('/truckownerindex', function(req, res, next) {
  res.render('truckownerindex', {page:'Truck Owner', menuId:''});
});
router.get('/truckowner', function(req, res, next) {
  var userId = req.query.userId;
  var name = req.query.name;
  console.log("userId......",userId)
  console.log("name......",name)
  res.render('truckowner', {page:'Truck Owner', menuId:'', name:name, userId:userId});
});
router.get('/loadsBids', function(req, res, next) {
  res.render('loadsBids', {page:'Loads And Bids', menuId:''});
});
router.get('/loadsBidsDetails', function(req, res, next) {
  res.render('loadsBidsDetails', {page:'Loads And Bids', menuId:''});
});

router.get('/tackingindex', function(req, res, next) {
  res.render('tackingindex', {page:'Tracking', menuId:'contact'});
});
router.get('/tripsPosted', function(req, res, next) {
  res.render('tripsPosted', {page:'Trips Posted', menuId:'contact'});
});

module.exports = router;
