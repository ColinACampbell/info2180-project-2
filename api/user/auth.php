<?php

require "./../config/database-config.php";

$response = [];
if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $login_query = "SELECT * FROM users WHERE email = :email";
    $statement = $db_conn->prepare($login_query);
    $statement->execute([
        'email' => $email,
    ]);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) == 0) {
        $response['message'] = "Email Not Found";
        http_response_code(401);
    } else {
        $user = $result[0];
        $is_password_correct = password_verify($password, $user['password']);
        if ($is_password_correct) {
            $user['password'] = null;
            $response['message'] = "User Found";
            $response['user'] = $user;
            session_start();
            $_SESSION['user'] = $user;

            // Get all the other members
            $statement2 = $db_conn->prepare("SELECT id, firstName, lastName, email FROM users");
            $statement2->execute();
            $memberResults = $statement2->fetchAll(PDO::FETCH_ASSOC);

            $response['members'] = $memberResults;
            http_response_code(200);
        } else {
            $response['message'] = "Incorrect Password";
            http_response_code(401);
        }
    }
} else {
    $response['message'] = "Credentials are needed";
    http_response_code(400);
}

echo json_encode($response);
