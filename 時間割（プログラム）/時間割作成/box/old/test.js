let list = document.getElementById("list");
let teacher_list = document.getElementById("teacher_list");

let add_teacher = document.getElementById("add_teacher");
let add_class = document.getElementById("add_class");
let add_study = document.getElementById("add_study");

let class_set = document.querySelector(".class_set");
let teacher_set = document.querySelector(".teacher_set");

add_teacher.addEventListener("click", e => {
  teacher_list.appendChild(teacher_set.cloneNode(true));

});

add_class.addEventListener("click", e => {
  list.appendChild(class_set.cloneNode(true));
});

//del_class.addEventListener("click", e => {
//  del_class
//});
