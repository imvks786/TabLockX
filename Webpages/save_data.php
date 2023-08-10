<?php
include "index1.php";
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Retrieve the JSON data from the request body
  $json_data = file_get_contents('php://input');
  
  // Convert the JSON data to a PHP associative array
  $data = json_decode($json_data, true);

  // Retrieve the username and password values
  $username = $data['username'];
  $password = $data['password'];

  // Prepare and execute the SQL query
  $query = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
  if ($conn->query($query) === TRUE) {
    // Data inserted successfully
    $response = [
      'success' => true,
      'message' => 'Data inserted successfully'
    ];
    echo json_encode($response);
  } else {
    // Error inserting data
    $response = [
      'success' => false,
      'message' => 'Error inserting data'
    ];
    echo json_encode($response);
  }

  // Close the database connection
  $conn->close();
} else {
  // Invalid request method
  $response = [
    'success' => false,
    'message' => 'Invalid request method'
  ];
  echo json_encode($response);
}
?>
