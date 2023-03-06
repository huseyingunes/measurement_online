/*
    Raspberry Pi - Arduino Mega GRBL Commander
    You must first install GRBL to Arduino Mega and setup CNC system
        : -> https://github.com/grbl/grbl
    Need help, contact us: hgunes@balikesir.edu.tr, huseyingunes@gmail.com
*/

const { SerialPort } = require("serialport");
const serialPort = new SerialPort({ path: "COM4", baudRate: 115200 });

//Send GRBL command
async function sendGRBLCommand(a) {
    serialPort.write(a, function (err) {
        if (err) {
            return console.log("Error on write: ", err.message);
        }
    });
}

//GRBL Move
async function GRBLMove(x, y, x_step, y_step) {
    let x_move_dist = "X" + -1 * x_step;
    let y_move_dist = "Y" + -1 * y_step;
    for (i = 0; i < x; i++) {
        for (s = 0; s < y; s++) {
            sendGRBLCommand("G91" + "\n");
            sendGRBLCommand("G0 " + y_move_dist + "\n");
            await delay(3000);
        }
        sendGRBLCommand("G91" + "\n");
        sendGRBLCommand("G0 " + x_move_dist + "\n");
        console.log("i x_move_dist: " + i + " - " + x_move_dist);
        await delay(3000);
    }
}

//GRBL Start
async function startGRBL() {
    await delay(3000);
    sendGRBLCommand("\r\n\r\n");
    await delay(2000);
    sendGRBLCommand("$X" + "\n");
    await delay(2000);
    sendGRBLCommand("G90 G0 X0Y0Z0A0C0F10000");
    await delay(2000);
}

//Delayer function
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

var config = {
    x_move_grbl_command: "X5",
    y_move_grbl_command: "Y5",
};

startGRBL(); // Start GRBL

async function konumAyarla() {
    // Some GRBL Commands for Move
    await delay(5000);
    sendGRBLCommand("G91" + "\n");
    sendGRBLCommand("G0 Y1\n");
    await delay(1000);

    sendGRBLCommand("G91" + "\n");
    sendGRBLCommand("G0 X-250\n");
    await delay(30000);

    sendGRBLCommand("G91" + "\n");
    sendGRBLCommand("G0 Y-200\n");
}