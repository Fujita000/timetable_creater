function data_load() {
  //クラス作成
  qs('#class_name_text').value = "1-1";
  qs('#class_add_btn').click();
  qs('#class_name_text').value = "2-1";
  qs('#class_add_btn').click();

  //教師作成
  qs('#teacher_name_text').value = "教師太郎";
  qs('#teacher_add_btn').click();

  //教室作成
  qs('#room_name_text').value = "1-1";
  qs('#room_add_btn').click();
  qs('#room_name_text').value = "パソコン室";
  qs('#room_add_btn').click();

  //授業追加


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