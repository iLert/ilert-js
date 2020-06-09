"use strict";

const HeartbeatItem = require("./HeartbeatItem.js");

class Heartbeat {

    constructor(ilert) {
        this.ilert = ilert;
    }

    _getItem(id) {
        return new HeartbeatItem(this.ilert, id);
    }
}

module.exports = Heartbeat;
