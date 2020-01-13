var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/:id', function(oreq, ores){
  //res.render('ques', { title: 'Questions', ques: ques });

  request(('http://localhost:3000/exam/' + oreq.params.id), function (error, response, body) {
    console.log('body:', body); // Print the HTML for the Google homepage.
    ores.render('exams', { title: 'Questions', ques: JSON.parse(body) });
  })
});

module.exports = router;