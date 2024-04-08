<?php
$host = "127.0.0.1";
$port = 3306;
$db_username = "root";
$db_password = "";
$db_name = "99acres";

require_once("Database.php");


$db=new Database($host, $port, $db_username, $db_password, $db_name);

function handleException($exception)
{
    echo  $exception->getMessage();
}

set_exception_handler('handleException');
