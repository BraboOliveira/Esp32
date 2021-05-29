<?php

/*
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-esp8266-mysql-database-php/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/

$servername = "vendebelem.com.mysql:3306";

// REPLACE with your Database name
$dbname = "vendebelem_comesp_data";
// REPLACE with Database user
$username = "vendebelem_comesp_data";
// REPLACE with Database user password
$password = "284801";

// Keep this API Key value to be compatible with the ESP32 code provided in the project page. 
// If you change this value, the ESP32 sketch needs to match
$api_key_value = "0574A9je4X54";

$api_key = $umi = $temp = $lumi =  $nh3 = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);
    if($api_key == $api_key_value) {
        $umi = test_input($_POST["umi"]);
        $temp = test_input($_POST["temp"]);
        $lumi = test_input($_POST["lumi"]);
        $nh3 = test_input($_POST["nh3"]);
        
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        
        $sql = "INSERT INTO SensorData (umi, temp, lumi, nh3)
        VALUES ('" . $umi . "', '" . $temp . "', '" . $lumi . "', '" . $nh3 . "')";
        
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } 
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    
        $conn->close();
    }
    else {
        echo "Wrong API Key provided.";
    }

}
else {
    echo "No data posted with HTTP POST.";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}