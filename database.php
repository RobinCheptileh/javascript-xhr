<?php

// PDO initialization
$host = "localhost";
$db = "javascript_xhr";
$port = "3306";
$user = "root"; // set username
$pass = ""; // set password
$charset = "utf8";

try {
    $dsn = "mysql:host=$host;dbname=$db;port=$port;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_PERSISTENT => true
    ];

    $pdo = new PDO($dsn, $user, $pass, $opt);

    // Get category ID
    $category = $_POST['category'];
    $statement = $pdo->prepare("SELECT * FROM `sub_categories` where `category_id`=?");
    if ($statement->execute(array($category))) {

        // Send all sub categories as JSON
        header("Content-Type: application/json", true, 200);
        echo json_encode($statement->fetchAll());
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}