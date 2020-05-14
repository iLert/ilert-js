"use strict";

class Event {

    constructor(ilert) {
        this.ilert = ilert;
    }

    create(apiKey, eventType, summary, optional = {}) {

        const body = {...{
            apiKey,
            eventType,
            summary,
        }, ...optional };

        return this.ilert.call("post", body, "/events");
    }
}

module.exports = Event;
