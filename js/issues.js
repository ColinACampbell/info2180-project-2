window.onload = function(){
    var url = document.location.href;
    var progbtn = document.getElementById("progbtn");
    var closebtn = document.getElementById("closebtn");
    var xhttp = new XMLHttpRequest();
    

    xhttp.open("GET",url, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200){
            let listinfo = JSON.parse(xhttp.responseText);
            let title = document.getElementById("title");
            let body = document.getElementById("paragraph");
            let issue = document.getElementById("issue");
            let dates = document.getElementById("dateinfo");
            let aside = document.getElementById("asidemain");
            title.innerHTML = listinfo["title"];
            body.innerHTML = listinfo["description"];
            issue.innerHTML = "Issue# " + listinfo["id"];
            dates.innerHTML = "Issue is created on" + listinfo["created"] + "<br>" + "Issues was last updated on " + listinfo["updated"];
            aside.innerHTML = "Assigned To: " + listinfo["assigned_to"] + "<br> Type: " + listinfo["type"] + "<br> Priority:" + listinfo["priority"] + "<br>Status: " + listinfo["status"];

        }
    }

    progbtn.addEventListener('click',function(event){
        xhttp1 = new XMLHttpRequest;
        xhttp1.open("GET",url, true);
        xhttp1.send();
        if (xhttp1.readyState == 4 && xhttp1.status == 200){
            alert("Issue marked in progress");

        }
    })

    closebtn.addEventListener("click",function(event){
        xhttp2 = new XMLHttpRequest;
        xhttp2.open("GET",url, true);
        xhttp2.send();
        if (xhttp2.readyState == 4 && xhttp2.status == 200){
            alert("Issue marked as closed");
            

        }  
    })

} 
