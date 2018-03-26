'use strict';

const userInfoServer = require('../server');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const {expect} = require('chai');

describe("UserInfo test suite", () => {
    it("returns status code 200", (done) => {

        chai.request(userInfoServer)
            .get('/api/userinfo')
            .end((err, res) => {
                return expect(res).to.have.status(200);

            });
        done();
    });
    it("Checks the content type", (done) => {

        chai.request(userInfoServer)
            .get('/api/userinfo')
            .end((err, res) => {
                return expect(res).to.be.json;
            });
        done();
    });

    it("Check for Error", (done) => {
        chai.request(userInfoServer)
            .get('/api/userinfo')
            .end((err, res) => {
                return expect(res.text).to.equal('{"ipaddress":"{error:\'something went wrong\'}"}');
            });
        done();
    });
});