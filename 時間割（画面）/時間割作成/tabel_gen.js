let setval_suffix = document.getElementById("suffix");

let btn = document.getElementById("btn");
let open_log = document.getElementById("open_log");
let inx = document.getElementById("inx");
let iny = document.getElementById("iny");
let inz = document.getElementById("inz");

let lesson_list_dom = document.getElementById("lesson_list");
let lesson_list = [];

let now_choice_ele = document.getElementById("now_choice_ele");
let add_choice_lesson = document.getElementById("lesson_add");
add_choice_lesson.addEventListener("click", e => {
  let div = document.createElement("div");
  div.id = "lesson_" + lesson_list.length;
  div.innerHTML =
    '<input type="text" placeholder="授業" size="6">' +
    '<select class="teacher_select"></select>' +
    '<select class="lesson_room_select"></select>' +
    '<input type="button" value="o" onclick="get_lesson(this)">';
  for (let j = 0; j < teacher_list.length; j++) {
    let create1 = document.createElement("option");
    create1.textContent = teacher_list[j];
    div.querySelectorAll("select")[0].appendChild(create1);
  }
  for (let j = 0; j < lesson_room_list.length; j++) {
    let create1 = document.createElement("option");
    create1.textContent = lesson_room_list[j];
    div.querySelectorAll("select")[1].appendChild(create1);
  }
  lesson_list_dom.appendChild(div);
  lesson_list.push([]);
});

let cancel_choice_lesson = document.getElementById("lesson_cancel");
cancel_choice_lesson.addEventListener("click", e => {
  nce("");
});
let get_ele = ["", , , , ]; //選択中、cellの内容

function nce(str, x, y, z) {
  if (get_ele[0] == "cell" && str == "cell" && get_ele[3] == z) {
    let tmp = [...timetable[get_ele[3]][get_ele[2]][get_ele[1]]];
    timetable[get_ele[3]][get_ele[2]][get_ele[1]] = timetable[z][y][x];
    timetable[z][y][x] = tmp;
    set_cell(x, y, z);
    set_cell(get_ele[1], get_ele[2], get_ele[3]);
    z_color_chenge(x, y);
    z_color_chenge(get_ele[1], get_ele[2]);
    get_ele = ["", , , , ];
  } else {
    get_ele = ["", , , , ];
    switch (str) {
      case "cell":
        get_ele[0] = "cell";
        get_ele[1] = x;
        get_ele[2] = y;
        get_ele[3] = z;
        break;
      case "lesson":
        get_ele[0] = "lesson";
        break;
    }
  }
  now_choice_ele.textContent = "選択中：" + get_ele[0];
}

let now_choice_lesson = ["", "", ""];

function get_lesson(dom) {
  let lesson = dom.parentElement;
  console.log(lesson.children[1].selectedIndex);
  now_choice_lesson[0] = lesson.children[0].value;
  if (lesson.children[1].selectedIndex > -1) {
    now_choice_lesson[1] = lesson.children[1].options[lesson.children[1].selectedIndex].value;
  } else {
    now_choice_lesson[1] = "";
  }
  if (lesson.children[2].selectedIndex > -1) {
    now_choice_lesson[2] = lesson.children[2].options[lesson.children[2].selectedIndex].value;
  } else {
    now_choice_lesson[2] = "";
  }
  nce("lesson");
}

let tx = 0;
let ty = 0;
let tz = 0;

let timetable;
//for(let z = 0; z < tz; z++) {
//  for (let y = 0; y < ty; y++) {
//    for (let x = 0; x < tx; x++) {
//    }
//  }
//}
open_log.addEventListener("click", e => {
  console.log(timetable);
});
btn.addEventListener("click", e => {
  tx = inx.value;
  ty = iny.value;
  tz = inz.value;
  timetable = new Array(tz);
  for (let z = 0; z < tz; z++) {
    timetable[z] = new Array(ty);
    for (let y = 0; y < ty; y++) {
      timetable[z][y] = new Array(tx);
      for (let x = 0; x < tx; x++) {

        timetable[z][y][x] = ["名前" + z + "-" + y + "-" + x, "教室" + z + "-" + y + "-" + x, "教師" + z + "-" + y + "-" + x];
      }
    }
  }

  //テーブル生成
  var body = document.getElementsByTagName("body")[0];
  for (var z = 0; z < tz; z++) {
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var y = 0; y < ty; y++) {
      var row = document.createElement("tr");
      for (var x = 0; x < tx; x++) {
        var cell = document.createElement("td");
        cell.innerHTML =
          "<ul>" +
          "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][0] + "</li>" +
          "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][1] + "</li>" +
          "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][2] + "</li>" +
          "</ul>";
        cell.setAttribute("class", z + "-" + y + "-" + x);
        cell.addEventListener("click", e => {
          cell_click_event(e);
        });
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
  }
  //テーブル生成ここまで
});

//セルをクリックしたときのイベント
function cell_click_event(e) {
  let get_class = e.target.className;
  let idx = Number(get_class.split('-')[2]);
  let idy = Number(get_class.split('-')[1]);
  let idz = Number(get_class.split('-')[0]);
  if (get_ele[0] == "lesson") {
    timetable[idz][idy][idx] = [...now_choice_lesson];
    set_cell(idx, idy, idz);
  } else {
    nce("cell", idx, idy, idz);
  }
  z_color_chenge(idx, idy);
}

//タイムテーブルの被りを調べる
function check_timetable(sx, sy, sz, suf) {
  let flag = false;
  for (let z = 0; z < timetable.length; z++) {
    if (z != sz && timetable[z][sy][sx][suf] == timetable[sz][sy][sx][suf]) {
      flag = true;
    }
  }
  return flag;
}


//select系

let teacher_list_dom = document.getElementById("teacher_list");
let teacher_add_dom = document.getElementById("teacher_add");
let teacher_text_dom = document.getElementById("teacher_text");
let lesson_room_list_dom = document.getElementById("lesson_room_list");
let lesson_room_add_dom = document.getElementById("lesson_room_add");
let lesson_room_text_dom = document.getElementById("lesson_room_text");

let teacher_list = [];
let lesson_room_list = [];

function teacher_del(dom) {
  dom.parentElement.remove();
  teacher_selector_del(Number(dom.parentElement.id.split("_")[1]));
}

teacher_add_dom.addEventListener("click", e => {
  let div = document.createElement("div");
  div.id = "teacher_" + teacher_list.length;
  div.innerHTML =
    "<input value=" + teacher_text_dom.value + ">" +
    "<button onclick=teacher_del(this)>削除</button>";
  teacher_list_dom.appendChild(div);
  teacher_selector_add(teacher_text_dom.value);
  teacher_list.push(teacher_text_dom.value);
});

function lesson_room_del(dom) {
  dom.parentElement.remove();
  lesson_room_selector_del(Number(dom.parentElement.id.split("_")[1]));
}

lesson_room_add_dom.addEventListener("click", e => {
  let div = document.createElement("div");
  div.id = "lessonroom_" + lesson_room_list.length;
  div.innerHTML =
    "<input value=" + lesson_room_text_dom.value + ">" +
    "<button onclick=lesson_room_del(this)>削除</button>";
  lesson_room_list_dom.appendChild(div);
  lesson_room_selector_add(lesson_room_text_dom.value);
  lesson_room_list.push(lesson_room_text_dom.value);
});


function lesson_room_selector_set() {
  let lesson_room_selects = document.querySelectorAll(".lesson_room_select");
  for (let i = 0; i < lesson_room_selects.length; i++) {
    lesson_room_selects[i].innerHTML = "";
    for (let j = 0; j < lesson_room_list.length; j++) {
      let create1 = document.createElement("option");
      create1.textContent = lesson_room_list[j];
      lesson_room_selects[i].appendChild(create1);
    }
  }
}

function lesson_room_selector_add(str) {
  let lesson_room_selects = document.querySelectorAll(".lesson_room_select");
  for (let i = 0; i < lesson_room_selects.length; i++) {
    let create1 = document.createElement("option");
    create1.textContent = str;
    lesson_room_selects[i].appendChild(create1);
  }
}

function lesson_room_selector_del(num) {
  let lesson_room_selects = document.querySelectorAll(".lesson_room_select");
  for (let i = 0; i < lesson_room_selects.length; i++) {
    lesson_room_selects[i].options[num].remove();
  }
  lesson_room_list.splice(num, 1);
}

function teacher_selector_set() {
  let teacher_selects = document.querySelectorAll(".teacher_select");
  for (let i = 0; i < teacher_selects.length; i++) {
    teacher_selects[i].innerHTML = "";
    for (let j = 0; j < teacher_list.length; j++) {
      let create1 = document.createElement("option");
      create1.textContent = teacher_list[j];
      teacher_selects[i].appendChild(create1);
    }
  }
}

function teacher_selector_add(str) {
  let teacher_selects = document.querySelectorAll(".teacher_select");
  for (let i = 0; i < teacher_selects.length; i++) {
    let create1 = document.createElement("option");
    create1.textContent = str;
    teacher_selects[i].appendChild(create1);
  }
}

function teacher_selector_del(num) {
  let teacher_selects = document.querySelectorAll(".teacher_select");
  for (let i = 0; i < teacher_selects.length; i++) {
    teacher_selects[i].options[num].remove();
  }
  teacher_list.splice(num, 1);
}
