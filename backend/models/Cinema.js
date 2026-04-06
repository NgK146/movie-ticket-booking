const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    image: { type: String } // Optional image path
}, { timestamps: true });

module.exports = mongoose.model('Cinema', cinemaSchema);
