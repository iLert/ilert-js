"use strict";

class User {

    constructor(ilert) {
        this.ilert = ilert;
    }

    current() {
        return this.ilert.call("get", null, "/users/current");
    }
}

module.exports = User;
