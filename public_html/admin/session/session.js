


$.ajax({
  url: 'session.php',
  type: 'POST',
  data: {
      id: $("#loginCliente").val(),
      pass: $("#passCliente").val()
  },
  success: procesaRespuesta,
  error: muestraError
})
