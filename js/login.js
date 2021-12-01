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
        fetch('/api/user/auth.php',{
            method:"POST",
            body:formData,
            credentials:'include' // for login
        }).then(async(response)=>{
            console.log(await response.json())
            // Take the json check if sucess or not
            // Redirect to login screen or show appropiate message
        }).catch((error)=>{
            console.log(error)
        })
    })
}

