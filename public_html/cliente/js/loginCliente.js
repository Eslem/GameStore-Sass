function loginCliente(elem) {
    
    var data = $("#formLoginCliente").serialize();

    $.ajax({
        url: rootURL + 'server/controller/usuarioController.php',
        type: 'POST',
        dataType: 'JSON',
        data: data,
        success: function (user) {
            if (user === "false") {
                console.log("Error en usuario o contraseña");
                session_unsert();
                session_destroy();
            } else {
                $("#hexagono").toggleClass("inactive");
                $(".form-slideLeft").toggleClass("inactive");
                $("#navLinkProfile a").text(user.alias);   
                $("#emailCliente, #passCliente").each(function(i, element){
                    element.value = '';
                });
                
                
                

            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}
