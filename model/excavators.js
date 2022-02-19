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

function isAssigned(id, date) {
   let data = db.read();
   let excavator = data.excavators[id - 1];

   if (excavator.schedule) {
      for (let i = 0; i < excavator.schedule.length; i++) {
         let schedule = excavator.schedule[i];
         if (schedule.date === date) {
            return true;
         }
      }
   }
   return false;
}

module.exports = { 
   getAll,
   addNew,
   deleteOne,
   isAssigned 
};