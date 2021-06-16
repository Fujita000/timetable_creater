let old_btn = document.getElementById("auto_btn_old");
let new_btn = document.getElementById("auto_btn_new");
let rewrite_btn = document.getElementById("rewrite_btn");

let timetable_list_dom = document.getElementById("timetable_list");
let timetable = pass_timetable;

let table_SizeX = 6
let table_SizeY = 5
old_btn.addEventListener("click",e=>{
  table_create();
});
new_btn.addEventListener("click",e=>{
  table_create();
});
rewrite_btn.addEventListener("click",e=>{
  update_timetable();
});

function table_create() {
  let tx = table_SizeX;
  let ty = table_SizeY;
  for(let z = 0;z < pass_timetable.length;z++){
    //テーブル生成
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    for (let y = 0; y < ty; y++) {
        let row = document.createElement("tr");
        for (let x = 0; x < tx; x++) {
            let cell = document.createElement("td");
            let get = get_lesson(z,y,x);
            cell.innerHTML =
                "<ul>" +
                "<li>"+get[0]+"</li>" +
                "<li>"+get[1]+"</li>" +
                "<li>"+get[2]+"</li>" +
                "</ul>";
            cell.setAttribute("class", y + "_" + x);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    timetable_list_dom.appendChild(tbl);
  }
}

function to_class_name(num){
  let ret =  data_class_list[num] == undefined ? "" :  data_class_list[num];
  return ret;
}

function to_room_name(num){
  let ret =  classroom_list[num] == undefined ? "" :  classroom_list[num];
  return ret;

}

function to_teacher_name(num){
  let ret =  data_teacher_list[num] == undefined ? "" :  data_teacher_list[num];
  return ret;
}

function to_lesson_name(i,j){
  let ret =  lesson_list[i][j] == undefined ? "" : lesson_list[i][j];
  return ret;
}

function get_timetable_cell(z,y,x){
  let ret = pass_timetable[z][y][x] == undefined ? "" : pass_timetable[z][y][x];
  return ret;
}

function get_lesson(z,y,x){
  let ret = ["","",""];
  let get =  get_timetable_cell(z,y,x);
  if(get == "")return ret;
  ret[0] = to_lesson_name(z,get[0]);
  ret[1] = to_teacher_name(get[1]);
  ret[2] = to_room_name(get[2]);
  return ret;
}

function update_timetable() {
  for (let z = 0; z < pass_timetable.length; z++) {
    for (let y = 0; y < pass_timetable[z].length; y++) {
      for (let x = 0; x < pass_timetable[z][y].length; x++) {
        update_cell([z, y, x]);
      }
    }
  }
}

function update_cell(arr) {
  let z = arr[0];
  let y = arr[1];
  let x = arr[2];
  let dom = get_cell(z, y, x);
  let lesson = get_lesson(z,y,x);
  dom.innerHTML =
    "<ul>" +
    "<li>" + lesson[0] + "</li>" +
    "<li>" + lesson[1] + "</li>" +
    "<li>" + lesson[2] + "</li>" +
    "</ul>";
  
}

function get_cell(z, y, x) {
  return document.getElementsByClassName(y + "_" + x)[z];
}
//更新ができる機能を作る
