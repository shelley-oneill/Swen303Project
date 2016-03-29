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
 router.get("/newspaperLetters",function(req,res,next) {
     client.execute("OPEN Colenso");
     client.execute("xquery for $doc in (collection('Colenso/newspaper_letters/'))" +
         "return <doc> {$doc/title} {$doc/author} </doc>",
         function (error, result) {
             var $ = cheerio.load(result.result);
             var list = [];
             $('doc').each(function (i, elem) {
                 var title = $(elem).find('title').text();
                 var author = $(elem).find('author').text();
                 list.push({title: title, author: author});
             });
             res.render('list', {documents: list});
             /*
              client.execute("XQUERY doc('Colenso/newspaper_letters/NewsL-0001.xml')",
              function(error, result){if(!error){res.render('document', {body:result.result});}});
              */
         }
     );
 });




module.exports = router;
