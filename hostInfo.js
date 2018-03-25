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

    getUserLanguage(header){
        return header.split(',')[0];
    }

    getUserOS(header){
        return header.split(' ')[1].replace('(','').replace(';','')
    }


    sanitizeHeaders(inputString,characterToReplace){
        return inputString.replace(characterToReplace,'');

    }

}

module.exports = new HostInfo();
