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

    setInterval(autoSlider, 1000);
    
    setUpCategorias();
});

var active = 0;
function autoSlider() {
    
    $(".element .elements").eq(active).click();
    active++;
    if (active === 2) {
        active = 0;
    }
}

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

function changeMain(elem) {
    var img = $(elem).find("img").attr("src");
    var text = $(elem).find("h3").text();
    var beforeImg = $("#mainImg").attr("src");
    var h1 = $("#mainImg").parent().parent().find("h1");
    var beforeText = h1.text();


    $("#mainImg").css("opacity", "0");
    $("#mainImg").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
        $(elem).find("h3").text(beforeText);
        h1.text(text);

        $("#mainImg").attr("src", img);
        $("#mainImg").css("opacity", "1");
    });

    $(elem).find("img").css("opacity", "0");
    $(elem).find("img").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
        $(elem).find("img").attr("src", beforeImg);
        $(elem).find("img").css("opacity", "1");
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
        $(this).toggleClass("active");
        $(this).toggleClass("inactive");
        
        $(".form-slideLeft").toggleClass("active");
    });

    $(".slide-nav").click(function () {
        $(".navbar form, .navbar ul li:not(.slide-nav, .header)").slideToggle();
    });
}

function setUpCategorias(){
    $(".back-panel").mouseup(function()
		{
			$(this).removeClass("active");
	});
	$(".back-panel ul").mouseup(function()
		{
			return false;
	});
}

function showCategorias(){
 $(".back-panel").addClass("active");
}