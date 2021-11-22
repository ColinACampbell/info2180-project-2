<?php

$user = "bugme_user";
$pass = "0000";

// Colin : I'm using mac, so I have to include the port number of the mysql process
// Change this if you have issues on your system
$db_conn = new PDO('mysql:host=localhost:8889;dbname=bugme', $user, $pass) or die("Database Connection Failed");