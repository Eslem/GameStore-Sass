var rootURL = location.hostname === 'localhost' ?
'http://localhost/GameStore-Sass/public_html/' : 'http://metro-hermanu.rhcloud.com/';

function loadNavbar(section) {
    $('#navbar').load('navbar.html', function () {
        $('#navLink' + section).addClass('active');
        $('#navLink' + section + ' a').removeAttr('href');
        
        $("#hexagono, #hexagono2").click(function () {
            if (!$(this).hasClass("active")) loginCliente(this);
        });
    });
}

