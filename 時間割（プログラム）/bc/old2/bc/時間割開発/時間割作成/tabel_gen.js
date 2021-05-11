let setval = document.getElementById("setval");
let btn = document.getElementById("btn");
let open_log = document.getElementById("open_log");
let inx = document.getElementById("inx");
let iny = document.getElementById("iny");
let inz = document.getElementById("inz");

let tx = 0;
let ty = 0;
let tz = 0;

let timetable;

//for(let z = 0; z < tz; z++) {
//  for (let y = 0; y < ty; y++) {
//    for (let x = 0; x < tx; x++) {
//    }
//  }
//}
open_log.addEventListener("click", e => {
  console.log(timetable);
});
btn.addEventListener("click", e => {
  tx = inx.value;
  ty = iny.value;
  tz = inz.value;
  timetable = new Array(tz);
  for (let z = 0; z < tz; z++) {
    timetable[z] = new Array(ty);
    for (let y = 0; y < ty; y++) {
      timetable[z][y] = new Array(tx);
      for (let x = 0; x < tx; x++) {
        timetable[z][y][x] = "配列" + z + "-" + y + "-" + x;
      }
    }
  }

  var body = document.getElementsByTagName("body")[0];
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  for (var z = 0; z < tz; z++) {
    for (var y = 0; y < ty; y++) {
      var row = document.createElement("tr");
      for (var x = 0; x < tx; x++) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode("x");
        cell.setAttribute("id", z + "-" + y + "-" + x);
        cell.addEventListener("click", e => {
          cell_click_event(e);
        });
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
  }

  ty = iny.value;
  tx = inx.value;
});

function cell_click_event(e) {
  let idx = Number(e.target.id.split('-')[2]);
  let idy = Number(e.target.id.split('-')[1]);
  let idz = Number(e.target.id.split('-')[0]);
  timetable[idz][idy][idx] = setval.value;
  get_cell(idx, idy, idz).textContent = setval.value;
  check_timetable(timetable[idz][idy][idx], idx, idy, idz, true);
}

function check_timetable(str, sx, sy, sz, check_flag) {
  let flag = false;
  for (let z = 0; z < tz; z++) {
    if (z != sz && timetable[z][sy][sx] == str) {
      flag = true;
      get_cell(sx, sy, z).style.color = "red";
    }
  }
  console.log(flag);
  if (flag) {
    console.log(sz);
    get_cell(sx, sy, sz).style.color = "red";
  } else {
    for (let i = 0; i < timetable.length; i++) {
      if (check_flag) {
        check_timetable(timetable[i][sy][sx], sx, sy, i, false);
      }
    }
    get_cell(sx, sy, sz).style.color = "black";
  }
}

function get_cell(x, y, z) {
  return document.getElementById(z + "-" + y + "-" + x)
}
