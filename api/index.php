<?php
include 'functions.loader.php';
require 'vendor/autoload.php';
require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


$app = new \Slim\App;

$app->post('/test', function (Request $request, Response $response) {
    $num = test();
    echo $num;
});


$app->post('/email_from_contact_us',function(Request $request, Response $response){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = $_POST['subject'];

    $mail = new PHPMailer();
    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'edjohnpaulgallardo28@gmail.com';                     //SMTP username
        $mail->Password   = 'brwsuyegqfwsaioq';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
        // $mail->setFrom($email);
        $mail->addAddress('humanoolex2022@gmail.com');     //email address of the recipent
        $mail->addReplyTo($email);
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->AltBody = "This is the plain text version of the email content";
        $mail->send();
        echo 'Message has been sent';
        // $emailSent = 1;
    } catch (Exception $e) {
        echo "Message could not be sent";
        // $emailSent = 0;
        // echo "Mailer Error: " . $mail->ErrorInfo;
    }
});

$app->run();
