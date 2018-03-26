/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';


const express = require('express');
const hostinfo = require('./hostInfo');

const app = express();

app.get('/api/userinfo', function (request, response) {

    let userInfo;
    response.set({'Content-Type': 'application/json'});
    return hostinfo.getHostIp().then(userIpAddress =>{

        userInfo = {
            'ipaddress': userIpAddress,
            'language': hostinfo.getUserLanguage(request.headers["accept-language"]),
            'software': hostinfo.getUserOS(request.headers["user-agent"])
        };

      response.json(userInfo).end();
    });
    // response.end();

});
app.listen(3000, function (err, data) {
    if (err) {
        throw err
    }
    console.log('Node.js listening on  3000 ... ');
});
module.exports = app;
