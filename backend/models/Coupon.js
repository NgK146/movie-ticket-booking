const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    type: { type: String, enum: ['percent', 'fixed'], required: true },
    value: { type: Number, required: true },
    minOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'expired'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
