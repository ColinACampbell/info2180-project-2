let members = localStorage.getItem('members');
const membersMap = new Map();

if (members == null || members == undefined)
    alert("You need to login first")
else {
    members = JSON.parse(members)
    members.forEach((member) => {
        membersMap.set(member.id,member.firstName + " "+member.lastName)
    })
}

console.log(membersMap)
