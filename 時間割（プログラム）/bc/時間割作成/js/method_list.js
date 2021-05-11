//function get_cell(x, y, z) {
//  return document.getElementsByClassName(z + "-" + y + "-" + x)[0];
//}
//
//function set_cell(x, y, z) {
//  let ele = get_cell(x, y, z);
//  ele.innerHTML =
//    "<ul>" +
//    "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][0] + "</li>" +
//    "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][1] + "</li>" +
//    "<li class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][2] + "</li>" +
//    "</ul>";
//}
//
//function z_color_chenge(x, y) {
//  for (let z = 0; z < timetable.length; z++) {
//    for (let suf = 0; suf < timetable[z][y][x].length; suf++) {
//      if (check_timetable(x, y, z, suf)) {
//        get_cell(x, y, z).children[0].children[suf].style.color = "red";
//      } else {
//        get_cell(x, y, z).children[0].children[suf].style.color = "black";
//      }
//    }
//  }
//}