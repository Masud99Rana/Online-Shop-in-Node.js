const Sequelize = require('sequelize');
// dbname, username, password
const sequelize = new Sequelize('db_test2', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;