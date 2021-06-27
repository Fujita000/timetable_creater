infoTAB_Enter_event("class_name_text", "class_add_btn");
infoTAB_Enter_event("teacher_name_text", "teacher_add_btn");
infoTAB_Enter_event("room_name_text", "room_add_btn");
function infoTAB_Enter_event(input, btn) {
  document.getElementById(input).addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      document.getElementById(btn).click();
    }
  });;

}