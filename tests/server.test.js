

const userInfoServer = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.should();
chai.use(chaiHttp);


describe('UserInfo test suite', () => {
  it('returns status code 200', (done) => {
    chai.request(userInfoServer)
      .get('/api/userinfo')
      .end((err, res) => expect(res).to.have.status(200));
    done();
  });
  it('Checks the content type', (done) => {
    chai.request(userInfoServer)
      .get('/api/userinfo')
      .end((err, res) => expect(res).to.be.json);
    done();
  });

  it('Check for Error', (done) => {
    chai.request(userInfoServer)
      .get('/api/userinfo')
      .end((err, res) => expect(res.text).to.equal('{"ipaddress":"{error:\'something went wrong\'}"}'));
    done();
  });
});
