"use strict";

const assert = require("assert");
const { ILert } = require("./../index.js");

const secret = require("./../secret.js");

describe("INT Test", () => {

    let client = null;
    let apiKey = null;

    before(() => {
        client = new ILert(secret.config);
        client.on("response", console.log);
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

        let monitorId = null;

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
            monitorId = response.data.id;
        });

        it("should be able to fetch uptime monitors", async() => {
            
            const response = await client.uptimeMonitor().get();

            assert(response);
            assert.equal(response.status, 200);
            assert(response.data.length > 0);
            assert(response.data.filter((monitor) => {
                return monitor.id === monitorId;
            }).length === 1);
        });

        it("should be able to update monitor", async() => {

            const monitor = await client.uptimeMonitor().get(monitorId).data;
            
            assert(monitor);
            assert.equal(monitor.intervalSec, 300);

            monitor.intervalSec = 310;

            const response = await client.uptimeMonitor().update(monitorId, monitor);
            assert(response);
            assert.equal(response.status, 200);

            const updatedMonitor = await client.uptimeMonitor().get(monitorId).data;
            
            assert(updatedMonitor);
            assert.equal(monitor.intervalSec, 310);
        });

        it("should be able to delete monitor", async() => {

            const response = await client.uptimeMonitor().delete(monitorId);

            assert(response);
            assert.equal(response.status, 204);

            let monitor = null;
            try {
                monitor = await client.uptimeMonitor().get(monitorId).data;
            } catch(error) {
                // empty
            }

            assert.equal(monitor, null);
        });
    });
});