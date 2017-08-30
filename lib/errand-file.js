var kue = require('kue');
var queue = kue.createQueue();
var MongoClient = require('mongodb').MongoClient;
var _ = require('underscore');
var handlebars = require("node-handlebars");
var fs = require('fs');

var MONGODB_URL = process.env['ERRAND_MONGODB_URL'] ? process.env['ERRAND_MONGODB_URL'] : "mongodb://localhost:27017";

function graceful() {
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

queue.process('errand-file', function(job, done){

  switch (job.data.request.method) {

    case 'write':

      MongoClient.connect( MONGODB_URL + "/" + job.data.request.database, function(err, db) {  	

        var collection = db.collection( job.data.request.collection );

        collection.find({}).toArray( function(err, docs) {

          job.data.request.parameters.context.docs = docs;

          var hbs = handlebars.create({
            partialsDir: job.data.context.dirname + job.data.request.parameters.partialsDir
          });

          hbs.engine(job.data.context.dirname + job.data.request.parameters.template, job.data.request.parameters.context, function(err, result) {
            if (err) {
              throw err;
            }
            fs.writeFileSync(job.data.context.dirname + job.data.request.parameters.file, result);
            db.close();
            done();
          });

        }) 

      });

    break;

  };

});
