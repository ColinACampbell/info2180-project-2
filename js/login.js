window.onload = function () {
    var emailInput = document.getElementsByName('email')[0];
    var passwordInput = document.getElementsByName('password')[0];
    var submit = document.getElementById('submit');
    var emailReGex = /^\S+@\S+\.\S+$/i;

    submit.addEventListener('click', function (event) {
        event.preventDefault();
        var email = emailInput.value;
        var pass = passwordInput.value;
        if (email === "" || !emailReGex.test(email)) {
            alert("Please enter a valid email address");
        } else {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', pass);
            fetch(httpUrl + '/api/user/auth.php', {
                method: "POST",
                body: formData,
                credentials: 'include'
            }).then(async (response) => {
                // Take the json check if success or not
                // Redirect to app home screen or show appropriate message
                const responseJson = await response.json();
                // responseJson.message use this to check if a user is valid
                if (response.status === 200) {
                    window.location = './home.html';
                    localStorage.setItem('members', JSON.stringify(responseJson.members))
                    localStorage.setItem('user', JSON.stringify(responseJson.user))
                } else if (response.status === 401) {
                    alert(responseJson.message);
                } else if (response.status >= 400)
                    alert(responseJson.message)
            }).catch((error) => {
                console.log(error);
                alert("There was an error logging in")
            })
        }

    })
}

