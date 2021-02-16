const Book = require('../models/Book');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const { catchErr } = require('../utils/utils');

exports.getBooks = async (req, res, next) => {
  try {
    const fetchedBooks = await Book.findAll({
      order: [['id', 'ASC']],
    });

    if (!fetchedBooks.length) {
      const error = new Error('No books found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      books: fetchedBooks,
    });
  } catch (err) {
    return catchErr(err);
  }
};

exports.getBook = async (req, res, next) => {
  const id = req.params.id;

  try {
    const fetchedBook = await Book.findOne({
      where: {
        id,
      },
    });

    if (!fetchedBook) {
      const error = new Error('No book found with such id');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      book: fetchedBook,
    });
  } catch (err) {
    return catchErr(err);
  }
};

exports.postBook = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation Error');
    error.statusCode = 402;
    return next(error);
  }

  const { judul, sinopsis, penulis, genre } = req.body;

  const isbn = uuidv4();

  try {
    await Book.create({
      isbn,
      judul,
      sinopsis,
      penulis,
      genre,
    });

    res.status(202).json({
      success: true,
    });
  } catch (err) {
    return catchErr(err);
  }
};

exports.putBook = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation Error');
    error.statusCode = 402;
    return next(error);
  }

  const id = req.params.id;
  const { judul, sinopsis, penulis, genre } = req.body;

  try {
    const fetchedBook = await Book.findOne({
      where: {
        id,
      },
    });

    if (!fetchedBook) {
      const error = new Error('No book found with such id');
      error.statusCode = 404;
      return next(error);
    }

    const isbn = fetchedBook.isbn;

    await fetchedBook.update({
      isbn,
      judul,
      sinopsis,
      penulis,
      genre,
    });

    return res.status(202).json({
      success: true,
    });
  } catch (err) {
    return catchErr(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  const id = req.params.id;

  try {
    const fetchedBook = await Book.findOne({ where: { id } });

    if (!fetchedBook) {
      const error = new Error('No book found with such id');
      error.statusCode = 404;
      return next(error);
    }

    await fetchedBook.destroy();

    res.status(200).json({
      success: true,
      message: `Successfully deleted book with id ${id}`,
    });
  } catch (err) {
    return catchErr(err);
  }
};
