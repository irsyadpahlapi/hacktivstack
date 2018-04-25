const express = require('express');
const router = express.Router();
const { addquestion,showquestion, deletequestion, updatequestion, detailquestion, addanswer, voteupdate, views} = require('../controllers/questioncontroller')

/* GET home page. */
router.post('/addquestion', addquestion);
router.get('/showquestion', showquestion);
router.get('/detailquestion/:id', detailquestion);
router.delete('/:id', deletequestion);
router.put('/:id', updatequestion);
router.post('/addanswer/:id', addanswer);
router.put('/voteupdate/:id', voteupdate);
router.put('/views/:id', views);

module.exports = router;
