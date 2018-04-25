const Question = require('../models/Question')

module.exports = {
  addquestion (req, res) {
    question = new Question();
    question.question = req.body.question;
    question.code = req.body.code;
    question.tag = req.body.tag;
    question.vote = 0;
    question.views = 0;
    question.save().then( data => {
      res.status(200).json({
        message: 'success addquestion',
        data
      })
    })
  },
  showquestion (req, res) {
    Question.find().sort({ createdAt:-1 }).then( data => {
      res.status(200).json({
        message: 'success showquestion',
        data
      })
    })
  },
  detailquestion (req, res) {
    Question.findOne({_id:req.params.id}).then(data => {
      res.status(200).json({
        message: 'detail data success',
        data
      })
    })
  },
  deletequestion (req, res) {
    Question.deleteOne({_id:req.params.id}).then( data => {
      res.status(200).json({
        message: 'delete data success',
        data
      })
    })
  },
  updatequestion (req, res) {
    Question.updateOne({_id:req.params.id},{$set:{question:req.body.question,code:req.body.code,tag:req.body.tag}}).then( data => {
      res.status(200).json({
        message: 'update data success',
        data
      })
    })
  },
  addanswer (req, res) {
    Question.updateOne({_id:req.params.id},{$set:{answer:req.body.answer}}).then( data => {
      res.status(200).json({
        message: 'add answer success',
        data
      })
    })
  },
  voteupdate (req, res) {
    Question.updateOne({_id:req.params.id},{$set:{vote:req.body.vote}}).then( data => {
      res.status(200).json({
        message: 'update vote success',
        data
      })
    })
  },
  views (req, res) {
    Question.findOne({_id:req.params.id}).then(data => {
      let total = data.views+1;
      Question.updateOne({_id:req.params.id},{$set:{views:total}}).then(dataresponse => {
        res.status(200),json({
          message: 'update view success',
          dataresponse
        })
      }).catch(err => {
        res.status(400),json({
          message: 'update view gagal',
          dataresponse
        })
      })
    }).catch(err => {
      res.status(400),json({
        message: 'update view gagal',
        dataresponse
      })
    })
  }
};
