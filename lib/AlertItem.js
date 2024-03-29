"use strict";

class AlertItem {

    constructor(ilert, id) {
        this.ilert = ilert;
        this.id = id;
    }
    
    get() {
        return this.ilert.call("get", null, "/alerts/" + this.id);
    }

    notifications() {
        return this.ilert.call("get", null, `/alerts/${this.id}/notifications`);
    }

    logEntries() {
        return this.ilert.call("get", null, `/alerts/${this.id}/log-entries`);
    }

    assign(userId) {
        return this.ilert.call("put", null, `/alerts/${this.id}/assign`, {
            "user-id": userId
        });
    }

    accept() {
        return this.ilert.call("put", null, `/alerts/${this.id}/accept`);
    }

    resolve() {
        return this.ilert.call("put", null, `/alerts/${this.id}/resolve`);
    }
}

module.exports = AlertItem;
