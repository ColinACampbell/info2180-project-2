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
    http_response_code(200);
} else 
{
    $response['message'] = "No Login";
    http_response_code(401);
}

echo json_encode($response);