console.log("test")

// setup variables
let o = 0;
let oAvg = 100;


// simulate upkeep
// day = 1 sec
// month = 30 sec
// year = 300 sec
// for (i = 0; i < 1001; i++) {

//     if (i === 0) {
//       console.log(i,'setup variables')
//     } else {

//       if (i!== 1 && i%300===1) {
//         // 1 year (get new historical avg)
//         // get reservoir levels
//         console.log(i, "new hist avgs, get reservoir levels")
//       } else if (i%30 === 0) {
//         // 1 month (dole out funds) dont update reservoir levels
//         console.log(i, 'dole out funds')
//       } else {
//         // update reservoir levels
//         console.log(i, 'get reservoir levels')
//       }
//     }

// }



// simulate upkeep 2

// simulate upkeep
// day = 1 counter
// month = 3 counters
// year = 6 counters
for (i = 0; i < 101; i++) {

  if (i === 0) {
    console.log(i, 'setup variables')
  } else {

    if (i !== 1 && i % 6 === 1) {
      // 1 year (get new historical avg)
      // get reservoir levels
      console.log(i, "new hist avgs, get reservoir levels")
    } else if (i % 3 === 0) {
      // 1 month (dole out funds) dont update reservoir levels
      console.log(i, 'dole out funds')
    } else {
      // update reservoir levels
      console.log(i, 'get reservoir levels')
    }



  }

}