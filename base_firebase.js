/*
    NodeJS -> Firebase Database Base Example for Measurement System
    You must first create firebase project and realtime database before use
    and then download service.json file
    Need help, contact us: hgunes@balikesir.edu.tr, huseyingunes@gmail.com
*/

var firebase = require("firebase-admin");

var serviceAccount = require("./magnetic-lab-measurement-firebase-adminsdk.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://magnetic-lab-measurement-default-rtdb.europe-west1.firebasedatabase.app/"
});

var db = firebase.database();
var ref = db.ref("m2m/measurement_values");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

var measurements_options = ref.child("measurement_options");
measurements_options.set({
  options: {
    start: "1",
    x: "30",
    x_step: "20",
    y: "0.5",
    y_step: "0.5"
  }
});

var measurement_pins = ref.child("measurement_pins");
const measurement_pins_pusher = measurement_pins.push();
measurement_pins_pusher.set({
  pin: {
    type: "digital",
    port_number: "15",
    name: "D1",
    bit: "1",
  }
});