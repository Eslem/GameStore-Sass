/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var baseurl = window.location.pathname;
var user = null;


//node-webKit
$(document).ready(function () {
    var isNodeWebkit = (typeof process == "object");
    if (isNodeWebkit) {
        var gui = require('nw.gui');
        var win = gui.Window.get();
        win.maximize();
        baseurl = "http://daw.localhost/Projects/GameStore-Sass/public_html/admin/";
    }
});

function login(elem) {
    // alert();
    $("#logo").addClass("flip");

    var data = $("#loginForm").serialize();
    console.log(data);
    $.ajax({
            url: baseurl + "../server/controller/administradorController.php",
            data: data,
            type: "POST",
            success: function (data) {
setTimeout(function () {
                if (data === "false") {
                    showError("Error en usuario o contraseña");
                } else {
                    user = data;
                    $("#login").hide();
                    onlogin();
                    app.routes['admins'].show();
                }
                $("#logo").removeClass("flip");
				}, 1500);
            },
            error: function (data) {
                $("#logo").removeClass("flip");
                showError(data);
            }
        });
    return false;
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