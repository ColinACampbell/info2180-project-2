<?php

require "./../config/database-config.php";

session_start();
$_SESSION['user'] = null;
http_response_code(200);