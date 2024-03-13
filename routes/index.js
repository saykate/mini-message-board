const express = require('express');
const router = express.Router();

const messages = [
  {
    text: "Heyooo!", 
    user: "Katie", 
    added: new Date()
  }, 
  {
    text: "Yo, yo, yo!!", 
    user: "Scott", 
    added: new Date()
  },
  {
    text: "What up party people?!",
    user: "1994",
    added: new Date()
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Message Board', messages: messages });
});

module.exports = router;
