/**
 * An Error that may be raised during an HTTP request.
 * Generally meant for a case where the server should respond with a 4XX or a 5XX status code.
 */
export class HTTPError extends Error {
    public status: number

    constructor(message: string) {
        super(message);

        // Default all HTTPError instances to a generic 500 error code
        this.status = 500;
    }
}
