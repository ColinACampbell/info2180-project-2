<?php

require "./../config/database-config.php";

session_start();
$user = $_SESSION['user'];
$response = [];

if ($user != null) {
    $getAllIssuesQuery =  "SELECT * FROM `Issues`";
    $statement = $db_conn->prepare($getAllIssuesQuery) or die("Cannot Fetch");
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    $response['issues'] = $result;
} else 
{
    $response['message'] = "No Login";
}

echo json_encode($response);