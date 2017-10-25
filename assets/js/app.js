//Database global variables firebase 
  var config = {
    apiKey: "AIzaSyAMVx3-K9zSm48921bWhMimOk1zqwsfRcM",
    authDomain: "train-activity-6c89f.firebaseapp.com",
    databaseURL: "https://train-activity-6c89f.firebaseio.com",
    projectId: "train-activity-6c89f",
    storageBucket: "train-activity-6c89f.appspot.com",
    messagingSenderId: "119614708109"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  

  //Time variable
  var currentTime = moment();
  //Displays current time
  setInterval(function(){
    $("#time").html(moment(moment()).format("hh:mm:ss"));
  }, 1000);
    

  //Button click capture info
  $("#submit").on("click", function(event){
  event.preventDefault();//clears the page when hit submit
  //  Variables 
  var nameTrain = $("#name").val().trim();
  var destination = $("#destinationLoca").val().trim();
  var firstTrain = $("#trainTime").val().trim();
  var frequency = parseInt($("#freqMinutes").val());
  //database 
  var newTrain ={

        nameTrain: nameTrain,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
  };
  
  database.ref().push(newTrain);

  
  });
  //creating firebase event 
  database.ref().on("child_added", function(childSnapshot){

   //Calculations
  var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm");

  var currentTime = moment(); //current time

  var timeDiff = currentTime.diff(firstTimeConverted, "minutes");
  console.log("Time " + timeDiff);
  
  var remainder = timeDiff % childSnapshot.val().frequency;
  

  var nextTrainMinutes = childSnapshot.val().frequency - remainder;
  console.log(nextTrainMinutes)

  // finds time until next train
  var nextTrainTime = currentTime.add(nextTrainMinutes, "minutes");
      

  //appending to display HTML 
  $("#employeeData").append("<tr><td>" + childSnapshot.val().nameTrain + "</td><td>" + childSnapshot.val().destination  + "</td><td>"+ childSnapshot.val().frequency + "</td><td>" + nextTrainTime.format("hh:mm") + "</td><td>" + nextTrainMinutes + "</td></tr>");

});