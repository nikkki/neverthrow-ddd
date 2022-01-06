import { Err } from 'neverthrow';

interface IAuthorsInvalidContext {
    index: number;
}

export namespace BookEntityError {
    export class Invalid extends Err<unknown, Error> {
        constructor(message: string) {
            super(new Error(message));
        }

        get getMessage() {
            return this._unsafeUnwrapErr().message;
        }

        get getStack() {
            return this._unsafeUnwrapErr().stack;
        }
    }

    export class InvalidAuthors extends Invalid { }

    export class InvalidTitle extends Invalid { }

    export class InvalidAuthor extends Err<unknown, Error>  {
        private context: IAuthorsInvalidContext;

        constructor(message: string, context: IAuthorsInvalidContext) {
            super(new Error(message));
            this.context = context;
        }

        get getMessage() {
            return this._unsafeUnwrapErr().message;
        }

        get getContext() {
            return this.context;
        }
    }
}
