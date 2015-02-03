function getCart(callback) {
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

function emptyCart() {
    $.ajax({
        url: rootURL + 'server/cartManager.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'empty'
        }
    }).success(function(result) {
        console.log('Emptied $SESSION cart');
        emptyOrder(0);
        location.reload();
    }).error(function(error) {
        console.log('Could not empty $SESSION cart');
        logError(error);
    });
}

function saveCart(cart) {
    getSessionUser(function(user) {        
        emptyOrder(user.id, function() {
            console.log('Emptied database cart');
            insertOrder({id: user.id, status: 'Cart'}, function() {
                console.log('Inserted database cart');
                var items = Object.keys(cart);
                for (var i in items) {
                    insertOrderLine({orderIndex: user.id, id: items[i], quantity: cart[items[i]]});
                }
            });
        });
    });
}