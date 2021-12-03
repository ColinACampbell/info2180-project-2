const MONTHS = {
    0: "January",
    1: "Febuary",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

window.onload = function () {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const id = parseInt(params.id);

    const statusCloseBtn = document.getElementById('status-close-btn');
    const statusProgBtn = document.getElementById('status-prog-btn');

    statusProgBtn.addEventListener('click', () => {
        updateIssueStatus(id, 'INPROGRESS')
    })

    statusCloseBtn.addEventListener('click', () => {
        updateIssueStatus(id, 'CLOSED')
    })


    getIssue(id);
}

const updateIssueStatus = (id, newStatus) => {

    const formData = new FormData();
    formData.append('newStatus', newStatus);
    fetch(httpUrl + '/api/issue/mark.php?id=' + id, {
        method: "POST",
        body: formData,
    }).then(() => {
        const issueStatusElement = document.getElementById('issue-status');
        alert("Issue Status Updated")
        issueStatusElement.innerHTML = newStatus
    }).catch(()=>{
        alert("There was an error creating an issue")
    })
}


const getIssue = (id) => {
    fetch(httpUrl + '/api/issue/get.php?id=' + id).then(async (response) => {
        const jsonReponse = await response.json();
        const issue = jsonReponse.issue
        populateIssue(issue)
    })
}

const populateIssue = (issue) => {
    const issueTitle = document.getElementById('title')
    issueTitle.innerHTML = issue.title

    const issueDescription = document.getElementById('description')
    issueDescription.innerHTML = issue.description


    const createdDate = new Date(issue.created)
    const updatedDate = new Date(issue.updated)

    const issueCreated = document.getElementById('issue-created')

    issueCreated.innerHTML = `Issue Created On ${MONTHS[createdDate.getMonth()] + " " + createdDate.getDate()} By ${membersMap.get(issue.created_by)}`

    const issueUpdated = document.getElementById('issue-updated')
    issueUpdated.innerHTML = `Issue Updated On ${MONTHS[updatedDate.getMonth()] + " " + updatedDate.getDate()}`

    const issueStatusElement = document.getElementById('issue-status');
    const issueTypeElement = document.getElementById('issue-type');
    const issueAssignedToElement = document.getElementById('issue-assigned-to');
    const issuePriorityElement = document.getElementById('issue-priority');

    issueStatusElement.innerHTML = issue.status;
    issueAssignedToElement.innerHTML = membersMap.get(issue.assigned_to);
    issueTypeElement.innerHTML = issue.type;
    issuePriorityElement.innerHTML = issue.priority;
}