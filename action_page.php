<?php
/*
This first bit sets the email address that you want the form to be submitted to.
You will need to change this value to a valid email address that you can access.
*/
$webmaster_email = "akhil2018cs131abesit@gmail.com";
if($_POST["submit"]) {
$Name = $_REQUEST['Name'] ;
$email_address = $_REQUEST['Email'] ;
$Subject = $_REQUEST['Subject'] ;
$Message = $_REQUEST['Message'] ;
$msg = 
"Name: " . $Name . "\r\n" . 
"Email: " . $email_address . "\r\n" . 
"Subject: " . $Subject . "\r\n" . 
"Message:".$Message ;
// If we passed all previous tests, send the email then redirect to the thank you page.
	mail( "$webmaster_email", "Feedback Form Results", $msg ,);
}
?>