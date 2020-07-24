const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/PointyApp', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

module.exports = { mongoose }