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

        return this.ilert.call("post", body, "/v1/events");
    }
}

module.exports = Event;
