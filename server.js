/**
 * Created by Anish on 9/18/2015.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
//var mongooseP = require('mongoose');
var connectionString =  'mongodb://localhost/CS5610Assignment';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connectionString);
//mongooseP.connect('mongodb://localhost/CS5610Project');
var db = mongoose.connection;
//var dbP = mongooseP.connection;
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


require("./public/assignment/server/app.js")(app,mongoose,db);
//require("./public/project/server/app.js")(app,mongoose,dbP);
app.listen(port,ipaddress);

/*MongoDB 2.4 database added.  Please make note of these credentials:

 Root User:     admin
 Root Password: ICKthCKdMupZ
 Database Name: cs5610

 Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/*/