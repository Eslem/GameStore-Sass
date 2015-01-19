var totalCost = 0;
function findProduct(id, callback) {
    $.ajax({
        url: '../server/controller/productoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'find',
            id: id
        }
    }).success(function(result) {
        if (callback !== undefined) callback(result);
        return result;
    }).error(function(error) {
        logError(error);
    });
}

function loadCart(parameters) {
    totalCost = 0;
    getCart(function(result) {
        $('#divGames').html('');
        if (parameters.transitionEnabled) {
            $('#divGames').hide();
            $('#divDetail').hide();
        }

        function getCartGames(gameIndexes) {
            var gameID = gameIndexes[gameIndexes.length - 1];
            findProduct(gameID, function(product) {
                if (product !== '' && product !== null) {
                    loadThumbnail($('#divGames'), product, result[gameIndexes[gameIndexes.length - 1]]);
                    $('#divGames .game:last-child .imgBack').click(function(ev) {
                        findProduct($(ev.currentTarget).parent().attr('data-id'), function(result) {
                            loadGameDetail($('#divDetail'), result, true);
                        });
                    });
                    gameIndexes = gameIndexes.slice(0, gameIndexes.length - 1);
                    if (gameIndexes.length > 0) {
                        getCartGames(gameIndexes);
                    } else {
                        if (parameters.transitionEnabled) $('#totalCost').hide();
                        $('#totalCost').html('Importe total: ' + totalCost + '€');
                        if (parameters.transitionEnabled) {
                            $('#totalCost').fadeIn('slow');
                            $('#divGames').fadeIn('slow');
                        }
                    }
                } else console.log('Games in cart were not found in the database.');
            });
        }
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

    if (result.toDelete !== undefined) $('.game[data-id="' + result.toDelete + '"]').fadeOut('slow');
}

$('document').ready(function() {
    loadCart({
        transitionEnabled: true
    });
});