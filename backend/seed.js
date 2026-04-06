require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Import models
const Movie = require('./models/Movie');
const Cinema = require('./models/Cinema');
const Room = require('./models/Room');
const Showtime = require('./models/Showtime');
const Coupon = require('./models/Coupon');

const movies = [
  { id: '1', title: 'The Dark Knight', genre: 'Action, Crime, Drama', year: 2008, duration: '152 min' },
  { id: '2', title: 'Inception', genre: 'Action, Adventure, Sci-Fi', year: 2010, duration: '148 min' },
  { id: '3', title: 'Interstellar', genre: 'Adventure, Drama, Sci-Fi', year: 2014, duration: '169 min' },
];

const cinemas = [
  { id: 'c1', name: 'CineStar Quốc Thanh', location: '271 Nguyễn Trãi, Q.1', contact: '028 3925 0888' },
  { id: 'c2', name: 'CineStar Hai Bà Trưng', location: '135 Hai Bà Trưng, Q.3', contact: '028 3823 8133' },
];

const rooms = [
  { id: 'r1', name: 'Phòng 01', cinemaId: 'c1', cinemaName: 'CineStar Quốc Thanh', type: 'IMAX', capacity: 120, status: 'active' },
  { id: 'r2', name: 'Phòng 02', cinemaId: 'c1', cinemaName: 'CineStar Quốc Thanh', type: '2D', capacity: 100, status: 'active' },
  { id: 'r3', name: 'Phòng 01', cinemaId: 'c2', cinemaName: 'CineStar Hai Bà Trưng', type: '4DX', capacity: 80, status: 'active' },
];

const showtimes = [
  { id: 's1', movieId: 1, movieTitle: 'The Dark Knight', cinemaId: 'c1', cinemaName: 'CineStar Quốc Thanh', roomId: 'r1', roomName: 'Phòng 01', date: '2026-04-10', startTime: '19:00', price: 95000, language: 'Phụ đề' },
  { id: 's2', movieId: 2, movieTitle: 'Inception', cinemaId: 'c1', cinemaName: 'CineStar Quốc Thanh', roomId: 'r2', roomName: 'Phòng 02', date: '2026-04-10', startTime: '21:30', price: 75000, language: 'Lồng tiếng' },
];

const coupons = [
  { id: 'cp1', code: 'HELLO2026', label: 'Giảm 20% đơn hàng', type: 'percent', value: 20, minOrder: 100000, status: 'active' },
  { id: 'cp2', code: 'CINE50K', label: 'Giảm trực tiếp 50,000 ₫', type: 'fixed', value: 50000, minOrder: 200000, status: 'active' },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Movie.deleteMany();
    await Cinema.deleteMany();
    await Room.deleteMany();
    await Showtime.deleteMany();
    await Coupon.deleteMany();

    // Insert new data
    await Movie.insertMany(movies);
    await Cinema.insertMany(cinemas);
    await Room.insertMany(rooms);
    await Showtime.insertMany(showtimes);
    await Coupon.insertMany(coupons);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
