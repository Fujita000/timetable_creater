// pass_timetable
// nullで授業がないことになっていたがバグの元なので
// 0で授業がないことにする
// 
// pass_lesson
// pass_timetableの変更に伴い
// pass_lesson[i][0]の値を[0,0,0,0,0,0]に変更する
// 
// 選択授業の値は新しいクラスができるごとに100→200のように
// 全ての選択授業で100から始まるようにする
// 
//データ元に上記を反映しました


//時間割作成手順

//pass_data
//先生(数字)、授業(数字)、学級(数字)、使用教室(数字)、必要授業数、固定授業数、連続コマ数
//授業番号、教師、教室必要授業、固定授業、連続コマ数
let pass_lesson = [
  [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 5, 6, 0, 3],
    [2, 2, 1, 1, 0, 1],
    [3, 2, 1, 1, 0, 1],
    [4, 2, 1, 3, 0, 1],
    [5, 3, 5, 3, 3, 3],
    [6, 4, 4, 3, 0, 3],
    [100, 0, 0, 9, 9, 3],
  ],
  [
    [0, 0, 0, 0, 0, 0],
    [1, 7, 6, 3, 3, 3],
    [2, 3, 7, 3, 3, 3],
    [3, 4, 4, 3, 0, 3],
    [4, 1, 2, 1, 1, 1],
    [5, 1, 2, 2, 2, 1],
    [6, 1, 6, 6, 0, 3],
    [100, 0, 0, 3, 6, 3],
    [101, 0, 0, 3, 3, 3],
  ],
  [
    [0, 0, 0, 0, 0, 0],
    [1, 6, 4, 9, 9, 3],
    [2, 6, 3, 3, 3, 3],
    [3, 5, 3, 6, 6, 3],
    [4, 5, 3, 6, 6, 3],
    [5, 1, 3, 2, 2, 1],
    [6, 1, 3, 1, 1, 1],
  ],
  [
    [0, 0, 0, 0, 0, 0],
    [1, 6, 4, 9, 9, 3],
    [2, 6, 3, 3, 3, 3],
    [3, 5, 3, 6, 6, 3],
    [4, 5, 3, 6, 6, 3],
  ],
];

let d = pass_lesson;
let pass_timetable = [
  [
    [0, 0, 0, d[0][6], d[0][6], d[0][6]],
    [d[0][6], d[0][6], d[0][6], 0, 0, 0],
    [0, 0, 0, d[0][6], d[0][6], d[0][6]],
    [0, 0, 0, d[0][4], d[0][4], d[0][4]],
    [0, 0, 0, 0, 0, 0],
  ],
  [
    [d[1][6], d[1][6], d[1][6], d[1][1], d[1][1], d[1][1]],
    [d[1][0], d[1][0], d[1][0], 0, 0, 0],
    [d[1][7], d[1][7], d[1][7], 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [d[1][6], d[1][6], d[1][6], d[1][3], d[1][4], d[1][4]],
  ],
  [
    [d[2][0], d[2][0], d[2][0], d[2][2], d[2][2], d[2][2]],
    [d[2][2], d[2][2], d[2][2], d[2][1], d[2][1], d[2][1]],
    [d[2][1], d[2][1], d[2][1], 0, 0, 0],
    [d[2][3], d[2][3], d[2][3], d[2][3], d[2][3], d[2][3]],
    [d[2][0], d[2][0], d[2][0], d[2][4], d[2][5], d[2][5]],
  ],
  [
    [d[3][0], d[3][0], d[3][0], d[3][2], d[3][2], d[3][2]],
    [d[3][2], d[3][2], d[3][2], d[3][1], d[3][1], d[3][1]],
    [d[3][1], d[3][1], d[3][1], 0, 0, 0],
    [d[3][3], d[3][3], d[3][3], d[3][3], d[3][3], d[3][3]],
    [d[3][0], d[3][0], d[3][0], 0, 0, 0],
  ],
];


let choice_lesson = [
  [
    [100, 0, 8, 2],
    [100, 0, 0, 8],
    [100, 0, 1, 9],
    [100, 0, 2, 1],
    [100, 0, 6, 4],
  ],
  [
    [100, 0, 8, 2],
    [100, 0, 6, 4],
    [101, 0, 8, 1],
    [101, 0, 6, 4],
  ],
];

console.log(pass_lesson);
console.log(pass_timetable);

let data_class_list = ["", "1年", "2年", "3年", "4年"];
let data_teacher_list = ["", "選択", "川越", "岩城", "吉岡", "町浦", "行本", "平川", "大野", "池田"];
let classroom_list = ["選択", "501", "503", "401", "701", "大原201", "大原203", "大原204", "スタジアム", "学生会館２Ｆ－Ｂ"];
let lesson_list = [
  ["ＪＡＶＡ", "一般教養", "ビジネス実務", "ＮＷ", "ＷＥＢ", "ＥＸＣＥＬ", "選択１"],
  ["ＤＢ", "ＨＰ", "ＷＯＲＤ", "一般教養", "就職実務", "ＪＡＶＡ", "選択１", "選択２"],
  ["システム開発", "開発演習", "プログラミング実習", "プログラミング演習", "一般教養", "就職実務"],
  ["システム開発", "開発演習", "プログラミング実習", "プログラミング演習"],
];
// let table = document.querySelectorAll("table");
// let col = "";
// for (let i = 0; i < pass_timetable.length; i++) {
//   for (let y = 0; y < pass_timetable[i].length; y++) {
//     for (let x = 0; x < pass_timetable[i][y].length; x++) {
//       if (pass_timetable[i][y][x] != undefined) {
//         if (pass_timetable[i][y][x][0] - 1 >= 100) {
//           col = "選択";
//         } else {
//           col = lesson_list[i][pass_timetable[i][y][x][0] - 1];
//         }
//         table[i].children[0].children[x].children[y].textContent = col;
//       }
//           //  table[i].children[0].children[y].children[x].textContent = col;
//     }
//   }
// }


//アルゴリズム

// 時間割で空いている時間を探す関数
var vacant_timetable = (v_timetable, v_grade) => {
  for (i = 0; i < v_timetable[v_grade].length; i++) {
    for (j = 0; j < v_timetable[v_grade][i].length; j++) {
      if (v_timetable[v_grade][i][j] == null) {
        return [i, j];
      }
    }
  }
}

// 空いている時間が何時間空いているか探す関数
var continuous = (c_timetable, c_grade, c_weekday, c_time) => {
  let temp = 0;
  for (i = 0; i < 3 && i + c_time < 6; i++) {
    temp = i;
    if (c_timetable[c_grade][c_weekday][c_time + i] != null) {
      break;
    }
  }
  return temp + 1;
}

//空いている教室を見つける関数
var find_class = (f_timetable, f_weekday, f_time) => {
  let f_class = [];
  for (i = 0; i < 4; i++) {
    if (f_timetable[i][f_weekday][f_time] == null) {
      continue;
    } else if (f_timetable[i][f_weekday][f_time][2] == 0) {
      if (f_timetable[i][f_weekday][f_time][0] == 101) {
        for (j = 0; j < choice_lesson[0].length; j++) {
          f_class.push(choice_lesson[0][j][3]);
        }
      } else if (f_timetable[i][f_weekday][f_time][0] == 201) {
        for (j = 0; j < 2; j++) {
          f_class.push(choice_lesson[1][j][3]);
        }
      } else if (f_timetable[i][f_weekday][f_time][0] == 202) {
        for (j = 2; j < 4; j++) {
          f_class.push(choice_lesson[1][j][3]);
        }
      }
      continue;
    }
    f_class.push(f_timetable[i][f_weekday][f_time][2]);
  }
  return f_class;
}

//空いている先生を見つける関数
var find_teacher = (f_timetable, f_weekday, f_time) => {
  let f_teacher = [];
  for (i = 0; i < 4; i++) {
    if (f_timetable[i][f_weekday][f_time] == null) {
      continue;
    } else if (f_timetable[i][f_weekday][f_time][1] == 0) {
      if (f_timetable[i][f_weekday][f_time][0] == 101) {
        for (j = 0; j < choice_lesson[0].length; j++) {
          f_teacher.push(choice_lesson[0][j][2]);
        }
      } else if (f_timetable[i][f_weekday][f_time][0] == 201) {
        for (j = 0; j < 2; j++) {
          f_teacher.push(choice_lesson[1][j][2]);
        }
      } else if (f_timetable[i][f_weekday][f_time][0] == 202) {
        for (j = 2; j < 4; j++) {
          f_teacher.push(choice_lesson[1][j][2]);
        }
      }
      continue;
    }
    f_teacher.push(f_timetable[i][f_weekday][f_time][1]);
  }
  return f_teacher;
}

//空いている先生と教室がマッチする授業を見つける
var match = (m_teacher, m_class, m_grade) => {    //この引数(m_teacher,m_class)には配列が入ります。
  let match_class;
  for (i = 0; i < pass_lesson[m_grade].length; i++) {
    if (pass_lesson[m_grade][i][3] <= pass_lesson[m_grade][i][4]) {
      continue;
    }
    let not_match = false;
    for (j = 0; j < m_teacher.length; j++) {
      for (k = 0; k < m_teacher[j].length; k++) {
        if (pass_lesson[m_grade][i][1] == m_teacher[j] && pass_lesson[m_grade][i][1] != 0) {
          not_match = true;
          break;
        }
      }
    }
    if (not_match == false) {
      for (j = 0; j < m_class.length; j++) {
        for (k = 0; k < m_class[j].length; k++) {
          if (pass_lesson[m_grade][i][2] == m_class[j] && pass_lesson[m_grade][i][2] != 0) {
            not_match = true;
            break;
          }
        }
      }
    }
    if (not_match == false) {
      match_class = i;
      break;
    }
  }
  return match_class;
}

// 空いている連続時間に授業を入れる関数
var put_class = (p_grade, weekday, time, p_class, p_continuous) => {
  for (i = 0; i < p_continuous; i++) {
    pass_timetable[p_grade][weekday][time + i] = p_class;
  }
}

// テスト
let test = [];
let c_test = 0;
let find_class_test = [];
let find_teacher_test = [];
let m_test;
test = vacant_timetable(pass_timetable, 0);

console.log(test)

c_test = continuous(pass_timetable, 0, test[0], test[1]);

find_class_test[0] = find_class(pass_timetable, test[0], test[1]);
find_class_test[1] = find_class(pass_timetable, test[0], 1);
find_class_test[2] = find_class(pass_timetable, test[0], 2);
find_teacher_test[0] = find_teacher(pass_timetable, test[0], test[1]);
find_teacher_test[1] = find_teacher(pass_timetable, test[0], 1);
find_teacher_test[2] = find_teacher(pass_timetable, test[0], 2);

console.log(find_class_test);
// console.log(find_class_test[1]);
// console.log(find_class_test[2]);
console.log(find_teacher_test);

m_test = match(find_teacher_test, find_class_test, 0);

console.log(m_test);

console.log(find_class_test);
// console.log(find_class_test[1]);
// console.log(find_class_test[2]);
console.log(find_teacher_test);

m_test = match(find_teacher_test, find_class_test, 0);

console.log(m_test);

put_class(0, test[0], test[1], d[0][0], c_test);

console.log(pass_timetable[0][0][0]);
console.log(pass_timetable[0][0][1]);
console.log(pass_timetable[0][0][2]);
// console.log(choice_lesson[0]);

//結合するときに気を付けることfind系はcontinuous（空いている授業数）で制御すること(多分)
//findしたときの入れる変数の初期化？をどうするか