<?php
class Session
{
    private static $instance;

    private function __construct(){
        session_start();
    }

    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new Session();
        }
        return self::$instance;
    }

    public function setProperty( $key, $val ) {
        /* don't need to check that session exists
        since if we're here we must have instantiated
        $instance and started the session */
        $_SESSION[ $key ] = $val;
    }

    public function getProperty( $key ) {
        $returnValue = "";
        if (isset($_SESSION[$key])) {
            $returnValue = $_SESSION[$key];
        }
        return $returnValue;
    }

}
