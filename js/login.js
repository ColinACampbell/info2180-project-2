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
        fetch('http://localhost/info2180-project-2/api/user/auth.php',{
            method:"POST",
            body:formData,
            credentials:'include'
        }).then(async(response)=>{
            const responseJson = await response.json();
            if (responseJson.message == "User Found") {
                window.location = 'index.html';
            } else {
                alert("User Not Found!");
            }
        }).catch((error)=>{
            console.log(error)
        })
    })
}

