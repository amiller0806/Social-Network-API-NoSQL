


const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/NoSQL-Social-Network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Use this to log mongo queries being executed!
mongoose.set('debug', true);
module.exports = mongoose.connection;
