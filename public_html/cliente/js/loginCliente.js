function loginCliente(elem) {

    var data = $("#formLoginCliente").serialize();

    $.ajax({
        url: rootURL + 'server/controller/usuarioController.php',
        type: 'POST',
        dataType: 'JSON',
        data: data,
        success: function (user) {
            

            if (!user) {
                console.log("Error en usuario o contraseña");
            } else {
                setUser(user, function () {
                    /*$("#hexagono").toggleClass("inactive");
                     $(".form-slideLeft").toggleClass("inactive");*/
                    $("#navLinkProfile a").text(user.alias);
                    $("#emailCliente, #passCliente").each(function (i, element) {
                        element.value = '';
                    });
                });
                if ($("#navLinkProfile a").text() !== "perfil") {
                    $("#hexagono").toggleClass("logout");

                }

            }

        },
        error: function (data) {
            console.log(data);
        }
    });


}


function setUser(user, callback) {
    $.ajax({
        url: rootURL + 'server/sessionUserManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'set',
            user: user
        }
    }).success(function (result) {
        if (callback !== undefined)
            callback(result);
    }).error(function (error) {
        console.log('Could not set $SESSION user');
        logError(error);
    });
}
function clearSession(user, callback) {
    $.ajax({
        url: rootURL + 'server/sessionUserManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'empty',
            user: user
        }
    }).success(function (result) {
        if (callback !== undefined)
            callback(result);
    }).error(function (error) {
        console.log('Could not clear $SESSION user');
        logError(error);
    });

}