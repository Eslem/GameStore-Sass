//==============================================================================
// CART
//==============================================================================

var totalCost = 0;

function findProduct(id, callback) {
    $.ajax({
        url: rootURL + 'server/controller/productoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'find',
            id: id
        }
    }).success(function (result) {
        console.log('Found product ' + id);
        if (callback !== undefined)
            callback(result);
        return result;
    }).error(function (error) {
        console.log('Could not find product ' + id);
        logError(error);
    });
}

function loadCart(parameters) {
    totalCost = 0;
    getCart(function (result) {
        $('#divGames').html('');
        if (parameters.transitionEnabled) {
            $('#divGames').hide();
            $('#divDetail').hide();
        }

        function getCartGames(gameIndexes) {
            var gameID = gameIndexes[gameIndexes.length - 1];
            findProduct(gameID, function (product) {
                if (product !== '' && product !== null) {
                    loadThumbnail($('#divGames'), product, result[gameIndexes[gameIndexes.length - 1]]);
                    $('#divGames .game:last-child .imgBack').click(function (ev) {
                        findProduct($(ev.currentTarget).parent().attr('data-id'), function (game) {
                            if (game !== '' && game !== null) {
                                loadGameDetail($('#divDetail'), game, true);
                            }
                        });
                    });
                    gameIndexes = gameIndexes.slice(0, gameIndexes.length - 1);
                    if (gameIndexes.length > 0) {
                        getCartGames(gameIndexes);
                    } else {
                        if (parameters.transitionEnabled)
                            $('#totalCost').hide();
                        $('#totalCost').html('Importe total: ' + totalCost + '€');
                        if (parameters.transitionEnabled) {
                            $('#totalCost').fadeIn('slow');
                            $('#divGames').fadeIn('slow');
                        }
                    }
                } else
                    console.log('No item with that id found in the table.');
            });
        }
        if (Object.keys(result).length > 0)
            getCartGames(Object.keys(result));
    });
}

function updateItems(result) {
    totalCost = 0;
    var items = Object.keys(result);

    for (var i in items) {
        if (!isNaN(items[i])) {
            var itemContainer = $('.game[data-id="' + items[i] + '"]');
            var precio = itemContainer.attr('data-price');
            itemContainer.find('.price').html(loadQuantity({
                id: items[i],
                precio: precio
            }, result[items[i]]));
        }
    }
    $('#totalCost').html('Importe total: ' + totalCost + '€');

    if (result.toDelete !== undefined)
        $('.game[data-id="' + result.toDelete + '"]').fadeOut('slow');
}

function logCart() {
    getCart(function (result) {
        var games = Object.keys(result);
        var total = 0;
        $(games).each(function (i, game) {
            var gameID = games[i];
            var cantidad = result[gameID];
            findProduct(gameID, function (product) {
                if (product !== '' && product !== null) {
                    total += parseInt(product.precio * cantidad);
                }
                console.log(total);
            });
        });
        $.ajax({
            url: 'urlapi',
            dataType: 'JSON',
            type: 'POST',
            data: {
                operation: 'DEBER',
                cuentaOrigen: 'cuentaorigen',
                cuentaDestino: 'cuentadestino',
                cantidad: 'cantidad',
                contraseña: 'contraseña'
            }
        }).success(function (result) {
            alert("Compra realizada con exito");
        }).error(function (error) {
            alert("Error en la transacción");
            logError(error);
        });
    });
    loadCart({
        transitionEnabled: true
    });
}

$('document').ready(function () {
    loadNavbar('Cart');
    loadCategoriesPanel();
    loadCart({
        transitionEnabled: true
    });
});