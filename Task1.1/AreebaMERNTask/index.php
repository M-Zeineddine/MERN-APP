<?php

//The if loop here is testing if there is data returned in the post variable after pressing the submit button
//Then, the data coming after fetching the api with the selected mobile number($mobile), is saved in the $result variable, which is then printed out on the screen
if(isset($_POST['submit'])){

  $mobile = $_POST['mobile'];
  
  $curl = curl_init();
  
  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.numlookupapi.com/v1/validate/$mobile?apikey=x91AWtbDrPjFgIZ1WwQpehkKkYXgIAqRhLPitjlE",
    CURLOPT_HTTPHEADER => array(
      "Content-Type: text/plain",
      "apikey: x91AWtbDrPjFgIZ1WwQpehkKkYXgIAqRhLPitjlE"
    ),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
  ));
  
  $response = curl_exec($curl);
  
  curl_close($curl);
  
  $result = json_decode($response,true);
  
  
  $myObj = new stdClass();
  $myObj->countryCode = $result['country_code'];
  $myObj->countryName = $result['country_name'];
  $myObj->operatorName = $result['carrier'];
  
  $myJSON = json_encode($myObj, JSON_PRETTY_PRINT);
  
  if(!$result['valid']){
    echo "Invalid Number";
  }
  else{
    echo "<pre>".$myJSON."<pre/>";
  }

}
?>

<form method="POST">
  <input type="text" name = "mobile" required/>
  <input type="submit" name = "submit">
</form>

