import { BooksService } from './book.service';
import { BookEntityError } from './entities/book.error';
import {
    InternalServerErrorException,
    ValidationException,
} from '../../http.exceptions';

export class BooksController {
    constructor(private booksService: BooksService){ 
        this.booksService = booksService;
    }

    async createBook(body) {
        // Result pattern with TS typings helps us to be aware what Exceptions Domain/Service Exceptions we have,
        // so we can properly handle them.
        const createdOrError = await this.booksService.createBook(body);

        if (createdOrError.isOk()) return createdOrError.unwrapOr({});

        if (createdOrError.constructor === BookEntityError.InvalidTitle) {
            throw new ValidationException(createdOrError.getMessage, {
                title: createdOrError.getMessage,
            });
        }

        if (createdOrError.constructor === BookEntityError.InvalidAuthors) {
            throw new ValidationException(createdOrError.getMessage, {
                authors: createdOrError.getMessage,
            });
        }

        if (createdOrError.constructor === BookEntityError.InvalidAuthor) {
            /**
             * We can easily build path in request body to the value where is business-logic error
             * because we have context of the error
             **/
            throw new ValidationException(createdOrError.getMessage, {
                [`authors.${createdOrError.getContext.index}`]: createdOrError.getMessage,
            });
        }

        throw new InternalServerErrorException('Unexpected server error');
    }
}
