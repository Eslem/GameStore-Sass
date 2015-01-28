/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var baseurl = window.location.pathname;
var user = null;

function login(elem) {
    // alert();
    $("#logo").addClass("flip");

    var data = $("#loginForm").serialize();
    console.log(data);
    setTimeout(function () {
        $.ajax({
            url: baseurl + "../server/controller/administradorController.php",
            data: data,
            type: "POST",
            success: function (data) {

                if (data === "false") {
                    showError("Error en usuario o contraseña");
                } else {
                    user = data;
                    $("#login").hide();
                    onlogin();
                    app.routes['admins'].show();
                }
                $("#logo").removeClass("flip");
            },
            error: function (data) {
                $("#logo").removeClass("flip");
                showError(data);
            }
        });
    }, 1000);
}

function showError(text) {
    $("#error").slideDown("slow");
    $("#error").text(text);
    setTimeout(function () {
        $("#error").slideUp();
    }, 3000);

}

function logout() {
    $.ajax({
        url: baseurl + "../server/controller/administradorController.php",
        data: {
            query: "logout"
        },
        type: "POST",
        success: function (data) {
            $("#login").fadeIn();
            onnologin();
        },
        error: function (data) {
            $("#logo").removeClass("flip");
            showError(data);
        }
    });
}

function getSession(callback) {
    $.ajax({
        url: baseurl + "../server/controller/administradorController.php",
        data: {
            query: "getLogged"
        },
        type: "POST",
        success: function (data) {
            console.log(data);
            callback();
        },
        error: function (data) {
            onnologin();
        }
    });
}

function onlogin() {
    $(".sidebar-inactive").removeClass("sidebar-inactive");
    $("#login").hide();
}

function onnologin() {
    $("#login").fadeIn();
    $("#login").addClass("sidebar-inactive");
    $("#wrap-body").addClass("sidebar-inactive");
    $("#wrap-body").html("");
    $(".sideBar").addClass("sidebar-inactive");
};