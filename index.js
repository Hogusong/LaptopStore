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
  if (pathName === '/products' || pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile(`${__dirname}/products.html`, 'utf-8', (err, data) => {
      let overviewOutput = data;
      fs.readFile(`${__dirname}/cards.html`, 'utf-8', (err, data) => {
        const cardOutput = laptopData.map(laptop => replaceData(data, laptop)).join('');
        overviewOutput = overviewOutput.replace('%%CARDS%%', cardOutput);
        res.end(overviewOutput)
      })
    })
  }
  // Render the detail of the selected laptop
  else if (pathName === '/laptop' && id < laptopData.length) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile(`${__dirname}/laptop.html`, 'utf-8', (err, data) => {
      const output = replaceData(data, laptopData[id]);
      res.end(output);
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

function replaceData(originHtml, laptop) {
  let output = originHtml.replace(/%PRODUCTNAME%/g, laptop.productName);
  output = output.replace(/%PRICE%/g, laptop.price);
  output = output.replace(/%IMAGE%/g, laptop.image);
  output = output.replace(/%SCREEN%/g, laptop.screen);
  output = output.replace(/%CPU%/g, laptop.cpu);
  output = output.replace(/%STORAGE%/g, laptop.storage);
  output = output.replace(/%RAM%/g, laptop.ram);
  output = output.replace(/%DESCRIPTION%/g, laptop.description);
  output = output.replace(/%ID%/g, laptop.id);
  return output;
}

server.listen(1337, '127.0.0.1', () => {
  console.log('listening for requests ...')
})