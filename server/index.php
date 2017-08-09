<?php
session_start();
require_once ('db/classes/recordSet.class.php');
require_once ('db/classes/session.class.php');


//scope variables for role and username will be lost on refresh!!!!!!
//$session = Session::getInstance();
$action  = isset($_REQUEST['action'])  ? $_REQUEST['action']  : null;
$subject = isset($_REQUEST['subject']) ? $_REQUEST['subject'] : null;
$id      = isset($_REQUEST['id'])      ? $_REQUEST['id']      : null;

if (empty($action)) {
    if ((($_SERVER['REQUEST_METHOD'] == 'POST') ||
            ($_SERVER['REQUEST_METHOD'] == 'PUT') ||
            ($_SERVER['REQUEST_METHOD'] == 'DELETE')) &&
        (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)) {

        $input = json_decode(file_get_contents('php://input'), true);

        $action = isset($input['action']) ? $input['action'] : null;
        $subject = isset($input['subject']) ? $input['subject'] : null;
        $data = isset($input['data']) ? $input['data'] : null;
    }
}

// concat action and subject with uppercase first letter of subject
$route = $action . ucfirst($subject); // eg list course becomes listCourse

$db = pdoDB::getConnection(); // connect to db

//set the header to json because everything is returned in that format
header("Content-Type: application/json");

// take the appropriate action based on the action and subject
switch ($route) {
    case 'listCountries':
        $id                = $db->quote($id);
        $sqlCountries = "SELECT co.A3Code AS countrycode, co.Name AS countryname, Continent, Region, co.Population AS countrypopulation, Capital, ci.Name AS cityname
                              FROM w_Country co
                              LEFT JOIN w_City ci
                              ON co.Capital = ci.ID
                              WHERE continent=$id
                              ORDER BY countryname";
        $rs                = new C_JSONRecordSet();
        $retval            = $rs->getRecordSet($sqlCountries, 'ResultSet', null);
        echo $retval;
        break;
    case 'listContinents':
        $sqlContinents = "SELECT ID, Name
                       FROM w_Continent
                       ORDER BY Name";

        $rs         = new C_JSONRecordSet();
        $retval     = $rs->getRecordSet($sqlContinents, 'ResultSet', null);
        echo $retval;
        break;
    case 'updateCountry':
        if (!empty($data)) {
            $country = json_decode($data);
            $countryUpdateSQL = "update w_Country set HeadOfState=:headofstate";
            $rs = new JSONRecordSet();
            $retval = $rs->getRecordSet($countryUpdateSQL,
                'ResultSet',
                array(':HeadOfState'=>$country->headofstate));
            echo '{"status":"ok", "message":{"text":"updated", "HeadOfState":"'.$country->headofstate.'"}}';
        }
        break;
        case 'actionrequiringlogin':
        //check user session is not empty
        if (!empty($session->user)) {
            //construct appropriate sql
            // execute using xml or json record set class
            // echo return value from record set
        }
        else {
            header("Content-Type: application/json", true, 412);
            echo '{"status":{"error":"error", "text":"login required to view this information"}}';
        }
        break;
    //log user in given a username and password, via $_POST
    case 'postLogin':
        if(!empty($data)) {
            $username = $data['username'];
            $password = md5($data['password']);
            $rs = new C_JSONRecordSet();
            //construct login sql using placeholders
            $loginSQL = "SELECT userid, username, role FROM w_User WHERE userid = :userid AND password = :password";
            //create an array for the placeholder values
            $params = array(':userid' => $username, ':password' => $password);
            $retval = $rs->getRecordSet($loginSQL, 'ResultSet', $params);
            if ($retval !== false) {  // store successful login details
                echo $retval;
                    $session->user = $retval;
            } else {
                // if the log in failed unset any previously set value for user
                //$session->removeKey('user');
                echo '{"status":{"error":"error", "text":"Login failed. Unsetting values."}}';
            }

        } else {
            echo "data is empty";
        }
            break;
    case 'isloggedinUser':
        if (!empty($session->user)) {
            $user = $session->user;
            echo $user;
        }
        else {
            echo '{"status":{"error":"error", "text":"user not logged in"}}';
        }
        break;
    default:
        echo '{"status":"error", "message":{"text": "default no action taken"}}';
        break;
}

