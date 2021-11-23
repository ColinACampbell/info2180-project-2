<?php

require "./../config/database-config.php";

if (isset($_POST['email']) && isset($_POST['password']))
{
    // validate the user input
    // login user
    echo "Hello World";
} else 
{
    $response = [];
    $response['message'] = "Wrong Login";
    echo json_encode($response);
}