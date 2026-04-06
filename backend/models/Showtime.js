const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    movieId: { type: Number, required: true },
    movieTitle: { type: String, required: true },
    cinemaId: { type: String, required: true },
    cinemaName: { type: String, required: true },
    roomId: { type: String, required: true },
    roomName: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    price: { type: Number, required: true },
    language: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Showtime', showtimeSchema);
