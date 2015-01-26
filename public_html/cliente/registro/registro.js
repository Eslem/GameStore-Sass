
function loadRegistro() {

    $("#registroClientes").load("registro/registro.html").dialog({
        autoOpen: true,
        modal: true,
        buttons: {
            Cancel: function () {
                $("#registroClientes").dialog("close");
            }
        },
        close: function () {
            $("#registroClientes input").text("");
        }
    });

};

