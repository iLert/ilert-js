"use strict";

class HeartbeatItem {

    constructor(ilert, id) {
        this.ilert = ilert;
        this.id = id;
    }
    
    ping() {
        return this.ilert.call("head", null, "/heartbeats/" + this.id, null, {
            "accept": "text/plain"
        });
    }
}

module.exports = HeartbeatItem;
