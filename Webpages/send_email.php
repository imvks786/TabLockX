<?php
include 'index1.php';
require 'Mailer/vendor/autoload.php';  //PUT THE MAILER BY DOWNLOADING FROM GITHUB OR OTHER SOURCES//

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//   $email = $_POST['email'];

  $email = $_POST['emailid'];
  $password = $_POST['passkey'];

  // Generate a hash of the password
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  $tok = generateToken();
  $sql = "INSERT INTO verification (email,token,status,password) VALUES ('$email', '$tok', '0','$hashedPassword')";
  $conn->query($sql);
  //working//
  
    $mail = new PHPMailer(true);
    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'YOUR_EMAIL_TO_SEND_MAIL';
        $mail->Password = 'YOUR_PASSWORD_FOR_APP';        //THIS PASSWORD IS NOT YOUR GMAIL/EMAIL DEFAULT PASSWORD YOU NEED TO GENERATED APP PASSWORD FROM ACCOUNT//
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Email content
        $mail->setFrom('TABLOCKX', 'TabLockX');
        $mail->addAddress($email, 'User');
        $mail->Subject = 'TabLockX Email Verification';

        // Load HTML content from file
        $htmlContent = file_get_contents('./Mailer/template.html');
        $htmlContent = str_replace('{user_name}',$email, $htmlContent);
        $htmlContent = str_replace('{otp}',$tok, $htmlContent);

        $mail->msgHTML($htmlContent);

        $mail->send();
        echo 'email_sent';
    } 
    catch (Exception $e) {
        echo 'An error occurred while sending the email: ' . $mail->ErrorInfo;
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
