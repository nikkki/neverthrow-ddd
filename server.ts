import { BooksController } from './books/book.controller';

const controller = new BooksController();

controller.createBook({ name: '', authors: [''] })
    .then(console.log)
    .catch(console.error);