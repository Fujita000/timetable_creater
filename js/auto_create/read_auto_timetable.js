function lesson_out_timetable(arr) {
  let arr2 = JSON.parse(JSON.stringify(arr));
  // let lsn = join_lesson_and_fixed();
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr2[i].length; j++) {
      for (let k = 0; k < arr2[i][j].length; k++) {
        if (arr2[i][j][k][0] == undefined) {
          arr2[i][j][k] = 0;
        } else {
          arr2[i][j][k] = arr2[i][j][k][0];
        }
      }
    }
  }
  return arr2;
}
