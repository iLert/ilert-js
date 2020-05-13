"use strict";

const axios = require("axios");
const apiHelper = require("./apiHelper.js");
const https = require("https");

const VERSION = "1.0.0";

class ILert {

    constructor(config = {}) {

        config.version = VERSION;
        this.config = config;

        this._clientName = apiHelper.getApiClientString(this.config);
        this._clientAuth = apiHelper.getAuthorization(this.config);

        this._https = new https.Agent({ keepAlive: true });

        this._client = axios.create({
            baseURL: config.baseURL ? config.baseURL : "https://api.ilert.com/api/v1",
            timeout: 5000,
            headers: {
                "useragent": `ilert-js/${VERSION}`
            }
        });
    }

    _getHeaders() {

        const headers = {
            "accept": "application/json",
            "content-type": "application/json",
        };

        if(this._clientName) {
            headers["x-ilert-client"] = this._clientName;
        }

        if(this._clientAuth) {
            headers.authorization = this._clientAuth;
        }

        return headers;
    }

    call(method, body, url) {

        const headers = this._getHeaders();
        const opts = {
            headers,
            httpsAgent: this._https,
            method,
            url
        };

        if(body) {
            opts.data = JSON.stringify(body);
        }

        return this._client
            .request(opts)
            .then((response) => {
                const {status, headers, data} = response;
                return {
                    status,
                    headers,
                    data,
                };
            });
    }

    createEvent(apiKey, eventType, summary, optional = {}) {

        const body = {...{
            apiKey,
            eventType,
            summary,
        }, ...optional };

        return this.call("post", body, "/events");
    }

    currentUser() {
        return this.call("get", null, "/users/current");
    }
}

ILert.EVENT_TYPES = {
    ALERT: "ALERT",
    ACCEPT: "ACCEPT",
    RESOLVE: "RESOLVE",
};

module.exports = ILert;
