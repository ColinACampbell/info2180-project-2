window.onload = function () {
   
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const id = parseInt(params.id);
    getIssue(id);
}

const getIssue = (id) => {
    fetch('/api/issue/get.php?id=' + id).then(async (response) => {
        const jsonReponse = await response.json();
        const issue = jsonReponse.issue
        populateIssue(issue)
        console.log(issue);
        //addDataToTable(issues)
    })
}

const populateIssue = (issue) => {
    const issueTitle = document.getElementById('title')
    issueTitle.innerHTML = issue.title

    const issueDescription= document.getElementById('description')
    issueDescription.innerHTML = issue.description

    const issueCreated = document.getElementById('issue-created')
    issueCreated.innerHTML = issue.created

    const issueUpdated = document.getElementById('issue-updated')
    issueUpdated.innerHTML = issue.updated
}