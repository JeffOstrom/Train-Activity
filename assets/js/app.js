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
  var frequency = $("#freqMinutes").val().trim();
  //database 
  var newTrain ={

        nameTrain: nameTrain,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
  };
  
  database.ref().push(newTrain);

  console.log(newTrain.nameTrain);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);
  
  });
  //creating firebase event 
  database.ref().on("child_added", function(childSnapshot){

  //Calculations
  var firstTimeConverted = moment(firstTimeConverted, "hh: :mm").subtract(1, "days");

  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Time " + timeDiff);
  
  var remainder = timeDiff % frequency;
  console.log(remainder);

  var nextTrainMinutes = frequency - remainder;

  // finds time until next train
  var nextTrainTime = moment().add(nextTrainMinutes, "minutes");


   var nameTrain = childSnapshot.val().nameTrain;
   var destination = childSnapshot.val().destination;
   var firstTrain = childSnapshot.val().firstTrain;
   var frequency = childSnapshot.val().frequency;
      
  //appending to display HTML 
  $("#employeeData").append("<tr><td>" + nameTrain + "<td></tr>" + destination  + "</td></tr>" + moment(nextTrainTime).format("hh:mm") + "</td></tr>" + nextTrainMinutes + "</td></tr>");


});