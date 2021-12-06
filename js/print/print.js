document.querySelector("#print_opt_btn").addEventListener("click", (e) => {
  //印刷設定ボタン
  printer();
  // print_size_html()
  // print_target_append()
  // add_event_parent_check("#class_check");
  // add_event_parent_check("#teacher_check");
  // add_event_parent_check("#room_check");

  // print()
  // printer();
});

function refresh_table_preview_css() {
  console.log("refresh_table_preview_css");
  // 印刷プレビューにあるCSSを更新
  const table_list_root = document.querySelector("#print_table_list");
  const table_list = document
    .querySelector("#print_table_list")
    .querySelectorAll("table");
  // const table_list = document.querySelectorAll("#print_table_list");
  const paper = {
    orientation: 0,
    size: get_paperSize(),
    per: get_perPage(),
  };

  //#print_table_listの初期化
  const tmp_div = createElement("div");
  table_list.forEach((e) => {
    tmp_div.appendChild(e);
  });
  table_list_root.innerHTML = "";

  let div;
  let count = paper.per.x * paper.per.y;
  Array.prototype.forEach.call(table_list, (e, i) => {
    if (paper.per.x * paper.per.y == count) {
      count = 0;
      div = createElement("div");
      table_list_root.append(div);
    }
    e.style.cssText = `
      width: ${(1 / paper.per.x) * 100}%
    `;
    div.appendChild(e);
    count++;
  });
}

function print_size_html() {
  //印刷サイズのHTMLコードを挿入
  const obj = paper_size_list;
  let div = document.createElement("div");
  Object.keys(obj).forEach((key) => {
    let html = `<label for="${key}"><input type="radio" name="paper_sise" id="${key}" >${key}</label>`;
    if (key == "B0") {
      document.querySelector(".paper_sise_radio").append(div);
      div = document.createElement("div");
    }
    div.innerHTML += html;
  });

  document
    .querySelector(".paper_sise_radio")
    .addEventListener("change", (e) => {
      set_paper_size_event();
    });

  document.querySelector(".paper_sise_radio").append(div);
  document.querySelector("#A4").checked = true;
  set_paper_size_event();
}

document.querySelector(".per_page").addEventListener("change", (e) => {
  //ページ当たりの時間割の数
  e.target.value = e.target.value <= 0 ? 1 : e.target.value;
  refresh_table_preview_css();
});

document.querySelector(".paper_size_input").addEventListener("click", (e) => {
  refresh_table_preview_css();
});

function set_paper_size_event() {
  // 1ページのサイズセット
  const checked =
    paper_size_list[
      document.querySelector("input[name='paper_sise']:checked").id
    ];
  document.querySelector("#paper_sise_X").value = checked.x;
  document.querySelector("#paper_sise_Y").value = checked.y;
  refresh_table_preview_css();
}

const get_paperSize = () => {
  // 1ページのサイズを取得
  const ret = {
    x: document.querySelector("#paper_sise_X").value,
    y: document.querySelector("#paper_sise_Y").value,
  };
  return ret;
};

const get_perPage = () => {
  // 1ページ当たりの時間割の数を取得
  const ret = {
    x: document.querySelector("#per_page_X").value,
    y: document.querySelector("#per_page_Y").value,
  };
  return ret;
};

function printer() {
  const print_dom = document.querySelector("#print");
  document.querySelector("body").children[1].classList.toggle("dis_none");
  print_dom.classList.toggle("dis_none");
}

function print_target_append() {
  //印刷対象チェックボックスのHTML作成
  target_append(class_list, "cls", false);
  target_append(teacher_list, "teacher");
  target_append(room_list, "room");

  function target_append(list, target_name, first_out_flag = true) {
    //印刷対象チェックボックスのHTML作成
    const append_target = document.querySelector(`#${target_name}_check_list`);
    list.forEach((q, i) => {
      //配列[0]が空の場合のトラップ
      const html =
        i == 0 && first_out_flag
          ? ""
          : `
      <div>
        <label for="${target_name}_check_${i}"><input type="checkbox" id="${target_name}_check_${i}" value="${i}" name="print_target">${q}</label>
      </div>`;
      append_target.innerHTML += html;
    });
    //チェックボックスが入っているdivに対してaddEvent
    append_target.addEventListener("change", (e) => {
      //親チェックボックスじゃないとき
      if (e.target.id != target_name + "_check") {
        if (e.target.checked) {
          // 親チェックボックスのチェック
          document.querySelector(`#${target_name}_check`).checked = true;
        } else {
          //同じジャンルですべてチェックボックスが外れているとき
          //親チェックボックスのチェック解除
          if (
            !append_target.querySelectorAll('[name="print_target"]:checked')
              .length
          ) {
            document.querySelector(`#${target_name}_check`).checked = false;
          }
        }
      }
      refresh_table_preview();
      refresh_table_preview_css();
    });
  }
}

function add_event_parent_check(selecter) {
  //印刷対象の親チェックボックスを選択時のイベント関数
  //クラス・教師・教室の親チェックボックス選択時
  document.querySelector(selecter).addEventListener("change", (e) => {
    if (e.target.checked) {
      document
        .querySelector(selecter + "_list")
        .querySelectorAll("input")
        .forEach((input) => {
          input.checked = true;
        });
    } else {
      document
        .querySelector(selecter + "_list")
        .querySelectorAll("input")
        .forEach((input) => {
          input.checked = false;
        });
    }
  });
}

function refresh_table_preview() {
  // 印刷対象のチェックボックスが更新されたときに実行される関数
  const targetDom = document.querySelector("#print_table_list");
  const append_list = document.querySelectorAll('[name="print_target"]');
  targetDom.innerHTML = "";
  console.log(targetDom);
  ts = {
    x: table_SizeX,
    y: table_SizeY,
    z: timetable.length,
  };
  const trans_cls_timetable = trans_cls_index();
  const trans_teacher_timetable = timetable_source_trans(
    timetable_source_create(teacher_list),
    "教師"
  );
  const trans_room_timetable = timetable_source_trans(
    timetable_source_create(room_list),
    "教室"
  );

  // console.log(trans_cls_timetable[0][0][0], trans_room_timetable[0][0][0], trans_teacher_timetable)
  // console.log(table_create(trans_cls_timetable[0]))

  append_list.forEach((i) => {
    let key = i.id.split("_")[0];
    let val = i.value;
    let append;
    if (i.checked) {
      //テーブル作成
      switch (key) {
        case "cls":
          append = table_create(trans_cls_timetable[val]);
          break;
        case "teacher":
          append = table_create(trans_teacher_timetable[val]);
          break;
        case "room":
          append = table_create(trans_room_timetable[val]);
          break;
      }
      targetDom.append(append);
    }
  });

  function table_create(arr) {
    //tableHTML作成関数
    const _y = arr.length;
    const _x = arr[0].length;
    const table = createElement("table");
    for (let y = 0; y < _y; y++) {
      const tr = createElement("tr");
      table.append(tr);
      for (let x = 0; x < _x; x++) {
        const td = createElement("td");

        const ul = createElement("ul");
        // console.log(arr[y][x])
        Object.keys(arr[y][x]).forEach((key) => {
          const li = createElement("li");
          li.innerText = arr[y][x][key];
          ul.append(li);
        });
        td.append(ul);
        tr.append(td);
      }
    }
    return table;
  }
  function trans_cls_index() {
    //class_listからテーブルを作成する関数
    //他のとは構造が違うため作成
    let ret = [];

    for (let z = 0; z < timetable.length; z++) {
      ret.push([]);
      for (let y = 0; y < timetable[z].length; y++) {
        ret[z].push([]);
        for (let x = 0; x < timetable[z][y].length; x++) {
          ret[z][y].push([]);

          let tmp = get_lesson_status(z, timetable[z][y][x]);
          tmp = trans_after_lesson([z, timetable[z][y][x], tmp[1], tmp[2]]);
          ret[z][y][x] = {
            li1: tmp[0],
            li2: tmp[1],
            li3: tmp[2],
          };
        }
      }
    }
    return ret;
  }
}

// document.querySelector("#auto_create").click();
//テストのため後で消す

// print_size_html();
// printer();
// print_target_append();
// add_event_parent_check("#cls_check");
// add_event_parent_check("#teacher_check");
// add_event_parent_check("#room_check");
