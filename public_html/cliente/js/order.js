function insertOrder(parameters, callback) {
    $.ajax({
        url: '../server/controller/pedidoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'insert',
            values: [parameters.id, parameters.status]
        }
    }).success(function(result) {
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        logError(error);
    });
}

function emptyOrder(id, callback) {
    $.ajax({
        url: '../server/controller/pedido_lineaController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'deleteByCondition',
            condition: 'id_pedido = ' + id
        }
    }).success(function(result) {
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        logError(error);
    });
}

function deleteOrder(id, callback) {
    $.ajax({
        url: '../server/controller/pedidoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'deleteByCondition',
            condition: 'usuario = ' + id
        }
    }).success(function(result) {
        emptyOrder(id, callback(result));
    }).error(function(error) {
        logError(error);
    });
}

function insertOrderLine(parameters, callback) {
    $.ajax({
        url: '../server/controller/pedido_lineaController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'insert',
            values: [parameters.orderIndex, parameters.id, parameters.quantity]
        }
    }).success(function(result) {
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        logError(error);
    });
}