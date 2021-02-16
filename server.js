const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');

const { PORT } = require('./config/config');

const sequelize = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const Book = require('./models/Book');
const seeds = require('./seeders/seedData');
const bookRoutes = require('./routes/book');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/books', bookRoutes);

app.use(errorHandler);

(async () => {
  const fetchedBooks = await Book.findAll();

  if (!fetchedBooks.length) {
    seeds.forEach(async (seed) => {
      const { isbn, judul, sinopsis, penulis, genre } = seed;
      await Book.create({
        isbn,
        judul,
        sinopsis,
        penulis,
        genre,
      });
    });
  }
})();

(async () => {
  await sequelize.sync();
  // await sequelize.sync({ force: true });
  app.listen(PORT, () => {
    chalk.bold.blue(`Server is listening at port ${PORT}`);
  });
})();
