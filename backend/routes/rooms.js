const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// GET all rooms
router.get('/', async (req, res) => {
    try {
        const query = req.query.cinemaId ? { cinemaId: req.query.cinemaId } : {};
        const rooms = await Room.find(query);
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE room
router.post('/', async (req, res) => {
    const room = new Room(req.body);
    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
