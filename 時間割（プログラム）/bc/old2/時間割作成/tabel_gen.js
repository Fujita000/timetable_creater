let setval_suffix = document.getElementById("suffix");

let btn = document.getElementById("btn");
let open_log = document.getElementById("open_log");
let inx = document.getElementById("inx");
let iny = document.getElementById("iny");
let inz = document.getElementById("inz");

let lesson_list = document.getElementById("lesson_list");

let now_choice_ele = document.getElementById("now_choice_ele");
let cancel_choice_lesson = document.getElementById("lesson_cancel");
cancel_choice_lesson.addEventListener("click", e => {
	nce("");
});
let get_ele = ["", , , , ]; //選択中、cellの内容

function nce(str, x, y, z) {
	now_choice_ele.textContent = "選択中：" + str;
	if (get_ele[0] == "cell" && str == "cell") {
		console.log("cell")
		let tmp = timetable[get_ele[3]][get_ele[2]][get_ele[1]];
		timetable[get_ele[3]][get_ele[2]][get_ele[1]] = timetable[z][y][x];
		timetable[z][y][x] = tmp;
	}
	get_ele = ["", , , , ]
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

let now_choice_lesson = ["", "", ""];

lesson_list.children[0].querySelector("input[type=button]").addEventListener("click", e => {
	now_choice_lesson[0] = lesson_list.children[0].children[0].value;
	now_choice_lesson[1] = lesson_list.children[0].children[1].value;
	now_choice_lesson[2] = lesson_list.children[0].children[2].value;;
	nce("lesson");
});


let tx = 0;
let ty = 0;
let tz = 0;

let ls = [
  ["名前3", "教室1", "教師1"],
  ["名前2", "教室1", "教師2"],
  ["名前3", "教室3", "教師2"],
];

let timetable;
let lesson
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

				timetable[z][y][x] = ["名前", "教室", "教師"];
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
					"<p class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][0] + "</p>" +
					"<p class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][1] + "</p>" +
					"<p class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][2] + "</p>";
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
	let sff = setval_suffix.value;
	if (get_ele[0] == "lesson") {
		timetable[idz][idy][idx] = now_choice_lesson;
	}
	get_cell(idx, idy, idz).innerHTML =
		"<p class = " + idz + "-" + idy + "-" + idx + ">" + timetable[idz][idy][idx][0] + "</p>" +
		"<p class = " + idz + "-" + idy + "-" + idx + ">" + timetable[idz][idy][idx][1] + "</p>" +
		"<p class = " + idz + "-" + idy + "-" + idx + ">" + timetable[idz][idy][idx][2] + "</p>";
	for (let z = 0; z < timetable.length; z++) {
		for (let suf = 0; suf < timetable[idx][idy][z].length; suf++) {
			if (check_timetable(idx, idy, z, suf)) {
				get_cell(idx, idy, z).children[suf].style.color = "red";
			} else {
				get_cell(idx, idy, z).children[suf].style.color = "black";
			}
		}
	}
	nce("cell", idx, idy, idz);
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

function get_cell(x, y, z) {
	return document.getElementsByClassName(z + "-" + y + "-" + x)[0];
}
