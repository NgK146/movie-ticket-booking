const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET movie by custom ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findOne({ id: req.params.id });
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE movie
router.post('/', async (req, res) => {
    const movie = new Movie(req.body);
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE movie
router.put('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findOneAndUpdate(
            { id: req.params.id }, 
            req.body, 
            { new: true }
        );
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE movie
router.delete('/:id', async (req, res) => {
    try {
        await Movie.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
