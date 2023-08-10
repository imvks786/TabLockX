<?php
include 'index1.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = $_POST['pass'];

  $email = filter_var($email, FILTER_SANITIZE_EMAIL);


  $tok = generateToken();
  $sql = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
  $result = $conn->query($sql);

  if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo 'Login successful!';
        } else {
            echo 'Invalid email or password.';
        }
    } 
    else {
        echo 'Invalid email or password.';
    }
} 
else 
{
    echo 'Invalid request';
}


function generateToken() {
    $length = 20;
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $token = '';
    for ($i = 0; $i < $length; $i++) {
        $token .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $token;
}
