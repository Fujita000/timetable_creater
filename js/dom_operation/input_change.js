//変更するときはセレクタの数値から取得して変更する
function class_name_change_event(e) {
  //リスト配列の変更
  let suf = getIdNum(parentDom(e), 0);
  class_list[suf] = parentDom(e).children[0].value;
  //HTMLの変更
  let dom = getById("lesson_list_" + suf);
  dom.getElementsByClassName("p_class_name")[0].innerText =
    "<" + class_list[suf] + ">";
  timetable_list_dom.getElementsByClassName("table_name")[suf].innerText =
    class_list[suf];
  rewrite_name_operation_link_sidebar(suf);
  rewrite_class_name_timetable_sidebar(suf);
}

function teacher_name_change_event(e) {
  //リスト配列の変更
  let suf = getIdNum(parentDom(e), 0);
  teacher_list[suf] = parentDom(e).children[0].value;
  //HTMLの変更
  select_chg("teacher_select", suf, teacher_list[suf]);
  chenge_now_lesson_count_All("teacher");
  //後処理
  update_timetable();
  all_color_change();
}

function room_name_change_event(e) {
  //リスト配列の変更
  let suf = getIdNum(parentDom(e), 0);
  room_list[suf] = parentDom(e).children[0].value;
  //HTMLの変更
  select_chg("room_select", suf, room_list[suf]);
  chenge_now_lesson_count_All("room");

  //後処理
  update_timetable();
  all_color_change();
}

function lesson_name_change_event(e) {
  let val1 = getIdNum(e.parentElement, 0);
  let val2 = getIdNum(e.parentElement, 1);
  if (pareSp(e)[0] == "normal") {
    normal_lesson_list[val1][val2][0] = e.value;
    rewrite_lesson_name_timetable_sidebar(val1, val2);
  } else if (pareSp(e)[0] == "elective") {
    let val3 = getIdNum(e.parentElement, 2);
    elective_lesson_list[val1][val2][val3][0] = e.value;
  }
  update_timetable();
}

function selecter_change_event(e) {
  e.parentElement.getElementsByClassName("get_lesson_num_btn")[0].click();
  if (e.classList.contains("room_select")) {
    chenge_now_lesson_count_All("room");
  } else if (e.classList.contains("teacher_select")) {
    chenge_now_lesson_count_All("teacher");
  }
}

function total_change_event(e) {
  e = e.target;
  let val1 = getIdNum(e.parentElement, 0);
  let val2 = getIdNum(e.parentElement, 1);
  if (pareSp(e)[0] == "normal") {
    normal_lesson_list[val1][val2]["total"] = Number(e.value);
  } else if (pareSp(e)[0] == "elective") {
    elective_lesson_list[val1][val2]["total"] = Number(e.value);
  }
  chenge_now_lesson_count_All("room");
  chenge_now_lesson_count_All("teacher");
}

function continuity_change_event(e) {
  e = e.target;
  let val1 = getIdNum(e.parentElement, 0);
  let val2 = getIdNum(e.parentElement, 1);
  if (pareSp(e)[0] == "normal") {
    normal_lesson_list[val1][val2]["continuity"] = Number(e.value);
  } else if (pareSp(e)[0] == "elective") {
    elective_lesson_list[val1][val2]["continuity"] = Number(e.value);
  }
}
