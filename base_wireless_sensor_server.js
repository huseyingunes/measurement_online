const { Server } = require("socket.io");

const io = new Server({ /* options */ });

io.on('connection', (socket) => {
  console.log('a remote sensor controller connected');
  
  socket.on("example", (arg) => {
	console.log(arg); // arg is a data from remote sensor
  });
});

io.listen(3001);