<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "inc/config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the POST data
    $data = file_get_contents("php://input");
    $data = json_decode($data, true);

    if (isset($data->LoginID) && isset($data->Password) && isset($data->AccountType)) {

        $loginID = mysqli_real_escape_string($conn, $data['LoginID']);
        $password = mysqli_real_escape_string($conn, $data['Password']);
        $accountType = mysqli_real_escape_string($conn, $data['AccountType']);

        // Query the database to validate the credentials
        $sql = "SELECT * FROM user WHERE login_id = '$loginID' AND password = '$password' AND account_type = '$accountType'";
        $result = mysqli_query($conn, $sql);

        if ($result) {
            if (mysqli_num_rows($result) == 1) {
                $token = generateToken();

                http_response_code(200);
                echo json_encode(array("Status" => "Success", "token" => $token));
                exit();
            } else {
                http_response_code(401);
                echo json_encode(array("Status" => "Error", "Message" => "Invalid credentials. Please try again."));
                exit();
            }
        } else {
            http_response_code(500);
            echo json_encode(array("Status" => "Error", "Message" => "An error occurred during login. Please try again later."));
            exit();
        }
    } else {
        http_response_code(400);
        echo json_encode(array("Status" => "Error", "Message" => "Missing required fields."));
        exit();
    }
} else {
    http_response_code(405);
    echo json_encode(array("Status" => "Error", "Message" => "Invalid request method."));
    exit();
}
function generateToken()
{
    return bin2hex(random_bytes(32));
}