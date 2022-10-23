<?php
$titulo = "hola";
$cuerpo = "cuerpo";

$fields = array
(
    'nombre'  => $titulo,
    'descripcion'  => $cuerpo,
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
echo "<pre>$result</pre>";
?>