var express = require('express');
var router = express.Router();

var cheerio = require('cheerio');
var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('diary', { title: 'Diary' });
});
 */
 router.get("/",function(req,res,next){
  client.execute("OPEN Colenso");
  client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; +" +
          "(//title[. = 'Untitled Document'])[1]",
          function(error, result){if(!error){res.render('diary', {body:result.result});}});

 }
 );




module.exports = router;
