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
        logError(error);
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
        logError(error);
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
        logError(error);
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
        logError(error);
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
        logError(error);
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
        console.log('No hay mensaje!');
        logError(error);
    });
}

function saveCart(cart) {
    emptyOrder(0, function() {
        console.log('Order emptied');
        insertOrder({id: 0, status: 'Cart'}, function() {
            console.log('Order inserted');
            var items = Object.keys(cart);
            for (var i in items) {
                insertOrderLine({orderIndex: 0, id: items[i], quantity: cart[items[i]]}, function() {

                });
            }
        });
    });
}