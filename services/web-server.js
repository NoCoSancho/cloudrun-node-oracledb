// web server configuration
// modules in suport of managing the web server

const http = require('http');
const express = require('express');
const app = express();
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');


let httpServer;

// establish http server
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);


    // Mount the router at /api so all its routes start with /api
    app.use('/api', router);

    // configure http server to listen on configured port
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

// close http server
function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;

