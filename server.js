/**
 * Created by Anish on 9/18/2015.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CS5610Assignment');
var db = mongoose.connection;
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


require("./public/assignment/server/app.js")(app,mongoose,db)
app.listen(port,ipaddress);