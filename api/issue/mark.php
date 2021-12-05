<?php

require "./../config/database-config.php";

session_start();
$user = $_SESSION['user'];
$response = [];

if ($user != null) {
    if (isset($_GET['id']) && isset($_POST['newStatus'])) {
        $id = $_GET['id'];
        $newStatus = $_POST['newStatus'];
        $statement = $db_conn->prepare("UPDATE `Issues` SET `status` = '$newStatus', updated = CURRENT_TIMESTAMP WHERE `Issues`.`id` = $id;") or die("Cannot Set Status");
        $statement->execute();
        $response['message'] = "Updated";

        $statement2 = $db_conn->prepare("SELECT * FROM `Issues` where id = $id;") or die("Cannot Fetch");
        $statement2->execute();
        $result = $statement2->fetchAll(PDO::FETCH_ASSOC);
        $response['issue'] = $result[0];
        http_response_code(200);
    } else {
        $response['message'] = "Fields not set";
        http_response_code(400);
    }
} else {
    $response['message'] = "No Login";
    http_response_code(401);
}

echo json_encode($response);
