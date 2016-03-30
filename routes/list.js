var express = require('express');
var router = express.Router();

var cheerio = require('cheerio');
var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");

 router.get("/newspaperLetters",function(req,res,next) {
     client.execute("OPEN Colenso");
     client.execute("XQUERY declare namespace tei='http://www.tei-c.org/ns/1.0';" +
         "for $n in collection('Colenso/newspaper_letters/')\n" +
         "return <li>{db:path($n)} {$n//tei:title} {($n//tei:author)[1]} {($n//tei:date)[1]}</li>",
         function(error, result){
             var $ = cheerio.load(result.result);
             var list = [];

             $('li').each(function(i,elem){
                 var path = $(this).contents().filter(function() {
                     return this.type === 'text';}).text();
                 var name = path.substr(18, path.length);
                 var title = $(this).find('title').text();
                 var author = $(this).find('author').text();
                 var date = $(this).find('date').text();
                 list.push({path: name, title: title, author:author, date:date});
                 });

          res.render('listNewspaperLetters', {documents: list});
             });
});

router.get("/privateLetters",function(req,res,next) {
    client.execute("OPEN Colenso");
    client.execute("XQUERY declare namespace tei='http://www.tei-c.org/ns/1.0';" +
        "for $n in collection('Colenso/private_letters/')\n" +
        "return <li>{db:path($n)} {$n//tei:title} {($n//tei:author)[1]} {($n//tei:date)[1]}</li>",
        function(error, result){
            var $ = cheerio.load(result.result);
            var list = [];

            $('li').each(function(i,elem){
                var path = $(this).contents().filter(function() {
                    return this.type === 'text';}).text();
                var name = path.substr(16, path.length);
                var title = $(this).find('title').text();
                var author = $(this).find('author').text();
                var date = $(this).find('date').text();
                list.push({path: name, title: title, author:author, date:date});
            });

            res.render('listPrivateLetters', {documents: list});
        });
});

module.exports = router;
