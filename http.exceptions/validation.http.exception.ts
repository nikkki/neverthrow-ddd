export class ValidationException extends Error {
    data: any;

    constructor(message: string, data?) {
        super(message);
        this.data = data;
    }
}
