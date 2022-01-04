import { Book } from '../entity/book.entity';

interface BooksRepo {
    createOne(book: Book): Promise<void>
}

export class BooksRepoImpl implements BooksRepo {
    async createOne(book: Book) {
        return;
    }
}