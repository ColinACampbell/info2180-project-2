var issuesGlobal = [] // temp variable, hoisted intentionally

window.onload = function () {
    getIssues();
    //console.log(getUser())
    const showAllIssuesBtn = document.getElementById('btn1')
    const showOpenIssuesBtn = document.getElementById('btn2')
    const showMyIssuesBtn = document.getElementById('btn3')

    showAllIssuesBtn.addEventListener('click', () => {
        //console.log(issuesGlobal)
        showOpenIssuesBtn.classList.remove('selected')
        showMyIssuesBtn.classList.remove('selected')
        showAllIssuesBtn.classList.add('selected')
        clearTable()
        addDataToTable(issuesGlobal)
    })

    showOpenIssuesBtn.addEventListener('click', () => {

        showOpenIssuesBtn.classList.add('selected')
        showMyIssuesBtn.classList.remove('selected')
        showAllIssuesBtn.classList.remove('selected')


        clearTable();

        const openIssues = [];

        issuesGlobal.forEach((issue) => {
            if (issue.status.toUpperCase() === 'OPEN')
                openIssues.push(issue)
        })

        addDataToTable(openIssues)
    })

    showMyIssuesBtn.addEventListener('click', () => {

        showOpenIssuesBtn.classList.remove('selected')
        showMyIssuesBtn.classList.add('selected')
        showAllIssuesBtn.classList.remove('selected')

        console.log("Clicked")

        clearTable();

        const myIssues = [];

        const user = getUser();
        issuesGlobal.forEach((issue) => {
            if (parseInt(issue.assigned_to) === user.id)
                myIssues.push(issue)
        })

        addDataToTable(myIssues)
    })
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
        titleCell.innerHTML = `${issue.id} <a href='./pages/view-issue.html?id=${issue.id}'> ${issue.title} </a>`
        typeCell.innerHTML = `${issue.type}`
        statusCell.innerHTML = `${issue.status}`
        assignedToCell.innerHTML = `${membersMap.get(issue.assigned_to)}`
        createdCell.innerHTML = `${createdDate.getFullYear() + "-" + (createdDate.getMonth() + 1) + "-" + (createdDate.getDate())}`

        rowCount++;
    })
}

const clearTable = () => {
    const issuesTable = document.getElementById('issues-table')
    const headerCount = 1;
    const rowCount = issuesTable.rows.length;
    for (let i = headerCount; i < rowCount; i++) {
        issuesTable.deleteRow(headerCount);
    }
}

const getIssues = () => {
    fetch(httpUrl + '/api/issue/all.php').then(async (response) => {
        const jsonReponse = await response.json();
        const issues = jsonReponse.issues
        issuesGlobal = [...issues]
        addDataToTable(issues)
    })
}

const getUser = () => {
    const userString = localStorage.getItem('user');

    if (userString === null || undefined) {
        alert("Error, Please login and try again")
    } else {
        return JSON.parse(userString)
    }
}