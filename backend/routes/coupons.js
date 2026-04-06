const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// GET all coupons
router.get('/', async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET coupon by code
router.get('/check/:code', async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase(), status: 'active' });
        if (!coupon) return res.status(404).json({ message: 'Coupon not found or expired' });
        res.json(coupon);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE coupon
router.post('/', async (req, res) => {
    const coupon = new Coupon(req.body);
    try {
        const newCoupon = await coupon.save();
        res.status(201).json(newCoupon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
