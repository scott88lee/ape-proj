const fs = require('fs');
const file = 'db.json';

function read() {
   let data = fs.readFileSync(file, 'utf8');
   return JSON.parse(data);
}

function write(data) {
   fs.writeFileSync(file, JSON.stringify(data));
}

module.exports = { read, write };