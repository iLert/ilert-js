"use strict";

const https = require("https");
const EventEmitter = require("events");

const axios = require("axios");
const querystring = require("querystring");

const apiHelper = require("./apiHelper.js");
const Event = require("./Event.js");
const User = require("./User.js");
const Alert = require("./Alert.js");
const Incident = require("./Incident.js");
const Heartbeat = require("./Heartbeat.js");

const VERSION = require("../package.json").version;

class ILert extends EventEmitter {

    constructor(config = {}) {
        super();

        config.version = VERSION;
        this.config = config;

        this._clientName = apiHelper.getApiClientString(this.config);
        this._clientAuth = apiHelper.getAuthorization(this.config);

        this._https = new https.Agent({ keepAlive: true });

        this._client = axios.create({
            baseURL: config.baseURL ? config.baseURL : "https://api.ilert.com/api",
            timeout: config.timeoutMs ? config.timeoutMs : 25000,
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

    call(method, body, url, query, _headers) {

        const headers = this._getHeaders();
        const opts = {
            headers,
            httpsAgent: this._https,
            method,
            url
        };

        if(_headers) {
            opts.headers = { ...headers, ..._headers };
        }

        if(query) {
            opts.url = opts.url + "?" + querystring.stringify(query);
        }

        if(body) {
            opts.data = JSON.stringify(body);
        }

        return this._client
            .request(opts)
            .then((response) => {
                const {status, headers, data} = response;
                super.emit("response", status, data);
                return {
                    status,
                    headers,
                    data,
                };
            })
            .catch((error) => {
                super.emit("response", error.response.status, error.response.data);
                throw error;
            });
    }

    event() {
        return new Event(this);
    }

    user() {
        return new User(this);
    }

    alert(id = null) {

        if(id === null) {
            return new Alert(this);
        }

        return new Alert(this)._getItem(id);
    }

    incident(id = null) {

        if(id === null) {
            return new Incident(this);
        }

        return new Incident(this)._getItem(id);
    }

    heartbeat(id = null) {

        if(id === null) {
            return new Heartbeat(this);
        }

        return new Heartbeat(this)._getItem(id);
    }
}

ILert.EVENT_TYPES = {
    ALERT: "ALERT",
    ACCEPT: "ACCEPT",
    RESOLVE: "RESOLVE",
};

ILert.ALERT_STATES = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    RESOLVED: "RESOLVED"
};

ILert.INCIDENT_STATES = {
    INVESTIGATING: "INVESTIGATING",
    IDENTIFIED: "IDENTIFIED",
    MONITORING: "MONITORING",
    RESOLVED: "RESOLVED"
};

module.exports = ILert;
