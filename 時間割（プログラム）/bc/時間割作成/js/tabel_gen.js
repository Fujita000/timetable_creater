let rewrite_btn = document.getElementById("rewrite_btn");
let open_log_btn = document.getElementById("open_log_btn");
let now_choice_dom = document.getElementById("now_choice_dom");
let cancel_choice_lesson = document.getElementById("lesson_cancel");
let lesson_list_dom = document.getElementById("lesson_list");
let class_list_dom = document.getElementById("class_list");
let class_add_dom = document.getElementById("class_add");
let class_text_dom = document.getElementById("class_text");
let teacher_list_dom = document.getElementById("teacher_list");
let teacher_add_dom = document.getElementById("teacher_add");
let teacher_text_dom = document.getElementById("teacher_text");
let lesson_room_list_dom = document.getElementById("lesson_room_list");
let lesson_room_add_dom = document.getElementById("lesson_room_add");
let lesson_room_text_dom = document.getElementById("lesson_room_text");

//ユーザデータ
let timetable = []; //時間割
let class_list = []; //クラス一覧
let teacher_list = []; //教師一覧
let lesson_room_list = []; //教室一覧
let lesson_list = []; //授業一覧
let elective_lesson_list = []; //選択授業一覧
//処理用
let now_choice_lesson = ["", "", ""]; //選択中の授業の内容
let get_dom = ["", , , , ]; //選択中のdomの内容

//共通関数

//DOMの親IDを"_"で分割する
function dom_par(dom) {
    return dom.parentElement.id.split("_");
}

rewrite_btn.addEventListener("click", e => {
    rewrite_table();
});
open_log_btn.addEventListener("click", e => {
    console.log(timetable);
});
cancel_choice_lesson.addEventListener("click", e => {
    nce("");
});

//セルを指定時の挙動
//cellの中身を交換またはDOMの座標と種類を取得
function nce(str, x, y, z) {
    if (get_dom[0] == "cell" && str == "cell" && get_dom[3] == z) {
        //ひとつ前にクリックしていたものが同じテーブルのセルの時中身の要素を交換
        let tmp = [...timetable[get_dom[3]][get_dom[2]][get_dom[1]]];
        timetable[get_dom[3]][get_dom[2]][get_dom[1]] = timetable[z][y][x];
        timetable[z][y][x] = tmp;
        set_cell(x, y, z);
        set_cell(get_dom[1], get_dom[2], get_dom[3]);
        z_color_chenge(x, y);
        z_color_chenge(get_dom[1], get_dom[2]);
        get_dom = ["", , , , ];
    } else {
        //要素の座標と種類を取得する
        get_dom = ["", , , , ];

        switch (str) {
            case "cell":
                get_dom[0] = "cell";
                break;
            case "lesson":
                get_dom[0] = "lesson";
                break;
        }
        get_dom[1] = x;
        get_dom[2] = y;
        get_dom[3] = z;
    }

    now_choice_dom.textContent = "選択中：" + get_dom[0];
}

function get_lesson(dom) {
    change_lesson(dom);
    let lesson = dom.parentElement;
    now_choice_lesson = lesson_list[dom_par(dom)[1]][dom_par(dom)[2]];
    nce("lesson", 0, 0, Number(lesson.id.split('_')[1]));
}


//セルをクリックしたときのイベント
function cell_click_event(e) {
    let get_class = e.target.className;
    let idx = Number(get_class.split('-')[2]);
    let idy = Number(get_class.split('-')[1]);
    let idz = Number(get_class.split('-')[0]);

    if (get_dom[0] == "lesson") {
        if (get_dom[3] == idz) {
            timetable[idz][idy][idx] = now_choice_lesson;
            set_cell(idx, idy, idz);
        }
    } else {
        nce("cell", idx, idy, idz);
    }
    z_color_chenge(idx, idy);
}
//----------クラスadd系

class_add_dom.addEventListener("click", e => {
    let div = document.createElement("div");
    div.id = "class_" + class_list.length;
    div.innerHTML =
        "<input value=" + class_text_dom.value + ">" +
        "<button onclick=class_change(this)>変更</button>" +
        "<button onclick=class_del(this)>削除</button>";

    class_list_dom.appendChild(div);
    class_list.push(class_text_dom.value);
    lesson_list.push([]);
    let div2 = document.createElement("div");
    div2.id = "classlesson_" + (class_list.length - 1);
    div2.innerHTML =
        '<p>クラス名：' + class_text_dom.value + '</p>' +
        '<input type="button" onclick="classlesson_add(this)" value="授業の追加">';
    lesson_list_dom.appendChild(div2);
    class_text_dom.value = "";

    let len = timetable.length;
    let tx = 6;
    let ty = 6;
    timetable.push(new Array(ty));
    for (let y = 0; y < ty; y++) {
        timetable[len][y] = new Array(tx);
        for (let x = 0; x < tx; x++) {
            timetable[len][y][x] = ["名前" + len + y + x, "教室" + len + y + x, "教師" + len + y + x];
        }
    }

    //テーブル生成
    let body = document.getElementsByTagName("body")[0];
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    for (let y = 0; y < ty; y++) {
        let row = document.createElement("tr");
        for (let x = 0; x < tx; x++) {
            let cell = document.createElement("td");
            cell.innerHTML =
                "<ul class = " + len + "-" + y + "-" + x + ">" +
                "<li class = " + len + "-" + y + "-" + x + ">" + timetable[len][y][x][0] + "</li>" +
                "<li class = " + len + "-" + y + "-" + x + ">" + timetable[len][y][x][1] + "</li>" +
                "<li class = " + len + "-" + y + "-" + x + ">" + timetable[len][y][x][2] + "</li>" +
                "</ul>";
            cell.setAttribute("class", len + "-" + y + "-" + x);
            cell.addEventListener("click", e => {
                cell_click_event(e);
            });
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
});

//授業内容の変更（指定）
function change_lesson(dom) {
    let par = dom.parentElement;
    lesson_list[dom_par(dom)[1]][dom_par(dom)[2]][0] = par.children[0].value;
    lesson_list[dom_par(dom)[1]][dom_par(dom)[2]][1] = par.children[1].selectedIndex > -1 ? par.children[1].options[par.children[1].selectedIndex].value : "";
    lesson_list[dom_par(dom)[1]][dom_par(dom)[2]][2] = par.children[2].selectedIndex > -1 ? par.children[2].options[par.children[2].selectedIndex].value : "";
}

//授業内容の変更（全部）
function lesson_list_reload() {
    for (let i = 0; i < lesson_list.length; i++) {
        for (let j = 0; j < lesson_list[i].length; j++) {
            change_lesson(document.getElementById("classlesson_" + i + "_" + j).children[3]);
        }
    }
    rewrite_table();
}
//
function classlesson_add(dom) {
    let div = document.createElement("div");
    lesson_list[dom_par(dom)[1]].push(["", "", ""]);
    div.id = dom.parentElement.id + "_" + (lesson_list[dom_par(dom)[1]].length - 1);
    div.innerHTML =
        '<input type="text" placeholder="授業" size="6">' +
        '<select class="teacher_select"></select>' +
        '<select class="lesson_room_select"></select>' +
        '<input type="button" value="o" onclick="get_lesson(this)">' +
        '<input type="button" value="変更" onclick="change_lesson(this)">';
    dom.parentElement.appendChild(div);

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
}

function class_del(dom) {
    dom.parentElement.remove();
    let num = Number(dom.parentElement.id.split("_")[1]);
    lesson_list_dom.children[num].remove();
    document.getElementsByTagName("table")[num].remove();
    class_list.splice(num, 1); //配列から削除
    lesson_list.splice(num, 1); //配列から削除
    timetable.splice(num, 1); //配列から削除

    //再振り分け
    for (let i = 0; i < class_list.length; i++) {
        class_list_dom.children[i].id = "class_" + i; //IDの再振り分け
        lesson_list_dom.children[i].id = "classlesson_" + i; //IDの再振り分け
    }
    for (let i = 0; i < lesson_list.length; i++) {
        for (let j = 0; j < lesson_list[i].length; j++) {
            let div = lesson_list_dom.children[i].getElementsByTagName("div")[j];

            div.id = div.parentElement.id + "_" + (lesson_list[dom_par(div)[1]].length - 1);
        }
    }

    rewrite_table();
}


//テーブル用関数

//テーブルDOMの指定された座標の要素を返す
function get_cell(x, y, z) {
    return document.getElementsByClassName(z + "-" + y + "-" + x)[0];
}

//テーブルDOMの指定された座標の要素を変更する。
function set_cell(x, y, z) {
    let ele = get_cell(x, y, z);
    ele.innerHTML =
        "<ul class = " + z + "-" + y + "-" + x + ">" +
        "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][0] + "</li>" +
        "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][1] + "</li>" +
        "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][2] + "</li>" +
        "</ul>";
}

//タイムテーブルに被りがあるとき文字の色を赤にする
function z_color_chenge(x, y) {
    for (let z = 0; z < timetable.length; z++) {
        for (let suf = 0; suf < timetable[z][y][x].length; suf++) {
            check_timetable(x, y, z, suf) ? get_cell(x, y, z).children[0].children[suf].style.color = "red" : get_cell(x, y, z).children[0].children[suf].style.color = "black";
        }
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
function check_timetable(sx, sy, sz, suf) {
    let flag = false;
    for (let z = 0; z < timetable.length; z++) {
        if (z != sz && timetable[z][sy][sx][suf] == timetable[sz][sy][sx][suf]) flag = true;
    }
    return flag;
}

//テーブルDOM再作成
function rewrite_table() {
    for (let i = 0; i < timetable.length; i++) document.getElementsByTagName("table")[0].remove(); //テーブルの削除
    let body = document.getElementsByTagName("body")[0];
    for (let z = 0; z < timetable.length; z++) {
        let tbl = document.createElement("table");
        let tblBody = document.createElement("tbody");
        for (let y = 0; y < timetable[0].length; y++) {
            let row = document.createElement("tr");
            for (let x = 0; x < timetable[0][0].length; x++) {
                let cell = document.createElement("td");
                cell.innerHTML =
                    "<ul>" +
                    "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][0] + "</li>" +
                    "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][1] + "</li>" +
                    "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][2] + "</li>" +
                    "</ul>";
                cell.setAttribute("class", z + "-" + y + "-" + x);
                cell.addEventListener("click", e => cell_click_event(e));
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        body.appendChild(tbl);
    }
    all_color_change();
}






//使用教室、教師リスト＆セレクト系用関数

function teacher_del(dom) {
    dom.parentElement.remove();
    let num = Number(dom.parentElement.id.split("_")[1])
    let teacher_selects = document.querySelectorAll(".teacher_select");
    for (let i = 0; i < teacher_selects.length; i++) teacher_selects[i].options[num].remove(); //セレクトの削除
    teacher_list.splice(num, 1); //配列から削除
    for (let i = 0; i < teacher_list.length; i++) teacher_list_dom.children[i].id = "teacher_" + i; //IDの再振り分け
    lesson_list_reload();
}

teacher_add_dom.addEventListener("click", e => {
    let div = document.createElement("div");
    div.id = "teacher_" + teacher_list.length;
    div.innerHTML =
        "<input value=" + teacher_text_dom.value + ">" +
        "<button onclick=teacher_del(this)>削除</button>";
    teacher_list_dom.appendChild(div);
    selector_add(".teacher_select", teacher_text_dom.value);
    teacher_list.push(teacher_text_dom.value);
    teacher_text_dom.value = "";
});

function lesson_room_del(dom) {
    dom.parentElement.remove();
    let num = Number(dom.parentElement.id.split("_")[1]);
    let lesson_room_selects = document.querySelectorAll(".lesson_room_select");
    for (let i = 0; i < lesson_room_selects.length; i++) lesson_room_selects[i].options[num].remove(); //セレクトの削除
    lesson_room_list.splice(num, 1); //配列から削除
    for (let i = 0; i < lesson_room_list.length; i++) lesson_room_list_dom.children[i].id = "lessonroom_" + i; //IDの再振り分け
    lesson_list_reload();
}

lesson_room_add_dom.addEventListener("click", e => {
    let div = document.createElement("div");
    div.id = "lessonroom_" + lesson_room_list.length;
    div.innerHTML =
        "<input value=" + lesson_room_text_dom.value + ">" +
        "<button onclick=lesson_room_del(this)>削除</button>";
    lesson_room_list_dom.appendChild(div);
    selector_add(".lesson_room_select", lesson_room_text_dom.value);
    lesson_room_list.push(lesson_room_text_dom.value);
    lesson_room_text_dom.value = "";
});

function selector_add(dom_name, str) {
    let selects = document.querySelectorAll(dom_name);
    for (let i = 0; i < selects.length; i++) {
        let create1 = document.createElement("option");
        create1.textContent = str;
        selects[i].appendChild(create1);
    }
}


// 多分使わないやつ
// function teacher_selector_set() {
//     let teacher_selects = document.querySelectorAll(".teacher_select");
//     for (let i = 0; i < teacher_selects.length; i++) {
//         teacher_selects[i].innerHTML = "";
//         for (let j = 0; j < teacher_list.length; j++) {
//             let create1 = document.createElement("option");
//             create1.textContent = teacher_list[j];
//             teacher_selects[i].appendChild(create1);
//         }
//     }
// }

// function lesson_room_selector_set() {
//     let lesson_room_selects = document.querySelectorAll(".lesson_room_select");
//     for (let i = 0; i < lesson_room_selects.length; i++) {
//         lesson_room_selects[i].innerHTML = "";
//         for (let j = 0; j < lesson_room_list.length; j++) {
//             let create1 = document.createElement("option");
//             create1.textContent = lesson_room_list[j];
//             lesson_room_selects[i].appendChild(create1);
//         }
//     }
// }