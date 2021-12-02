<?php

include "headers.php"; // Include this here, to ensure the response type is consistent

$user = "bugme_user";
$pass = "0000";

// Colin : I'm using mac, so I have to include the port number of the mysql process
// Change this if you have issues on your system
$db_conn = new PDO('mysql:host=localhost:3306;dbname=bugme', $user, $pass) or die("Database Connection Failed");
$db_conn ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);