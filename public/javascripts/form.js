/// sound cloud ////     

$(document).ready(function() {
    SC.initialize({
    client_id:'3dcb8913f19ee91a5f6c203c56333d75'
    });

  $("#stream").click(function(){
    SC.stream("/tracks/293", {autoPlay: true});
  });


var iframeElement   = document.querySelector('iframe');
var widget1         = SC.Widget(iframeElement);


////
(function(){
    var widgetIframe = document.getElementById('sc-widget'),
    widget       = SC.Widget(widgetIframe);

    widget.bind(SC.Widget.Events.READY, function(){
    widget.bind(SC.Widget.Events.PLAY, function(){
        // get information about currently playing sound
    widget.getCurrentSound(function(currentSound){
    console.log('sound ' + currentSound.get('') + 'began to play');
    });
    });
    // get current level of volume
    widget.getVolume(function(volume){
    console.log('current volume value is ' + volume);
    });
    // set new volume level
    widget.setVolume(50);
    // get the value of the current position
    });

    }());
    })

$(function() { 

$("#search").click(function(){
    //storing values from the url 
    var searchrequest = $("#searchbar").val();
    result = "https://w.soundcloud.com/player/?url="+searchrequest+"&single_active=false";
    console.log(searchrequest);
    //$('iframe src').html(result); 
    console.log(result);
    $("#sc-widget2").attr("src", result);   
    });

 $("#search2").click(function(){
    //storing values from the url 
    var searchrequest = $("#searchbar2").val();
    result = "https://w.soundcloud.com/player/?url="+searchrequest+"&single_active=false";
    console.log(searchrequest);
    //$('iframe src').html(result); 
    console.log(result);
    $("#sc-widget3").attr("src", result);   
    });
 

$("#playlistloader").click(function(){
    result = "https://w.soundcloud.com/player/?url=http://soundcloud.com/annemijn-mors/sets/acoustic&single_active=false";//acoustic
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });

$("#playlistloader2").click(function(){
    result = "https://w.soundcloud.com/player/?url=http://soundcloud.com/edm/sets/a-milli&single_active=false";//edm
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });

$("#playlistloader3").click(function(){
    result = "https://w.soundcloud.com/player/?url=https://soundcloud.com/flesner-jeffrey/sets/rock&single_active=false";
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });

$("#playlistloader4").click(function(){
    result = "https://w.soundcloud.com/player/?url=http://soundcloud.com/hip-hop-smoothless&single_active=false"; //hiphop
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });
$("#playlistloader5").click(function(){
    result = "https://w.soundcloud.com/player/?url=http://soundcloud.com/manol-jean-louis/sets/ragae&single_active=false"; //ragae
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });

$("#playlistloader6").click(function(){
    result = "https://w.soundcloud.com/player/?url=http://soundcloud.com/tareq-morsy/sets/clasic&single_active=false"; //jazz
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });

$("#playlistloader7").click(function(){
    result = "https://w.soundcloud.com/player/?url=http://soundcloud.com/needyl/sets/rap&single_active=false";//rap
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });
$("#playlistloader8").click(function(){
    result = "https://w.soundcloud.com/player/?url=http://soundcloud.com/dortea-ery-bleskaditsalossa/sets/country&single_active=false"; //country
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });

$("#playlistloader9").click(function(){
    result = "https://w.soundcloud.com/player/?url=http://soundcloud.com/hanangobran/sets/classic&single_active=false";//classical
    console.log(result);
    $("#sc-widget").attr("src", result);   
    });

$("#create").click(function(){
    //storing values from the url 
    var name= $("#songname").val();
    var desc= $("#songdesc").val();
    var date= $("#songdate").val();

 $.ajax({
    url:'/songs', // building the url in the required format using the variables above
    type: 'PUT',
    data: {
        name: name,
        description: desc,
        date: date
    },
    success: function(result) {
        console.log("create");
        $('#createResult').html(result); //adding the result to html
      }
    });
 }); 

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
