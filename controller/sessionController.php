<?php
//require headers
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json;charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//get database connection
include_once '../config/database.php';
include_once '../model/session.php';


$database = new Database();
$db = $database->getConnection();
$session = new Session($db);


//get posted data
$data = json_decode(file_get_contents("php://input"));
 
$session->session_number = $data->session;
$session->_url = $data->url;

if($session->save($db)){
    echo 'Session was saved and database connection closed';
    $database->_close();
}else{
    echo 'Unable to save session/ Session already exists within db';
}


?>