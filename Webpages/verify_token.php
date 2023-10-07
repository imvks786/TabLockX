<?php
include 'index1.php';    //THIS IS DATABASE CONNECTION

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $token = $_POST['token'];

  $sql = "SELECT * FROM users WHERE reset_password = '$token' AND email = '$email'";
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
        echo "success";
        $sql = "UPDATE users SET reset_password = '' WHERE email = '$email'";
        $result = $conn->query($sql);
    } else {
        echo "Invalid token or email.";
    }
} 
else {
      echo 'Invalid request';
    }
