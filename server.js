/** ****************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ************************************************** */


const express = require('express');
const hostinfo = require('./hostInfo');

const app = express();

app.get('/api/userinfo', (request, response) => {
  let userInfo;
  response.set({ 'Content-Type': 'application/json' });
  return hostinfo.getHostIp().then((userIpAddress) => {
    userInfo = {
      ipAddress: userIpAddress,
      language: hostinfo.getUserLanguage(request.headers['accept-language']),
      software: hostinfo.getUserOS(request.headers['user-agent']),
    };

    response.json(userInfo).end();
  });
});

app.route('/')
  .get((req, res) => {
    res.sendFile(`${process.cwd()}/views/index.html`);
  });

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
});

module.exports = app;
