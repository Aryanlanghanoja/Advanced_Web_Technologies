import express from 'express';

import {
  createBook,
  getBook,
  getBookbyID,
  updateBook,
  deleteBook,
} from '../services/book.service.js';

const bookRoutes = express.Router();

bookRoutes.get('/', getBook);
bookRoutes.post('/', createBook);
bookRoutes.get('/:id', getBookbyID);
bookRoutes.put('/:id', updateBook);
bookRoutes.delete('/:id', deleteBook);

export default bookRoutes;