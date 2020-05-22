"use strict";

class IncidentItem {

    constructor(ilert, id) {
        this.ilert = ilert;
        this.id = id;
    }
    
    get() {
        return this.ilert.call("get", null, "/incidents/" + this.id);
    }

    notifications() {
        return this.ilert.call("get", null, `/incidents/${this.id}/notifications`);
    }

    logEntries() {
        return this.ilert.call("get", null, `/incidents/${this.id}/log-entries`);
    }

    assign(userId) {
        return this.ilert.call("put", null, `/incidents/${this.id}/assign`, {
            "user-id": userId
        });
    }

    accept() {
        return this.ilert.call("put", null, `/incidents/${this.id}/accept`);
    }

    resolve() {
        return this.ilert.call("put", null, `/incidents/${this.id}/resolve`);
    }
}

module.exports = IncidentItem;
