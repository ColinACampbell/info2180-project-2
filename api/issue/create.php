<?php

require "./../config/database-config.php";

session_start();
$user = $_SESSION['user'];
$response = [];

if ($user != null)
{
    if (
        isset($_POST['title']) &&
        isset($_POST['description']) &&
        isset($_POST['assignedTo']) &&
        isset($_POST['type']) &&
        isset($_POST['priority'])
    ) {
        $title = $_POST['title'];
        $description = $_POST['description'];
        $assignedTo = $_POST['assignedTo'];
        $type = $_POST['type'];
        $priority = $_POST['priority'];
        $status = $_POST['status'];
        $createdBy = $user['id'];
    
        $createIssueQuery = "INSERT INTO `Issues` (`id`, `title`, `description`, `type`, `priority`, `status`, `assigned_to`, `created_by`, `created`, `updated`) ".
        "VALUES (NULL, :title , :description , :type, :priority, :status, :assignedTo, :createdBy, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
    
        $statement = $db_conn->prepare($createIssueQuery);
        $statement->execute([
            'title' => $title,
            'description'=> $description,
            'type' => $type,
            'priority' => $priority,
            'status' => $status,
            'assignedTo' => $assignedTo,
            'createdBy' => $createdBy,
        ]);
        
        $response['message'] = 'Created'; 
        
    } else 
    {
        $response['message'] = 'Credentials Needed'; 
    }
} else 
{
    $response['message'] = 'No Login';
}

echo json_encode($response);
