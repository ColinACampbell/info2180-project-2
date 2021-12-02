window.onload = function () {

    const membersSelect = document.getElementById('assign')
    loadMembers(membersSelect, members);
    listenevent();

}

const loadMembers = (membersSelect, members) => {


    members.forEach((member) => {
        var opt = document.createElement('option');
        opt.value = member.id;
        opt.innerHTML = member.firstName + " " + member.lastName;
        membersSelect.appendChild(opt);
    })

}

function listenevent() {
    let submit1 = document.querySelector(".btn");

    submit1.addEventListener('click', function (event) {
        formissue(); isValid(); getdata(); home(); event.preventDefault();


    })
}

function formissue() {
    var count = 0;
    var formdata = { assign: form.assign.value, type1: form.type1.value, priority: form.priority.value, title: form.title.value, description: form.description.value };
    checkempty(formdata["title"], formdata["description"], formdata["type1"], formdata["priority"], formdata["assign"]);
    checkcorrect(formdata["title"], formdata["description"]);

    function checkempty(title, description, type, prior, assigns) {
        if (title == "" || description == "") {
            var title1 = document.getElementById("title");
            var des1 = document.getElementById("description");
            title1.style.backgroundColor = "red";
            des1.style.backgroundColor = "red";
            count = 1;
            //alert("INVALID ENTRY: Empty fields! Please Check The Textfield(s) Hightlighted In Red.");
        }

        if (title != "") {
            var title2 = document.getElementById("title");
            title2.style.backgroundColor = "white";
            //alert("Not empty");
        }
        if (description != "") {
            var des2 = document.getElementById("description");
            des2.style.backgroundColor = "white";
            //alert("Not empty description");      
        }
        if (type == "Blank" || prior == "Blank" || assigns == "Blank") {
            count = 1;
            //alert("INVALID ENTRY: Please select appropriate options from all drop down menus.");
        }
    }
    function checkcorrect(title, description) {
        var regEx = /^[0-9a-zA-Z]+$/;
        if (title != "") {
            if (!(title.match(regEx))) {
                var title1 = document.getElementById("title");
                title1.style.backgroundColor = "red";
                count = 1;
                //alert("INVALID ENTRY: Enter only alphanumeric characters into the description and/or title fields.");

            }
        }
        if (description != "") {
            if (!(description.match(regEx))) {
                var des1 = document.getElementById("description");
                des1.style.backgroundColor = "red";
                count = 1;
                //alert("INVALID ENTRY: Enter only alphanumeric characters into the description and/or title fields.");

            }
        }


    }
    return count;
}

function isValid() {
    if (formissue() != 0) {
        alert("INVALID ENTRY: Please check the textfield(s) hightlighted in red. Enter only alphanumeric characters into the description and/or title fields. Please select appropriate options from all drop down menus.");
        return false;

    }
    else {

        return true;

    }

}

function getdata() {
    var formdata1 = { assign: form.assign.value, type1: form.type1.value, priority: form.priority.value, title: form.title.value, description: form.description.value };

    if (isValid() === true) {
        let loginForm = new FormData();

        loginForm.set("assignedTo", formdata1["assign"]);
        loginForm.set("type", formdata1["type1"]);
        loginForm.set("priority", formdata1["priority"]);
        loginForm.set("title", formdata1["title"]);
        loginForm.set("description", formdata1["description"]);


        fetch('http://localhost/info2180-project-2/api/issue/create.php', {
            method: "POST",
            body: loginForm
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                else {
                    throw new Error(`An error has occured: ${response.status}`);
                }
            })
            .then((html) => {
                console.log(html)

            })
            .catch(err => {
                console.log(err);
            })

        return true;
    }


}

function home() {

    if (getdata() === true) {
        window.open("index.html");
    } else {
        return false;
    }
}








