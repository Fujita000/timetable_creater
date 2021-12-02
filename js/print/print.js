document.querySelector("#print_opt_btn").addEventListener("click", e => {
  //印刷設定ボタン
  printer()
  // print_size_html()
  // print_target_append()
  // add_event_parent_check("#class_check");
  // add_event_parent_check("#teacher_check");
  // add_event_parent_check("#room_check");


  // print()
  // printer();
});
print_size_html()
printer()
print_target_append()
add_event_parent_check("#class_check");
add_event_parent_check("#teacher_check");
add_event_parent_check("#room_check");

const get_perPage = () => {
  const ret = {
    x: document.querySelector("#per_page_X").value,
    y: document.querySelector("#per_page_Y").value,
  }
  return ret;
}



function print_size_html() {
  const obj = paper_size_list;
  let div = document.createElement("div");
  Object.keys(obj).forEach(key => {
    let html = `<label for="${key}"><input type="radio" name="paper_sise" id="${key}" >${key}</label>`
    if (key == "B0") {
      document.querySelector(".paper_sise_radio").append(div);
      div = document.createElement("div");
    }
    div.innerHTML += html;
  });

  document.querySelector(".paper_sise_radio").addEventListener("change", e => {
    paper_size_set_event()
  });

  document.querySelector(".paper_sise_radio").append(div);
  document.querySelector("#A4").checked = true;
  paper_size_set_event();
}







document.querySelector(".per_page").addEventListener("change", e => {
  //ページ当たりの時間割の数
  e.target.value = e.target.value <= 0 ? 1 : e.target.value;
});





function paper_size_set_event() {
  const checked = paper_size_list[document.querySelector("input[name='paper_sise']:checked").id];
  const X = document.querySelector("#paper_sise_X").value = checked.x;
  const Y = document.querySelector("#paper_sise_Y").value = checked.y;
}

function printer() {
  const print_dom = document.querySelector("#print");
  document.querySelector("body").children[1].classList.toggle("dis_none");
  // print_dom.classList.toggle("dis_none");
}






function print_target_append() {
  target_append(class_list, "class", false)
  target_append(teacher_list, "teacher")
  target_append(room_list, "room")

  function target_append(list, target_name, first_out_flag = true) {
    const append_target = document.querySelector(`#${target_name}_check_list`);
    list.forEach((q, i) => {
      //配列[0]が空の場合のトラップ
      const html = (i == 0 && first_out_flag) ? "" : `
      <div>
        <label for="${target_name}_check_${i}"><input type="checkbox" id="${target_name}_check_${i}" value="${i}" name="print_target">${q}</label>
      </div>`
      append_target.innerHTML += html;
    })
    //チェックボックスが全て入っているdivに対してaddEvent
    append_target.addEventListener("change", e => {
      //親チェックボックスじゃないとき
      if (e.target.id != target_name + "_check") {
        if (e.target.checked) {
          // 親チェックボックスのチェック
          document.querySelector(`#${target_name}_check`).checked = true;
        } else {
          //同じジャンルですべてチェックボックスが外れているとき
          //親チェックボックスのチェック解除
          if (!(append_target.querySelectorAll('[name="print_target"]:checked').length)) {
            document.querySelector(`#${target_name}_check`).checked = false;
          }
        }
      }

      refresh_table_preview()
    })
  }
}




function add_event_parent_check(selecter) {
  //クラス・教師・教室の親チェックボックス選択時
  document.querySelector(selecter).addEventListener("change", e => {
    if (e.target.checked) {
      document.querySelector(selecter + "_list").querySelectorAll("input").forEach(input => {
        input.checked = true;
      })
    } else {
      document.querySelector(selecter + "_list").querySelectorAll("input").forEach(input => {
        input.checked = false;
      })
    };
  });
}

function refresh_table_preview(){
  const targetDom = document.querySelector("#print_table_list");
  const append_list = document.querySelectorAll('[name="print_target"]')
  targetDom.innerHTML = "";
  append_list.forEach(i=>{
    if(i.checked)targetDom.innerHTML += `<p>${i.value}</p>`;
  });
  // console.log(append_list)
}