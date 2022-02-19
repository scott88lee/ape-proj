function enumerateDates(start, end) {
   let arr = []
   let d = new Date(start)
   let e = new Date(end)
   
   while (d <= e) {
       arr.push(yyyymmdd(d))
       d.setDate(d.getDate() + 1)
   }
   console.log(arr)
   return arr
}

function enumerateSites(arr) {
   let result = []
   //find unique sites
   for (let i = 0; i < arr.length; i++) {
       if (!result.includes(arr[i].site)) {
           result.push(arr[i].site)
       }
   }
   return result;
}

function enumerateExcavators(arr) {
   let result = []
   //find unique sites
   for (let i = 0; i < arr.length; i++) {
       if (!result.includes(arr[i].excavator)) {
           result.push(arr[i].excavator)
       }
   }
   return result;
}