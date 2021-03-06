/*
 * This model uses the Node.js MongoDB Driver.
 * To install:  npm install mongodb --save
 */

var mongo = require('mongodb');
var mongoClient = require('mongodb').MongoClient;


/*
 * This connection_string is for mongodb running locally.
 * Change nameOfMyDb to reflect the name you want for your database
 */
var connection_string = 'localhost:27017/test';
/*
 * If OPENSHIFT env variables have values, then this app must be running on 
 * OPENSHIFT.  Therefore use the connection info in the OPENSHIFT environment
 * variables to replace the connection_string.
 */
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
// Global variable of the connected database
var mongoDB; 

// Use connect method to connect to the MongoDB server
mongoClient.connect('mongodb://'+connection_string, function(err, db) {
  if (err) doError(err);
  console.log("Connected to MongoDB server at: "+connection_string);
  mongoDB = db; // Make reference to db globally available.
});

exports.create = function(collection, data, callback) {
  console.log("4. Start insert function in mongoModel");
  // Do an asynchronous insert into the given collection
  mongoDB.collection(collection).insertOne(
    data,                     // the object to be inserted
    function(err, status) {   // callback upon completion
      if (err) doError(err);
      console.log("5. Done with mongo insert operation in mongoModel");
      // use the callback function supplied by the controller to pass
      // back true if successful else false
      var success = (status.result.n == 1 ? true : false);
      callback(success);
      console.log("6. Done with insert operation callback in mongoModel");
    });
  console.log("7. Done with insert function in mongoModel");
}



exports.findByUsername = function(username, callback) {
  mongoDB.collection("users").findOne({"username" : username}, function(err, doc){
    callback(err, doc);
  });
}
exports.findById = function(id, callback) {
 var object_id = new mongo.ObjectID(id);
 mongoDB.collection("users").findOne({"_id" : object_id}, function(err, doc){
    callback(err, doc);
  });
}
exports.newUser = function(username, password, displayName, callback) {
  mongoDB.collection("users").insertOne(
    {"username" : username, "password": password, "displayName": displayName},   
    function(err, status) {  
      if (err) doError(err);
      var success = (status.result.n == 1 ? true : false);
      callback(success);
    });
}

var doError = function(e) {
        console.error("ERROR: " + e);
        throw new Error(e);
    }
