<?php
class pdoDB{
    //private statics to hold Connection
    private static $dbConnection = null;

    //make next 2 functions private to prevent normal class instantiation
    private function __construct(){
    }
    private function __clone(){
    }

    //return db connection or create initial connection
    public static function getConnection(){
        //if there isnt a connection then create one
        if (!self::$dbConnection) {
            try {
                self::$dbConnection = new PDO('sqlite:db/geodata.sqlite');
                self::$dbConnection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
            }
            catch (PDOException $e){
                echo "<h1>Failed</h1>";
                echo "Connection Error: " . $e->getMessage();
            }
        }
        //return the connection
        return self::$dbConnection;
    }

}
