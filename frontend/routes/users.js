var express = require('express');
var router = express.Router();

var users = [
  { id:"1", name: 'Pankaj Shukla', email: 'pankaj@shukla.com' },
  { id:"2", name: 'Gayatri Shukla', email: 'gayatri@shukla.com' }
];

var list = function(req, res){
  res.render('users', { title: 'Users', users: users });
};

var load = function(req, res, next){
  var id = req.params.id;
  req.user = users[id];
  if (req.user) {
    next();
  } else {
    var err = new Error('cannot find user ' + id);
    err.status = 404;
    next(err);
  }
};

var view = function(req, res){
  res.render('users/view', {
    title: 'Viewing user ' + req.user.name,
    user: req.user
  });
};

var edit = function(req, res){
  res.render('users/edit', {
    title: 'Editing user ' + req.user.name,
    user: req.user
  });
};

var update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var user = req.body.user;
  req.user.name = user.name;
  req.user.email = user.email;
  res.redirect('back');
};


router.get('/', list);
router.all('/:id/:op?', load);
router.get('/:id', view);
router.get('/:id/view', view);
router.get('/:id/edit', edit);
router.put('/:id/edit', update);

module.exports = router;