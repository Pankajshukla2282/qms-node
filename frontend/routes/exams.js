var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(oreq, ores){
  //res.render('ques', { title: 'Questions', ques: ques });

  request('http://localhost:3000/', function (error, response, body) {
    console.log('body:', body); // Print the HTML for the Google homepage.
    ores.render('ques', { title: 'Questions', ques: JSON.parse(body) });
  })
});

module.exports = router;