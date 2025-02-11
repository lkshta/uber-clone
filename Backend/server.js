const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const { initialiseSocket } = require("./socket");

//create server
const server = http.createServer(app);

// Initialize socket.io
initialiseSocket(server);

//run server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
