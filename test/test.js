"use strict";

const assert = require("assert");
const { ILert } = require("./../index.js");

const secret = require("./../secret.js");

describe("INT Test", () => {

    let client = null;
    let apiKey = null;

    before(() => {
        client = new ILert(secret.config);
        // client.on("response", console.log);
        apiKey = secret.apiKey;
    });

    after(() => {
        client = null;
        apiKey = null;
    });

    describe("Event", () => {

        it("should be able to create event", async () => {

            const response = await client.event().create(
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
    
            const response = await client.event().create(
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
    
            const response = await client.event().create(
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
    });

    describe("User", () => {

        it("should be able to get current user", async () => {

            const response = await client.user().current();
    
            assert(response);
            assert.equal(response.status, 200);
            assert.equal(response.data.username, secret.config.username);
        });
    });

    describe("UptimeMonitor", () => {

        let monitor = null;

        it("should be able to create monitor", async() => {

            const response = await client.uptimeMonitor().create(
                "My monitor",
                ILert.REGIONS.EU,
                ILert.CHECK_TYPES.TCP,
                secret.policy,
                {
                    host: "5cf.de",
                    port: 80,
                },
                {
                    intervalSec: 300,
                    timeoutMs: 30000,
                    createIncidentAfterFailedChecks: 1,

                },
            );
    
            assert(response);
            assert.equal(response.status, 201);
            monitor = client.uptimeMonitor(response.data.id);
        });

        it("should be able to fetch uptime monitors", async() => {
            
            const response = await client.uptimeMonitor().get();

            assert(response);
            assert.equal(response.status, 200);
            assert(response.data.length > 0);
            assert(response.data.filter((_monitor) => {
                return _monitor.id === monitor.id;
            }).length === 1);
        });

        it("should be able to update monitor", async() => {

            const monitorData = (await monitor.get()).data;
            
            assert(monitorData);
            assert.equal(monitorData.intervalSec, 300);

            monitorData.intervalSec = 600;

            const response = await monitor.update(monitorData);
            assert(response);
            assert.equal(response.status, 200);
            assert(response.data.escalationPolicy.id);

            const updatedMonitor = (await monitor.get()).data;
            assert(updatedMonitor);
            assert.equal(updatedMonitor.intervalSec, 600);
        });

        it("should be able to get monitor count", async() => {
            const count = (await client.uptimeMonitor().count()).data.count;
            assert(count > 0);
        });

        it("should be able to delete monitor", async() => {

            const response = await monitor.delete();

            assert(response);
            assert.equal(response.status, 204);

            let deletedMonitor = null;
            try {
                deletedMonitor = (await monitor.get()).data;
            } catch(error) {
                // empty
            }

            assert.equal(deletedMonitor, null);
        });
    });

    describe("Incident", () => {

        it("should be able to create pending incident through event", async () => {

            const response = await client.event().create(
                apiKey,
                ILert.EVENT_TYPES.ALERT,
                "ilert-js test",
                {
                    incidentKey: "resolve-test"
                }
            );
    
            assert(response);
            assert.equal(response.status, 200);
        });

        it("should be able to fetch, accept and resolve incident", async () => {

            const incidentsResponse = await client.incident().get(ILert.INCIDENT_STATES.PENDING, 0, 5);
    
            assert(incidentsResponse);
            assert.equal(incidentsResponse.status, 200);
            assert(incidentsResponse.data.length > 0);

            const incident = client.incident(incidentsResponse.data[0].id);
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
