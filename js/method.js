//id検索
function getById(id) {
  return document.getElementById(id);
}

//class検索
function getByClass(cls) {
  return document.getElementsByClassName(cls);
}

//tag検索
function getByTag(tag) {
  return document.getElementsByTagName(tag);
}

//DOM作成
function creEle(tag) {
  return document.createElement(tag);
}

//親取得
function parentDom(dom) {
  return dom.parentElement;
}

//親のIDを”_”で分割
function pareSp(dom) {
  return dom.parentElement.id.split("_");
}

//IDを”_”で分割
function nodeSp(dom) {
  return dom.id.split("_");
}

//Classを”_”で分割
function nodeSpCls(dom) {
  return dom.className.split("_");
}

//親に特定のクラスがあるか検索
function parent_class_search(dom, class_name) {
  if (dom.className == class_name) {
    return dom;
  } else if (dom.tagName == "BODY") {
    return null;
  } else {
    return parent_class_search(parentDom(dom), class_name);
  }
}

//そのタグ含む親に特定のタグがあるか検索
function parent_tag_search(dom, tag_name) {
  if (dom.tagName == tag_name.toUpperCase()) {
    return dom;
  } else if (dom.tagName == "BODY") {
    return null;
  } else {
    return parent_tag_search(parentDom(dom), tag_name);
  }
}

//IDの番号を取得、指定がない時は最後の番号、指定は0から
function getIdNum(dom, num) {
  if (num == undefined) {
    return Number(nodeSp(dom).slice(-1)[0]);
  } else {
    let tmp = nodeSp(dom);
    let suf = 0;
    for (let i = 0; i < tmp.length; i++) {
      if (!isNaN(tmp[i])) {
        suf = i;
        break;
      }
    }
    return Number(nodeSp(dom)[0 + suf + num]);
  }
}

//Classの番号を取得、指定がない時は最後の番号、指定は0から
function getClsNum(dom, num) {
  if (num == undefined) {
    return nodeSpCls(dom).slice(-1)[0];
  } else {
    let tmp = nodeSpCls(dom);
    let suf = 0;
    for (let i = 0; i < tmp.length; i++) {
      if (!isNaN(tmp[i])) {
        suf = i;
        break;
      }
    }
    return Number(nodeSpCls(dom)[0 + suf + num]);
  }
}

//console.logの短縮
function log(str) {
  console.log(str);
}

//テーブルDOMの指定された座標の要素を返す
function get_cell(z, y, x) {
  let dom = document.querySelector("#timetable_" + z);
  return dom.getElementsByClassName(y + "_" + x)[0];
}

//テーブルDOMの指定された座標の要素を更新する。
function update_cell(arr) {
  let z = arr[0];
  let y = arr[1];
  let x = arr[2];
  let dom = get_cell(z, y, x);
  let lesson = get_lesson_status(z, timetable[z][y][x]);
  lesson = trans_after_lesson([z, timetable[z][y][x], lesson[1], lesson[2]]);
  dom.innerHTML =
    "<ul>" +
    "<li>" +
    lesson[0] +
    "</li>" +
    "<li>" +
    lesson[1] +
    "</li>" +
    "<li>" +
    lesson[2] +
    "</li>" +
    "</ul>";
}

//指定したセルの要素を変更する。
function set_cell_dom(dom) {
  let d = get_td_coordinate(dom);
  let z = d[0];
  let y = d[1];
  let x = d[2];
  let lesson = get_lesson_status(z, y);
  dom.innerHTML =
    "<ul>" +
    "<li>" +
    lesson[0] +
    "</li>" +
    "<li>" +
    lesson[1] +
    "</li>" +
    "<li>" +
    lesson[2] +
    "</li>" +
    "</ul>";
}

//z：学年、num：授業番号、numが100以上の時は選択授業
function get_lesson_status(z, num) {
  let ret = ["", 0, 0];
  if (num >= 100) {
    //選択授業の時
    ret[0] = "選択授業" + (num - 100 + 1);
  } else {
    ret[0] = normal_lesson_list[z][num][0];
    ret[1] = normal_lesson_list[z][num][1];
    ret[2] = normal_lesson_list[z][num][2];
  }
  return ret;
}

//z：学年、num：授業番号、numが100以上の時は選択授業
function get_lesson_contents(z, num) {
  return num >= 100
    ? elective_lesson_list[z][num - 100]
    : normal_lesson_list[z][num];
}

//tdタグのクラスから数値をとる
function get_td_coordinate(dom) {
  let idz = getIdNum(parent_tag_search(dom, "table"));
  let idy = getClsNum(parent_tag_search(dom, "td"), 0);
  let idx = getClsNum(parent_tag_search(dom, "td"), 1);
  return [idz, idy, idx];
}

//何か配列から消すときに関数の最後に使用する
function dlt_use_functon() {
  now_choice_class = -1;
  now_choice_lesson = -1;
  update_lesson_list_all();
  update_timetable();
  chenge_now_lesson_count_All("room");
  chenge_now_lesson_count_All("teacher");
}

function update_specific_timetable(num) {
  for (let z = 0; z < timetable.length; z++) {
    for (let y = 0; y < timetable[z].length; y++) {
      for (let x = 0; x < timetable[z][y].length; x++) {
        if (timetable[z][y][x] == num) update_cell([z, y, x]);
      }
    }
  }
}

function update_timetable() {
  for (let z = 0; z < timetable.length; z++) {
    for (let y = 0; y < timetable[z].length; y++) {
      for (let x = 0; x < timetable[z][y].length; x++) {
        update_cell([z, y, x]);
      }
    }
  }
}

//特定のクラスの特定の授業番号を0にする（授業の削除を行う）cls：クラス番号、num：授業番号
//そしてその授業番号より上の数値を-１する。
function deleat_timetable(cls, num) {
  for (let y = 0; y < timetable[cls].length; y++) {
    for (let x = 0; x < timetable[cls][y].length; x++) {
      if (num >= 100) {
        if (timetable[cls][y][x] == num) {
          timetable[cls][y][x] = 0;
        } else if (timetable[cls][y][x] > num) {
          timetable[cls][y][x]--;
        }
      } else {
        if (timetable[cls][y][x] == num) {
          timetable[cls][y][x] = 0;
        } else if (timetable[cls][y][x] > num && timetable[cls][y][x] < 100) {
          timetable[cls][y][x]--;
        }
      }
    }
  }
}

function rewrite_list_id(target_id, start_num) {
  let target = document.getElementById(target_id);
  let divs = target.getElementsByTagName("div");
  let suf = start_num;
  let ret = [];
  for (let i = 0; i < divs.length; i++) {
    if (parentDom(divs[i]) == target) {
      divs[i].id = target_id + "_" + suf;
      ret.push(divs[i]);
      suf++;
    }
  }
  return ret;
}

//タイムテーブルに被りがあるとき文字の色を赤にする
function z_color_chenge(x, y) {
  for (let z = 0; z < timetable.length; z++) {
    let tmp = check_timetable(x, y, z);
    let cell = get_cell(z, y, x);
    if (cell != undefined) {
      let cell_li = cell.getElementsByTagName("li");
      toggle_cell_color(cell_li[0], tmp[0]);
      toggle_cell_color(cell_li[1], tmp[1]);
      toggle_cell_color(cell_li[2], tmp[2]);
    }
    tmp_status = check_timetable_status_output(x, y, z);
    if (cell != undefined) {
      let cell_li = cell.getElementsByTagName("li");
      if (tmp[1]) cell_li[1].innerText = tmp_status[1];
      if (tmp[2]) cell_li[2].innerText = tmp_status[2];
    }
  }
}

function toggle_cell_color(dom, tmp) {
  if (tmp) {
    dom.className = "toggle_cell_red";
  } else {
    dom.className = "toggle_cell_black";
  }
}

function all_color_change() {
  for (let y = 0; y < timetable[0].length; y++) {
    for (let x = 0; x < timetable[0][y].length; x++) {
      z_color_chenge(x, y);
    }
  }
}

//タイムテーブルの被りを調べる
function check_timetable(sx, sy, sz) {
  const is_range = (z, y, x) => {
    return timetable[z][y] != undefined && timetable[z][y][x] != undefined;
  };
  let ret = [false, false, false];
  for (let z = 0; z < timetable.length; z++) {
    if (
      is_range(sz, sy, sx) &&
      is_range(z, sy, sx) &&
      z != sz &&
      timetable[sz][sy][sx] != 0
    ) {
      ret = comparison_lesson(
        z,
        timetable[z][sy][sx],
        sz,
        timetable[sz][sy][sx],
        ret
      );
    }
  }
  if (
    is_range(sz, sy, sx) &&
    timetable[sz][sy][sx] >= 100 &&
    (ret[1] || ret[2])
  )
    ret[0] = true;
  return ret;
}

function check_timetable_status_output(sx, sy, sz) {
  const is_range = (z, y, x) => {
    return timetable[z][y] != undefined && timetable[z][y][x] != undefined;
  };
  let ret = [false, false, false];
  for (let z = 0; z < timetable.length; z++) {
    if (
      is_range(sz, sy, sx) &&
      is_range(z, sy, sx) &&
      z != sz &&
      timetable[sz][sy][sx] != 0
    ) {
      ret = comparison_ele_lesson_status(
        z,
        timetable[z][sy][sx],
        sz,
        timetable[sz][sy][sx]
      );
    }
  }
  if (
    is_range(sz, sy, sx) &&
    timetable[sz][sy][sx] >= 100 &&
    (ret[1] || ret[2])
  )
    ret[0] = true;
  return ret;
}

function comparison_lesson(
  cls1,
  lsn_num1,
  cls2,
  lsn_num2,
  ret = [false, false, false]
) {
  let lesson1 = get_lesson_contents(cls1, lsn_num1);
  let lesson2 = get_lesson_contents(cls2, lsn_num2);
  if (lsn_num1 < 100) lesson1 = [lesson1];
  if (lsn_num2 < 100) lesson2 = [lesson2];
  for (let i = 0; i < lesson1.length; i++) {
    for (let j = 0; j < lesson2.length; j++) {
      // if (lesson1[i][0] == lesson2[j][0]) ret[0] = true;
      if (lesson1[i][1] != "" && lesson1[i][1] == lesson2[j][1]) ret[1] = true;
      if (lesson1[i][2] != "" && lesson1[i][2] == lesson2[j][2]) ret[2] = true;
    }
  }
  return ret;
}

function comparison_ele_lesson_status(cls1, lsn_num1, cls2, lsn_num2) {
  let ret = ["", "", ""];
  let lesson1 = get_lesson_contents(cls1, lsn_num1);
  let lesson2 = get_lesson_contents(cls2, lsn_num2);
  let tmp_arr = [[],[]];//[0]:教師,[1]:教室


  if (lsn_num1 < 100) lesson1 = [lesson1];
  if (lsn_num2 < 100) lesson2 = [lesson2];
  for (let i = 0; i < lesson1.length; i++) {
    for (let j = 0; j < lesson2.length; j++) {
      let pushFlagP = true;//教師フラグ
      let pushFlagR = true;//教室フラグ
      
      tmp_arr[0].forEach(l=>{
        if(l == lesson1[i][1])pushFlagP = false;
      })
      tmp_arr[1].forEach(l=>{
        if(l == lesson1[i][2])pushFlagR = false;
      })
      
      if (lesson1[i][1] != "" && lesson1[i][1] == lesson2[j][1] && pushFlagP){
        tmp_arr[0].push(lesson1[i][1]);
      }
      if (lesson1[i][2] != "" && lesson1[i][2] == lesson2[j][2] && pushFlagR){
        tmp_arr[1].push(lesson1[i][2]);
      }
    }
  }
  tmp_arr[0].forEach(i=>{
    ret[1] += tgt(i) + "・";
  })
  tmp_arr[1].forEach(i=>{
    ret[2] += tgr(i) + "・";
  })
  ret[1] = ret[1].slice(0, -1);
  ret[2] = ret[2].slice(0, -1);
  return ret;
}

//番号を変換して先生名を取得する
function tgt(num) {
  return teacher_list[num] == undefined ? "" : teacher_list[num];
}

//番号を変換して教室名を取得する
function tgr(num) {
  return room_list[num] == undefined ? "" : room_list[num];
}

//学級番号と授業番号を変換して通常授業名を取得する
function ntgsn(cls, num) {
  return normal_lesson_list[cls][num][0] == undefined
    ? ""
    : normal_lesson_list[cls][num][0];
}

//学級番号と授業番号を変換して選択授業名を取得する
function etgsn(cls, num) {
  return elective_lesson_list[cls][num][0] == undefined
    ? ""
    : elective_lesson_list[cls][num][0];
}

//学級番号、授業番号、教師番号、教室番号を変換して授業の文字データを取得する
function trans_after_lesson([cls, num, teacher, room]) {
  num = zt(num);
  teacher = zt(teacher);
  room = zt(room);
  let name = num < 100 ? ntgsn(cls, num) : "選択授業" + (num - 99);
  return [name, tgt(teacher), tgr(room)];
}

//zero trans 文字列を0に変換する
function zt(num) {
  return isNaN(Number(num)) ? 0 : Number(num);
}
