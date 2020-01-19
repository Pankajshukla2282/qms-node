var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/:id', function(oreq, ores){
  //res.render('ques', { title: 'Questions', ques: ques });

  request(('http://localhost:3000/exam/' + oreq.params.id), function (error, response, body) {
    let output = JSON.parse(body).body;
    //console.debug(output);
    output = JSON.parse(output, (key, value) => {
      if(key == 'options'){ 
        value = JSON.parse(value);
      }
      return value;
    })
    //console.dir(output);
    ores.render('exams', { title: 'Questions', ques: output });
  })
});

module.exports = router;