<?php
include 'index1.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['imageFile']) && isset($_POST['email'])) {
        $file = $_FILES['imageFile'];
        $uploadDir = 'upload/';

        // Get the file extension
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);

        $fileName = time() . '.' . $fileExtension;
        $destination = $uploadDir . $fileName;

        // Perform validation checks on the file
        if ($file['error'] === UPLOAD_ERR_OK) {
            // Move the uploaded file to the desired location
            move_uploaded_file($file['tmp_name'], $destination);

            // Get the email from the POST data
            $email = $_POST['email'];

            $sql = "UPDATE users SET photo = '$destination' WHERE email = '$email'";
            $result = $conn->query($sql);
            $conn->close();

            if ($result) {
                // Return a success response
                echo json_encode(['success' => true, 'message' => 'Image uploaded successfully']);
            } else {
                // Return an error response
                echo json_encode(['success' => false, 'message' => 'Failed to update database']);
            }
        } else {
            // Return an error response
            echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
        }
    } else {
        // Return an error response
        echo json_encode(['success' => false, 'message' => 'No image file received']);
    }
}
?>



