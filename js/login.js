window.onload = function(){
    var email= document.getElementById('email');
    var password = document.getElementById('password');
    var submit = document.getElementById('submit');
    var xhr = new XMLHttpRequest();

    submit.addEventListener('click', function(event){
        event.preventDefault();
        var email = email.value;
        var pass = password.value;
        xhr.open('POST','/api/user/auth.php?user=' + user + "&pass=" + pass);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && httpRequest.status == 200){
                if(xhr.responseText == "redirect"){
                    window.location = 'homepage.html';
                }else{
                    alert(xhr.responseText);
                }
            }
        }
    })
}

