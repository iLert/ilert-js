# ilert-js

**The official iLert api bindings.**

## Install

`npm install ilert`

## In action

```js
const { ILert } = require("ilert");
const ilert = new ILert();

const { data } = await ilert.event().create(
    "il1api0460d849fcdc753d4c65848f478cee89f67158b37a473f",
    ILert.EVENT_TYPES.RESOLVE,
    "My test incident summary",
    { incidentKey: "123456" } // optional
);
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
