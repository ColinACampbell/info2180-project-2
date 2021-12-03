<?php

require "./../config/database-config.php";

if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['password'])) {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if the user exists
    $existsQuery = "SELECT * FROM users WHERE email = :email";
    $statement = $db_conn->prepare($existsQuery);
    $statement->execute([
        'email' => $email,
    ]);
    $result = $statement->fetchAll(); //setFetchMode(PDO::FETCH_ASSOC); 

    if (count($result) == 0) {
        $encodedPassword = password_hash($password, PASSWORD_DEFAULT);
        $insertQuery = "INSERT INTO `Users` (`id`, `firstname`, `lastname`, `password`, `email`, `date_joined`) " .
            "VALUES (NULL, :firstName , :lastName, :password, :email, CURRENT_TIMESTAMP);";
        $statement = $db_conn->prepare($insertQuery);
        $statement->execute([
            'email' => $email,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'password' => $encodedPassword
        ]);


        // Select all the members
        $statement2 = $db_conn->prepare("SELECT id, firstName, lastName, email FROM users");
        $statement2->execute();
        $memberResults = $statement2->fetchAll(PDO::FETCH_ASSOC);

        $response['members'] = $memberResults;
        $response['message'] = 'User Was Created';
    } else {
        $response['message'] = 'User Exists';
    }
} else {
    $response['message'] = "Credentials are needed";
}


echo json_encode(($response));