
function loadRegistro() {


    $("#registroClientes").load("registro/registro.html").dialog({
        modal: true,
        title: "Nuevo Usuario",
        resizable: false,
        /* buttons: {
         "Crear cuenta": function () {
         var formularioCliente = $("#registroClientes input").serialize();
         console.log(formularioCliente);
         },
         Close: function () {
         $("#registroClientes").dialog("close");
         }
         }*/

        buttons: [
            {
                text: "Crear Cuenta",
                click: function () {
                    var data=$("#registroClientes").serialize();
                    

                    $.ajax({
                        url: rootURL + 'server/controller/usuarioController.php',
                        type: 'POST',
                        dataType: 'JSON',
                        data: data,
                        succes:function(data){
                            
                        },
                        error: function(data){
                          console.log(error);
                        }
                    });
                }
            },
            {
                text: "Cancel",
                icons: {
                    primary: "ui-icon-cancel"
                },
                click: function () {
                    $(this).dialog("close");
                }
            }

        ]
    });

}
;

