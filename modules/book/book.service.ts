import { Book } from './entities/book.entity';
import { BooksRepo } from './infra/books.repo';

/**
 * I stick to idea that Application Service must thin. Its responsibility is binding all needed business-logic together,
 * but at the same time all domain logic must be carried out in the Domain Entities and sometimes in the Domain Services
 */
export class BooksService {
    constructor(private booksRepo: BooksRepo) {
        this.booksRepo = booksRepo;
    }

    async createBook(bookProps) {
        const bookOrErr = Book.create(bookProps);

        if (bookOrErr.isErr()) return bookOrErr;

        await this.booksRepo.createOne(bookOrErr._unsafeUnwrap());

        return await bookOrErr.map(book => ({
            id: book.rawProps().id,
            title: book.rawProps().title,
            authors: book.rawProps().authors,
        }));
    }
}
