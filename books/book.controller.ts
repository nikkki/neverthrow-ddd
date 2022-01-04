import { BooksService } from './book.service';
import { BookEntityError } from './entity/book.error';
import { BooksRepoImpl } from './infra/books.repo';

class InternalServerErrorException extends Error { }
class ValidationException extends Error {
    data: any;

    constructor(message: string, data?) {
        super(message);
        this.data = data;
    }
}

const booksService: BooksService = new BooksService(new BooksRepoImpl());

// add error catchers
export class BooksController {
    async createBook(body) {
        // Result pattern with TS typings helps us to be aware what Exceptions Domain/Service Exceptions we have,
        // so we can properly handle them.
        const createdOrError = await booksService.createBook(body);

        if (createdOrError.isOk()) return createdOrError.unwrapOr({});

        if (createdOrError.constructor === BookEntityError.InvalidTitle) {
            throw new ValidationException(createdOrError.error.message, {
                title: createdOrError.error.message,
            });
        }

        if (createdOrError.constructor === BookEntityError.InvalidAuthors) {
            throw new ValidationException(createdOrError.error.message, {
                authors: createdOrError.error.message,
            });
        }

        if (createdOrError.constructor === BookEntityError.InvalidAuthor) {
            /**
             * We0 can easily build path in request body to the value where is business-logic error
             * because we have context of the error
             **/ 
            throw new ValidationException(createdOrError.error.message, {
                [`authors.${createdOrError.context.index}`]: createdOrError.error.message,
            });
        }

        throw new InternalServerErrorException('Unexpected server error');
    }
}

