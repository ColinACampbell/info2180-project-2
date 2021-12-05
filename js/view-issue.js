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

    const statusCloseBtn = document.getElementById('closebtn');
    const statusProgBtn = document.getElementById('progbtn');

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
    }).then(async (response) => {

        const jsonResponse = await response.json();
        if (response.status === 200) {
            const issue = jsonResponse.issue;
            populateIssue(issue)
            alert("Issue Status Updated")
        } else if (401) {
            alert("You are not authorized")
            window.location.href = "./../index.html";
        } else {
            alert(jsonResponse.message)
        }
    }).catch((err) => {
        if (err) {
            alert("There was an error creating an issue. With technical error " + err.toString())
        }
    })
}


const getIssue = (id) => {
    fetch(httpUrl + '/api/issue/get.php?id=' + id).then(async (response) => {
        const jsonReponse = await response.json();
        if (response.status === 200) {
            const issue = jsonReponse.issue
            populateIssue(issue)
        } else if (response.status === 401) {
            alert("You are not authorized")
            window.location.href = "./../index.html";
        }
    })
}

const populateIssue = (issue) => {
    const issueTitle = document.getElementsByClassName('issue-title')[0]
    console.log(issueTitle.innerText)

    issueTitle.innerHTML = issue.title

    const issueDescription = document.getElementById('description')
    issueDescription.innerHTML = issue.description

    const issueNumber = document.getElementById('subtitle')
    issueNumber.innerHTML = `Issue #${issue.id}`


    const createdDate = new Date(issue.created)
    const updatedDate = new Date(issue.updated)
    const hour = (updatedDate.getHours() + 24) % 12 || 12;
    const hour1 = (createdDate.getHours() + 24) % 12 || 12;

    const issueCreated = document.getElementById('issue-created')

    if (createdDate.getHours() >= 12) {
        issueCreated.innerHTML = `Issue Created On ${MONTHS[createdDate.getMonth()] + " " + createdDate.getDate() + ", " + createdDate.getFullYear() + " at " + hour1 + ":" + (createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes() + "PM"} By ${membersMap.get(issue.created_by)}`
    } if (updatedDate.getHours() < 12) {
        issueCreated.innerHTML = `Issue Created On ${MONTHS[createdDate.getMonth()] + " " + createdDate.getDate() + ", " + createdDate.getFullYear() + " at " + hour1 + ":" + (createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes() + "AM"} By ${membersMap.get(issue.created_by)}`
    }

    const issueUpdated = document.getElementById('issue-updated');

    if (updatedDate.getHours() >= 12) {
        issueUpdated.innerHTML = `Last updated on ${MONTHS[updatedDate.getMonth()] + " " + updatedDate.getDate() + ", " + updatedDate.getFullYear() + " at " + hour + ":" + (updatedDate.getMinutes() < 10 ? '0' : '') + updatedDate.getMinutes() + "PM"}`
    } if (updatedDate.getHours() < 12) {
        issueUpdated.innerHTML = `Last updated on ${MONTHS[updatedDate.getMonth()] + " " + updatedDate.getDate() + ", " + updatedDate.getFullYear() + " at " + hour + ":" + (updatedDate.getMinutes() < 10 ? '0' : '') + updatedDate.getMinutes() + "AM"}`
    }

    const issueStatusElement = document.getElementById('issue-status');
    const issueTypeElement = document.getElementById('issue-type');
    const issueAssignedToElement = document.getElementById('issue-assigned-to');
    const issuePriorityElement = document.getElementById('issue-priority');

    if (issue.status === 'INPROGRESS')
        issueStatusElement.innerHTML = 'IN PROGRESS'
    else
        issueStatusElement.innerHTML = issue.status;

    issueAssignedToElement.innerHTML = membersMap.get(issue.assigned_to);
    issueTypeElement.innerHTML = issue.type;
    issuePriorityElement.innerHTML = issue.priority;
}