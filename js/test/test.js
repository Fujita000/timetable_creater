


test_data_load();
function test_data_load() {
  //クラス作成
  list_add('#class_name_text', '#class_add_btn', '情報システム科１年');
  list_add('#class_name_text', '#class_add_btn', '情報システム科２年');
  // list_add('#class_name_text', '#class_add_btn', '情報システム科３年');
  // list_add('#class_name_text', '#class_add_btn', '情報システム科４年');

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
  lesson_add("#lesson_list_0", 6);
  lesson_opt("#normal_lesson_list_0_1", "JAVA", 1, 5, 6, 3)
  lesson_opt("#normal_lesson_list_0_2", "一般教養", 2, 1, 1, 1)
  lesson_opt("#normal_lesson_list_0_3", "ビジネス実務", 2, 1, 2, 1)
  lesson_opt("#normal_lesson_list_0_4", "NW", 2, 1, 3, 1)
  lesson_opt("#normal_lesson_list_0_5", "WEB", 3, 5, 3, 3)
  lesson_opt("#normal_lesson_list_0_6", "EXCEL", 4, 4, 3, 3)

  lesson_add("#lesson_list_1", 6);
  lesson_opt("#normal_lesson_list_1_1", "DB", 7, 6, 3, 3);
  lesson_opt("#normal_lesson_list_1_2", "HP", 3, 7, 3, 3);
  lesson_opt("#normal_lesson_list_1_3", "WORD", 4, 4, 3, 3);
  lesson_opt("#normal_lesson_list_1_4", "一般教養", 1, 2, 1, 1);
  lesson_opt("#normal_lesson_list_1_5", "就職実務", 1, 2, 2, 1);
  lesson_opt("#normal_lesson_list_1_6", "JAVA", 1, 6, 6, 3);

  // lesson_add("#lesson_list_2", 6);
  // lesson_opt("#normal_lesson_list_2_1", "システム開発", 6, 4, 9, 3);
  // lesson_opt("#normal_lesson_list_2_2", "開発演習", 6, 3, 3, 3);
  // lesson_opt("#normal_lesson_list_2_3", "プログラミング実習", 5, 3, 6, 3);
  // lesson_opt("#normal_lesson_list_2_4", "プログラミング演習", 5, 3, 6, 3);
  // lesson_opt("#normal_lesson_list_2_5", "一般教養", 1, 3, 1, 1);
  // lesson_opt("#normal_lesson_list_2_6", "就職実務", 1, 3, 2, 1);

  // lesson_add("#lesson_list_3", 4);
  // lesson_opt("#normal_lesson_list_3_1", "システム開発", 6, 4, 9, 3);
  // lesson_opt("#normal_lesson_list_3_2", "開発演習", 6, 3, 3, 3);
  // lesson_opt("#normal_lesson_list_3_3", "プログラミング実習", 5, 3, 6, 3);
  // lesson_opt("#normal_lesson_list_3_4", "プログラミング演習", 5, 3, 6, 3);


  //選択授業追加
  ele_lesson_add(0, 0, 9, 3)
  ele_lesson_item_add("#elective_lesson_list_0_0", 5)
  ele_lesson_item_opt("#elective_lesson_list_0_0_0", "CG", 8, 2)
  ele_lesson_item_opt("#elective_lesson_list_0_0_1", "Eスポーツ", 0, 8)
  ele_lesson_item_opt("#elective_lesson_list_0_0_2", "ロボ", 1, 9)
  ele_lesson_item_opt("#elective_lesson_list_0_0_3", "ドローン", 2, 1)
  ele_lesson_item_opt("#elective_lesson_list_0_0_4", "SE", 6, 4)

  ele_lesson_add(1, 0, 6, 3)//２年選択授業
  ele_lesson_item_add("#elective_lesson_list_1_0", 2)
  ele_lesson_item_opt("#elective_lesson_list_1_0_0", "CG", 8, 2)
  ele_lesson_item_opt("#elective_lesson_list_1_0_1", "SE", 6, 4)

  ele_lesson_add(1, 1, 3, 3)//２年選択授業
  ele_lesson_item_add("#elective_lesson_list_1_1", 2)
  ele_lesson_item_opt("#elective_lesson_list_1_1_0", "CG", 8, 1)
  ele_lesson_item_opt("#elective_lesson_list_1_1_1", "SE", 6, 4)

  qa('.get_lesson_num_btn').forEach(i => {
    //授業の決定ボタン、これを押さないと反映されない隠されてるやつ
    i.click()
  });
  qa('.time_btn').forEach(i => {
    //授業の決定ボタン、これを押さないと反映されない隠されてるやつ
    i.click()
  });

  // //時間割の作成
  // t_click_ele_lesson(0, 0, true);
  // t_f_les(0, 0, 3, 3)
  // t_f_les(0, 1, 0, 3)
  // t_f_les(0, 2, 3, 3)
  // t_click_ele_lesson(0, 4);
  // t_f_les(0, 3, 3, 3)

  // t_click_ele_lesson(1, 0, true);
  // t_f_les(1, 0, 0, 3)
  // t_f_les(1, 4, 0, 3)
  // t_click_ele_lesson(1, 1);
  // t_f_les(1, 0, 3, 3)
  // t_click_ele_lesson(1, 0);
  // t_f_les(1, 1, 0, 3)
  // t_click_ele_lesson(1, 1, true);
  // t_f_les(1, 2, 0, 3)
  // t_click_ele_lesson(1, 3);
  // t_f_les(1, 4, 3, 1)
  // t_click_ele_lesson(1, 4);
  // t_f_les(1, 4, 4, 2)

  // let z = 2
  // t_click_ele_lesson(z, 0);
  // t_f_les(z, 0, 0, 3)
  // t_f_les(z, 2, 0, 3)
  // t_f_les(z, 4, 0, 3)
  // t_click_ele_lesson(z, 2);
  // t_f_les(z, 0, 3, 3)
  // t_f_les(z, 1, 0, 3)
  // t_click_ele_lesson(z, 3);
  // t_f_les(z, 3, 0, 3)
  // t_f_les(z, 3, 3, 3)
  // t_click_ele_lesson(z, 1);
  // t_f_les(z, 1, 3, 3)
  // t_click_ele_lesson(z, 4);
  // t_f_les(z, 4, 3, 1)
  // t_click_ele_lesson(z, 5);
  // t_f_les(z, 4, 4, 2)

  // z = 3
  // t_click_ele_lesson(z, 0);
  // t_f_les(z, 0, 0, 3)
  // t_f_les(z, 2, 0, 3)
  // t_f_les(z, 4, 0, 3)
  // t_click_ele_lesson(z, 2);
  // t_f_les(z, 0, 3, 3)
  // t_f_les(z, 1, 0, 3)
  // t_click_ele_lesson(z, 3);
  // t_f_les(z, 3, 0, 3)
  // t_f_les(z, 3, 3, 3)
  // t_click_ele_lesson(z, 1);
  // t_f_les(z, 1, 3, 3)

  function list_add(target, target_btn, name) {
    //情報設定の情報の追加
    qs(target).value = name;
    qs(target_btn).click();
  }

  function lesson_add(target, num) {
    //'target'で指定した授業コマ設定の授業追加ボタンを'num'回クリック
    for (let i = 0; i < num; i++) {
      qs(target).children[2].children[0].click();
    }
  }

  function lesson_opt(target, name, teacher_num, room_num, lesson_num, continuity_num) {
    //'target'で指定した、授業の設定を行う
    qs(target).children[0].value = name;
    qs(target).children[0].onkeyup();
    qs(target).children[1].selectedIndex = teacher_num;
    qs(target).children[2].selectedIndex = room_num;
    qs(target).children[3].value = lesson_num;
    qs(target).children[4].value = continuity_num;
  }

  function ele_lesson_add(cls_num, offset, lesson_num, continuity_num) {
    qa('button[onclick="elective_lesson_list_add_btn(this)"]')[cls_num].click();
    qs("#elective_lesson_list_" + cls_num + "_" + offset).children[1].value = lesson_num;
    qs("#elective_lesson_list_" + cls_num + "_" + offset).children[2].value = continuity_num;
    qs("#elective_lesson_list_" + cls_num + "_" + offset).children[1].onkeyup();
    qs("#elective_lesson_list_" + cls_num + "_" + offset).children[2].onkeyup();
  }
  function ele_lesson_item_add(target, num) {
    //'target'で指定した授業コマ設定の選択授業追加ボタンを'num'回クリック
    for (let i = 0; i < num; i++) {
      qs(target).children[5].click();
    }
  }

  function ele_lesson_item_opt(target, name, teacher_num, room_num) {
    //'target'で指定した、授業の設定を行う
    qs(target).children[0].value = name;
    qs(target).children[1].selectedIndex = teacher_num;
    qs(target).children[2].selectedIndex = room_num;
  }

  function t_f_les(target_Z, x, y, n) {
    for (let i = y; i < n + y; i++) {
      qs("#timetable_" + target_Z).querySelectorAll('tr')[i].querySelectorAll('td')[x].querySelector('li').click();
    }
  }
  function t_click_ele_lesson(cls_num, lsn_num, ele_flg = false) {
    //lsn_num:通常授業の0番目から、または、選択授業の0番目から
    //ele_flg:選択授業の時
    cls_num++;
    let lsn = document.querySelector('#timetable_link_sidebar').children[cls_num];
    if (ele_flg) {
      //選択授業の時
      lsn.querySelector(".timetable_tab_elective_lesson").children[lsn_num].click();
    } else {
      //通常授業の時
      lsn.querySelector(".timetable_tab_normal_lesson").children[lsn_num].click();
    }
  }
  function qs(attr) {
    //要素の取得
    return document.querySelector(attr);
  }

  function qa(attr) {
    //要素の全取得
    return document.querySelectorAll(attr);
  }

}







