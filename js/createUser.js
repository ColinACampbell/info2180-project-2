window.onload = function(){
    var emailInput= document.getElementsByName('email')[0];
    var passwordInput = document.getElementsByName('password')[0];
    const fNameInput = document.getElementsByName('firstname')[0];
    const lNameInput = document.getElementsByName('lastname')[0];

    var submit = document.getElementById('submit');
    submit.addEventListener('click', function(event){
        event.preventDefault();
        var email = emailInput.value;
        var pass = passwordInput.value;
        var fName = fNameInput.value;
        var lName = lNameInput.value;
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
            if (responseJson.message == "User Was Created") {
                alert("User Created!");
                localStorage.setItem('members',JSON.stringify(responseJson.members))
                window.location = "./../home.html";
            } else {
                alert("Unable to Create User");
            }
        }).catch((error)=>{
            console.log(error)
        })
    })

}