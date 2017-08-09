<?php
require_once("pdoDB.class.php");

abstract class C_Recordset{
    protected $db;
    protected $stmt;

    function __construct(){
        $this->db = pdoDB::getConnection();
    }

    public function getRecordSet($sql, $elementName = 'ResultSet', $params=null){
        if (is_array($params)){
            $this->stmt = $this->db->prepare($sql);
            $this->stmt->execute($params);
        } else {
            $this->stmt = $this->db->query($sql);
        }
        return $this->stmt;

    }
}

class C_JSONRecordSet extends C_Recordset{
    public function getRecordSet($sql, $elementName='ResultSet', $params=null){
        $stmt = parent::getRecordSet($sql, 'notneeded', $params);
        //var_dump($sql);
        $recordSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $nRecords = count($recordSet);
        if ($nRecords == 0){
            $status = "error";
            $message = array("text" => "No records found");
            $result = '[]';
        } else {
            $status = 'ok';
            $message = array("text" => "");
            $result = $recordSet;
        }
        return json_encode(
            array(
                'status' => $status,
                'message' => $message,
                "$elementName" => array(
                    "RowCount"=>$nRecords,
                    "Result"=>$result
                )
            ),
            JSON_NUMERIC_CHECK, JSON_PRETTY_PRINT
        );
    }
}
