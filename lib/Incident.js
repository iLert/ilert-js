"use strict";

const IncidentItem = require("./IncidentItem.js");

class Incident {

    constructor(ilert) {
        this.ilert = ilert;
    }

    get() {
        return this.ilert.call("get", null, "/incidents");
    }

    _getItem(id) {
        return new IncidentItem(this.ilert, id);
    }
}

module.exports = Incident;
