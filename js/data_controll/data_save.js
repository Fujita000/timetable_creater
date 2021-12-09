document.querySelector("#data_save").addEventListener("click", e => {
  data_save();
})
function data_save() {
  originalData = {
    table_SizeX: table_SizeX,
    table_SizeY: table_SizeY,
    normal_lesson_list: get_lesson_num_data(),
    elective_lesson_list: get_ele_list(),
    elective_lesson_num_data: get_elective_lesson_num_data(),
    class_list: class_list,
    teacher_list: zero_dis(teacher_list),
    room_list: zero_dis(room_list),
    timetable: timetable
  };
  const d = new Date()
  const year = d.getFullYear()
  const month = ("0" + (d.getMonth()+1)).slice(-2)
  const day = ("0" + d.getDate()).slice(-2)

  const fileName = `${year}${month}${day}時間割.json`;
  const data = JSON.stringify(originalData, null, 2);
  const link = document.createElement("a");
  // リンク先にJSON形式の文字列データを置いておく。
  link.href = "data:text/plain," + encodeURIComponent(data);
  link.download = fileName;
  // ファイルを保存する。
  link.click();

  function get_lesson_num_data() {
    //normal_lessonをjsonで取得できる形にする
    let ret = [];
    for (let i = 0; i < normal_lesson_list.length; i++) {
      ret.push([]);
      for (let j = 0; j < normal_lesson_list[i].length; j++) {
        let tmp = [...normal_lesson_list[i][j]];
        ret[i][j] = tmp;
        ret[i][j][3] = normal_lesson_list[i][j]["total"];
        ret[i][j][4] = normal_lesson_list[i][j]["continuity"];
      }
    }
    return ret;
  }

  function get_elective_lesson_num_data() {
    //合計時間数と連続時間数を返す
    let ret = [];
    for (let i = 0; i < elective_lesson_list.length; i++) {
      ret.push([]);
      for (let j = 0; j < elective_lesson_list[i].length; j++) {
        ret[i].push([]);
        ret[i][j][0] = elective_lesson_list[i][j]["total"];
        ret[i][j][1] = elective_lesson_list[i][j]["continuity"];
      }
    }
    return ret;
  }

  function get_ele_list() {
    //選択授業のリストを返す
    let ret = JSON.parse(JSON.stringify(elective_lesson_list));
    return ret;
  }

  function zero_dis(arr) {
    //一番最初の配列を消す
    //仕様で配列の最初に初期化されている配列が入っている場合仕様
    let ret = JSON.parse(JSON.stringify(arr));
    ret.shift();
    return ret;
  }
}

