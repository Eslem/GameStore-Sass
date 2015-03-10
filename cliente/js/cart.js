// DATABASE //

function insertCart(parameters, callback) {
    $.ajax({
        url: rootURL + 'server/controller/carritoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'insert',
            values: [parameters.id, parameters.status]
        }
    }).success(function(result) {
        console.log('Inserted cart ' + parameters.id);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could not insert cart ' + parameters.id);
        logError(error);
    });
}

function emptyCart(id, callback) {
    $.ajax({
        url: rootURL + 'server/controller/carrito_lineaController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'deleteByCondition',
            condition: 'id_carrito = ' + id
        }
    }).success(function(result) {
        console.log('Emptied cart ' + id);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could not empty cart ' + id);
        logError(error);
    });
}

function deleteCart(id, callback) {
    $.ajax({
        url: rootURL + 'server/controller/carritoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'deleteByCondition',
            condition: 'usuario = ' + id
        }
    }).success(function(result) {
        console.log('Deleted cart ' + id);
        emptyCart(id, callback(result));
    }).error(function(error) {
        console.log('Could not delete cart ' + id);
        logError(error);
    });
}

function insertCartLine(parameters, callback) {
    $.ajax({
        url: rootURL + 'server/controller/carrito_lineaController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'insert',
            values: [parameters.cartIndex, parameters.id, parameters.quantity]
        }
    }).success(function(result) {
        console.log('Inserted line ' + parameters.id + ' on cart ' + parameters.cartIndex);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could not insert line ' + parameters.id + ' on cart ' + parameters.cartIndex);
        logError(error);
    });
}



// GUI //

function getSessionCart(callback) {
    $.ajax({
        url: rootURL + 'server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'get'
        }
    }).success(function(result) {
        console.log('Got $SESSION cart');
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could not get $SESSION cart');
        logError(error);
    });
}

function addToCart(id) {
    $.ajax({
        url: rootURL + 'server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'add',
            id: id
        }
    }).success(function(result) {
        console.log('Added item to $SESSION cart');
        saveCart(result);
    }).error(function(error) {
        console.log('Could add item to $SESSION cart');
        logError(error);
    });
}

function removeFromCart(id, callback) {
    $.ajax({
        url: rootURL + 'server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'remove',
            id: id
        }
    }).success(function(result) {
        console.log('Removed item from $SESSION cart');
        saveCart(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could remove item from $SESSION cart');
        logError(error);
    });
}

function increaseProduct(id, callback) {
    $.ajax({
        url: rootURL + 'server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'increase',
            id: id
        }
    }).success(function(result) {
        console.log('Increased item quantity in $SESSION cart');
        saveCart(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could increase item quantity in $SESSION cart');
        logError(error);
    });
}

function decreaseProduct(id, callback) {
    $.ajax({
        url: rootURL + 'server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'decrease',
            id: id
        }
    }).success(function(result) {
        console.log('Decreased item quantity in $SESSION cart');
        saveCart(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could decrease item quantity in $SESSION cart');
        logError(error);
    });
}

function emptySessionCart() {
    $.ajax({
        url: rootURL + 'server/cartManager.php',
        type: 'POST',
        data: {
            operation: 'empty'
        }
    }).success(function() {
        console.log('Emptied $SESSION cart');
        getSessionUser(function(user) {
        console.log('User: ', user);
            //emptyCart(0);
        });
        //location.reload();
    }).error(function(error, type) {
        console.log('Could not empty $SESSION cart');
        logError(error, type);
    });
}

function saveCart(cart) {
    getSessionUser(function(user) {
        console.log('User: ', user);
        emptyCart(user.id, function() {
            console.log('Emptied database cart');
            insertCart({id: user.id, status: 'Cart'}, function() {
                console.log('Inserted database cart');
                var items = Object.keys(cart);
                for (var i in items) {
                    insertCartLine({cartIndex: user.id, id: items[i], quantity: cart[items[i]]});
                }
            });
        });
    });
}
