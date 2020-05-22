"use strict";

const UptimeMonitorItem = require("./UptimeMonitorItem.js");

class UptimeMonitor {

    constructor(ilert) {
        this.ilert = ilert;
    }

    get() {
        return this.ilert.call("get", null, "/uptime-monitors");
    }

    create(name, region, checkType, escalationPolicyId, checkParams, optional = {}) {

        const body = {...{
            name,
            region,
            checkType,
            intervalSec: 300,
            timeoutMs: 30000,
            createIncidentAfterFailedChecks: 1,
            escalationPolicy: {
                id: escalationPolicyId,
            },
            checkParams,
            paused: false,
        }, ...optional };

        return this.ilert.call("post", body, "/uptime-monitors");
    }

    count() {
        return this.ilert.call("get", null, "/uptime-monitors/count");
    }

    _getItem(id) {
        return new UptimeMonitorItem(this.ilert, id);
    }
}

module.exports = UptimeMonitor;
