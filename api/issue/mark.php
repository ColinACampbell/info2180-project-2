<?php

require "./../config/database-config.php";

session_start();
$user = $_SESSION['user'];
$response = [];

if ($user != null) {
    if (isset($_GET['id']) && isset($_POST['newStatus'])) {
        $id = $_GET['id'];
        $newStatus = $_POST['newStatus'];
        $statement = $db_conn->prepare("UPDATE `Issues` SET `status` = '$newStatus' WHERE `Issues`.`id` = $id;") or die("Cannot Set Status");
        $statement->execute();
        $response['message'] = "Updated";
    } else {
        $response['message'] = "Not Updated";
    }
} else {
    $response['message'] = "No Login";
}

echo json_encode($response);
