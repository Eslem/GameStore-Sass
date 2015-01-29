
function loadRegistro() {



    $("#registroClientes").load("registro/registro.html").dialog({
        modal: true,
        title: "Nuevo Usuario",
        resizable: false,
        closeOnEscape: true,
        show: {effect: "fadeIn", duration: 500},
        width: 325,
        height: 530,
        buttons: [
            {
                text: "Crear Cuenta",
                icons: {
                    primary: "ui-icon-check"
                },
                click: function () {
                    var userInfo = [];
                    $("#registroClientes input").each(function (i, input) {
                        userInfo.push($(input).val());
                    });
                    $.ajax({
                        url: rootURL + 'server/controller/usuarioController.php',
                        dataType: 'JSON',
                        type: 'POST',
                        data: {
                            query: 'insert',
                            values: userInfo
                        }
                    }).success(function (result) {
                        alert("Nuevo usuario registrado");
                        console.log("Nuevo usuario registrado");
                        $("#registroClientes").dialog("close");
                        return result;
                    }).error(function (error) {
                        console.log('Error al registrar el usuario ');
                        logError(error);
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

    $(".ui-widget-overlay").click(function () {
        $('#registroClientes').dialog("close");
    });

}
;


