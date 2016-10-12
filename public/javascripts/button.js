$(document).ready(function() {
$("#mixes").click(function(){
 return location.href = '/three';
});
$("#start").click(function(){
 return location.href = '/two';
});
$("#signup").click(function(){
 return location.href = '/signup.html';
});
$("#instructions").click(function(){
 return location.href = '/four';
});

  $('#message').text("Make your Mashup, Your Way!").slideUp(5500);
  
});




$(function() { 
$("#retrieve").click(function(){
     //storing values from the url 
    var name= $("#songname3").val();
    // var desc= $("#songdesc").val();
    // var date= $("#songdate").val();   
 $.ajax({
    url:'/songs', // building the url in the required format using the variables above
    type: 'GET',
    data: {
        name: name,
        // description: desc,
        // date: date
    },
    success: function(result) {
        console.log("retrieve");
        $('#retrieveResult').html(result); //adding the result to html
      }
    });
 }); 

$("#update").click(function(){
     //storing values from the url 
    var name= $("#songname2").val();
    var desc= $("#songdesc2").val();
    var date= $("#songdate2").val();
 $.ajax({
    url:'/songs', // building the url in the required format using the variables above
    type: 'POST',
    data: {
        find: JSON.stringify({"name": name}),
        update: JSON.stringify({"$set":{"description":desc, "date":date}})
        // description: desc,
        // date: date
    },
    success: function(result) {
        console.log("update");
        $('#updateResult').html(result); //adding the result to html
      }
    });
 }); 


$("#delete").click(function(){
     //storing values from the url 
    var name= $("#songname4").val()
    var desc= $("#songdesc4").val();
    var date= $("#songdate4").val();
 $.ajax({
    url:'/songs', // building the url in the required format using the variables above
    type: 'DELETE',
    data: {
        find: JSON.stringify({"name": name}),
        remove: JSON.stringify({"$delete":{"description":desc, "date":date}})
        //remove: JSON.stringify(database.songs.splice( { "name" : name } ))
    },
    success: function(result) {
        console.log("delete");
        $('#deleteResult').html(result); //adding the result to html
      }
    });
 }); 
});
