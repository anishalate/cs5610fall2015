/**
 * Created by Anish on 9/18/2015.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


require("./public/assignment/server/app.js")(app)
app.listen(port,ipaddress);