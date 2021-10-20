


data_load();
function data_load() {
  //クラス作成
  list_add('#class_name_text', '#class_add_btn', '情報システム科１年');
  list_add('#class_name_text', '#class_add_btn', '情報システム科２年');
  list_add('#class_name_text', '#class_add_btn', '情報システム科３年');
  list_add('#class_name_text', '#class_add_btn', '情報システム科４年');

  //教師作成
  list_add('#teacher_name_text', '#teacher_add_btn', '教師一郎');
  list_add('#teacher_name_text', '#teacher_add_btn', '宮情次郎');
  list_add('#teacher_name_text', '#teacher_add_btn', '宮崎三郎');
  list_add('#teacher_name_text', '#teacher_add_btn', '大原四郎');
  list_add('#teacher_name_text', '#teacher_add_btn', '山田太郎');
  list_add('#teacher_name_text', '#teacher_add_btn', '小林五郎');
  list_add('#teacher_name_text', '#teacher_add_btn', '日南史郎');
  list_add('#teacher_name_text', '#teacher_add_btn', '山田花子');

  //教室作成
  list_add('#room_name_text', '#room_add_btn', '501');
  list_add('#room_name_text', '#room_add_btn', '503');
  list_add('#room_name_text', '#room_add_btn', '401');
  list_add('#room_name_text', '#room_add_btn', '701');
  list_add('#room_name_text', '#room_add_btn', '大原201');
  list_add('#room_name_text', '#room_add_btn', '大原203');
  list_add('#room_name_text', '#room_add_btn', '大原204');
  list_add('#room_name_text', '#room_add_btn', 'スタジアム');
  list_add('#room_name_text', '#room_add_btn', '学生会館2F-B');


  //授業追加
  lesson_add("#lesson_list_0",6);
  lesson_opt("#normal_lesson_list_0_1","JAVA",1,4,6,3)
  lesson_opt("#normal_lesson_list_0_2","一般教養",2,1,1,1)
  lesson_opt("#normal_lesson_list_0_3","ビジネス実務",2,1,2,1)
  lesson_opt("#normal_lesson_list_0_4","NW",2,1,3,1)
  lesson_opt("#normal_lesson_list_0_5","WEB",3,5,3,3)
  lesson_opt("#normal_lesson_list_0_6","EXCEL",4,4,9,3)

  lesson_add("#lesson_list_1",6);
  lesson_opt("#normal_lesson_list_1_1","DB",7,6,3,3);
  lesson_opt("#normal_lesson_list_1_2","HP",3,7,3,3);
  lesson_opt("#normal_lesson_list_1_3","WORD",4,4,3,3);
  lesson_opt("#normal_lesson_list_1_4","一般教養",1,2,1,1);
  lesson_opt("#normal_lesson_list_1_5","就職実務",1,2,2,1);
  lesson_opt("#normal_lesson_list_1_6","JAVA",1,6,6,3);

  lesson_add("#lesson_list_2",6);
  lesson_opt("#normal_lesson_list_2_1","システム開発",6,4,9,3);
  lesson_opt("#normal_lesson_list_2_2","開発演習",6,3,3,3);
  lesson_opt("#normal_lesson_list_2_3","プログラミング実習",5,3,6,3);
  lesson_opt("#normal_lesson_list_2_4","プログラミング演習",5,3,6,3);
  lesson_opt("#normal_lesson_list_2_5","一般教養",1,3,1,1);
  lesson_opt("#normal_lesson_list_2_6","就職実務",1,3,2,1);

  lesson_add("#lesson_list_3",4);
  lesson_opt("#normal_lesson_list_3_1","システム開発",6,4,9,3);
  lesson_opt("#normal_lesson_list_3_2","開発演習",6,3,3,3);
  lesson_opt("#normal_lesson_list_3_3","プログラミング実習",5,3,6,3);
  lesson_opt("#normal_lesson_list_3_4","プログラミング演習",5,3,6,3);
  //選択授業追加
  qa('button[onclick="elective_lesson_list_add_btn(this)"]')[0].click();//１年選択授業
  qs("#elective_lesson_list_0_0").children[1].value = 9;
  qs("#elective_lesson_list_0_0").children[2].value = 3;
  qs("#elective_lesson_list_0_0").children[1].onkeyup();
  qs("#elective_lesson_list_0_0").children[2].onkeyup();
  ele_lesson_add("#elective_lesson_list_0_0",5)
  ele_lesson_opt("#elective_lesson_list_0_0_0","CG",8,2)
  ele_lesson_opt("#elective_lesson_list_0_0_1","Eスポーツ",0,8)
  ele_lesson_opt("#elective_lesson_list_0_0_2","ロボ",1,9)
  ele_lesson_opt("#elective_lesson_list_0_0_3","ドローン",2,1)
  ele_lesson_opt("#elective_lesson_list_0_0_4","SE",6,4)

  qa('button[onclick="elective_lesson_list_add_btn(this)"]')[1].click();//２年選択授業
  qs("#elective_lesson_list_1_0").children[1].value = 6;
  qs("#elective_lesson_list_1_0").children[2].value = 3;
  qs("#elective_lesson_list_1_0").children[1].onkeyup();
  qs("#elective_lesson_list_1_0").children[2].onkeyup();
  ele_lesson_add("#elective_lesson_list_1_0",2)
  ele_lesson_opt("#elective_lesson_list_1_0_0","CG",8,2)
  ele_lesson_opt("#elective_lesson_list_1_0_1","SE",6,4)

  qa('button[onclick="elective_lesson_list_add_btn(this)"]')[1].click();//２年選択授業
  qs("#elective_lesson_list_1_1").children[1].value = 3;
  qs("#elective_lesson_list_1_1").children[2].value = 3;
  qs("#elective_lesson_list_1_1").children[1].onkeyup();
  qs("#elective_lesson_list_1_1").children[2].onkeyup();
  ele_lesson_add("#elective_lesson_list_1_1",2)
  ele_lesson_opt("#elective_lesson_list_1_1_0","CG",8,2)
  ele_lesson_opt("#elective_lesson_list_1_1_1","SE",6,4)

  qa('.get_lesson_num_btn').forEach(i=>{
    i.click();
  })
}

function qs(attr) {
  return document.querySelector(attr);
}

function qa(attr) {
  return document.querySelectorAll(attr);
}
function list_add(target, target_btn, name) {
  qs(target).value = name;
  qs(target_btn).click();
}

function lesson_add(target,num){
  for(let i = 0;i < num;i++){
    qs(target).children[2].children[0].click();
  }
}

function lesson_opt(target,name,teacher_num,room_num,lesson_num,continuity_num){
  qs(target).children[0].value = name;
  qs(target).children[0].onkeyup();
  qs(target).children[1].selectedIndex = teacher_num;
  qs(target).children[2].selectedIndex = room_num;
  qs(target).children[3].value = lesson_num;
  qs(target).children[4].value = continuity_num;
}

function ele_lesson_add(target,num){
  for(let i = 0;i < num;i++){
    qs(target).children[5].click();
  }
}

function ele_lesson_opt(target,name,teacher_num,room_num){
  qs(target).children[0].value = name;
  qs(target).children[1].selectedIndex = teacher_num;
  qs(target).children[2].selectedIndex = room_num;
}


