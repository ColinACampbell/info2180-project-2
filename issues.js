window.onload = function(){
    let progbtn = document.getElementById("progbtn");
    let closebtn = document.getElementById("closebtn");

    progbtn.addEventListener('click',function(){
    
            const d = new Date();
            const hour = (d.getHours() + 24) % 12 || 12;
            if( d.getHours() >= 12){
            document.getElementById("updatedetail").innerHTML = "Last updated on "+ d.toDateString() + " at " + hour + ":" +  (d.getMinutes()<10? '0' : '') + d.getMinutes() + "PM";
            }
            if( d.getHours() < 12){
                document.getElementById("updatedetail").innerHTML = "Last updated on "+ d.toDateString() + " at " + hour + ":" +(d.getMinutes()<10? '0' : '') + d.getMinutes() + "AM";
                }
        })
    

    closebtn.addEventListener('click',function(){
        const d = new Date();
        const hour = (d.getHours() + 24) % 12 || 12;
        if( d.getHours() >= 12){
        document.getElementById("updatedetail").innerHTML = "Last updated on "+ d.toDateString() + " at " + hour + ":" +  (d.getMinutes()<10? '0' : '') + d.getMinutes() + "PM";
        }
        if( d.getHours() < 12){
            document.getElementById("updatedetail").innerHTML = "Last updated on "+ d.toDateString() + " at " + hour + ":" +(d.getMinutes()<10? '0' : '') + d.getMinutes() + "AM";
            }
        })  


}