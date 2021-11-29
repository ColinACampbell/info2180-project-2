window.onload = function(){
    listenevent();

}

function listenevent(){
    let submit = document.querySelector(".btn");
    
    submit.addEventListener('click', function(event){
        formissue(); event.preventDefault(); 
        
        
    }) 
}

function formissue(){
    var count = 0; 
    var formdata ={assign: form.assign.value, type1: form.type1.value, priority: form.priority.value, title: form.title.value, description: form.description.value};
    checkempty(formdata["title"], formdata["description"], formdata["type1"], formdata["priority"], formdata["assign"]);
    checkcorrect(formdata["title"], formdata["description"]);

    function checkempty(title, description, type, prior, assigns){
      if (title == "" || description == ""){
          var title1 = document.getElementById("title");
          var des1 = document.getElementById("description");
          title1.style.backgroundColor = "red";
          des1.style.backgroundColor = "red";
          count = 1;
          alert("Empty fields! Please fill out all input fields.");
      }
      
      if (title != "" ){
          var title2 = document.getElementById("title");
          title2.style.backgroundColor = "white";
          //alert("Not empty");
  }
      if (description != "" ){
          var des2 = document.getElementById("description");
          des2.style.backgroundColor = "white";
          //alert("Not empty description");      
}
      if (type == "Blank" ||prior == "Blank" ||assigns == "Blank"){
          alert("All fields must be filled out. Please select appropriate options from all drop down menus.");
      }
}
    function checkcorrect(title, description){
        if (title != "" || description != ""){
            var regEx =  /^[0-9a-zA-Z]+$/;
            if(!(title.match(regEx)) || !(description.match(regEx))){
                alert("Enter only alphanumeric characters into the description and/or title fields.");

            }
        }


    }
}





