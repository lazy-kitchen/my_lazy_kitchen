/**
 * An Error that may be raised during an HTTP request.
 * Generally meant for a case where the server should respond with a 4XX or a 5XX status code.
 */
export class HTTPError extends Error {
    public status: number | undefined

    constructor(message: string) {
        super(message);
    }
}
