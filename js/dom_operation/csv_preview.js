const csv_preview = document.querySelector("#csv_preview");
const csv_preview_btn = document.querySelector("#csv_preview_btn");
let ts;//テーブルサイズ
csv_preview_btn.addEventListener("click", e => {
  if (csv_preview.classList.toggle('dis_none')) {
    //消えたとき
  } else {
    //ついたとき
    csv_preview.innerHTML = "";

    ts = {
      x: table_SizeX,
      y: table_SizeY,
      z: timetable.length
    }

    const teacher_timetable = timetable_source_create(teacher_list);
    timetable_source_to_table(timetable_source_trans(teacher_timetable, "教師"), teacher_list)
    const room_timetable = timetable_source_create(room_list);
    timetable_source_to_table(timetable_source_trans(room_timetable, "教室"), room_list)
  }
});

function name_check(source, add_name) {
  // すでにつかされている名前の時に追加しない
  let ret = false;
  arr = source.split("・");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == add_name) {
      return true;
    }
  }
  return false;
}

function cre_dom(name, innerText = "") {
  const ret = document.createElement(name);
  ret.innerText = innerText;
  return ret;
}

function trans_after_class(cls_num) {
  return class_list[cls_num];
}

function cp_trans_after_lesson([cls, num, teacher, room]) {
  num = zt(num);
  teacher = zt(teacher);
  room = zt(room);
  let name = num < 100 ? ntgsn(cls, num) : "選択授業" + (num - 99);
  return [name, tgt(teacher), tgr(room)];
}

function cp_table_create(_x, _y) {
  const table = cre_dom("table");
  for (let y = 0; y < _y; y++) {
    const tr = cre_dom("tr");
    table.append(tr);
    for (let x = 0; x < _x; x++) {
      const td = cre_dom("td");

      const ul = cre_dom("ul")
      ul.append(cre_dom("li"))
      ul.append(cre_dom("li"))
      ul.append(cre_dom("li"))

      td.append(ul);
      tr.append(td);
    }
  }
  return table;
}

function get_td(table, x, y) {
  return table.rows[y].cells[x];
}

function cp_get_lesson_status(z, num) {
  let ret = [];
  if (num >= 100) {
    //選択授業
    num = num - 100;//0から開始
    ret = elective_lesson_list[z][num];
  } else {
    let arr = [];
    arr[0] = normal_lesson_list[z][num][0];
    arr[1] = normal_lesson_list[z][num][1];
    arr[2] = normal_lesson_list[z][num][2];
    ret.push(arr);
  }
  return ret;
}

function td_li(td, li_num) {
  return td.children[0].children[li_num]
}

function timetable_source_create(list) {
  let ret = [];

  list.forEach((v, i) => {
    //教室配列の作成
    ret.push([]);
    for (let y = 0; y < ts.y; y++) {
      ret[i].push([]);
      for (let x = 0; x < ts.x; x++) {
        ret[i][y].push([]);
      }
    }
  });

  list.forEach((v, i) => {
    //教室配列にデータの挿入
    for (let z = 0; z < ts.z; z++) {
      //時間割軸
      for (let y = 0; y < ts.y; y++) {
        for (let x = 0; x < ts.x; x++) {
          const status = cp_get_lesson_status(z, timetable[z][y][x]);
          status.forEach((v) => {
            if (v[1] == i && i != 0) {
              ret[i][y][x].push({
                //テーブルデータの中身
                lsn_num: timetable[z][y][x],
                cls_num: z
              })
            }
          });
        }
      }
    }
  });
  return ret;
}

function timetable_source_trans(arr, list_name) {
  // list_name
  // 教師:teacher_list
  // 教室:room_list
  let offset, list;
  if (list_name == "教師") {
    offset = 2
    list = teacher_list;
  } else if (list_name == "教室") {
    offset = 1
    list = room_list;
  }
  let ret = [];

  arr.forEach((v, i) => {
    ret.push([]);
    for (let y = 0; y < ts.y; y++) {
      ret[i].push([]);
      for (let x = 0; x < ts.x; x++) {
        ret[i][y].push([]);
        let td = {
          li1: "",
          li2: "",
          li3: "",
        };
        ret[i][y][x] = td;
      }
    }
  });
  list.forEach((v, i) => {
    if (i > 0) {//1から開始
      //時間割軸
      for (let y = 0; y < ts.y; y++) {
        for (let x = 0; x < ts.x; x++) {
          arr[i][y][x].forEach(data => {
            const status = cp_get_lesson_status(data.cls_num, data.lsn_num);
            status.forEach((val) => {
              if (val[1] == i) {
                let lesson = [];
                if (timetable[data.cls_num][y][x] >= 100) {
                  //選択授業
                  lesson = cp_trans_after_lesson([data.cls_num, 0, val[1], val[2]]);
                  lesson[0] = val[0];
                } else {
                  //通常授業
                  lesson = cp_trans_after_lesson([data.cls_num, timetable[data.cls_num][y][x], val[1], val[2]]);
                }
                //同名ではないときに追加
                if (!name_check(ret[i][y][x].li1, lesson[0])) ret[i][y][x].li1 += ret[i][y][x].li1 == "" ? lesson[0] : "・" + lesson[0];//コース
                if (!name_check(ret[i][y][x].li2, lesson[offset])) ret[i][y][x].li2 += ret[i][y][x].li2 == "" ? lesson[offset] : "・" + lesson[offset];//教室
                if (!name_check(ret[i][y][x].li3, trans_after_class(data.cls_num))) ret[i][y][x].li3 += ret[i][y][x].li3 == "" ? trans_after_class(data.cls_num) : "・" + trans_after_class(data.cls_num);//クラス
              }
            });
          });
        }
      }
    }
  });
  return ret;
}

function timetable_source_to_table(arr, target_list) {
  target_list.forEach((v, i) => {
    if (i > 0) {//1から開始
      const div = cre_dom("div");
      let p = cre_dom("p", v);
      const table = cp_table_create(ts.x, ts.y);
      //時間割軸
      for (let y = 0; y < ts.y; y++) {
        for (let x = 0; x < ts.x; x++) {
          let data = arr[i][y][x]
          const td = get_td(table, x, y);
          td_li(td, 0).innerText += td_li(td, 0).innerText == "" ? data.li1 : "・" + data.li1;//コース
          td_li(td, 1).innerText += td_li(td, 1).innerText == "" ? data.li2 : "・" + data.li2;//教師
          td_li(td, 2).innerText += td_li(td, 2).innerText == "" ? data.li3 : "・" + data.li3;//クラス
        }
      }
      div.append(p);
      div.append(table);
      csv_preview.append(div);
    }
  });
}