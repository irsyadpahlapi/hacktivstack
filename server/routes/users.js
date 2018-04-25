const express = require('express');
const router = express.Router();
const {signup, signin} = require('../controllers/usercontroller')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup',signup)
router.post('/signin',signin)

module.exports = router;
