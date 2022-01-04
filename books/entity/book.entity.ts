import { err, ok, combine } from 'neverthrow';
import { BookEntityError as BookError } from './book.error';

interface BookProps {
    id: number;
    title: string;
    authors: string[];
}

function generateId() {
    return Number(`${Math.random() * 10000}`.slice(1, 5));
}

/**
 * Use static method "create" to create Book instance. Because we must use private constructor
 * to not allow to create invalid Book entity and support correct invariants.
 **/
export class Book {
    private props: BookProps;

    private constructor(props: BookProps) {
        this.props = props;
    }

    static create({ authors, name }) {
        const validAuthors = Book.validateAuthors(authors);
        const validTitle = Book.validateTitle(name);
        
        // TODO: I dont know why, but I loose types when use combine 
        // const combineOrErr = combine([err(validTitleOrErr), err(validAuthorsOrErr)])

        if (validAuthors.isErr()) return validAuthors;
        if (validTitle.isErr()) return validTitle;

        return ok(new Book({
            id: generateId(),
            authors,
            title: name,
        }));
    }

    static validateTitle(title: string) {
        if (typeof title !== 'string') {
            return BookError.InvalidTitle.create('"title" must be a string');
        }

        return ok({});
    }

    static validateAuthors(authors: string[]) {
        if (!authors?.length) {
            return BookError.InvalidAuthors.create('authors must be an non-empty array');
        }

        // It seems it is a bit tricky to receive exectly our custom BookEntityError.InvalidAuthor error.
        // It would be nice to have a bit shorter approach. 
        // TODO: come up with nice wrap around that tricky error receiving
        const validNames = combine(authors.map((name, index) => {
            if (typeof name === 'string' && name?.trim().length > 0) {
                return ok(name);
            }

            return err(BookError.InvalidAuthor.create('"author name" must be a non-empty string', { index }));
        }));

        if (validNames.isErr()) return validNames.error;

        return ok({});
    }

    // Im not sure, but I think we have to return Result.OK. 
    rawProps() {
        return {
            id: this.props.id,
            title: this.props.title,
            authors: this.props.authors.map(a => a),
        }
    }
}
