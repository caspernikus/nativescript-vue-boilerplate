import * as http from 'tns-core-modules/http';

/**
 * ApiService Class, used to make Api Calls
 */
export default class ApiService {
    constructor(network) {
        this.baseUrl = BASE_URL;
        this.network = network;
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

    /**
     * Validates the response object
     * 
     * @param  {Response}
     * @return {Response or Error}
     */
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

    /**
     * Convert response to valid json
     * 
     * @param  {Response}
     * @return {JSON}
     */
    getJson(response) {
        return new Promise((resolve) => {
            resolve(response.content.toJSON());
        })
        .catch((e) => {
            throw 'Error parsing JSON response: ' + e;
        });
    }

    /**
     * GET Request
     * 
     * @param  {String}
     * @return {Promise}
     */
    get(endPoint) {
        if (!this.network.isOnline) {
            return new Promise((resolve, reject) => {
                reject({
                    statusCode: '',
                    message: 'Please check your internet connection'
                });
            });
        }

        return http.request({
            url: this.baseUrl + endPoint,
            method: 'GET',
            headers: this.headers,
        })
        .then(this.validate)
        .then(this.getJson);
    }

    /**
     * POST Request
     * 
     * @param  {String}
     * @param  {Object}
     * @return {Promise}
     */
    post(endPoint, postData) {
        if (!this.network.isOnline) {
            return new Promise((resolve, reject) => {
                reject({
                    statusCode: '',
                    message: 'Please check your internet connection'
                });
            });
        }

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