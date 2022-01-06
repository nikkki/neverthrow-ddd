import { Book } from '../entities/book.entity';

export interface BooksRepo {
    createOne(book: Book): Promise<void>
}

export class BooksRepoImpl implements BooksRepo {
    async createOne(book: Book) {
        return;
    }
}
