window.onload = function () {
    getIssues();
}

/// Takes in array of issues
const addDataToTable = (issues) => {
    const issuesTable = document.getElementById('issues-table')
    let rowCount = 1;
    issues.forEach((issue) => {

        const row = issuesTable.insertRow(rowCount);
        const titleCell = row.insertCell(0);
        const typeCell = row.insertCell(1);
        const statusCell = row.insertCell(2);
        const assignedToCell = row.insertCell(3);
        const createdCell = row.insertCell(4);

        const createdDate = new Date(issue.created)

        titleCell.innerHTML = `${issue.id} <a href='/pages/view-issue.html?id=${issue.id}'> ${issue.title} </a>`
        typeCell.innerHTML = `${issue.type}`
        statusCell.innerHTML = `${issue.status}`
        assignedToCell.innerHTML = `${membersMap.get(issue.assigned_to)}`
        createdCell.innerHTML = `${createdDate.getFullYear() + "-" + (createdDate.getMonth()+1) + "-" + (createdDate.getDate())}`

        rowCount ++;
    })
}

const getIssues = () => {
    fetch(httpUrl+'/api/issue/all.php').then(async (response) => {
        const jsonReponse = await response.json();
        const issues = jsonReponse.issues
        addDataToTable(issues)
    })
}