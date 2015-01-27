
function loadRegistro() {


    $("#registroClientes").load("registro/registro.html").dialog({
        modal: true,
        title:"Registro",
        buttons: {
            "Crear cuenta": function () {
                var formularioCliente = $("#registroClientes input").serialize();
                console.log(formularioCliente);
                },
            Close: function () {
                $("#registroClientes").dialog("close");
            }
        }
    });

}
;

