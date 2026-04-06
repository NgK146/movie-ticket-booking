const express = require('express');
const router = express.Router();
const Cinema = require('../models/Cinema');

// GET all cinemas
router.get('/', async (req, res) => {
    try {
        const cinemas = await Cinema.find();
        res.json(cinemas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE cinema
router.post('/', async (req, res) => {
    const cinema = new Cinema(req.body);
    try {
        const newCinema = await cinema.save();
        res.status(201).json(newCinema);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
