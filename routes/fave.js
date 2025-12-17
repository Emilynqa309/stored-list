var express = require('express');
var router = express.Router();
const Songs = require('../models/songs');

/* GET all songs */
router.get('/', async function (req, res) {
    try {
        const songs = await Songs.find();
        res.json(songs);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});


/* CREATE song */
router.post('/', async function (req, res) {
    try {
        const newSong = await Songs.create({
            ...req.body,
            createdAt: new Date()
        });
        res.json(newSong);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

/* UPDATE song */
router.put('/:id', async function (req, res) {
    try {
        const updatedSong = await Songs.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedSong);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

/* DELETE song */
router.delete('/:id', async function (req, res) {
    try {
        await Songs.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
