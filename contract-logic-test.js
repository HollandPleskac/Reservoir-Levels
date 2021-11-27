console.log("test")

// setup variables
let o = 0;
let oAvg = 100;


// simulate upkeep
for (i = 0; i < 1001; i++) {

    if (i === 0) {
      console.log('setup variables')
    } else {
      if (i%30 === 0) {
        console.log(i, 'dole out funds')
      } else if (i!== 1 && i % 360 === 1) {
        console.log(i, 'new historical avg')
      }
    }

}