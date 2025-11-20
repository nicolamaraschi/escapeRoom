// escape-room-server/test-server.js
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/ping',
  method: 'GET'
};

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('RESPONSE:', data);
    console.log('Server is working correctly!');
  });
});

req.on('error', error => {
  console.error('Error:', error);
  console.log('Server is not responding properly.');
});

req.end();

console.log('Testing server at http://localhost:3000/ping');