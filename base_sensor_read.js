/*
    Raspberry Pi - Arduino Mega Base Connection and Read Sensor Value Code
    You must first install Standartfirmata to Arduino Mega
    Need help, contact us: hgunes@balikesir.edu.tr, huseyingunes@gmail.com
*/
var five = require("johnny-five");
var board = new five.Board();

//On Sensor Board Connection
board.on("ready", function () {
    console.log("Sensor Board connected...");
    var pins = []
    let i = 0
    pins[0] =  new five.Sensor({
        pin: "A5", // connect to analog pin A5
        freq: 100, // the value will be read every 250 milli seconds
        type: "analog",
        threshold: 5
      })
    pins[0].on('data', function() {
      var sensor_value = this.value
      })
});
