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

function count_number_lesson(list,num){
  let ret = 0
  document.querySelectorAll(`.${list}_select`).forEach(i=>{
    if(i.selectedIndex == num){
      ret++;
    }
  })
  return ret;
}

function aaa_teacher(){
  let ret = []
  teacher_list.forEach((e,i)=>{
    ret[i] = 0;
  })

  join_lesson_and_fixed().forEach((i,cls_num)=>{
    i.forEach(e=>{
      if(e[0] < 100){
        ret[e[1]] += e[3];
      }else{
        find_ele(cls_num,e[0]).forEach(j => {
          ret[j[1]] += e[3];
        })
      }
    })
  })
  teacher_list.forEach((e,i)=>{
    console.log(e,ret[i])
    
  })
  document.querySelectorAll(".teacher_select").forEach(par=>{
    for (let i = 0; i < par.children.length; i++) {
      const child = par[i];
      child.innerText = `${teacher_list[i]} [${ret[i]}]`
      
    }
  })
  return ret;
}


function find_ele(cls_num,lsn_num){
  return elective_lesson_list[cls_num][lsn_num - 100];
}