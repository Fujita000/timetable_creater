function data_save() {
  originalData = {
    table_SizeX: table_SizeX,
    table_SizeY: table_SizeY,
    normal_lesson_list: normal_lesson_list,
    elective_lesson_list: elective_lesson_list,
    class_list: class_list,
    teacher_list: teacher_list,
    room_list: room_list
  };

  const fileName = "mochi.json";
  const data = JSON.stringify(originalData, null, 2);
  const link = document.createElement("a");
  // リンク先にJSON形式の文字列データを置いておく。
  link.href = "data:text/plain," + encodeURIComponent(data);
  link.download = fileName;
  // ファイルを保存する。
  link.click();
}


