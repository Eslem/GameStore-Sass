function loginCliente(elem) {
    var data = $("#formLoginCliente").serialize();

    $.ajax({
        url: '../server/controller/usuarioController.php',
        type: 'POST',
        dataType: 'JSON',
        data: data,
        success: function (user) {
            if (user === "false") {
                console.log("Error en usuario o contraseña");
            } else {
                $("#hexagono").toggleClass("inactive");
                $(".form-slideLeft").toggleClass("active");
                $("#navLinkProfile a").text(user.alias);

            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}