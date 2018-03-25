'use strict';

const rp = require('request-promise');

class HostInfo {

    constructor() {

    }

    getHostIp() {

        const options = {
            method: "GET",
            uri: "https://api.ipify.org?format=json",
            resolveWithFullResponse: true

        };
        return rp(options).then(response => {
            return Promise.resolve((JSON.parse(response.body)["ip"]))
        });
    }

    getUserOS() {

        let platform = process.platform;
        let osName;
        switch (platform) {
            case "darwin":
                osName = "Macintosh";
                break;
            case "win32":
                osName = "Windows";
                break;
            default:
                osName = "unix";

        }
        return osName;

    }

}

module.exports = new HostInfo();
