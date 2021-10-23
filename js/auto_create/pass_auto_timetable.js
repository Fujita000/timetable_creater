// let auto_btn = document.getElementById("auto_btn");

// auto_btn.addEventListener("click",e=>{
//   log(get_ele_list());
//   log(join_lesson_and_fixed());
//   log(timetable);
//   //ここで自動生成プログラムにデータの受け渡しをする
// });

//必要な出力
//
//join_lesson_and_fixed:授業一覧を返す
//lesson_in_timetable:時間割を返す
//get_ele_list:選択授業を返す
function pass_auto_timetable() {
  // console.table(lesson_in_timetable())
  //授業一覧,時間割,選択授業の内容一覧
  let q = get_ele_list();
  q.pop()
  q.pop()
  return [lesson_in_timetable(), join_lesson_and_fixed(), q]
  log(get_ele_list());
  log(join_lesson_and_fixed());
  log(lesson_in_timetable());
}

//normal_lesson_listの名前の出力
function get_lesson_name() {
  let ret = [];
  for (let i = 0; i < normal_lesson_list.length; i++) {
    ret.push([]);
    for (let j = 0; j < normal_lesson_list[i].length; j++) {
      ret[i].push(normal_lesson_list[i][j][0]);
    }
  }
  return ret;
}

//normal_lesson_listの数値データの出力
function get_lesson_num_data() {
  let ret = [];
  for (let i = 0; i < normal_lesson_list.length; i++) {
    ret.push([]);
    for (let j = 0; j < normal_lesson_list[i].length; j++) {
      let tmp = [...normal_lesson_list[i][j]];
      tmp[0] = j;
      ret[i][j] = tmp;
      ret[i][j][3] = normal_lesson_list[i][j]["total"];
      ret[i][j][5] = normal_lesson_list[i][j]["continuity"];
    }
  }
  return ret;
}
//elective_lesson_listの数値データの出力
function get_elective_lesson_num_data() {
  let ret = [];
  for (let i = 0; i < elective_lesson_list.length; i++) {
    ret.push([]);
    for (let j = 0; j < elective_lesson_list[i].length; j++) {
      ret[i].push([]);
      let tmp = [...elective_lesson_list[i][j]];
      tmp[0] = j + 100;
      tmp[1] = 0;
      tmp[2] = 0;
      ret[i][j] = tmp;
      ret[i][j][3] = elective_lesson_list[i][j]["total"];
      ret[i][j][5] = elective_lesson_list[i][j]["continuity"];
    }
  }
  return ret;
}


//固定授業の抽出
function get_fixed_lesson() {
  let ret = [];

  for (let i = 0; i < timetable.length; i++) {
    ret.push([]);
    ret[i].push([]);
    ret[i].push([]);

    for (let j = 0; j < timetable[i].length; j++) {
      for (let k = 0; k < timetable[i][j].length; k++) {
        if (timetable[i][j][k] >= 100) {
          if (Number.isFinite(ret[i][1][timetable[i][j][k] - 100])) {
            ret[i][1][timetable[i][j][k] - 100]++;
          } else {
            ret[i][1][timetable[i][j][k] - 100] = 1;
          }
        } else {
          if (Number.isFinite(ret[i][0][timetable[i][j][k]])) {
            ret[i][0][timetable[i][j][k]]++;
          } else {
            ret[i][0][timetable[i][j][k]] = 1;
          }
        }
      }
    }
  }
  return ret;
  ret[i][1][k];//選択授業
  ret[i][0][k];//通常授業
}

//固定授業を授業リストに合体する
//最終出力
function join_lesson_and_fixed() {
  let fixed = get_fixed_lesson();
  let nor = get_lesson_num_data();
  let ele = get_elective_lesson_num_data();
  for (let i = 0; i < nor.length; i++) {
    for (let j = 0; j < nor[i].length; j++) {
      if (Number.isFinite(fixed[i][0][j])) {
        nor[i][j][4] = fixed[i][0][j];
      } else {
        nor[i][j][4] = 0;
      }
      if (j == 0) {
        nor[i][j][4] = 0;
      }
    }
  }
  for (let i = 0; i < ele.length; i++) {
    for (let j = 0; j < ele[i].length; j++) {
      if (Number.isFinite(fixed[i][1][j])) {
        ele[i][j][4] = fixed[i][1][j];
      } else {
        ele[i][j][4] = 0;
      }
    }
  }
  let ret = [];
  for (let i = 0; i < nor.length; i++) {
    ret.push(nor[i].concat(ele[i]));
  }
  return ret;
}

//選択授業一覧の出力
function get_ele_list() {
  let ret = [];
  for (let i = 0; i < elective_lesson_list.length; i++) {
    ret.push([]);
    let q = 0;
    for (let j = 0; j < elective_lesson_list[i].length; j++) {
      q++;
      for (let k = 0; k < elective_lesson_list[i][j].length; k++) {
        let tmp = [...elective_lesson_list[i][j][k]];
        tmp[0] = j + 100;
        tmp.splice(1, 0, 0)
        ret[i].push([...tmp]);
      }
    }
  }
  return ret;
}

function lesson_in_timetable() {
  let arr2 = JSON.parse(JSON.stringify(timetable));
  let lsn = join_lesson_and_fixed();
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr2[i].length; j++) {
      for (let k = 0; k < arr2[i][j].length; k++) {
        if (arr2[i][j][k] != 0) arr2[i][j][k] = get_num_to_lesson(arr2[i][j][k], i, lsn);
      }
    }
  }
  return rev_x_y(arr2);
}

function get_num_to_lesson(num, cls, lsn) {
  for (let i = 0; i < lsn[cls].length; i++) {
    if (lsn[cls][i][0] == num) return lsn[cls][i];
  }
  return [0, 0, 0, 0, 0, 0]
}
let rew
function rev_x_y(table) {
  let arr1 = JSON.parse(JSON.stringify(table));
  let arr2 = [];
  // log(table)
  rew = table
  for (let z = 0; z < arr1.length; z++) {
    arr2.push([]);
    for (let y = 0; y < arr1[z][y].length; y++) {
      arr2[z].push([]);
      for (let x = 0; x < arr1[z].length; x++) {
        arr2[z][y].push(arr1[z][x][y]);
      }
    }
  }
  return arr2;
}

function rev_y_x(table) {
  let arr1 = JSON.parse(JSON.stringify(table));
  let arr2 = [];
  for (let z = 0; z < arr1.length; z++) {
    arr2.push([]);
    for (let y = 0; y < arr1[z][0].length; y++) {
      arr2[z].push([]);
      for (let x = 0; x < arr1[z].length; x++) {
        arr2[z][y].push(arr1[z][x][y]);
      }
    }
  }
  return arr2;
}