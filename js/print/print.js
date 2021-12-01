const print_dom = document.querySelector("#print");
const print_btn = document.querySelector("#print_btn");









print_btn.addEventListener("click", e => {
  printer()
  // print()
  // printer();
});


function printer() {
  document.querySelector("body").children[1].classList.toggle("dis_none");
  print_dom.classList.toggle("dis_none");
}




