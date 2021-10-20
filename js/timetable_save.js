window.addEventListener('load', () => {
  const download = document.getElementById('download');
  download.addEventListener('click', download_btn_clicked);
});

function download_btn_clicked(evt) {
  evt.preventDefault();
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  var content = '';

  for (let z = 0; z < timetable.length; z++) {
    for (let y = 0; y < timetable[z].length; y++) {
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
    content.unshift("test"+z+'\n');
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

