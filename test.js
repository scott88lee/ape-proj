let arr = [
   {date : "2019-01-01",location : "A"},
   {date : "2019-01-02",location : "A"},
   {date : "2019-01-05",location : "A"},
   {date : "2019-01-03",location : "A"},
   {date : "2022-01-04",location : "A"},
   {date : "2019-01-06",location : "A"},
]

console.table(arr)
arr.sort(function(a, b) {
   var keyA = new Date(a.date),
     keyB = new Date(b.date);
   return keyB - keyA;
});

console.table(arr)