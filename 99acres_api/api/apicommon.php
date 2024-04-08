<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include "inc/config.php";
$rentResale = isset($_GET['rentResale']) ?$_GET['rentResale']:"";
$searchText = isset($_GET['searchText']) ?$_GET['searchText']:"";
// echo "test";
// die;
$sql = "SELECT * FROM inventory where id <> 0 ";
if ($rentResale != "" or $rentResale !=null) {
   $sql = $sql."AND property_type = '$rentResale' ";
}

if ($searchText != "" or $searchText !=null) {
   $sql = $sql."AND title like '%$searchText%' ";
}
$sql = $sql." order by id desc";
$res = $db->query($sql);
if ($res) {
      echo json_encode($res);
      exit;
  }else {
      echo json_encode(["error" => "No record found..", "code" => 400]);
      exit;
  }
?>
