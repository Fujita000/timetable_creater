let operation_link_sidebar = document.getElementById("operation_link_sidebar");

function add_operation_link_sidebar(val) {
  let anker = document.createElement("a");
  anker.href = "#lesson_list_" + (class_list.length - 1);
  anker.className = "mdl-navigation__link";
  anker.innerText = val;
  operation_link_sidebar.appendChild(anker);
}

function del_operation_link_sidebar(btn) {
  let num = pareSp(btn)[2];
  operation_link_sidebar.children[num].remove();
  rewrite_id_operation_link_sidebar();
}

function rewrite_id_operation_link_sidebar() {
  let target = operation_link_sidebar;
  let ankers = target.getElementsByTagName("a");
  let suf = 1;
  for (let i = suf; i < ankers.length; i++) {
    ankers[i].href = "#lesson_list_" + i;
  }
}

function rewrite_name_operation_link_sidebar(suf) {
  operation_link_sidebar.children[suf].innerText = class_list[suf];
}

function chenge_now_lesson_count_All(list_name) {
  // list_name:{"room" || "teacher"}
  const count_list = count_now_lesson(list_name);
  const list = list_name == "teacher" ? teacher_list : room_list;

  document.querySelectorAll(`.${list_name}_select`).forEach((par) => {
    for (let i = 0; i < par.children.length; i++) {
      const child = par[i];
      child.innerText = i == 0 ? "" : `${list[i]} [${count_list[i]}]`;
    }
  });
}

function count_now_lesson(list_name) {
  // list_name:{"room" || "teacher"}
  let ret = [];
  const list = list_name == "teacher" ? teacher_list : room_list;
  const offset = list_name == "teacher" ? 1 : 2;
  list.forEach((e, i) => {
    ret[i] = 0;
  });
  let join = [];
  const nor = get_lesson_num_data();
  const ele = get_elective_lesson_num_data();
  for (let i = 0; i < nor.length; i++) {
    join.push(nor[i].concat(ele[i]));
  }
  join.forEach((cls_lsn, cls_num) => {
    cls_lsn.forEach((lsn) => {
      if (lsn[0] < 100) {
        ret[lsn[offset]] += lsn[3];
      } else {
        let tmp_arr = [];
        find_ele(cls_num, lsn[0]).forEach((ele_lsn) => {
          let pushFlag = true;
          tmp_arr.forEach((l) => {
            if (l == ele_lsn[offset]) pushFlag = false;
          });
          if (pushFlag) tmp_arr.push(ele_lsn[offset]);
        });
        tmp_arr.forEach((i) => {
          console.log(lsn[3]);
          ret[i] += lsn[3];
        });
      }
    });
  });
  return ret;
}

function find_ele(cls_num, lsn_num) {
  return elective_lesson_list[cls_num][lsn_num - 100];
}
