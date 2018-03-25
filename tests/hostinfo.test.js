'use strict';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const assert = chai.assert;
const {expect} = require('chai');

const nock = require('nock');
const hostinfo = require('../hostInfo');

describe("Host Info test suite", () => {

    it("getUserLanguage returns a language from a header", () => {
        expect(hostinfo.getUserLanguage("en-US,en;q=0.9")).to.equal("en-US");
    });

    it("getUserLanguage returns undefined if a null is passed as an input", () => {
        expect(hostinfo.getUserLanguage(null)).to.equal(undefined);
    });

    it("getUserLanguage returns undefined if an undefined as an input", () => {
        expect(hostinfo.getUserLanguage(undefined)).to.equal(undefined);
    });

    it("getUserLanguage returns empty string if an empty string is passed  as an input", () => {
        expect(hostinfo.getUserLanguage("")).to.equal('');
    });

    it("getUserOS returns undefined if an null is passed as an input", () => {
        expect(hostinfo.getUserOS(null)).to.equal(undefined);
    });

    it("getUserOS returns undefined if an undefined is passed as an input", () => {
        expect(hostinfo.getUserOS(undefined)).to.equal(undefined);
    });

    it("getUserOS returns undefined if an empty string is passed as an input", () => {
        expect(hostinfo.getUserOS("")).to.equal(undefined);
    });

    it("getUserIp returns the IP of the user", () => {
        const scope = nock('https://api.ipify.org')
            .get('/?format=json')
            .reply(200, '{\n' +
                '    "ip": "2.125.30.162"\n' +
                '}');
        return assert.eventually.equal(hostinfo.getHostIp(), "2.125.30.162");

    });

    it("getUserIp returns false when the server is down ", () => {
        const scope = nock('https://api.ipify.org')
            .get('/?format=json')
            .reply(500, '{\n' +
                '    "ip": "2.125.30.162"\n' +
                '}');

        return assert.eventually.equal(hostinfo.getHostIp(), "{error:'something went wrong'}");
    });

    it("getUserIp returns error if the server contract changes ",()=>{
        const scope = nock('https://api.ipify.org')
            .get('/?format=json')
            .reply(200, '{\n' +
                '    "error": "2.125.30.162"\n' +
                '}');

    });

    return assert.eventually.equal(hostinfo.getHostIp(), "{error:'something went wrong'}");

});