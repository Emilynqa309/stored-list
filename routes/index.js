var express = require('express');
var router = express.Router();
const Songs = require('../models/songs');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
        const songs = await Songs.find();
        res.render('index', { title: 'Current Favorite Songs', songs});
      } catch (error) {
        console.log(error);
      }
});

module.exports = router;