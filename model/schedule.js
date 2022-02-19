const db = require('../db');

module.exports = {
   getRange: (start, end) => {
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
                     site : excavator.schedule[j].location,
                     date: date
                  })
               }
            }
         }
      }
      return schedule;
   }
}
