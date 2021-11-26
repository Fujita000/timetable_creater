window.addEventListener('load', (e) => {
  const download = document.getElementById('download');
  download.addEventListener('click', download_btn_clicked, e);
});
function get_youbi(s, e) {
  //sで指定eまで取得
  //s=0,e=4のとき=>"月,火,水,木,金"
  let youbi = ["月", "火", "水", "木", "金", "土", "日"];
  let ret = "";
  for (let i = s; i <= e; i++) {
    ret += youbi[i] + ",";
  }
  return ret;
}
function download_btn_clicked(evt) {
  evt.preventDefault();
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  var content = '';

  for (let z = 0; z < timetable.length; z++) {
    content += class_list[z] + '\n';//クラス名
    content += "," + get_youbi(0, 4) + '\n';
    for (let y = 0; y < timetable[z].length; y++) {
      content += (y + 1) + ",";
      for (let x = 0; x < timetable[z][y].length; x++) {
        let tmp = get_lesson_status(z, timetable[z][y][x]);
        tmp = trans_after_lesson([z, timetable[z][y][x], tmp[1], tmp[2]]);
        tmp = '"' +
          tmp[0] + '\n' +
          tmp[1] + '\n' +
          tmp[2] + '"';
        content += tmp + ',';
      }
      content += '\n';
    }
    content += '\n';
  }

  var blob = new Blob([bom, content], { "type": "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = '時間割.csv';
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

