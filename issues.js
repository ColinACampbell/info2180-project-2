window.onload = function(){
    //let url = document.location.href;
    let progbtn = document.getElementById("progbtn");
    let closebtn = document.getElementById("closebtn");
    //params = url.split('?')[1].split('&');

    progbtn.addEventListener('click',function(){
    
            const d = new Date();
            const min = d.getMinutes();
            const hour = (d.getHours() + 24) % 12 || 12;
            if( d.getHours() >= 12){
            document.getElementById("updatedetail").innerHTML = "Last updated on "+ d.toDateString() + " at " + hour + ":" +  (d.getMinutes()<10? '0' : '') + d.getMinutes() + "PM";
            alert("Issue marked in progress");
            }
            if( d.getHours() < 12){
                document.getElementById("updatedetail").innerHTML = "Last updated on "+ d.toDateString() + " at " + hour + ":" + d.getMinutes() + "AM";
                alert("Issue marked in progress");
                }
        })
    

    closebtn.addEventListener('click',function(){
             const d = new Date();
            const hour = (d.getHours() + 24) % 12 || 12;
            if( d.getHours() >= 12){
            document.getElementById("updatedetail").innerHTML = "Last updated on "+ d.toDateString() + " at " + hour + ":" + d.getMinutes() + "PM";
            alert("Issue marked in progress");
            }
            if( d.getHours() < 12){
                document.getElementById("updatedetail").innerHTML = "Last updated on "+ d.toDateString() + " at " + hour + ":" + d.getMinutes() + "AM";
                alert("Issue marked in progress");
                }
        })  


}