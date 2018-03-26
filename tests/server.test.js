'use strict';

const userInfoServer = require('../server');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const {expect} = require('chai');
const nock = require('nock');

describe("UserInfo test suite", () => {
    it("returns status code 200", (done) => {

        chai.request(userInfoServer)
            .get('/api/userinfo')
            .end((err, res) => {
                expect(res).to.have.status(200);

            });
        done();
    });
    it("json", (done) => {

        chai.request(userInfoServer)
            .get('/api/userinfo')
            .end((err, res) => {
                expect(res).to.be.json;
            });
        done();
    });
});