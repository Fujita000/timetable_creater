function data_load() {
  //クラス作成
  list_add('#class_name_text', '#class_add_btn', '情報システム科１年');
  list_add('#class_name_text', '#class_add_btn', '情報システム科２年');

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
  list_add('#room_name_text', '#room_add_btn', '701');
  list_add('#room_name_text', '#room_add_btn', '大原201');
  list_add('#room_name_text', '#room_add_btn', '大原203');
  list_add('#room_name_text', '#room_add_btn', '大原204');
  list_add('#room_name_text', '#room_add_btn', 'スタジアム');
  list_add('#room_name_text', '#room_add_btn', '学生会館2F-B');


  //授業追加
  let add_lesson = [

  ];
  qa('button[onclick="normal_lesson_add_btn(this)"]').forEach(e => {
    e.click();
  });

  // qs('#normal_lesson_list_0_1').querySelector('input').value = "pp"
  // qs('#normal_lesson_list_0_1').querySelector('input').onkeyup()

  //授業設定

  //選択授業の追加

  //選択授業のリストを追加

  //選択授業のリストを設定

  //時間割に入力

}
// teacher_name_text
// room_name_text
// class_add_btn
// teacher_add_btn
// room_add_btn
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