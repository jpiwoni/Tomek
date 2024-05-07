export default class Response {
    data;

    ok;

    statusText;

    constructor(data, statusText) {
        this.data = data;
        this.ok = data !== undefined;
        this.statusText = statusText;
    }
}
