function ddmmyyyy(date) {
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var year = date.getFullYear();
   return day + '/' + month + '/' + year;
}

function yyyymmdd(date) {
   var month = date.getMonth() + 1;
   month = month.toString()
   let mm = month.length < 2 ? "0" + month : month;

   var day = date.getDate();
   day = day.toString()
   dd = day.length < 2 ? "0" + day : day;
   var year = date.getFullYear();
   return year + '-' + mm + '-' + dd;
}

function getMonday(date) {
   let d = new Date(date);
   let day = d.getDay(),
       diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
   return new Date(d.setDate(diff));
}

function getDayOfWeek(date){
   //Get day of week
   let d = new Date(date)
   let index = d.getDay()

   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   return(days[index])
}