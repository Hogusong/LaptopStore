const fs = require('fs');
const http = require('http');
const url = require('url');

// Read data
const jsonData = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(jsonData);
console.log(laptopData);

const server = http.createServer((req, res) => {
  // Parse url and get path to open HTML
  const pathName = url.parse(req.url, true).pathname;
  // Parse url and get id from query
  const id = url.parse(req.url, true).query.id;

  // Render all Products
  if (pathName === '/products') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile(`${__dirname}/products.html`, 'utf-8', (err, data) => {
      res.end(data);
    })
  }
  // Render the detail of the selected laptop
  else if (pathName === '/laptop' && id < laptopData.length) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile(`${__dirname}/laptop.html`, 'utf-8', (err, data) => {
      res.end(data);
    })
  }
  // url not found
  else {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(`url ${pathName} was not found on the server`);
  }

  // res.writeHead(200, { 'Content-type': 'text/html' });
  // res.end('First message to test comunication.' + '  path = ' + pathName + ',  id = ' + id);

});

server.listen(1337, '127.0.0.1', () => {
  console.log('listening for requests ...')
})