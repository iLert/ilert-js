"use strict";

const assert = require("assert");
const { ILert } = require("./../index.js");

describe("INT Test", () => {

    let client = null;
    let apiKey = null;

    before(() => {
        const secret = require("./../secret.js");
        client = new ILert(secret.config);
        apiKey = secret.apiKey;
    });

    after(() => {
        client = null;
        apiKey = null;
    });

    it("should be able to create event", async () => {

        const response = await client.createEvent(
            apiKey,
            ILert.EVENT_TYPES.ALERT,
            "ilert-js test",
            {
                incidentKey: "mocha"
            }
        );

        assert(response);
        assert.equal(response.status, 200);
    });

    it("should be able to accept event", async () => {

        const response = await client.createEvent(
            apiKey,
            ILert.EVENT_TYPES.ACCEPT,
            "ilert-js test",
            {
                incidentKey: "mocha"
            }
        );

        assert(response);
        assert.equal(response.status, 200);
    });

    it("should be able to resolve event", async () => {

        const response = await client.createEvent(
            apiKey,
            ILert.EVENT_TYPES.RESOLVE,
            "ilert-js test",
            {
                incidentKey: "mocha"
            }
        );

        assert(response);
        assert.equal(response.status, 200);
    });

    it("should be able to get current user", async () => {

        const response = await client.currentUser();

        assert(response);
        assert.equal(response.status, 200);
        assert.equal(response.data.username, "apiuser");
    });
});