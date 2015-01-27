
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
                icons: {
                    primary: "ui-icon-check"
                },
                click: function () {
                    $(this).dialog("close");
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

