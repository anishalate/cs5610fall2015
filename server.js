/**
 * Created by Anish on 9/18/2015.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port,ipaddress);