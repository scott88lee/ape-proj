const fs = require('fs');

module.exports = {
   read: (file) => {
      let data = fs.readFileSync(file, 'utf8');
      return JSON.parse(data);
   },
   write: (file, data) => {
      fs.writeFileSync(file, JSON.stringify(data));
   }
}