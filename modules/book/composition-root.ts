import { BooksController } from './book.controller';
import { BooksService } from './book.service';
import { BooksRepoImpl } from './infra/books.repo';

const booksService: BooksService = new BooksService(new BooksRepoImpl());
export const booksController: BooksController = new BooksController(booksService);
