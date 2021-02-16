const router = require('express').Router();

const {
  getBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
} = require('../controllers/bookController');

const dataValidator = require('../middlewares/dataValidator');

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', dataValidator, postBook);
router.put('/:id', dataValidator, putBook);
router.delete('/:id', deleteBook);

module.exports = router;
