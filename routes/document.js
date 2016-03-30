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
             function(error, result){
                 var $ = cheerio.load(result.result);
                 var author, title, body, date, authorLink;
                 $('fileDesc').each(function(i,elem) {
                     title = $(this).find('title').text();
                     authorLink = $(this).find('name').attr('key');
                     author = $(this).find('author').text();
                     date = $(this).find('date').text();
                 });
                 $('sourceDesc').each(function(i,elem){
                     if(!author){author = $(this).find('author').text();}
                     if(!date){date = $(this).find('date').text();}
                 });
                 $('text').each(function(i, elem){
                     body = $(this);
                 });
                 res.render('document', {title: title,date:date, author: author,authorLink:authorLink, body:body});
             });
     }
 );

router.get("/newspaperLetters/:id",function(req,res,next) {
    client.execute("OPEN Colenso");
    var id = req.params.id;
    var inputQuery = "declare namespace tei='http://www.tei-c.org/ns/1.0';" +
        "declare variable $id as xs:string+ external;" +
        "doc('Colenso/newspaper_letters/'||$id)";
    var query = client.query(inputQuery);
    query.bind("id", id);
    query.execute(function(error, result){
        var $ = cheerio.load(result.result);
        var author, title, body, date, authorLink;
        $('titleStmt').each(function(i,elem) {
            title = $(this).find('title').text();
            authorLink = $(this).find('name').attr('key');
            author = $(this).find('author').text();
            date = $(this).find('date').text();
        });
        $('sourceDesc').each(function(i,elem){
            if(!date){date = $(this).find('date').text();}
        });
        $('text').each(function(i, elem){
            body = $(this);
        });
        res.render('document', {title: title,date:date, author: author,authorLink:authorLink, body:body});
    });
    }
);

router.get("/privateLetters/:id",function(req,res,next) {
    client.execute("OPEN Colenso");
    var id = req.params.id;
    var inputQuery = "declare namespace tei='http://www.tei-c.org/ns/1.0';" +
        "declare variable $id as xs:string+ external;" +
        "doc('Colenso/private_letters/'||$id)";
    var query = client.query(inputQuery);
    query.bind("id", id);
    query.execute(function(error, result){
        var $ = cheerio.load(result.result);
        var author, title, body, date, authorLink;
        $('fileDesc').each(function(i,elem) {
            title = $(this).find('title').text();
            authorLink = $(this).find('name').attr('key');
            author = $(this).find('author').text();
            date = $(this).find('date').text();
        });
        $('sourceDesc').each(function(i,elem){
            if(!author){author = $(this).find('author').text();}
            if(!date){date = $(this).find('date').text();}
        });
        $('text').each(function(i, elem){
            body = $(this);
        });
        res.render('document', {title: title,date:date, author: author,authorLink:authorLink, body:body});
    });
    }
);
module.exports = router;
