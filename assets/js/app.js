
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
  

//Button click capture info
$("#submit").on("click", function(event){
event.preventDefault();//clears the page when hit submit

var nameTrain = $("#name").val().trim();
var destination = $("#destinationLoca").val().trim();
var firstTrain = $("#trainTime").val().trim();
var frequency = $("#freqMinutes").val().trim();

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
