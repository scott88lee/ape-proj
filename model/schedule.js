const db = require('../db');

getRange = (start, end) => {
   console.log("models> Schedules > getRange");
   let data = db.read();
   let schedule = [];
   //Each excavator
   for (let i = 0; i < data.excavators.length; i++) {
      let excavator = data.excavators[i];

      if (excavator.schedule) {
         //Each schedule
         for (let j = 0; j < excavator.schedule.length; j++) {
            let date = excavator.schedule[j].date;
            if (date >= start && date <= end) {
               schedule.push({
                  id: i + 1,
                  excavator: excavator.name,
                  site: excavator.schedule[j].location,
                  date: date
               })
            }
         }
      }
   }
   return schedule;
}

checkRedeploy = (schedule) => {
   console.log("models> Schedules > checkRedeploy");
   let data = db.read();

   //Find excavator
   for (let i = 0; i < data.excavators.length; i++) {
      let excavator = data.excavators[i];

      if (excavator.name === schedule.excavator) {
         if (excavator.schedule) {
            //If query site is not the same as last deployed site
            if (schedule.site.toLowerCase() != excavator.schedule[0].location.toLowerCase()) {
               console.log("Match");
               return true;
            }
         }
      }
   }
   console.log("No match !!!");
   return false;
}

lastDeployed = (site) => {
   console.log("models> Schedules > lastDeployed");
   let data = db.read();
   let schedule = [];
   //Each excavator
   for (let i = 0; i < data.excavators.length; i++) {
      let excavator = data.excavators[i];

      if (excavator.schedule) {
         //Each schedule
         for (let j = 0; j < excavator.schedule.length; j++) {
            if (site.toLowerCase() === excavator.schedule[j].location.toLowerCase()) {
               schedule.push({
                  excavator: excavator.name,
                  site: excavator.schedule[j].location,
                  date: excavator.schedule[j].date
               })
            }
         }
      }
   }

   // sort schedule by date descending
   schedule.sort(function (a, b) {
      return b.date - a.date
   });
   return schedule[0].excavator;
}

checkAvailable = (schedule) => {
   console.log("models> Schedules > checkAvailable");
   let data = db.read();

   //Each excavator
   for (let i = 0; i < data.excavators.length; i++) {
      let excavator = data.excavators[i];

      if (excavator.name === schedule.excavator) {
         // Check schedule
         if (excavator.schedule) {
            for (let j = 0; j < excavator.schedule.length; j++) {
               let date = excavator.schedule[j].date;
               if (schedule.start <= date && date <= schedule.end) {
                  console.log("Unavailable");
                  return false;
               }
            }
         }
      }
   }
   console.log("Available");
   return true;
}

addNew = (schedule) => {
   console.log("models> Schedules > addNew");
   return true;
}

module.exports = {
   getRange,
   checkRedeploy,
   lastDeployed,
   checkAvailable,
   addNew
}