'use strict';

const rp = require('request-promise');

class HostInfo {

    constructor() {

    }

    getHostIp() {

        const options = {
            method: "GET",
            uri: "https://api.ipify.org/?format=json",
            resolveWithFullResponse: true

        };
        return rp(options).then(response => {
            return Promise.resolve((JSON.parse(response.body)["ip"]))
        });
    }

    getUserLanguage(header){
        if (this.isInputValid(header)){
            return header.split(',')[0];
        }
    }

    getUserOS(header){
        if(this.isInputValid()){
            return header.split(' ')[1].replace('(','').replace(';','');
        }
    }

    isInputValid(input){
        return !(input === null || input === undefined);
    }
}

module.exports = new HostInfo();
