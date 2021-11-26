let timetable_sidebar = document.getElementById('timetable_link_sidebar');
//timetable_sliderにプログラムで追加される要素のtimetable_slider子要素での開始番号
//timetable_link_sidebar直下の要素数を変更したときに一緒に変更
let start_num = 1;


//ーーーーーーーークラス系の処理

//時間割タブのクラス追加
function add_class_timetable_sidebar(val) {
  let div = document.createElement("div");
  let div_child = document.createElement("div");
  let p = document.createElement("p");
  p.className = "timetable_tab_class";
  p.innerText = val;
  timetable_sidebar.appendChild(div);
  div.appendChild(div_child);
  div_child.appendChild(p);
  let normal = document.createElement("div");
  let elective = document.createElement("div");
  normal.className = "timetable_tab_normal_lesson";
  elective.className = "timetable_tab_elective_lesson";
  div.appendChild(normal);
  div.appendChild(elective);
}

function del_class_timetable_sidebar(btn) {
  let num = pareSp(btn)[2];
  timetable_sidebar.children[Number(start_num) + Number(num)].remove();
  // rewrite_class_id_timetable_sidebar();
}
function rewrite_class_name_timetable_sidebar(suf) {
  timetable_sidebar.children[start_num + suf].children[0].children[0].innerText = class_list[suf];
}
//ーーーーーーーークラス系の処理ここまで

//ーーーーーーーー授業系の処理

function add_lesson_timetable_sidebar(div, tar) {
  let p = document.createElement("p");
  p.className = "mdl-navigation__link";
  p.innerText = div.children[0].value;
  timetable_sidebar.children[start_num + getIdNum(div, 0)].getElementsByClassName(tar)[0].appendChild(p);
  p.addEventListener("click", e => {
    div.getElementsByClassName("get_lesson_num_btn")[0].click();
  });
}

function add_ele_lesson_timetable_sidebar(div, tar) {
  let num = getIdNum(div, 1);
  let p = document.createElement("p");
  p.className = "mdl-navigation__link";
  p.innerText = "選択授業" + (num + 1);
  timetable_sidebar.children[start_num + getIdNum(div, 0)].getElementsByClassName(tar)[0].appendChild(p);
  p.addEventListener("click", e => {
    div.getElementsByClassName("get_lesson_num_btn")[0].click();
  });
}

function del_lesson_timetable_sidebar(btn, tar) {
  let val1 = getIdNum(btn.parentElement, 0);
  let val2 = getIdNum(btn.parentElement, 1);
  timetable_sidebar.children[start_num + val1].getElementsByClassName(tar)[0].children[val2 - 1].remove();
}

function del_ele_lesson_timetable_sidebar(btn, tar) {
  let val1 = getIdNum(btn.parentElement, 0);
  let val2 = getIdNum(btn.parentElement, 1);
  let list = timetable_sidebar.children[start_num + val1].getElementsByClassName(tar)[0];
  list.children[val2].remove();
  for (let i = 0; i < list.children.length; i++) {
    list.getElementsByTagName("p")[i].innerText = "選択授業" + (i + 1);
  }
}

//授業名の変更は普通授業でしか起きない
function rewrite_lesson_name_timetable_sidebar(suf1, suf2) {
  timetable_sidebar.children[start_num + suf1].getElementsByClassName("timetable_tab_normal_lesson")[0].children[suf2 - 1].innerText = normal_lesson_list[suf1][suf2][0];
}

//ーーーーーーーー授業系の処理の処理ここまで

//ーーーーーーーーその他
//時間割タブの消しゴム
let timetable_sidebar_eraser = document.getElementById("timetable_sidebar_eraser");
timetable_sidebar_eraser.addEventListener("click", e => {
  now_choice_lesson = 0;
  now_choice_class = 0;
  elaser_flag = true;
  cell_change_reset();
  // add_selected(e.target);
});


function add_selected(e) {
  const selected = document.querySelector("selected");
  if (selected != null) selected.classList.toggle("selected");
  e.classList.toggle("selected", true);
}

function select_reset() {
  const selected = document.querySelector("selected");
  if (selected != null) selected.classList.toggle("selected");
}
