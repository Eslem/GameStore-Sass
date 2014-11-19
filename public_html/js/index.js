/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var globalmargin;

$(document).ready(function () {
    //$('.main-Slider').append('');
    globalmargin = parseInt($(".gallery1 .imagenes").css("margin-left"));
    navBar();

    onScroll(".elements", function (el) {
       console.log("animate");
    });
});

function onScroll(elem, funcion) {
    $(window).scroll(function () {
        $(elem).each(function () {
            a = $(this).offset().top + $(this).height();
            b = $(window).scrollTop() + $(window).height();
            if (a < b) {
                funcion(this);
            }
        });
    });
}

function slide(elem, number, id) {
    //var margin = $(id + " .game").width() * 4*number*-1;
    $(elem).parent().children("li").removeClass("active");
    $(elem).addClass("active");

    switch (number) {
        case 0:
            margin = -2;
            break;
        case 1:
            margin = -107;
            break;
        case 2:
            margin = -212.5;
            break;
        case 3:
            margin = -318;
            break;
    }
    $(id).css("margin-left", margin + "%");
}

function navBar() {
    $(".show-animate").click(function () {
        $(".form-slideLeft").toggleClass("active");
    });

    $(".slide-nav").click(function () {
        $(".navbar form, .navbar ul li:not(.slide-nav, .header)").slideToggle();
    });
}