<?php
$titulo = $_POST["title"];
$cuerpo = $_POST["body"];
// API access key from Google API's Console
define( 'API_ACCESS_KEY', 'AAAAT6UY74g:APA91bHi2mmWMkFZfW0-qfiaXoG5taQ-h_L7CWnsQSCheO-wFDuVjY-yAKUL8vb2p_i7tFK8fvQIuGQtZwNNymGlSjVRDZWXLus0d-qUCk1WpPQ742cHwMtdw4gKQI9saWCk4rbKGYHj' );
// $registrationIds = array( TOKENS );
// prep the bundle
$msg = array
(
    'body'  => $titulo,
    'title'     => $cuerpo,
    'vibrate'   => 1,
    'sound'     => 1,
);

$fields = array
(
    'to'  => '/topics/alertasAtizapan',
    'notification'          => $msg
);

$headers = array
(
    'Authorization: key=' . API_ACCESS_KEY,
    'Content-Type: application/json'
);

$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );
//echo $result;

$fields = array
(
    'nombre'  => $cuerpo,
    'descripcion'  => $titulo,
	  'prioridad' => 'Media'
);

$url = "https://jwtauth-webapi.azurewebsites.net/api/alerta/add";
$ch = curl_init( $url );
# Setup request to send json via POST.
$payload = json_encode($fields);
curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload );
curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
# Return response instead of printing.
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
# Send request.
$result = curl_exec($ch);
curl_close($ch);
# Print response.
//echo "<pre>$result</pre>";
?>

<html>
<head>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body>

  <div class="container">
        <h1>Notificación enviada</h1>
  </div>



<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
<script> setTimeout(() => {
  document.location="https://helpnetx.com/andre/creanotificacion.php";
}, 2000);
</script>
</body>
</html>