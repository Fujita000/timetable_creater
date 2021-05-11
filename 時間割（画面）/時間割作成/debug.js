let copy_log = document.getElementById("copy_log");
copy_log.addEventListener("click", e => {

  var body = document.getElementsByTagName("body")[0];
  for (var z = 0; z < tz; z++) {
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var y = 0; y < ty; y++) {
      var row = document.createElement("tr");
      for (var x = 0; x < tx; x++) {
        var cell = document.createElement("td");
        cell.innerHTML =
          "<p class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][0] + "</p>" +
          "<p class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][1] + "</p>" +
          "<p class = " + z + "-" + y + "-" + x + ">" + timetable[z][y][x][2] + "</p>";
        cell.setAttribute("class", z + "-" + y + "-" + x);
        cell.addEventListener("click", e => {
          cell_click_event(e);
        });
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
  }
});
