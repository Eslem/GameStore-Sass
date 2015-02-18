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
                    if (validacionVacio()) {



                        /*var userInfo = [];
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
                         });*/
                    } else {
                        alert("Faltan campos por rellenar");
                        /*$("#registroClientes input").each(function (i, input) {
                         if(input === document.getElementById("apellidos")){
                         alert("apellidos");
                         }else{
                         alert("otros");
                         }
                         });*/

                        $("#registroClientes input").each(function (i, input) {
                            alert(input.value);
                            if (validacionVacio(input)) {
                                validacionCampos(document);
                            }
                        });
                    }
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

/*  --Funciones de validación--  */

function validacionVacio() {
    $("#registroClientes input").each(function (i, input) {
        if (input.value === null || input.value.trim() === "") {
            return false;
        } else {
            return true;
        }
    });
}

function validacionCampos(document) {
    validarLetras(document.getElementById("nombre").value, "El nombre debe");
    validarLetras(document.getElementById("apellidos").value, "Los apellidos deben");
    validarTelef(document.getElementById("telefono").value);
    validarEmail(document.getElementById("mail").value);
}

function validarLetras(valor, frase) {
    var reg = /^([a-z ñáéíóú]{2,60})$/i;
    if (reg.test(valor)) {
        return true;
    } else {
        alert("Error: " + frase + " contener solo letras.");
        return false;
    }

    frase();
}

function validarTelef(telef) {
    var patt = new RegExp("^[1-9]{9}$");
    if (patt.test(telef)) {
        return true;
    } else {
        alert("Error: El número de teléfono debe contener solo números.");
        return false;
    }
}

function validarEmail(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email))
        alert("Error: El email no tiene un formato apropiado (micorreo@dominio).");
}
