const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  isbn: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  judul: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sinopsis: Sequelize.STRING,
  penulis: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: Sequelize.ARRAY(Sequelize.STRING),
});

module.exports = Book;
