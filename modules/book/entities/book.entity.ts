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
    public static readonly TITLE_MIN_LENGTH = 3;

    private constructor(props: BookProps) {
        this.props = props;
    }

    static create({ authors, name }) {
        const validAuthors = Book.validateAuthors(authors);
        if (validAuthors.isErr()) return validAuthors;

        const validTitle = Book.validateTitle(name);
        if (validTitle.isErr()) return validTitle;
        
        return ok(new Book({
            id: generateId(),
            authors,
            title: name,
        }));
    }

    static validateTitle(title: string) {
        if (typeof title !== 'string') {
            return new BookError.InvalidTitle('"title" must be a string');
        }

        if (title.length < Book.TITLE_MIN_LENGTH) {
            return new BookError.InvalidTitle(`"title" length must be at least ${Book.TITLE_MIN_LENGTH}`);
        }

        return ok({});
    }

    static validateAuthors(authors: string[]) {
        if (!authors?.length) {
            return new BookError.InvalidAuthors('authors must be an non-empty array');
        }

        // It seems it is a bit tricky to receive exectly our custom BookEntityError.InvalidAuthor error.
        // It would be nice to have a bit shorter approach. 
        // TODO: come up with nice wrap around that tricky error receiving
        const validNames = combine(authors.map((name, index) => {
            if (typeof name === 'string' && name?.trim().length > 0) {
                return ok(name);
            }

            return err(new BookError.InvalidAuthor('"author name" must be a non-empty string', { index }));
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
