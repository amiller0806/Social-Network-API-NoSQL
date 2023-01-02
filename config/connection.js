const { connect, connection } = require('mongoose');

connect('mongodb://localhost/NoSQL-Social-Network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
