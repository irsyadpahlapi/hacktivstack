const User = require('../models/Users')
const jwt  = require('jsonwebtoken')
const { cron } = require('../helper/cronjob')

module.exports = {
  signup (req, res) {
    user = new User();
    user.username = req.body.username
    user.email = req.body.email
    user.password = req.body.password
    cron(req.body.email)
    user.save().then( data => {
      res.status(200).json({
        message: 'register succes',
        data
      })
    })
  },
  signin (req, res) {
    User.findOne({email:req.body.email,password:req.body.password}).then(data => {
      let token = jwt.sign({id: data._id,username: data.username,email: data.email},'secretkey')
      res.status(200).json({
        message: 'login success',
        token
      })
    }).catch(err => {
      res.status(500).json({
        message: 'email atau password salah'
      })
    })
  }
};
