window.onload = function(){
    var emailInput= document.getElementsByName('email')[0];
    var passwordInput = document.getElementsByName('password')[0];
    var submit = document.getElementById('submit');

    submit.addEventListener('click', function(event){
        event.preventDefault();
        var email = emailInput.value;
        var pass = passwordInput.value;
        const formData = new FormData();
        formData.append('email',email);
        formData.append('password',pass);
        fetch(httpUrl+'/api/user/auth.php',{
            method:"POST",
            body:formData,
            credentials:'include'
        }).then(async(response)=>{
            // Take the json check if sucess or not
            // Redirect to app home screen or show appropiate message
            const responseJson = await response.json();
            // responseJson.message use this to check if a user is valid
            if (responseJson.message == "User Found") {
                window.location = './home.html';
                localStorage.setItem('members',JSON.stringify(responseJson.members))
                localStorage.setItem('user',JSON.stringify(responseJson.user))
            } else {
                alert("User Not Found!");
            }
        }).catch((error)=>{
            console.log(error);
            alert("There was an error login in")
        })
    })
}

