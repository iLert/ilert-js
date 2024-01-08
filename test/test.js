"use strict";

const assert = require("assert");
const { ILert } = require("./../index.js");

const secret = require("./../secret.js");

describe("INT Test", () => {

    let client = null;
    let integrationKey = null;

    before(() => {
        client = new ILert(secret);
        // client.on("response", console.log);
        integrationKey = secret.integrationKey;
    });

    after(() => {
        client = null;
        integrationKey = null;
    });

    describe("Event", () => {

        it("should be able to create event", async () => {

            const response = await client.event().create(
                integrationKey,
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
    
            const response = await client.event().create(
                integrationKey,
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
    
            const response = await client.event().create(
                integrationKey,
                ILert.EVENT_TYPES.RESOLVE,
                "ilert-js test",
                {
                    incidentKey: "mocha"
                }
            );
    
            assert(response);
            assert.equal(response.status, 200);
        });
    });

    describe("User", () => {

        it("should be able to get current user", async () => {

            const response = await client.user().current();
    
            assert(response);
            assert.equal(response.status, 200);
            // assert.equal(response.data.username, secret.username);
        });
    });

    describe("Alert", () => {

        it("should be able to create pending alert through event", async () => {

            const response = await client.event().create(
                integrationKey,
                ILert.EVENT_TYPES.ALERT,
                "ilert-js test",
                {
                    incidentKey: "resolve-test"
                }
            );
    
            assert(response);
            assert.equal(response.status, 200);
        });

        it("should be able to fetch, accept and resolve alert", async () => {

            const incidentsResponse = await client.alert().get(ILert.INCIDENT_STATES.PENDING, 0, 5);
    
            assert(incidentsResponse);
            assert.equal(incidentsResponse.status, 200);
            assert(incidentsResponse.data.length > 0);

            const incident = client.alert(incidentsResponse.data[0].id);
            const acceptResponse = await incident.accept();
            assert(acceptResponse);
            assert.equal(acceptResponse.status, 200);

            const resolveResponse = await incident.resolve();
            assert(resolveResponse);
            assert.equal(resolveResponse.status, 200);
        });
    });

    describe("Heartbeat", () => {

        it("should be able to ping heartbeat", async() => {
            const response = await client.heartbeat(1234567).ping();
            assert(response);
            assert.equal(response.status, 202);
        });
    });
});
