var rootURL = location.hostname === 'localhost' ?
      'http://localhost/GameStore-Sass/public_html/' : 'http://metrogames-slem.rhcloud.com/';
  
function loadNavbar(section) {
    $('#navbar').load('navbar.html', function () {
        $('#navLink' + section).addClass('active');
        $('#navLink' + section + ' a').removeAttr('href');

        $("#hexagono").click(function () {
            if (!$(this).hasClass("active"))
                loginCliente(this);
        });

        $("#hexagono2").click(function () {
            logoutCliente(this);
            $("#hexagono").css("display", "inline-block");
            $("#hexagono2").css("display", "none");

        });
    });
}

