const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/P2H0P0', { useNewUrlParser: true });

module.exports = mongoose;