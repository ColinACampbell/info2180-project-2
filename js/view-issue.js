window.onload = function () {
   
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const id = parseInt(params.id);

    const statusCloseBtn = document.getElementById('status-close-btn');
    const statusProgBtn = document.getElementById('status-prog-btn');

    statusProgBtn.addEventListener('click',()=>{
        updateIssueStatus(id,'INPROGRESS')
    })

    statusCloseBtn.addEventListener('click',()=>{
        updateIssueStatus(id,'CLOSED')
    })


    getIssue(id);
}

const updateIssueStatus = (id,newStatus) => {

    const formData = new FormData();
    formData.append('newStatus',newStatus);
    fetch('/api/issue/mark.php?id='+id,{
        method:"POST",
        body: formData,
    })
}


const getIssue = (id) => {
    fetch('/api/issue/get.php?id=' + id).then(async (response) => {
        const jsonReponse = await response.json();
        const issue = jsonReponse.issue
        populateIssue(issue)
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