let timetable_sidebar = document.getElementById('timetable_link_sidebar');
//timetable_sliderにプログラムで追加される要素のtimetable_slider子要素での開始番号
let start_num = 1;

//時間割タブのクラス追加
function add_class_timetable_sidebar(val){
  let div = document.createElement("div");
  let div_child = document.createElement("div");
  let p = document.createElement("p");
  p.className = "timetable_tab_class";
  p.innerText = val;
  timetable_sidebar.appendChild(div);
  div.appendChild(div_child);
  div_child.appendChild(p);
}

function del_class_timetable_sidebar(btn){
  let num = pareSp(btn)[2];
  timetable_sidebar.children[start_num+num].remove();
  // rewrite_class_id_timetable_sidebar();
}

// function rewrite_class_id_timetable_sidebar() {
//   let p = timetable_sidebar.getElementsByClassName("timetable_tab_class");
//   for (let i = 0; i < p.length; i++) {
//     log(class_list[i])
//     p[i].innerText = class_list[i];
//   }
// }

function rewrite_class_name_timetable_sidebar(suf) {
  timetable_sidebar.children[start_num+suf].children[0].innerText = class_list[suf];
}
//時間割タブの授業追加
function add_lesson_timetable_sidebar(div){
  let p = document.createElement("p");
  p.className = "mdl-navigation__link";
  p.innerText = div.children[0].value;
  timetable_sidebar.children[start_num+getIdNum(div,0)].appendChild(p);
  p.addEventListener("click",e=>{
    div.getElementsByClassName("get_lesson_num_btn")[0].click();
  });
}

function del_lesson_timetable_sidebar(btn){
  let val1 = getIdNum(btn.parentElement,0);
  let val2 = getIdNum(btn.parentElement,1);
  timetable_sidebar.children[start_num+val1].children[val2].remove();
  rewrite_lesson_id_timetable_sidebar();
}

function rewrite_lesson_id_timetable_sidebar() {
  for (let i = 0; i < normal_lesson_list.length; i++) {
    for (let j= 1; j < normal_lesson_list[0].length; j++) {
      timetable_sidebar.children[start_num+suf1].children[suf2].innerText = normal_lesson_list[suf1][suf2][0];
    }
  }
}

function rewrite_lesson_name_timetable_sidebar(suf1,suf2) {
  timetable_sidebar.children[start_num+suf1].children[suf2].innerText = normal_lesson_list[suf1][suf2][0];
}

//時間割タブの消しゴム
let timetable_sidebar_eraser = document.getElementById("timetable_sidebar_eraser");
timetable_sidebar_eraser.addEventListener("click",e =>{
  now_choice_lesson = 0;
  now_choice_class = 0;
});


