// include my model for this application
var mongoModel = require("../models/mongoModel.js")


// Define the routes for this controller
exports.init = function(app) {
  var passport = app.get('passport');
  app.get('/', firstpage); // essentially the app welcome page
  app.get('/two', secondpage);
  app.get('/three',checkAuthentication, doMembersOnly);
  //app.get('/three', thirdpage);
  app.get('/four', fourthpage);


  app.put('/signup',
  passport.authenticate('local', {failureRedirect: '/signup.html',
                                  successRedirect: '/login.html'}));



  

  app.post('/login',
  passport.authenticate('local', {failureRedirect: '/login.html',
                                  successRedirect: '/three'}));

  app.get('/logout', doLogout);
  // The collection parameter maps directly to the mongoDB collection
  app.put('/:collection', doCreate); // CRUD Create
  app.get('/:collection', doRetrieve); // CRUD Retrieve
  app.post('/:collection', doUpdate);
  app.delete('/:collection', doDelete); // CRUD Update
  
  // The CRUD Delete path is left for you to define
  // app.put('/two/:collection', doCreate); // CRUD Create
  // app.get('/two/:collection', doRetrieve); // CRUD Retrieve
  // app.post('/two/:collection', doUpdate);
  // app.delete('/two/:collection', doDelete); // CRUD Update
}

// No path:  display instructions for use
firstpage = function(req, res) {
  res.render('one', {title: 'MongoDB Test'})
};

secondpage = function(req, res) {
  res.render('two', {title: 'MongoDB Test'})
};

thirdpage = function(req, res) {
  res.render('three', {title: 'MongoDB Test'})
};

fourthpage = function(req, res) {
  res.render('four', {title: 'MongoDB Test'})
};

doCreate = function(req, res){
  console.log("1. Starting doCreate in dbRoutes");
  if (Object.keys(req.body).length == 0) {
    res.render('message', {title: 'Mongo Demo', obj: "No create message body found"});
    return;
  }
  mongoModel.create ( req.params.collection, 
	                    req.body,
		                  function(result) {
		                    // result equal to true means create was successful
  		                  var success = (result ? "Create successful" : "Create unsuccessful");
	  	                  res.render('message', {title: 'Mongo Demo', obj: success});
     		                console.log("2. Done with callback in dbRoutes create");
		                  });
  console.log("3. Done with doCreate in dbRoutes");
}



doRetrieve = function(req, res){
  mongoModel.retrieve(
    req.params.collection, 
    req.query,
		function(modelData) {
		  if (modelData.length) {
        res.render('results',{title: 'Mongo Demo', obj: modelData});
      } else {
        var message = "No documents with "+JSON.stringify(req.query)+ 
                      " in collection "+req.params.collection+" found.";
        res.render('message', {title: 'Mongo Demo', obj: message});
      }
		});
}


doUpdate = function(req, res){
  // if there is no filter to select documents to update, select all documents
  var filter = req.body.find ? JSON.parse(req.body.find) : {};
  // if there no update operation defined, render an error page.
  if (!req.body.update) {
    res.render('message', {title: 'Mongo Demo', obj: "No update operation defined"});
    return;
  }
  var update = JSON.parse(req.body.update);

  mongoModel.update(  req.params.collection, filter, update,
		                  function(status) {
              				  res.render('message',{title: 'Mongo Demo', obj: status});
		                  });
}

doDelete = function(req, res){

  // if there no delete operation defined, render an error page.
  console.log(req.body);
  if (!req.body.remove) {
    res.render('message', {title: 'Mongo Demo', obj: "No delete operation defined"});
    return;
  }
  var remove = JSON.parse(req.body.remove);

  mongoModel.remove(  req.params.collection, req.query,
                      function() {
                       console.log('Song Deleted');
                      });
}

// Members Only path handler
doMembersOnly = function(req, res) {
  // We only should get here if the user has logged in (authenticated) and
  // in this case req.user should be define, but be careful anyway.
  if (req.user && req.user.displayName) {
    // Render the membership information view
    // res.render('three', {member: req.user.displayName});
    res.render('three', {title: 'MongoDB Test'});
  } else {
    // Render an error if, for some reason, req.user.displayName was undefined 
    res.render('error', { 'message': 'Application error...' });
  }
};

function checkAuthentication(req, res, next){
    // Passport will set req.isAuthenticated
    if(req.isAuthenticated()){
        // call the next bit of middleware
        //    (as defined above this means doMembersOnly)
        next();
    }else{
        // The user is not logged in. Redirect to the login page.
        res.redirect("/login.html");
    }
}

/* 
 * Log out the user
 */
function doLogout(req, res){
  // Passport puts a logout method on req to use.
  req.logout();
  // Redirect the user to the welcome page which does not require
  // being authenticated.
  res.redirect('/');
};
