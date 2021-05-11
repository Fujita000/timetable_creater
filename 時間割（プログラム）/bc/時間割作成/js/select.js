//let teacher_list_dom = document.getElementById("teacher_list");
//let teacher_add_dom = document.getElementById("teacher_add");
//let teacher_text_dom = document.getElementById("teacher_text");
//let lesson_room_list_dom = document.getElementById("lesson_room_list");
//let lesson_room_add_dom = document.getElementById("lesson_room_add");
//let lesson_room_text_dom = document.getElementById("lesson_room_text");
//
//let teacher_list = [];
//let lesson_room_list = [];
//
//function teacher_del(dom) {
//	dom.parentElement.remove();
//	teacher_selector_del(Number(dom.parentElement.id.split("_")[1]));
//}
//
//teacher_add_dom.addEventListener("click", e => {
//	let div = document.createElement("div");
//	div.id = "teacher_" + teacher_list.length;
//	div.innerHTML =
//		"<input value=" + teacher_text_dom.value + ">" +
//		"<button onclick=teacher_del(this)>削除</button>";
//	teacher_list_dom.appendChild(div);
//	teacher_selector_add(teacher_text_dom.value);
//	teacher_list.push(teacher_text_dom.value);
//});
//
//function teacher_selector_set() {
//	let teacher_selects = document.querySelectorAll(".teacher_select");
//	for (let i = 0; i < teacher_selects.length; i++) {
//		teacher_selects[i].innerHTML = "";
//		for (let j = 0; j < teacher_list.length; j++) {
//			let create1 = document.createElement("option");
//			create1.textContent = teacher_list[j];
//			teacher_selects[i].appendChild(create1);
//		}
//	}
//}
//
//function teacher_selector_add(str) {
//	let teacher_selects = document.querySelectorAll(".teacher_select");
//	for (let i = 0; i < teacher_selects.length; i++) {
//		let create1 = document.createElement("option");
//		create1.textContent = str;
//		teacher_selects[i].appendChild(create1);
//	}
//}
//
//function teacher_selector_del(num) {
//	let teacher_selects = document.querySelectorAll(".teacher_select");
//	for (let i = 0; i < teacher_selects.length; i++) {
//		teacher_selects[i].options[num].remove();
//	}
//	teacher_list.splice(num, 1);
//	//再振り分け
//	for (let i = 0; i < teacher_list.length; i++) {
//		teacher_list_dom.children[i].id = "teacher_" + i;
//	}
//}
//
//function lesson_room_del(dom) {
//	dom.parentElement.remove();
//	lesson_room_selector_del(Number(dom.parentElement.id.split("_")[1]));
//}
//
//lesson_room_add_dom.addEventListener("click", e => {
//	let div = document.createElement("div");
//	div.id = "lessonroom_" + lesson_room_list.length;
//	div.innerHTML =
//		"<input value=" + lesson_room_text_dom.value + ">" +
//		"<button onclick=lesson_room_del(this)>削除</button>";
//	lesson_room_list_dom.appendChild(div);
//	lesson_room_selector_add(lesson_room_text_dom.value);
//	lesson_room_list.push(lesson_room_text_dom.value);
//});
//
//
//function lesson_room_selector_set() {
//	let lesson_room_selects = document.querySelectorAll(".lesson_room_select");
//	for (let i = 0; i < lesson_room_selects.length; i++) {
//		lesson_room_selects[i].innerHTML = "";
//		for (let j = 0; j < lesson_room_list.length; j++) {
//			let create1 = document.createElement("option");
//			create1.textContent = lesson_room_list[j];
//			lesson_room_selects[i].appendChild(create1);
//		}
//	}
//}
//
//function lesson_room_selector_add(str) {
//	let lesson_room_selects = document.querySelectorAll(".lesson_room_select");
//	for (let i = 0; i < lesson_room_selects.length; i++) {
//		let create1 = document.createElement("option");
//		create1.textContent = str;
//		lesson_room_selects[i].appendChild(create1);
//	}
//}
//
//function lesson_room_selector_del(num) {
//	let lesson_room_selects = document.querySelectorAll(".lesson_room_select");
//	for (let i = 0; i < lesson_room_selects.length; i++) {
//		lesson_room_selects[i].options[num].remove();
//	}
//	lesson_room_list.splice(num, 1);
//	//再振り分け
//	for (let i = 0; i < lesson_room_list.length; i++) {
//		lesson_room_list_dom.children[i].id = "lessonroom_" + i;
//	}
//}