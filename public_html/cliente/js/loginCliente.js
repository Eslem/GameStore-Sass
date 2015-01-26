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
                setSessionUser(user, function () {
                    /*$("#hexagono").toggleClass("inactive");
                     $(".form-slideLeft").toggleClass("inactive");*/
                    $("#navLinkProfile a").text(user.alias);
                    $("#emailCliente, #passCliente").each(function (i, element) {
                        element.value = '';
                    });
                });
                
                if ($("#navLinkProfile a").text() !== "perfil") {
                    $("#hexagono").css("display", "none");
                    $("#hexagono2").css("display", "inline-block");
                }
            }


          /*  if (!getSessionUser(function (user) {
                getSessionUser(function (user) {
                    console.log(user);
                });
            }))*/


        },
        error: function (error) {
            console.log('Could not get user');
            logError(error);
        }
    });
}


function setSessionUser(user, callback) {
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

function getSessionUser(callback) {
    $.ajax({
        url: rootURL + 'server/sessionUserManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'get'
        }
    }).done(function (result) {
        callback(result);
    });
}

function unsetSessionUser(callback) {
    $.ajax({
        url: rootURL + 'server/sessionUserManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'unset'
        }
    }).success(function (result) {
        if (callback !== undefined)
            callback(result);
    }).error(function (error) {
        logError(error);
    });
}
