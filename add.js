
class_add.addEventListener('click',function(){
    let name = document.getElementById('class_text').value;
    if(name !=""){
        let newElement = document.createElement("p").textContent = name;
        let child = document.getElementById("class_add");
        document.getElementById("lesson").insertBefore(newElement, child.nextSibling);
        let newElementb = document.createElement("button");
        let newElements = document.createElement("span");
        newElementb.setAttribute("class","delete_btn");
        newElements.setAttribute("class","material-icons font_10").textContent = "remove";
        newElementb.appendChild(newElements);
        newElement.appendChild(newElementb);
        newElement.insertBefore(newElementb, newElement.lastChild);
        newElement.addEventListener('click', e => newElement.style.display = "none", false);
    }    
},false);


teacher_add.addEventListener('click',function(){
    let name = document.getElementById('teacher_text').value;
    if(name!=""){
        let newElement = document.createElement("p");
        let newContent = document.createTextNode(name);
        newElement.appendChild(newContent);
        let parent = document.getElementById("teacher");
        let child = document.getElementById("teacher_add");
        parent.insertBefore(newElement, child.nextSibling);
        let newElementb = document.createElement("button");
        let newElements = document.createElement("span");
        newElementb.setAttribute("class","delete_btn");
        newElements.setAttribute("class","material-icons font_10");
        let newContents = document.createTextNode("remove");
        newElements.appendChild(newContents);
        newElementb.appendChild(newElements);
        newElement.appendChild(newElementb);
        newElement.insertBefore(newElementb, newElement.lastChild);
        newElements.style.fontSize="10px"
        child.style.marginBottom="20px"
        newElementb.style.borderRadius="80px";
        newElementb.style.marginLeft="30px";
        newElement.addEventListener('click',function(){
            newElement.style.display = "none";
        },false);
    }
},false);

lessonroom_add.addEventListener('click',function(){
    let name = document.getElementById('lessonroom_text').value;
    if(name!=""){
        let newElement = document.createElement("p").textContent = name;
        newElement.appendChild(newContent);
        let parent = document.getElementById("lessonroom");
        let child = document.getElementById("lessonroom_add");
        parent.insertBefore(newElement, child.nextSibling);
        let newElementb = document.createElement("button");
        let newElements = document.createElement("span");
        newElementb.setAttribute("class","delete_btn");
        newElements.setAttribute("class","material-icons font_10");
        let newContents = document.createTextNode("remove");
        newElements.appendChild(newContents);
        newElementb.appendChild(newElements);
        newElement.appendChild(newElementb);
        newElement.insertBefore(newElementb, newElement.lastChild);
        newElements.style.fontSize="10px"
        child.style.marginBottom="20px"
        newElementb.style.borderRadius="80px";
        newElementb.style.marginLeft="30px";
        newElement.addEventListener('click',function(){
            newElement.style.display = "none";
        },false);
    }    
},false);



/*classlist_add.addEventListener('click',function(){

    //cnm();
    let cn = document.getElementById('classname_text').value;
    if(cn!=""){

        let newElement = document.createElement("p");
        let newContent = document.createTextNode(cn);
        newElement.appendChild(newContent);
        newElement.setAttribute("class","cd_child"); 

        let cd_parent = document.getElementById("classname");
        let cd_child = document.getElementById("classlist_add");

        console.log(cd_parent);
        console.log(cd_child);

        cd_parent.insertBefore(newElement, cd_child.nextSibling);



        let newElementb = document.createElement("button");
        let newElements = document.createElement("span");
        newElementb.setAttribute("class","l-button");
        newElements.setAttribute("class","material-icons");
        let newContents = document.createTextNode("remove");
        newElements.appendChild(newContents);
        newElementb.appendChild(newElements);
        newElement.appendChild(newElementb);
            

        newElement.insertBefore(newElementb, newElement.lastChild);

        newElements.style.fontSize="10px"
        l_child.style.marginBottom="20px"
        newElementb.style.borderRadius="80px";
        newElementb.style.marginLeft="30px";
        lessonroom_text.style.marginTop="-13px";


        newElement.addEventListener('click',function(){

            newElement.style.display = "none";

        },false);

    }

},false);*/