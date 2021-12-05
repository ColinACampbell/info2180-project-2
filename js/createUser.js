window.onload = function(){
    var emailInput= document.getElementsByName('email')[0];
    var passwordInput = document.getElementsByName('password')[0];
    const fNameInput = document.getElementsByName('firstname')[0];
    const lNameInput = document.getElementsByName('lastname')[0];
    var emailReGex = /^\S+@\S+\.\S+$/i;

    var submit = document.getElementById('submit');
    submit.addEventListener('click', function(event){
        event.preventDefault();
        var email = emailInput.value;
        var pass = passwordInput.value;
        var fName = fNameInput.value;
        var lName = lNameInput.value;
        if(email === "" || !emailReGex.test(email)) {
            alert("Please enter a valid email address");
        } else {
        const formData = new FormData();
        formData.append('email',email);
        formData.append('password',pass);
        formData.append('firstName',fName);
        formData.append('lastName',lName);
        fetch(httpUrl+'/api/user/create.php',{
            method:"POST",
            body:formData,
        }).then(async(response)=>{
            const responseJson = await response.json();
            if (response.status === 201) { // 201 means created
                alert("User Created");
                localStorage.setItem('members',JSON.stringify(responseJson.members))
                window.location = "./../home.html";
            } else if (response.status === 409) {
                alert("User email already exists");
            } else if (response.status === 401)
            {
                alert("You are not authenticated");
                location.href = "./../index.html"
            }
        }).catch((error)=>{
            console.log(error)
        })
        }

    })

}