"use strict";

class UptimeMonitorItem {

    constructor(ilert, id) {
        this.ilert = ilert;
        this.id = id;
    }

    get() {
        return this.ilert.call("get", null, "/uptime-monitors/" + this.id);
    }

    update(uptimeMonitor) {
        return this.ilert.call("put", uptimeMonitor, "/uptime-monitors/" + this.id);
    }
    
    delete() {
        return this.ilert.call("delete", null, "/uptime-monitors/" + this.id);
    }
}

module.exports = UptimeMonitorItem;
