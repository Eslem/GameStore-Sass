
function loadRegistro() {

    $("#registroClientes").load("registro/registro.html").dialog({modal:true});

/*$("#registroClientes").dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
         Cancel: function() {
          $("#registroClientes").dialog( "close" );
        }
      },
      close: function() {
       $("#registroClientes input").value("");
      }
    });*/
};

