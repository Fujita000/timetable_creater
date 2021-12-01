let operation_link_sidebar = document.getElementById('operation_link_sidebar');

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






