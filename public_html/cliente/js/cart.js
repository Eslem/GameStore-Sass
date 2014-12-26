function getCart(callback) {
    $.ajax({
        url: '../php/cartManager.php',
        type: 'POST',
        data: {
            operation: 'get'
        }
    }).success(function (result) {
        if (callback !== undefined) callback(result);
    }).error(function (error) {
        $('#log').html(error.responseText);
    });
}

function addToCart(id) {
    $.ajax({
        url: '../php/cartManager.php',
        type: 'POST',
        data: {
            operation: 'add',
            id: id
        }
    }).success(function (result) {
        console.log(result);
    }).error(function (error) {
        $('#log').html(error.responseText);
    });
}

function removeFromCart(id, callback) {
    $.ajax({
        url: '../php/cartManager.php',
        type: 'POST',
        data: {
            operation: 'remove',
            id: id
        }
    }).success(function (result) {
        //console.log(result);
        if (callback !== undefined) callback(result);
    }).error(function (error) {
        $('#log').html(error.responseText);
    });
}

function emptyCart() {
    $.ajax({
        url: '../php/cartManager.php',
        type: 'POST',
        data: {
            operation: 'empty'
        }
    }).success(function (result) {
        //console.log(result);
    }).error(function (error) {
        $('#log').html(error.responseText);
    });    
}