function findProduct(id, callback) {
    $.ajax({
        url: '../php/controller/productoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'find',
            id: id
        }
    }).success(function (result) {
        callback(result);
    }).error(function (error) {
        $('#log').html(error.responseText);
    });
}

function loadCart() {
    getCart(function (result) {
        result = JSON.parse(result);

        $('#divGames').hide();
        $('#divGames').html('');
        $('#divDetail').html('');
        for (var i in result) {
            findProduct(i, function (result) {
                $('#divGames').append('<div class="game" data-id="' + result.id + '">'
                        + '<div class="imgBack"><img src="images/games/' + result.id
                        + '.jpg" alt><div class="diagnalA">Detalle</div></div><div class="info">'
                        + '<div>' + result.nombre + '</div></div></div>');

                $('#divGames .game:last-child .imgBack').click(function (ev) {
                    findProduct($(ev.currentTarget).parent().attr('data-id'), function (result) {
                        $('#divDetail').hide();
                        $('#divDetail').html('<div class="detail">'
                                + '<img class="imgDet" src="images/games/' + result.id + '.jpg" alt>'
                                + '<div><h3>' + result.nombre + '</h3><hr/>'
                                + '<p>' + result.descripcion + '</p></div>' + '<div class="platforms">Plataformas</div>'
                                + '<div class="precio">' + result.precio + '€</div>'
                                + '<button onclick="removeFromCart(' + result.id + ', loadCart);" class="diagnalA btnCB btnCB-5 btnCB-5b">'
                                + '<span>Remove from cart</span></button></div>');
                        $('#divDetail').fadeIn("slow");
                    });
                });
            });
        }
        $('#divGames').fadeIn("slow");
    });
}


$('document').ready(function () {
    loadCart();
});