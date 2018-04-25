const mongoose = require('mongoose')
const Schema = mongoose.Schema
const questionSchema = new Schema({
  question: String,
  code: String,
  tag: [],
  idanswer: [],
  vote: Number,
  views: Number,
  idvote: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: []
}, {
  timestamps:true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
