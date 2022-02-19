const db = require('./db');

function getAllExcavators() {
   let data = db.read();
   return data.excavators;
}

function addExcavator(excavator) {
   let data = db.read();
   if (data.excavators.length < 6) {
      data.excavators.push(excavator);
      db.write(data);
      return true;
   }
   //Max number of excavators reached
   return false;
}

function deleteExcavator(id) {
   let data = db.read();
   data.excavators.splice(id - 1, 1);
   db.write('db.json', data);
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
   getAllExcavators,
   addExcavator,
   deleteExcavator,
   isAssigned 
};