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
    $result = $statement->fetchAll();
    if (count($result) == 0) {
        $response['message'] = "Email Not Found";
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
            $statement2 = $db_conn->prepare("SELECT * FROM users where id != :id");
            $statement2->execute([
                'id' => $user['id']
            ]);
            $memberResults = $statement2->fetchAll();

            $response['members'] = $memberResults;
        } else {
            $response['message'] = "Incorrect Password";
        }
    }
} else {
    $response['message'] = "Credentials are needed";
}

echo json_encode($response);
