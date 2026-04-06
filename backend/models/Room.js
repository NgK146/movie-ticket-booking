const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cinemaId: { type: String, required: true },
    cinemaName: { type: String, required: true },
    type: { type: String, enum: ['2D', '3D', 'IMAX', '4DX'], default: '2D' },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ['active', 'maintenance'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
