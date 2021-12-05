window.addEventListener("load", (e) => {
  const download = document.getElementById("download");
  download.addEventListener("click", download_btn_clicked, e);
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
  var bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  var content = "";
  // //クラスごと時間割
  for (let z = 0; z < timetable.length; z++) {
    let name = "";
    timetable[z][0].forEach((e, i) => {
      name += i == 0 ? class_list[z] + "," : ",";
    });
    console.log(name);
    content += name.slice(0, -1) + "\r\n";

    // content += "," + get_youbi(0, 4) + '\r\n';
    for (let y = 0; y < timetable[z].length; y++) {
      // content += (y + 1) + ",";
      let arr = [];
      for (let x = 0; x < timetable[z][y].length; x++) {
        let tmp = get_lesson_status(z, timetable[z][y][x]);
        tmp = trans_after_lesson([z, timetable[z][y][x], tmp[1], tmp[2]]);
        arr.push(tmp);
        // tmp = '"' + tmp[0] + "\r\n" + tmp[1] + "\r\n" + tmp[2] + '"';
        // content += tmp + ",";
      }
      let str1 = "";
      let str2 = "";
      let str3 = "";
      arr.forEach((v, i) => {
        str1 += v[0] + ",";
        str2 += v[1] + ",";
        str3 += v[2] + ",";
      });
      content +=
        str1.slice(0, -1) +
        "\r\n" +
        str2.slice(0, -1) +
        "\r\n" +
        str3.slice(0, -1) +
        "\r\n";
      // content += "\r\n";
    }
    content += "\r\n";
  }
  //教師・教室時間割

  ts = {
    x: table_SizeX,
    y: table_SizeY,
    z: timetable.length,
  };

  const teacher_timetable = timetable_source_create(teacher_list);
  timetable_source_trans(teacher_timetable, "教師").forEach((y, _z) => {
    if (_z != 0) {
      // content += teacher_list[_z] + "\r\n"; //教師名
      let name = "";
      teacher_timetable[_z][0].forEach((e, i) => {
        name += i == 0 ? teacher_list[_z] + "," : ",";
      });
      content += name.slice(0, -1) + "\r\n";
      // content += "," + get_youbi(0, 4) + '\r\n';
      y.forEach((x, _y) => {
        // content += (_y + 1) + ",";
        let arr = [];
        x.forEach((data, x) => {
          arr.push(data);
          // let tmp = '"' + data.li1 + "\r\n" + data.li2 + "\r\n" + data.li3 + '"';
          // content += tmp + ",";
        });
        let str1 = "";
        let str2 = "";
        let str3 = "";
        arr.forEach((v) => {
          str1 += v.li1 + ",";
          str2 += v.li2 + ",";
          str3 += v.li3 + ",";
        });
        content +=
          str1.slice(0, -1) +
          "\r\n" +
          str2.slice(0, -1) +
          "\r\n" +
          str3.slice(0, -1) +
          "\r\n";
        // content += "\r\n";
      });
      content += "\r\n";
    }
  });

  const room_timetable = timetable_source_create(room_list);
  timetable_source_trans(room_timetable, "教室").forEach((y, _z) => {
    if (_z != 0) {
      // content += room_list[_z] + "\r\n"; //教師名
      let name = "";
      room_timetable[_z][0].forEach((e, i) => {
        name += i == 0 ? room_list[_z] + "," : ",";
      });
      content += name.slice(0, -1) + "\r\n";
      // content += "," + get_youbi(0, 4) + '\r\n';
      y.forEach((x, _y) => {
        // content += (_y + 1) + ",";
        let arr = [];
        x.forEach((data, x) => {
          arr.push(data);
          // let tmp = '"' + data.li1 + "\r\n" + data.li2 + "\r\n" + data.li3 + '"';
          // content += tmp + ",";
        });
        let str1 = "";
        let str2 = "";
        let str3 = "";
        arr.forEach((v) => {
          str1 += v.li1 + ",";
          str2 += v.li2 + ",";
          str3 += v.li3 + ",";
        });
        content +=
          str1.slice(0, -1) +
          "\r\n" +
          str2.slice(0, -1) +
          "\r\n" +
          str3.slice(0, -1) +
          "\r\n";
        // content += "\r\n";
      });
      content += "\r\n";
    }
  });

  var blob = new Blob([bom, content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = "時間割.csv";
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
