//初期化用
let run_initial, lesson_initial, au_choice_lesson, pass_timetable, pass_lesson;
let tmp_timetable,
  auto_create_flag = false;
document.querySelector("#auto_create_cancel").addEventListener("click", (e) => {
  if (auto_create_flag) {
    timetable = JSON.parse(JSON.stringify(tmp_timetable));
    update_timetable();
    all_color_change();
    auto_create_flag = false;
    tmp_timetable = undefined;
  }
});
document.querySelector("#auto_create").addEventListener("click", (e) => {
  if (!auto_create_flag) tmp_timetable = JSON.parse(JSON.stringify(timetable));
  click_auto_create();
  auto_create_flag = true;
});

function click_auto_create() {
  //開始ボタンを押したとき
  if (auto_create_flag) timetable = JSON.parse(JSON.stringify(tmp_timetable));
  let tps = pass_auto_timetable();
  run_initial = JSON.parse(JSON.stringify(tps[0]));
  lesson_initial = JSON.parse(JSON.stringify(tps[1]));
  au_choice_lesson = JSON.parse(JSON.stringify(tps[2]));
  initialization();
  let _run_timetable = run_timetable();
  let rt = _run_timetable[0];
  let err = _run_timetable[1];
  timetable = lesson_out_timetable(rev_y_x(JSON.parse(JSON.stringify(rt))));
  update_timetable();
  all_color_change();
  count_lesson_list_alert(err);
}

function validate_timetable(timetable) {
  let tt = shallow_copy(timetable);
  //timetableの中にある授業が現在存在するかの確認
  //ない場合は削除する
  tt.forEach((arr) => {
    arr.forEach((table) => {
      table.forEach((data) => {
        console.log(data);
      });
    });
  });
}

function confirm_auto_create() {
  //自動生成リセット
  auto_create_flag = false;
  tmp_timetable = undefined;
}

function shallow_copy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

// 二次元配列をコピーする
function copyMatrix(base) {
  const result = [];
  for (const line of base) {
    result.push([...line]);
  }
  return result;
}

//アルゴリズム

// 時間割で空いている時間を探す関数
var vacant_timetable = (v_timetable, v_grade, v_weekday, v_time) => {
  if (v_timetable[v_grade][v_weekday][v_time] == 0) {
    return [v_weekday, v_time];
  }
  return [999, 999];
};

// 空いている時間が何時間空いているか探す関数
var continuous = (c_timetable, c_grade, c_weekday, c_time) => {
  let temp = 0;
  for (i = 0; i < 3 && i + c_time < 6; i++) {
    if (c_timetable[c_grade][c_weekday][c_time + i] != 0) {
      break;
    }
    temp++;
  }
  return temp;
};

//空いている教室を見つける関数
var find_class = (f_timetable, f_weekday, f_time) => {
  let f_class = [];
  for (i = 0; i < pass_timetable.length; i++) {
    if (f_timetable[i][f_weekday][f_time] == 0) {
      continue;
    } else if (f_timetable[i][f_weekday][f_time][2] == 0) {
      if (au_choice_lesson[i] === void 0) {
        continue;
      }
      for (j = 0; j < au_choice_lesson[i].length; j++) {
        if (f_timetable[i][f_weekday][f_time][0] == au_choice_lesson[i][j][0]) {
          f_class.push(au_choice_lesson[i][j][3]);
        }
      }
      continue;
    }
    f_class.push(f_timetable[i][f_weekday][f_time][2]);
  }
  return f_class;
};

//空いている先生を見つける関数
var find_teacher = (f_timetable, f_weekday, f_time) => {
  let f_teacher = [];
  for (i = 0; i < pass_timetable.length; i++) {
    if (f_timetable[i][f_weekday][f_time] == 0) {
      continue;
    } else if (f_timetable[i][f_weekday][f_time][1] == 0) {
      if (au_choice_lesson[i] === void 0) {
        continue;
      }
      for (j = 0; j < au_choice_lesson[i].length; j++) {
        if (f_timetable[i][f_weekday][f_time][0] == au_choice_lesson[i][j][0]) {
          f_teacher.push(au_choice_lesson[i][j][2]);
        }
      }
      continue;
    }
    f_teacher.push(f_timetable[i][f_weekday][f_time][1]);
  }
  return f_teacher;
};

//空いている先生と教室がマッチする授業を見つける
var match = (m_teacher, m_class, m_grade, m_continuous) => {
  //この引数(m_teacher,m_class)には配列が入ります。
  let match_class = [];
  let now_lesson;
  for (i = 0; i < pass_lesson[m_grade].length; i++) {
    if (pass_lesson[m_grade][i][3] <= pass_lesson[m_grade][i][4]) {
      continue;
    }
    let not_match = false;
    for (j = 0; j < m_teacher.length; j++) {
      if (
        pass_lesson[m_grade][i][1] == m_teacher[j] &&
        pass_lesson[m_grade][i][1] != 0
      ) {
        not_match = true;
        break;
      } else if (pass_lesson[m_grade][i][1] == 0) {
        //変える予定
        now_lesson = pass_lesson[m_grade][i][0];
        for (k = 0; k < au_choice_lesson[m_grade].length; k++) {
          if ((now_lesson = !au_choice_lesson[m_grade][k][0])) {
            continue;
          }
          // if (au_choice_lesson[i] === void 0) {
          //   continue;
          // }
          if (au_choice_lesson[m_grade][k][2] == m_teacher[j]) {
            not_match = true;
          }
        }
      }
    }
    if (not_match == false) {
      for (j = 0; j < m_class.length; j++) {
        if (
          pass_lesson[m_grade][i][2] == m_class[j] &&
          pass_lesson[m_grade][i][2] != 0
        ) {
          not_match = true;
          break;
        } else if (pass_lesson[m_grade][i][1] == 0) {
          //変える予定
          now_lesson = pass_lesson[m_grade][i][0];
          for (k = 0; k < au_choice_lesson[m_grade].length; k++) {
            if ((now_lesson = !au_choice_lesson[m_grade][k][0])) {
              continue;
            }
            // if (au_choice_lesson[i] === void 0) {
            //   continue;
            // }
            if (au_choice_lesson[m_grade][k][3] == m_class[j]) {
              not_match = true;
            }
          }
        }
      }
    }
    if (m_continuous < pass_lesson[m_grade][i][5]) {
      not_match = true;
      break;
    }
    if (not_match == false) {
      match_class.push(i);
      continue;
    }
  }
  return match_class;
};

// 空いている連続時間に授業を入れる関数
var put_class = (p_grade, weekday, time, p_class, p_continuous) => {
  for (i = 0; i < p_continuous; i++) {
    if (pass_lesson[p_grade][p_class][3] <= pass_lesson[p_grade][p_class][4]) {
      break;
    }
    pass_timetable[p_grade][weekday][time + i] = pass_lesson[p_grade][p_class];
    pass_lesson[p_grade][p_class][4]++;
  }
};

function run_timetable() {
  let run_vacant = [];
  let run_continuous = 0;
  let run_find_class = [];
  let run_find_teacher = [];
  let run_match;
  let run_count = 0;
  let random = Math.floor(Math.random() * 169);
  let exit_count = 0;
  let err = false;
  loop: for (c = 0; c < pass_timetable.length; c++) {
    for (
      run_weekday = 0;
      run_weekday < pass_timetable[c].length;
      run_weekday++
    ) {
      for (
        run_time = 0;
        run_time < pass_timetable[c][run_weekday].length;
        run_time++
      ) {
        run_vacant = [];
        run_continuous = 0;
        run_find_class = [];
        run_find_teacher = [];
        run_match_class = [];
        run_match_teacher = [];
        run_match = [];
        run_vacant = vacant_timetable(pass_timetable, c, run_weekday, run_time);
        if (run_vacant[0] == 999) {
          continue;
        }
        run_continuous = continuous(
          pass_timetable,
          c,
          run_vacant[0],
          run_vacant[1]
        );
        for (f = 0; f < run_continuous; f++) {
          run_find_class[f] = find_class(
            pass_timetable,
            run_vacant[0],
            run_vacant[1] + f,
            c
          );
          run_find_teacher[f] = find_teacher(
            pass_timetable,
            run_vacant[0],
            run_vacant[1] + f,
            c
          );
        }
        run_match_class = run_find_class.reduce((pre, current) => {
          pre.push(...current);
          return pre;
        }, []);
        run_match_teacher = run_find_teacher.reduce((pre, current) => {
          pre.push(...current);
          return pre;
        }, []);
        run_match = match(
          run_match_teacher,
          run_match_class,
          c,
          run_continuous
        );
        if (!run_match.length) {
          continue;
        }
        put_class(
          c,
          run_vacant[0],
          run_vacant[1],
          run_match[(run_count + random) % run_match.length],
          run_continuous
        );
      }
    }
    if (run_count >= pass_lesson[c].length) {
      exit_count++;
      if (exit_count > 100) {
        err = true;
        break;
      }
      run_count = 0;
      for (i = 0; i < pass_lesson[c].length; i++) {
        if (pass_lesson[c][i][3] > pass_lesson[c][i][4]) {
          pass_timetable = JSON.parse(JSON.stringify(run_initial));
          pass_lesson = JSON.parse(JSON.stringify(lesson_initial));
          c = -1;
          random = Math.floor(Math.random() * 169);
          continue loop;
        }
      }
    }
    for (i = 0; i < pass_lesson[c].length; i++) {
      if (pass_lesson[c][i][3] > pass_lesson[c][i][4]) {
        run_count++;
        c--;
        continue loop;
      }
    }
  }
  return [pass_timetable, err];
}

function initialization() {
  pass_timetable = JSON.parse(JSON.stringify(run_initial));
  pass_lesson = JSON.parse(JSON.stringify(lesson_initial));
}

function count_lesson_list_alert(err = false) {
  const str = "エラーが発生しました\n";
  const msg = count_lesson_list();
  if (msg.trim() != "") {
    if (err) {
      alert(str + count_lesson_list());
    } else {
      alert(count_lesson_list());
    }
  }
}

function count_lesson_list() {
  const lsn_list = join_lesson_and_fixed();
  let msg = "";

  lsn_list.forEach((e, cls) => {
    let cls_name = class_list[cls];
    let flag = true;
    e.forEach((i) => {
      if (i[3] - i[4] != 0 && i[3] != 0) {
        if (flag) {
          msg += "\n" + cls_name + "\n";
          flag = false;
        }
        msg += `${get_lesson_name(cls, i[0])}が${
          i[3] - i[4] > 0 ? i[3] - i[4] : (i[3] - i[4]) * -1
        }${i[3] - i[4] > 0 ? "つ足りません" : "つ多く入っています"}\n`;
      }
    });
  });
  console.log(msg);
  return msg;
}

function get_lesson_name(cls, num) {
  const names = get_lesson_name_list();
  if (num >= 100) {
    return "選択授業" + (num - 99);
  } else {
    return names[cls][num];
  }
}
