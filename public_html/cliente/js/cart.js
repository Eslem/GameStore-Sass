function getCart(callback) {
    $.ajax({
        url: '../server/cartManager.php',
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
        type: 'POST',
        data: {
            operation: 'add',
            id: id
        }
    }).success(function(result) {
        console.log(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function removeFromCart(id, callback) {
    $.ajax({
        url: '../server/cartManager.php',
        type: 'POST',
        data: {
            operation: 'remove',
            id: id
        }
    }).success(function(result) {
        //console.log(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function increaseProduct(id, callback) {
    $.ajax({
        url: '../server/cartManager.php',
        type: 'POST',
        data: {
            operation: 'increase',
            id: id
        }
    }).success(function(result) {
        //console.log(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function decreaseProduct(id, callback) {
    $.ajax({
        url: '../server/cartManager.php',
        type: 'POST',
        data: {
            operation: 'decrease',
            id: id
        }
    }).success(function(result) {
        //console.log(result);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function emptyCart() {
    $.ajax({
        url: '../server/cartManager.php',
        type: 'POST',
        data: {
            operation: 'empty'
        }
    }).success(function(result) {
        //console.log(result);
        location.reload();
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}