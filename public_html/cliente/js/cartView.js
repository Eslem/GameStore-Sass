function findProduct(id, callback) {
    $.ajax({
        url: '../php/controller/productoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'find',
            id: id
        }
    }).success(function(result) {
        callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function loadCart() {
    getCart(function(result) {
        result = JSON.parse(result);

        $('#divGames').hide();
        $('#divDetail').hide();
        for (var i in result) {
            findProduct(i, function(result) {
                loadThumbnail($('#divGames'), result);

                $('#divGames .game:last-child .imgBack').click(function(ev) {
                    findProduct($(ev.currentTarget).parent().attr('data-id'), function(result) {
                        loadGameDetail($('#divDetail'), result, true);
                    });
                });
            });
        }
        $('#divGames').fadeIn("slow");
    });
}


$('document').ready(function() {
    loadCart();
});