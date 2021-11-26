(function () {
  const csv_preview = document.querySelector("#csv_preview");
  const csv_preview_btn = document.querySelector("#csv_preview_btn");


  csv_preview_btn.addEventListener("click", e => {

    // console.log(csv_preview.classList.toggle('dis_none'))//消えるときtrue/つけるときfalse

    if (csv_preview.classList.toggle('dis_none')) {
      //消えたとき

    } else {
      //ついたとき
      csv_preview.innerHTML = "";

      const ts = {
        x: table_SizeX,
        y: table_SizeY,
        z: timetable.length
      }

      //先生-データ作成
      const teacher_timetable = teacher_timetable_create();
      //先生-テーブル出力
      teacher_timetable_table(teacher_timetable)



      //教室


    }
  });

  function teacher_timetable_create() {
    let ret = [];
    class Lesson_data {
      constructor(_cls_num = 0, _lsn_num = 0) {
        this.lsn_num = _lsn_num;
        this.cls_num = _cls_num;
      }
    }
    const ts = {
      x: table_SizeX,
      y: table_SizeY,
      z: timetable.length
    }
    //教師時間割の配列を返す
    teacher_list.forEach((v, i) => {
      //教師配列の作成
      ret.push([]);
      for (let y = 0; y < ts.y; y++) {
        ret[i].push([]);
        for (let x = 0; x < ts.x; x++) {
          ret[i][y].push([]);
        }
      }
      // console.log(ret);
    });

    teacher_list.forEach((v, i) => {
      //教師配列にデータの挿入
      for (let z = 0; z < ts.z; z++) {
        //時間割軸
        for (let y = 0; y < ts.y; y++) {
          for (let x = 0; x < ts.x; x++) {
            const status = get_lesson_status(z, timetable[z][y][x]);
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

  function teacher_timetable_table(arr) {
    const ts = {
      x: table_SizeX,
      y: table_SizeY,
      z: timetable.length
    }
    teacher_list.forEach((v, i) => {

      if (i > 0) {//1から開始
        const div = cre_dom("div");
        let p = cre_dom("p", v);
        const table = table_create(ts.x, ts.y);
        //時間割軸
        for (let y = 0; y < ts.y; y++) {
          for (let x = 0; x < ts.x; x++) {
            arr[i][y][x].forEach(ele => {
              const status = get_lesson_status(ele.cls_num, ele.lsn_num);
              // if (status[1] != 0) {
              //   console.log(status);
              // }
              // const lesson = trans_after_lesson([z, timetable[z][y][x], status[1], status[2]]);
              // console.log(lesson);
              status.forEach((val) => {
                if (val[1] == i) {
                  let lesson = [];
                  if (timetable[ele.cls_num][y][x] >= 100) {
                    //選択授業
                    lesson = trans_after_lesson([ele.cls_num, 0, val[1], val[2]]);
                    lesson[0] = val[0];
                  } else {
                    //通常授業
                    lesson = trans_after_lesson([ele.cls_num, timetable[ele.cls_num][y][x], val[1], val[2]]);
                  }
                  const td = get_td(table, x, y);
                  td_li(td, 0).innerText += lesson[0] + "・";
                  td_li(td, 1).innerText += lesson[1] + "・";
                  td_li(td, 2).innerText += lesson[2] + "・";
                }
              });
            });
          }
        }

        div.append(p);
        div.append(table);
        csv_preview.append(div);
        // console.log(cre_dom("p"))
      }
    });
  }

  function cre_dom(name, innerText = "") {
    const ret = document.createElement(name);
    ret.innerText = innerText;
    return ret;
  }

  function trans_after_lesson([cls, num, teacher, room]) {
    num = zt(num);
    teacher = zt(teacher);
    room = zt(room);
    let name = num < 100 ? ntgsn(cls, num) : "選択授業" + (num - 99);
    return [name, tgt(teacher), tgr(room)];
  }

  function trans_after_ele_lesson([cls, num, teacher, room]) {
    num = zt(num);
    teacher = zt(teacher);
    room = zt(room);
    let name = num < 100 ? ntgsn(cls, num) : "選択授業" + (num - 99);
    return [name, tgt(teacher), tgr(room)];
  }

  function table_create(_x, _y) {
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

  function get_lesson_status(z, num) {
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
}());