<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "inc/config.php";

// Check if username and password are provided
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password before comparing with the stored one
    $hashed_password = md5($password);

    // Prepare and execute the SQL query
    $res = $conn->prepare("SELECT * FROM user WHERE UserName = ? AND password = ?");
    $res->bind_param("ss", $username, $hashed_password);
    $res->execute();
    $result = $res->get_result();

    // Check if there's a matching row
    if ($result->num_rows == 1) {
        // User is authenticated
        $user = $result->fetch_assoc();
        $response = array(
            "status" => "success",
            "message" => "Login successful",
            "user_id" => $user['id'],
            "username" => $user['username']
        );
        echo json_encode($response);
    } else {
        // No matching user found
        $response = array(
            "status" => "error",
            "message" => "Invalid username or password"
        );
        echo json_encode($response);
    }
} else {
    // Username or password not provided
    $response = array(
        "status" => "error",
        "message" => "Username or password not provided"
    );
    echo json_encode($response);
    exit;
}