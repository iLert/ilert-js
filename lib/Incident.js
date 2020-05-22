"use strict";

const IncidentItem = require("./IncidentItem.js");

class Incident {

    constructor(ilert) {
        this.ilert = ilert;
    }

    get(state = "PENDING", offset = 0, limit = 50) {

        return this.ilert.call("get", null, "/incidents", {
            "start-index": offset,
            "max-results": limit,
            state,
        });
    }

    count() {
        return this.ilert.call("get", null, "/incidents/count");
    }

    _getItem(id) {
        return new IncidentItem(this.ilert, id);
    }
}

module.exports = Incident;
