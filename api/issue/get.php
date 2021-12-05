<?php
require "./../config/database-config.php";

session_start();
$user = $_SESSION['user'];
$response = [];

if ($user != null) {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $getIssueQuery =  "SELECT * FROM `Issues` where id = $id";
        $statement = $db_conn->prepare($getIssueQuery) or die("Cannot Fetch");
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $response['issue'] = $result[0];
        http_response_code(200);
    }
} else {
    $response['message'] = "No Login";
    http_response_code(401);
}

echo json_encode($response);
