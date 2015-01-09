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
    }).success(function (result) {
        if (callback !== undefined) callback(result);
        return result;
    }).error(function (error) {
        $('#log').html(error.responseText);
    });
}

function loadCart() {
    totalCost = 0;
    getCart(function (result) {
        result = JSON.parse(result);

        $('#divGames').html('');
        $('#divGames').hide();
        $('#divDetail').hide();

        function getCartGames(gameIndexes) {
            var gameID = gameIndexes[gameIndexes.length - 1];
            findProduct(gameID, function (product) {
                loadThumbnail($('#divGames'), product, result[gameIndexes[gameIndexes.length - 1]]);

                $('#divGames .game:last-child .imgBack').click(function (ev) {
                    findProduct($(ev.currentTarget).parent().attr('data-id'), function (result) {
                        loadGameDetail($('#divDetail'), result, true);
                    });
                });

                gameIndexes = gameIndexes.slice(0, gameIndexes.length - 1);
                if (gameIndexes.length > 0) {
                    getCartGames(gameIndexes);
                } else {
                    console.log(totalCost);
                    $('#totalCost').hide();
                    $('#totalCost').html('Importe total: ' + totalCost + '€');
                    $('#totalCost').fadeIn("slow");
                    $('#divGames').fadeIn("slow");
                }
            });
        }
        getCartGames(Object.keys(result));
    });
}


$('document').ready(function () {
    loadCart();
});