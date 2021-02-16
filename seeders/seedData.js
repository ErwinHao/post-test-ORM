const { v4: uuidv4 } = require('uuid');

const seeds = [
  {
    isbn: uuidv4(),
    judul: 'Judul 1',
    sinopsis: 'Sinopsis 1',
    penulis: 'Penulis 1',
    genre: ['Action', 'Comedy'],
  },
  {
    isbn: uuidv4(),
    judul: 'Judul 2',
    sinopsis: 'Sinopsis 2',
    penulis: 'Penulis 2',
    genre: ['Romance', 'Drama'],
  },
  {
    isbn: uuidv4(),
    judul: 'Judul 3',
    sinopsis: 'Sinopsis 3',
    penulis: 'Penulis 3',
    genre: ['Isekai', 'Reincarnation'],
  },
];

module.exports = seeds;
