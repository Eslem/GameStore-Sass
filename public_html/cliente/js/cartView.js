//==============================================================================
// CART
//==============================================================================

var totalCost = 0;
var total = 0;

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

function loadCart() {
    totalCost = 0;
    $('#totalCost').html('');
    getSessionCart(function (result) {
        $('#divGames').html('');
        $('#divGames, #divDetail').hide();

        function getSessionCartGames(gameIndexes) {
            if (gameIndexes.length > 0) {
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
                            getSessionCartGames(gameIndexes);
                        } else {
                            $('#totalCost').html('Importe total: ' + totalCost + '€');
                            $('#divGames').fadeIn('slow');
                        }
                    } else
                        console.log('No item with that id found in the table.');
                });
                $('#totalCost, #actions').fadeIn('fast');
                $('#emptyMessage').fadeOut('slow');
            } else {
                $('#totalCost, #actions').fadeOut('slow');
                $('#emptyMessage').fadeIn('fast');
            }
        }
        if (Object.keys(result).length > 0)
            getSessionCartGames(Object.keys(result));
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

function cartTotal(result) {
    var deferred = Q.defer();
    var error = false;
    var total = 0;

    var gameIDs = Object.keys(result);

    function getTotalProductPrice() {
        var gameID = gameIDs[gameIDs.length - 1];
        findProduct(gameID, function (product) {
            if (product !== '' && product !== null) {
                var cantidad = result[gameID];
                total += parseFloat(product.precio * cantidad);
            } else {
                error = true;
            }
            gameIDs.pop();
            if (gameIDs.length > 0)
                getTotalProductPrice(gameIDs.length - 1);
            else if (!error && total > 0) {
                deferred.resolve(total);
            } else {
                console.log("Error en el calculo del total");
                deferred.reject("Error en el calculo del total");
            }
        });
    }

    getTotalProductPrice();
    return deferred.promise;
}

function placeOrder() {
    getSessionUser(function (user) {
        console.log(user);
        getSessionCart(function (result) {
            cartTotal(result).then(function (result) {
                console.log('Procediendo a realizar pago.');
                $.ajax({
                    url: rootURL + 'server/cartPay.php',
                    dataType: 'JSON',
                    type: 'POST',
                    data: {
                        cuentaOrigen: 1,
                        cuentaDestino: 2,
                        cantidad: parseFloat(result),
                        concepto: 'Prueba desde tienda',
                        pin: '1111'
                    }
                }).complete(function (result) {
                    insertOrder({id: user.id, status: 'Paid'}, function () {
                        alert("Compra realizada con exito");
                    });
                });
            });
            loadCart();
        }, function (error) {
            logError(error);
        });
    });
}

$('document').ready(function () {
    $('#totalCost, #actions').hide();
    loadNavbar('Cart');
    loadCategoriesPanel();
    loadCart();
});