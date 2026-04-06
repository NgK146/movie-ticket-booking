const express = require('express');
const router = express.Router();
const Showtime = require('../models/Showtime');

// GET all showtimes
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.movieId) query.movieId = parseInt(req.query.movieId);
        if (req.query.cinemaId) query.cinemaId = req.query.cinemaId;
        if (req.query.date) query.date = req.query.date;

        const showtimes = await Showtime.find(query);
        res.json(showtimes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE showtime
router.post('/', async (req, res) => {
    const showtime = new Showtime(req.body);
    try {
        const newShowtime = await showtime.save();
        res.status(201).json(newShowtime);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE showtime
router.delete('/:id', async (req, res) => {
    try {
        await Showtime.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Showtime deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
