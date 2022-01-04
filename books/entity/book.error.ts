import { Err } from 'neverthrow';

interface IAuthorsInvalidContext {
    index: number;
}

export namespace BookEntityError {
    export class Invalid extends Err<{ message }, Error> {

        constructor(error: Error) {
            super(error);
            Object.setPrototypeOf(this, new.target.prototype);
        }

        static create(message: string) {
            return new Invalid(new Error(message));
        }
    }

    export class InvalidAuthors extends Invalid {
        static create(message: string) {
            return new InvalidAuthors(new Error(message));
        }
    }

    export class InvalidTitle extends Invalid {
        static create(message: string) {
            return new InvalidTitle(new Error(message));
        }
    }

    export class InvalidAuthor extends Err<{ message }, Error> {
        public context: IAuthorsInvalidContext;

        private constructor(error: Error) {
            super(error);
        }

        static create(message: string, context: IAuthorsInvalidContext) {
            const error = new InvalidAuthor(new Error(message));
            error.context = context;

            return error;
        }
    }
}