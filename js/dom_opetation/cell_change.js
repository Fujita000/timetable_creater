let cell_change_btn = document.getElementById("cell_change_btn");
cell_change_btn.addEventListener("click", e => {
  cell_change_flag = !cell_change_flag;
  elaser_flag = false;
})

//cellの入れ替えイベントのフラグtrueでできる
let cell_change_flag = false;
//値がnullではないとき入れ替えが可能になる
let cell_change_target = [null, null, null];

function cell_change_event(e) {
  let q = parent_tag_search(e.target, "td");
  let d = get_td_coordinate(q);
  if (cell_change_target[0] != null && now_choice_class == d[0]) {
    let t = cell_change_target;
    let tmp = timetable[d[0]][d[1]][d[2]]
    timetable[d[0]][d[1]][d[2]] = timetable[t[0]][t[1]][t[2]];
    timetable[t[0]][t[1]][t[2]] = tmp;
    update_cell(t);
    update_cell(d);
    z_color_chenge(t[2], t[1]);
    z_color_chenge(d[2], d[1]);
    cell_change_target = [null, null, null];
  } else {
    cell_change_target = d;
    now_choice_class = d[0];
  }
}

function cell_change_reset() {
  cell_change_flag = false;
  cell_change_target = [null, null, null];
}