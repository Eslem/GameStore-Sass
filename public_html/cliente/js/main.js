function loadNavbar(section) {
    $('#navbar').load('navbar.html', function () {
        $('#navLink' + section).addClass('active');
        $('#navLink' + section + ' a').removeAttr('href');
        
        $("#hexagono").click(function () {
            if (!$(this).hasClass("active")) loginCliente(this);
        });
    });
}