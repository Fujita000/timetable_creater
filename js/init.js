//DOM取得
let class_name_text = getById("class_name_text");
let teacher_name_text = getById("teacher_name_text");
let room_name_text = getById("room_name_text");

let class_list_dom = getById("class_list");
let teacher_list_dom = getById("teacher_list");
let room_list_dom = getById("room_list");
let lesson_list_dom = getById("lesson_list");
let timetable_list_dom = getById("timetable_list");

let teacher_selectors = document.getElementsByClassName("teacher_select");
let room_selectors = document.getElementsByClassName("room_select");
// let lesson_cancel_btn = getById("lesson_cancel_btn");
// let now_select_dom = getById("now_select_dom");
// lesson_cancel_btn.addEventListener("click", e => {});

//ユーザデータ
let normal_lesson_list = [];
let elective_lesson_list = [];
let timetable = [];
let class_list = [];
let teacher_list = [""];
let room_list = [""];

let table_SizeX = 5;
let table_SizeY = 6;

function cts(x, y) {
  table_SizeX = x;
  table_SizeY = y;
}

//処理用
let now_choice_lesson = -1; //選択中の授業の内容
let now_choice_class = -1; //選択中のクラス
let elaser_flag = false; //消しゴム機能

function cell_click_event(e) {
  let q = parent_tag_search(e.target, "td");
  let d = get_td_coordinate(q);
  if (cell_change_flag) {
    cell_change_event(e);
  } else {
    if (now_choice_class == d[0] || elaser_flag) {
      timetable[d[0]][d[1]][d[2]] = now_choice_lesson;
      update_cell(d);
    }
  }
  z_color_chenge(d[2], d[1]);
}

function lesson_clear_btn(e) {
  let par = parentDom(parentDom(e));
  let suf1 = getIdNum(par, 0);
  now_choice_lesson = 0;
  now_choice_class = suf1;
}

function get_lesson_num_btn(e) {
  elaser_flag = false;
  cell_change_reset();
  let par = parentDom(e);
  let type = nodeSp(par)[0];
  let suf1 = getIdNum(par, 0);
  let suf2 = getIdNum(par, 1);
  update_lesson_list(par);
  now_choice_class = suf1;
  if (type == "normal") {
    now_choice_lesson = suf2;
  } else if (type == "elective") {
    now_choice_lesson = suf2 + 100;
  }

  update_timetable();
  all_color_change();
}

function get_ele_lesson_num_btn(e) {
  elaser_flag = false;
  cell_change_reset();
  let par = e.parentElement;
  let suf1 = getIdNum(par, 0);
  let suf2 = getIdNum(par, 1);
  now_choice_class = suf1;
  now_choice_lesson = suf2 + 100;
  update_timetable();
  all_color_change();
}

function update_lesson_list(par) {
  let type = nodeSp(par)[0];
  let suf1 = getIdNum(par, 0);
  let suf2 = getIdNum(par, 1);
  let suf3 = getIdNum(par, 2); //elective_lessonの時仕様
  if (type == "normal") {
    normal_lesson_list[suf1][suf2][0] = par.children[0].value;
    normal_lesson_list[suf1][suf2][1] =
      par.children[1].selectedIndex > -1 ? par.children[1].selectedIndex : "";
    normal_lesson_list[suf1][suf2][2] =
      par.children[2].selectedIndex > -1 ? par.children[2].selectedIndex : "";
    normal_lesson_list[suf1][suf2]["total"] = zt(par.children[3].value);
    normal_lesson_list[suf1][suf2]["continuity"] = zt(par.children[4].value);
  } else if (type == "elective") {
    const ele = document.querySelector(`#elective_lesson_list_${suf1}_${suf2}`);
    const total = ele.querySelector(".total").value;
    const conti = ele.querySelector(".continuity").value;
    elective_lesson_list[suf1][suf2][suf3][0] = par.children[0].value;
    elective_lesson_list[suf1][suf2][suf3][1] =
      par.children[1].selectedIndex > -1 ? par.children[1].selectedIndex : "";
    elective_lesson_list[suf1][suf2][suf3][2] =
      par.children[2].selectedIndex > -1 ? par.children[2].selectedIndex : "";
    elective_lesson_list[suf1][suf2]["total"] = zt(total);
    elective_lesson_list[suf1][suf2]["continuity"] = zt(conti);
  }
}

function update_lesson_list_all() {
  let li = getByClass("normal_lesson_list");
  for (let i = 0; i < li.length; i++) {
    for (let j = 0; j < li[i].children.length; j++) {
      update_lesson_list(li[i].children[j]);
    }
  }
  li = getByClass("elective_lesson_list");
  for (let i = 0; i < li.length; i++) {
    for (let j = 0; j < li[i].children.length; j++) {
      update_lesson_list(li[i].children[j]);
    }
  }
}

//val:テキストの値、list:追加先のリスト要素、arr:配列、change_event_name:変更用メソッドの名前、deleat_event_name:削除用メソッドの名前
function init_add_event(val, list, arr, change_event_name, deleat_event_name) {
  //配列追加
  arr.push(val);
  //HTML成形
  let div = creEle("div");
  div.id = list.id + "_" + (arr.length - 1);
  div.innerHTML =
    "<input onkeyup=" +
    change_event_name +
    "(this) value=" +
    val +
    ">" +
    "<button class='original_btn' onclick=" +
    deleat_event_name +
    "(this) tabindex='-1'>削除</button>";
  list.appendChild(div);
}
//val:テキストの値、
function lesson_list_add_event(val) {
  //配列追加
  normal_lesson_list.push([
    ["", 0, 0],
    //空の授業0を参照したときに使う
  ]);
  normal_lesson_list[normal_lesson_list.length - 1][0]["continuity"] = 0;
  normal_lesson_list[normal_lesson_list.length - 1][0]["total"] = 0;
  elective_lesson_list.push([]);
  //HTML成形
  let div = creEle("div");
  div.id = lesson_list_dom.id + "_" + (normal_lesson_list.length - 1);
  div.className = "lesson_list";
  div.innerHTML = `
    <br><p class='p_class_name linkname'>&lt;${val}&gt;</p>
    <p>授業
      <button onclick=normal_lesson_add_btn(this) class=a_btn>追加</button>
      <button onclick=lesson_clear_btn(this) class=d_btn>消しゴム</button>
    </p> 

    <div id='normal_${div.id}' class='normal_lesson_list'></div> 
    <p>選択授業
      <button onclick=elective_lesson_list_add_btn(this) class=a_btn>追加</button>
    </p> 
    <div id='elective_${div.id}' class='elective_lesson_list_list'></div>`;
  lesson_list_dom.appendChild(div);
}
function normal_lesson_add_event(val, parent) {
  //配列追加
  normal_lesson_list[val].push([]);
  //HTML成形
  let div = creEle("div");
  div.id =
    "normal_lesson_list_" + val + "_" + (normal_lesson_list[val].length - 1);
  div.innerHTML =
    '<input type="text" placeholder="授業" size="6" onkeyup="lesson_name_change_event(this)">' +
    '<select class="teacher_select" onchange="selecter_change_event(this)"></select>' +
    '<select class="room_select" onchange="selecter_change_event(this)"></select>' +
    '<input class="total"  type="number" placeholder="授業数" size="3">' +
    '<input class="continuity"  type="number" placeholder="連続時間" size="3">' +
    '<input type="button" class="get_lesson_num_btn" value="o" onclick="get_lesson_num_btn(this)">' +
    '<input type="button" value="削除" onclick="normal_lesson_deleat_btn(this)" class="original_btn" tabindex="-1">';
  div.querySelector(".total").addEventListener("input", (e) => {
    total_change_event(e);
  });
  div.querySelector(".continuity").addEventListener("input", (e) => {
    continuity_change_event(e);
  });
  div.getElementsByClassName("teacher_select")[0].innerHTML =
    selector_create(teacher_list).innerHTML;
  div.getElementsByClassName("room_select")[0].innerHTML =
    selector_create(room_list).innerHTML;

  getById("normal_lesson_list_" + val).appendChild(div);
  div.getElementsByClassName("get_lesson_num_btn")[0].click();
  return div;
}

function class_add_btn() {
  init_add_event(
    class_name_text.value,
    class_list_dom,
    class_list,
    "class_name_change_event",
    "class_deleat_btn"
  );
  lesson_list_add_event(class_name_text.value);
  add_operation_link_sidebar(class_name_text.value);
  add_class_timetable_sidebar(class_name_text.value);
  table_create(class_name_text.value);
  class_name_text.value = ""; //textを初期化
}

function teacher_add_btn() {
  init_add_event(
    teacher_name_text.value,
    teacher_list_dom,
    teacher_list,
    "teacher_name_change_event",
    "teacher_deleat_btn"
  );
  select_add("teacher_select", teacher_name_text.value);
  teacher_name_text.value = ""; //textを初期化
}

function room_add_btn() {
  init_add_event(
    room_name_text.value,
    room_list_dom,
    room_list,
    "room_name_change_event",
    "room_deleat_btn"
  );
  select_add("room_select", room_name_text.value);
  room_name_text.value = ""; //textを初期化
}

function normal_lesson_add_btn(e) {
  let parent = parent_class_search(e, "lesson_list");
  let ret = normal_lesson_add_event(getIdNum(parent), parent);
  add_lesson_timetable_sidebar(ret, "timetable_tab_normal_lesson");
}

function elective_lesson_list_add_btn(e) {
  let parent = parent_class_search(e, "lesson_list");
  let ret = elective_lesson_list_add_event(getIdNum(parent), parent);
  add_ele_lesson_timetable_sidebar(ret, "timetable_tab_elective_lesson");
}

function elective_lesson_add_btn(e) {
  let parent = parent_class_search(e, "elective_lesson_list");
  elective_lesson_add_event(getIdNum(parent, 0), getIdNum(parent, 1), parent);
}

function elective_lesson_list_add_event(val, parent) {
  //配列追加
  elective_lesson_list[val].push([]);
  elective_lesson_list[val][elective_lesson_list[val].length - 1]["total"] = 0;
  elective_lesson_list[val][elective_lesson_list[val].length - 1][
    "continuity"
  ] = 0;
  //HTML成形
  let div = creEle("div");
  div.id =
    "elective_lesson_list_" +
    val +
    "_" +
    (elective_lesson_list[val].length - 1);
  div.className = "elective_lesson_list";
  div.innerHTML =
    "<p>選択授業" +
    elective_lesson_list[val].length +
    "</p>" +
    '<input class="total" type="number"  placeholder="授業数" size="3">' +
    '<input class="continuity" type="number"  placeholder="連続時間" size="3">' +
    '<input type="button" value="時間決定" onclick="elective_lesson_time_enter(this)" class=time_btn>' +
    '<input type="button" class="get_lesson_num_btn" value="o" onclick="get_ele_lesson_num_btn(this)">' +
    '<input type="button" value="追加" onclick="elective_lesson_add_btn(this)" class="a_btn">' +
    '<input type="button" value="削除" onclick="elective_lesson_list_deleat_btn(this)" class="original_btn" tabindex="-1">';
  div.querySelector(".total").addEventListener("input", (e) => {
    total_change_event(e);
  });
  div.querySelector(".continuity").addEventListener("input", (e) => {
    continuity_change_event(e);
  });
  getById("elective_lesson_list_" + val).appendChild(div);
  return div;
}

function elective_lesson_time_enter(dom) {
  let parent = parent_class_search(dom, "elective_lesson_list");
  par = dom.parentElement;
  elective_lesson_list[getIdNum(parent, 0)][getIdNum(parent, 1)]["continuity"] =
    Number(par.getElementsByClassName("continuity")[0].value);
  elective_lesson_list[getIdNum(parent, 0)][getIdNum(parent, 1)]["total"] =
    Number(par.getElementsByClassName("total")[0].value);
}

function elective_lesson_add_event(val1, val2, parent) {
  //配列追加
  elective_lesson_list[val1][val2].push([]);
  //HTML成形
  let div = creEle("div");
  div.id = parent.id + "_" + (elective_lesson_list[val1][val2].length - 1);
  div.innerHTML =
    '<input type="text" placeholder="授業" size="6" onkeyup="lesson_name_change_event(this)">' +
    '<select class="teacher_select" onchange="selecter_change_event(this)"></select>' +
    '<select class="room_select" onchange="selecter_change_event(this)"></select>' +
    '<input type="button" class="get_lesson_num_btn" value="o" onclick="get_lesson_num_btn(this)">' +
    '<input type="button" value="削除" onclick="elective_lesson_deleat_btn(this)" class="original_btn" tabindex="-1">';
  div.getElementsByClassName("teacher_select")[0].innerHTML =
    selector_create(teacher_list).innerHTML;
  div.getElementsByClassName("room_select")[0].innerHTML =
    selector_create(room_list).innerHTML;
  getById("elective_lesson_list_" + val1 + "_" + val2).appendChild(div);
  div.getElementsByClassName("get_lesson_num_btn")[0].click();
  return div;
}

function table_create(class_name_text) {
  let len = timetable.length;
  let tx = table_SizeX;
  let ty = table_SizeY;
  timetable.push(new Array(ty));
  for (let y = 0; y < ty; y++) {
    timetable[len][y] = new Array(tx);
    for (let x = 0; x < tx; x++) {
      timetable[len][y][x] = 0;
    }
  }
  //タイトル生成
  let p = document.createElement("p");
  p.innerText = class_name_text;
  p.className = "table_name";
  //テーブル生成
  let tbl = document.createElement("table");
  tbl.id = "timetable_" + len;
  tbl.className = "timetable t-table";
  let tblBody = document.createElement("tbody");
  for (let y = 0; y < ty; y++) {
    let row = document.createElement("tr");
    for (let x = 0; x < tx; x++) {
      let cell = document.createElement("td");
      cell.innerHTML =
        "<ul>" + "<li></li>" + "<li></li>" + "<li></li>" + "</ul>";
      cell.setAttribute("class", y + "_" + x);
      cell.addEventListener("click", (e) => {
        cell_click_event(e);
        confirm_auto_create();
      });
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  let div = document.createElement("div");
  div.className = "newtable";
  div.appendChild(p);
  div.appendChild(tbl);
  timetable_list_dom.appendChild(div);
}

function selector_create(list) {
  let select = creEle("select");
  for (let i = 0; i < list.length; i++) {
    let opt = document.createElement("option");
    opt.textContent = list[i];
    select.appendChild(opt);
  }
  return select;
}

function selecter_updata() {
  let select = document.getElementsByClassName(select_class_name);
}

function select_add(select_class_name, add_opt) {
  let select = document.getElementsByClassName(select_class_name);
  for (let i = 0; i < select.length; i++) {
    let cre = document.createElement("option");
    cre.textContent = add_opt;
    select[i].appendChild(cre);
  }
}

function select_del(select_class_name, del_suffix) {
  let select = document.getElementsByClassName(select_class_name);
  for (let i = 0; i < select.length; i++) {
    select[i].children[del_suffix].remove();
  }
}

function select_chg(select_class_name, suf, insert_num) {
  let select = document.getElementsByClassName(select_class_name);
  for (let i = 0; i < select.length; i++) {
    select[i].children[suf].innerText = insert_num;
  }
}

function tmp_timetable_validate(cls_num, lsn_num, target) {
  // target:lessonまたはclass
  // 削除する対象を書く
  if (tmp_timetable != undefined) {
    switch (target) {
      case "lesson":
        const z = cls_num;
        for (let y = 0; y < tmp_timetable[z].length; y++) {
          for (let x = 0; x < tmp_timetable[z][y].length; x++) {
            if (tmp_timetable[z][y][x] == lsn_num) {
              tmp_timetable[z][y][x] = 0;
            } else if (tmp_timetable[z][y][x] > lsn_num) {
              if (lsn_num >= 100 && tmp_timetable[z][y][x] >= 100) {
                tmp_timetable[z][y][x]--;
              } else if (lsn_num < 100 && tmp_timetable[z][y][x] < 100) {
                tmp_timetable[z][y][x]--;
              }
            }
          }
        }
        break;
      case "class":
        tmp_timetable.splice(cls_num, 1);
        break;
    }
  }
}

function class_deleat_btn(e) {
  let num = pareSp(e)[2];
  tmp_timetable_validate(num, 0, "class");
  class_deleat_event(e);
  del_operation_link_sidebar(e);
  del_class_timetable_sidebar(e);
  init_deleat_event(e, class_list);
  rewrite_list_id("class_list", 0);
  let ret = rewrite_list_id("lesson_list", 0);
  for (let i = 0; i < ret.length; i++) {
    let normal_lesson = ret[i].getElementsByClassName("normal_lesson_list")[0];
    let elective_lesson = ret[i].getElementsByClassName(
      "elective_lesson_list_list"
    )[0];
    normal_lesson.id = "normal_lesson_list_" + i;
    elective_lesson.id = "elective_lesson_list_" + i;
    rewrite_list_id(normal_lesson.id, 1);
    let ret_ele = rewrite_list_id(elective_lesson.id, 0);
    for (let i = 0; i < ret_ele.length; i++) {
      let val1 = getIdNum(ret_ele[i], 0);
      let val2 = getIdNum(ret_ele[i], 1);
      rewrite_list_id("elective_lesson_list_" + val1 + "_" + val2, 0);
    }
  }
  dlt_use_functon();
}

function teacher_deleat_btn(e) {
  let num = init_deleat_event(e, teacher_list);
  rewrite_list_id("teacher_list", 1);
  select_del("teacher_select", num);
  dlt_use_functon();
}

function room_deleat_btn(e) {
  let num = init_deleat_event(e, room_list);
  rewrite_list_id("room_list", 1);
  select_del("room_select", num);
  dlt_use_functon();
}

function normal_lesson_deleat_btn(e) {
  let parent = parentDom(e);
  let big_parent = parentDom(parent);
  tmp_timetable_validate(getIdNum(parent, 0), getIdNum(parent, 1), "lesson");
  lesson_deleat_event(
    e,
    normal_lesson_list[getIdNum(parent, 0)],
    1,
    getIdNum(parent, 0)
  );
  rewrite_list_id(big_parent.id, 1);
  del_lesson_timetable_sidebar(e, "timetable_tab_normal_lesson");
  dlt_use_functon();
}

function elective_lesson_list_deleat_btn(e) {
  let parent = e.parentElement;
  let big_parent = e.parentElement.parentElement;
  tmp_timetable_validate(
    getIdNum(parent, 0),
    getIdNum(parent, 1) + 100,
    "lesson"
  );
  lesson_deleat_event(
    e,
    elective_lesson_list[getIdNum(parent, 0)],
    1,
    getIdNum(parent, 0)
  );
  // 番号の再割り当て
  let ret = rewrite_list_id(big_parent.id, 0);
  let ps = big_parent.getElementsByTagName("p");
  for (let i = 0; i < ps.length; i++) ps[i].textContent = "選択授業" + (i + 1);
  for (let i = 0; i < ret.length; i++) {
    let val1 = getIdNum(ret[i], 0);
    let val2 = getIdNum(ret[i], 1);
    rewrite_list_id("elective_lesson_list_" + val1 + "_" + val2, 0);
  }
  del_ele_lesson_timetable_sidebar(e, "timetable_tab_elective_lesson");
  dlt_use_functon();
}

function elective_lesson_deleat_btn(e) {
  let val1 = getIdNum(parentDom(e), 0);
  let val2 = getIdNum(parentDom(e), 1);
  lesson_deleat_event(e, elective_lesson_list[val1][val2], 2);
  rewrite_list_id("elective_lesson_list_" + val1 + "_" + val2, 0);
  dlt_use_functon();
}

function init_deleat_event(btn, arr) {
  //ボタンの親の番号取得
  let num = pareSp(btn)[2];
  //配列から削除
  arr.splice(num, 1);
  //HTMLを削除
  btn.parentElement.remove();
  return num;
}

function lesson_deleat_event(btn, arr, suf, cls_num) {
  //ボタンの親の番号取得
  let num = getIdNum(parentDom(btn), suf);
  //配列から削除
  arr.splice(num, 1);
  //timetable変数から削除
  if (cls_num != undefined) {
    if (nodeSp(parentDom(btn))[0] == "normal") {
      deleat_timetable(cls_num, num);
    } else if (nodeSp(parentDom(btn))[0] == "elective") {
      deleat_timetable(cls_num, num + 100);
    }
  }
  //HTMLを削除
  btn.parentElement.remove();
  return num;
}

function class_deleat_event(btn) {
  //ボタンの親の番号取得
  let num = pareSp(btn)[2];
  //配列から削除
  normal_lesson_list.splice(num, 1);
  elective_lesson_list.splice(num, 1);
  timetable.splice(num, 1);
  //HTMLを削除
  getById("timetable_" + num).parentElement.remove();
  rewrite_table_id();
  getById("lesson_list_" + num).remove();
}

function rewrite_table_id() {
  let target = document.getElementById("timetable_list");
  let tables = target.getElementsByTagName("table");
  let ret = [];
  for (let i = 0; i < tables.length; i++) {
    if (parentDom(parentDom(tables[i])) == target) {
      tables[i].id = "timetable_" + i;
      ret.push(tables[i]);
    }
  }
  return ret;
}
