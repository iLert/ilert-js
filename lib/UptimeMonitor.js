"use strict";

class UptimeMonitor {

    constructor(ilert) {
        this.ilert = ilert;
    }

    get(id = null) {

        if(id == null) {
            return this.ilert.call("get", null, "/uptime-monitors");
        }

        return this.ilert.call("get", null, "/uptime-monitors/" + id);
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

    update(id, uptimeMonitor) {
        return this.ilert.call("put", uptimeMonitor, "/uptime-monitors/" + id);
    }
    
    delete(id) {
        return this.ilert.call("delete", null, "/uptime-monitors/" + id);
    }

    count() {
        return this.ilert.call("get", null, "/uptime-monitors/count");
    }
}

module.exports = UptimeMonitor;
