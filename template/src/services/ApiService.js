import * as http from 'tns-core-modules/http';

export default class ApiService {
    constructor() {
        this.baseUrl = API_BASE_URL;

        this.headers = {
            "Content-Type": "application/json",
        };
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    setHeader(headers) {
        this.headers = headers;
    }

    getHeaders() {
        return this.headers;
    }

    validate(response) {
        return new Promise((resolve, reject) => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                resolve(response);
            }

            reject({
                statusCode: response.statusCode,
                message: response.content.toString()
            });
        })
    }

    getJson(response) {
        return new Promise((resolve) => {
            resolve(response.content.toJSON());
        })
        .catch((e) => {
            throw 'Error parsing JSON response: ' + e;
        });
    }

    get(endPoint) {
        return http.request({
            url: this.baseUrl + endPoint,
            method: 'GET',
            headers: this.headers,
        })
        .then(this.validate)
        .then(this.getJson);
    }

    post(endPoint, postData) {
        return http.request({
            url: this.baseUrl + endPoint,
            method: 'POST',
            headers: this.headers,
            content: JSON.stringify(postData)
        })
        .then(this.validate)
        .then(this.getJson);
    }

}