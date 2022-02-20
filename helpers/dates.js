ddmmyyyy = (date) => {
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var year = date.getFullYear();
   return day + '/' + month + '/' + year;
}

yyyymmdd = (date) => {
   var month = date.getMonth() + 1;
   month = month.toString()
   let mm = month.length < 2 ? "0" + month : month;

   var day = date.getDate();
   day = day.toString()
   dd = day.length < 2 ? "0" + day : day;
   var year = date.getFullYear();
   return year + '-' + mm + '-' + dd;
}

getMonday = (date) => {
   let d = new Date(date);
   let day = d.getDay(),
   diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
   return new Date(d.setDate(diff));
}

module.exports = {
   ddmmyyyy,
   yyyymmdd,
   getMonday
}