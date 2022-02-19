capitalize = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

ddmmyyyy = (date) => {
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var year = date.getFullYear();
   return day + '/' + month + '/' + year;
}

sortDescending = (array) => {
   return array.sort(function(a, b) {
      return b - a;
   });
}

module.exports = {
   capitalize,
   ddmmyyyy,
   sortDescending
}