"use strict";

class IncidentItem {

    constructor(ilert, id) {
        this.ilert = ilert;
        this.id = id;
    }

    get() {
        return this.ilert.call("get", null, "/incidents/" + this.id);
    }

    update(incident) {
        return this.ilert.call("put", incident, "/incidents/" + this.id);
    }
    
    delete() {
        return this.ilert.call("delete", null, "/incidents/" + this.id);
    }
}

module.exports = IncidentItem;
