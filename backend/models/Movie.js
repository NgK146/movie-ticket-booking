const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    duration: { type: String, required: true },
    image: { type: String }, // Optional path to movie poster
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
