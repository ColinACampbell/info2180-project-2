window.onload = function(){

    var logout = document.getElementById('out');
    console.log(logout)

    logout.addEventListener('click', function(event){
        event.preventDefault();
        fetch(httpUrl+'/api/user/end-session.php',{
            method:"POST",
            //body:"Logout",
        }).then(async(response)=>{
            const responseJson = await response.json();
            if (responseJson.message == "Session Ended") {
                window.location = 'Login.html';
            } else {
                alert("Unable to Logout!");
            }
        }).catch((error)=>{
            console.log(error)
        })
    })
}