function getCart(callback) {
    $.ajax({
        url: '../server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'get'
        }
    }).success(function(result) {
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function addToCart(id) {
    $.ajax({
        url: '../server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'add',
            id: id
        }
    }).success(function(result) {
        saveCart(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function removeFromCart(id, callback) {
    $.ajax({
        url: '../server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'remove',
            id: id
        }
    }).success(function(result) {
        saveCart(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function increaseProduct(id, callback) {
    $.ajax({
        url: '../server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'increase',
            id: id
        }
    }).success(function(result) {
        saveCart(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function decreaseProduct(id, callback) {
    $.ajax({
        url: '../server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'decrease',
            id: id
        }
    }).success(function(result) {
        saveCart(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function emptyCart() {
    $.ajax({
        url: '../server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'empty'
        }
    }).success(function(result) {
        saveCart(result);
        location.reload();
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function saveCart(cart) {
    function sendLine(id, quantity) {
        console.log(id, quantity);
        $.ajax({
            url: '../server/controller/pedido_lineaController.php',
            dataType: 'JSON',
            type: 'POST',
            data: {
                query: 'insert',
                values: [0, id, quantity]
            }
        }).error(function(error) {
            $('#log').html(error.responseText);
        });
    }

    var items = Object.keys(cart);
    for (var i in items) {
        sendLine(items[i], cart[items[i]]);
    }

    /*$.ajax({
     url: '../server/dao/pedidoDAO.php',
     type: 'POST',
     data: {
     operation: 'empty'
     }
     }).success(function(result) {
     //console.log(result);
     location.reload();
     }).error(function(error) {
     $('#log').html(error.responseText);
     });*/
}