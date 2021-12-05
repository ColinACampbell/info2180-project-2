let members = localStorage.getItem('members');
const membersMap = new Map();

if (members == null || members == undefined)
    members = []
else {
    members = JSON.parse(members)
    members.forEach((member) => {
        membersMap.set(member.id,member.firstName + " "+member.lastName)
    })
}