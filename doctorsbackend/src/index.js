const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, apikey");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['*']
  }
});
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  console.log('Connected to MongoDB');

  // WebSocket connection handler
  io.on('connection', (socket) => {
    console.log('A user connected');
    global.socket = socket
    global.socket.emit("message", '{"welcome": "hi"}')

    // Handle incoming messages from clients
    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Handle the message as needed
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  // Start the server
  const port = process.env.PORT || 3003;
  http.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  // server = app.listen(config.port, () => {
  //   logger.info(`Listening to port ${config.port}`);
  //   console.log(`Listening to port ${config.port}`);
  // });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});



// // const appSocket = require('express')();
// const io = require('socket.io')(http, {
//   cors: {
//     origins: ['*']
//   }
// });
// Configure CORS middleware

