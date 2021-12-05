<?php

session_start();
$_SESSION['user'] = null;
session_reset();
session_abort();

header("Location: ./../../index.html");