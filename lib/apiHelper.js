"use strict";

class APIHelper {

    getAuthorization(config = {}) {
        
        if(config && config.apiKey) {
            return config.apiKey;
        }

        if(!config || !config.tenant) {
            return null;
        }

        const username = `${config.username}@${config.tenant}`;
        const basic = `${username}:${config.password}`;
        return "Basic " + Buffer.from(basic).toString("base64");
    }

    getApiClientString(config = {}) {

        if(!config || !config.tenant) {
            return null;
        }

        return `js/${config.tenant}/config.version`;
    }
}

module.exports = new APIHelper();