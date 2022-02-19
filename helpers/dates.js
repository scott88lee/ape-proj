ddmmyyyy = (date) => {
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var year = date.getFullYear();
   return day + '/' + month + '/' + year;
}

getMonday = (date) => {
   let d = new Date(date);
   let day = d.getDay(),
   diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
   return new Date(d.setDate(diff));
}

module.exports = {
   ddmmyyyy,
   getMonday
}