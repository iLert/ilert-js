"use strict";

const AlertItem = require("./AlertItem.js");

class Alert {

    constructor(ilert) {
        this.ilert = ilert;
    }

    get(state = "PENDING", offset = 0, limit = 50) {

        return this.ilert.call("get", null, "/alerts", {
            "start-index": offset,
            "max-results": limit,
            state,
        });
    }

    count() {
        return this.ilert.call("get", null, "/alerts/count");
    }

    _getItem(id) {
        return new AlertItem(this.ilert, id);
    }
}

module.exports = Alert;
