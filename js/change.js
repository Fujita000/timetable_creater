//変更するときはセレクタの数値から取得して変更する
function class_change_btn(e) {
  //リスト配列の変更
  let suf = getIdNum(parentDom(e),0);
  class_list[suf] = parentDom(e).children[0].value;
  //HTMLの変更
  let dom = getById("lesson_list_"+suf);
  dom.getElementsByClassName("p_class_name")[0].innerText = "クラス："+class_list[suf];
  timetable_list_dom.getElementsByClassName("table_name")[0].innerText = class_list[suf];
  rewrite_name_operation_link_sidebar(suf);
  rewrite_class_name_timetable_sidebar(suf);
}

function teacher_change_btn(e) {
  //リスト配列の変更
  let suf = getIdNum(parentDom(e),0);
  teacher_list[suf] = parentDom(e).children[0].value;
  //HTMLの変更
  select_chg("teacher_select", suf, teacher_list[suf]);
  //後処理
  update_timetable();
  all_color_change();
}


function room_change_btn(e) {
  //リスト配列の変更
  let suf = getIdNum(parentDom(e),0);
  room_list[suf] = parentDom(e).children[0].value;
  //HTMLの変更
  select_chg("room_select", suf, room_list[suf]);
  //後処理
  update_timetable();
  all_color_change();
}

function lesson_change_btn(e) {
  get_lesson_num_btn(e);
}
