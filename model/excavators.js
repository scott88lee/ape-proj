const db = require('../db');

function getAll() {
   console.log("model > excavator > getAll");
   let data = db.read();
   return data.excavators;
}

function addNew(excavator) {
   console.log("model > excavator > addNew");
   let data = db.read();
   if (data.excavators.length < 6) {
      data.excavators.push(excavator);
      db.write(data);
      return true;
   }
   //Max number of excavators reached
   return false;
}

function deleteOne(id) {
   let data = db.read();
   data.excavators.splice(id - 1, 1);
   db.write(data);
   return data;
}

function getUnassigned() {
   let data = db.read();
   
   for (let i = 0; i < data.excavators.length; i++) {
      if (!data.excavators[i].schedule) {
         return data.excavators[i].name;
      }
   }
   return false;
}

module.exports = { 
   getAll,
   addNew,
   deleteOne,
   getUnassigned 
};