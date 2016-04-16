var express = require('express');
var router = express.Router();
var dbconnect = null;

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/forkky';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  dbconnect = db;
  console.log("Connected correctly to server and forkky db.");
  //db.close();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
    var collection = dbconnect.collection('locations');
    collection.find({},{}).sort({"location":1}).toArray(function(err, items) {
       assert.equal(null, err);
       res.render('Addresto', { locations: items });
    });
      
    
});

router.post('/', function(req, res, next) {
    var restaurant_name = req.body.restaurant_name;
    var restaurant_address = req.body.restaurant_address;
    var restaurant_location = req.body.restaurant_location;
    var about = req.body.about;
    var restaurant_phone = req.body.restaurant_phone;
    var restaurant_price = req.body.restaurant_price;
    var working_hours = req.body.working_hours;
    var menu_path = req.body.menu_path;
    var speciality_item = req.body.speciality_item;
    var restaurant_profilepic = req.body.restaurant_profilepic;
    var restaurant_rating = req.body.restaurant_rating;
    
  var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
    
      "restaurant_name" : restaurant_name,
      "restaurant_address" : restaurant_address,
      "restaurant_phone" : restaurant_phone,
      "about" : about,
      "working_hours" : working_hours,
      "restaurant_rating" : restaurant_rating,
      "restaurant_price" : restaurant_price

   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};
    
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
  
    
});

module.exports = router;
