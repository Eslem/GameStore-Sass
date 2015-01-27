
function loadRegistro() {


    $("#registroClientes").load("registro/registro.html").dialog({
        modal: true,
        title: "Nuevo Usuario",
        resizable: false,
        show:{effect: "blind", duration: 500},
        buttons: [
            {
                text: "Crear Cuenta",
                click: function () {
                    //var userInfo = JSON.stringify($("#registroClientes input").serializeArray());

                    var userInfo = new Array();
                    /* $("#registroClientes input").each(function(index){
                     if(index<$("#registroClientes input").length){
                     userInfo+= $(this).val()+",";
                     index++;
                     }else{
                     userInfo+= $(this).val();                   
                     }
                     
                     });*/
                    userInfo = $("#registroClientes input").serializeArray();
                    console.log(userInfo);
                    $.ajax({
                        url: rootURL + 'server/controller/usuarioController.php',
                        dataType: 'JSON',
                        type: 'POST',
                        data: {
                            query: 'insert'
                        },
                        values: userInfo
                    }).success(function (result) {
                        console.log("Nuevo usuario registrado");
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

}
;

