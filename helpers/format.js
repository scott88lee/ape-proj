capitalize = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

sortDescending = (array) => {
   return array.sort(function(a, b) {
      return b - a;
   });
}

module.exports = {
   capitalize,
   sortDescending
}