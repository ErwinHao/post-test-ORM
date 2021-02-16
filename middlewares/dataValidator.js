const { body } = require('express-validator');

const dataValidator = [
  body('judul')
    .not()
    .isEmpty()
    .withMessage('Judul tidak boleh kosong')
    .trim()
    .escape(),
  body('sinopsis').trim().escape(),
  body('penulis')
    .not()
    .isEmpty()
    .withMessage('Penulis tidak boleh kosong')
    .trim()
    .escape(),
];

module.exports = dataValidator;
