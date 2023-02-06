const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/ecommerce_api');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in db connection'));

db.once('open', () => {
    console.log('Database connection successful.');
});

module.exports = db;