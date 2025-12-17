var express = require('express');
var router = express.Router();
const Songs = require('../models/songs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', async function(req,res) {
    try{
      const songs = await Songs.find()
      res.json(songs);
    } catch (error) {
      console.log(error);
    }

})
module.exports = router;