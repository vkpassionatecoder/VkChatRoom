var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createform', function(req, res, next) {
  res.render('createform');
});
router.post('/create', function(req, res, next) {
  let name = req.body.name;
  let chatRoom = randomstring.generate(10);
  res.render('create',{name,roomId:chatRoom});
});

router.route('/join')
.get(function(req, res, next) {
  res.render('join');
})
.post((req, res, next)=>{
  let roomId = req.body.roomid;
  let user = req.body.name;
  res.render('chatroom',{user,roomId});
})
router.get('/chatroom/:id', function(req, res, next) {
  let id = req.params.id;
  let user = req.query.user;
  res.render('chatroom',{user,roomId:id});
});

module.exports = router;
