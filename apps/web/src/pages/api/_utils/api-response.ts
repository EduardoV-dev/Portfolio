/**
 * A helper class to standardize API responses across the application.
 * It provides a consistent structure for success and error responses, making it easier
 * for clients to parse and handle API responses.
 */
export class ApiResponse {
    private headers: Record<string, string>;

    constructor(
        private status: number,
        private message: string,
        private data: unknown = null,
    ) {
        this.headers = {};
    }

    public setHeaders(headers: Record<string, string>) {
        this.headers = headers;
        return this;
    }

    public toResponse() {
        const isSuccess = this.status >= 200 && this.status < 400;

        return new Response(
            JSON.stringify(
                {
                    ok: isSuccess,
                    message: this.message,
                    data: isSuccess ? this.data : null,
                    error: !isSuccess ? this.data : null,
                },
                null,
                2,
            ),
            {
                headers: { "Content-Type": "application/json", ...this.headers },
                status: this.status,
            },
        );
    }
}
