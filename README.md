# ilert-js

**The official iLert api bindings.**

## Install

`npm install ilert`

## In action

```js
const { ILert } = require("ilert");
const ilert = new ILert({
    apiKey: "123123" // optional
});

// creating a new event
const { data } = await ilert.event().create(
    "il1api0460d849fcdc753d4f",
    ILert.EVENT_TYPES.ALERT,
    "My test incident summary",
    { incidentKey: "123456" } // optional
);

// resolving a pending alert
await ilert.alert(45678).resolve();

// fetch an incident
await ilert.incident(12345).get();

// ping a heartbeat
await ilert.heartbeat("il1hbt0460d849fcdc753").ping();
```

Typescript definitions included.

## Getting help

We are happy to respond to [GitHub issues][issues] as well.

[issues]: https://github.com/iLert/ilert-js/issues/new

<br>

#### License

<sup>
Licensed under either of <a href="LICENSE-APACHE">Apache License, Version
2.0</a> or <a href="LICENSE-MIT">MIT license</a> at your option.
</sup>

<br>

<sub>
Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in ilert-js by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
</sub>

