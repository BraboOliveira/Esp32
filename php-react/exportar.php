<?php
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: access");
// header("Access-Control-Allow-Methods: GET");
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$sql = "select * from dados";

$query = mysqli_query($db_conn, $sql);

if($query){
  while($r  = $query->fetch_object()){
    echo $r->id.",";
    echo $r->umi_ar.",";
    echo $r->umi_solo.",";
    echo $r->temperatura.",";
    echo $r->irrigar.",";
    echo $r->data_hora."\n";
  }
}

header('Content-Type: application/xls');
header('Content-Disposition: attachment; filename=export.xls;');
header('Expires: 0');

?>