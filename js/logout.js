window.onload = function(){

    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://localhost/Info2180-project-2/api/user/auth.php');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200){
            window.location = 'userlogin.html';
        }
    }
}