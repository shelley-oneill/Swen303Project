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
 router.get("/diary",function(req,res,next){
  client.execute("OPEN Colenso");
  client.execute("XQUERY declare namespace tei='http://www.tei-c.org/ns/1.0';" +
             "doc('Colenso/diary/diary.xml')",
             function(error, result){if(!error){res.render('document', {body:result.result});}});

     }
 );

router.get("/newspaperLetters/:id",function(req,res,next) {
    client.execute("OPEN Colenso");
    var id = req.params.id;
    console.log(id);
    var inputQuery = "declare namespace tei='http://www.tei-c.org/ns/1.0';" +
        "declare variable $id as xs:string+ external;" +
        "doc('Colenso/newspaper_letters/'||$id)";
    var query = client.query(inputQuery);
    query.bind("id", id);
    query.execute(function(error, result) {
        if(!error){res.render('document', {body: result.result});}
    })
});

router.get("/privateLetters/:id",function(req,res,next) {
    client.execute("OPEN Colenso");
    var id = req.params.id;
    console.log(id);
    var inputQuery = "declare namespace tei='http://www.tei-c.org/ns/1.0';" +
        "declare variable $id as xs:string+ external;" +
        "doc('Colenso/private_letters/'||$id)";
    var query = client.query(inputQuery);
    query.bind("id", id);
    query.execute(function(error, result) {
        if(!error){res.render('document', {body: result.result});}
    })
});

module.exports = router;
