const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end('First message to test comunication');

});

server.listen(1337, '127.0.0.1', () => {
  console.log('listening for requests ...')
})