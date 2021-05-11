
class_add.addEventListener('click',function(){
        
    let c_name = document.getElementById('class_text').value;
    if(c_name!=""){

        let newElement = document.createElement("p");
        let newContent = document.createTextNode(c_name);
        newElement.appendChild(newContent);
        newElement.setAttribute("class","c-child"); 

        let c_parent = document.getElementById("lesson");
        let c_child = document.getElementById("class_add");

        c_parent.insertBefore(newElement, c_child.nextSibling);



        let newElementb = document.createElement("button");
        let newElements = document.createElement("span");
        newElementb.setAttribute("class","c-button");
        newElements.setAttribute("class","material-icons");
        let newContents = document.createTextNode("remove");
        newElements.appendChild(newContents);
        newElementb.appendChild(newElements);
        newElement.appendChild(newElementb);
            

        newElement.insertBefore(newElementb, newElement.lastChild);

        newElements.style.fontSize="10px"
        c_child.style.marginBottom="20px"
        newElementb.style.borderRadius="80px";
        newElementb.style.marginLeft="30px";


        newElement.addEventListener('click',function(){

            newElement.style.display = "none";

        },false);

    }    

},false);


teacher_add.addEventListener('click',function(){

    
    let t_name = document.getElementById('teacher_text').value;
    if(t_name!=""){

        let newElement = document.createElement("p");
        let newContent = document.createTextNode(t_name);
        newElement.appendChild(newContent);
        newElement.setAttribute("class","t-child"); 

        let t_parent = document.getElementById("teacher");
        let t_child = document.getElementById("teacher_add");

        t_parent.insertBefore(newElement, t_child.nextSibling);



        let newElementb = document.createElement("button");
        let newElements = document.createElement("span");
        newElementb.setAttribute("class","t-button");
        newElements.setAttribute("class","material-icons");
        let newContents = document.createTextNode("remove");
        newElements.appendChild(newContents);
        newElementb.appendChild(newElements);
        newElement.appendChild(newElementb);
        

        newElement.insertBefore(newElementb, newElement.lastChild);

        newElements.style.fontSize="10px"
        t_child.style.marginBottom="20px"
        newElementb.style.borderRadius="80px";
        newElementb.style.marginLeft="30px";


        newElement.addEventListener('click',function(){

            newElement.style.display = "none";

        },false);


    }

},false);