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
        console.log('Inserted order ' + parameters.id);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could not insert order ' + parameters.id);
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
        console.log('Emptied order ' + id);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could not empty order ' + id);
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
        console.log('Deleted order ' + id);
        emptyOrder(id, callback(result));
    }).error(function(error) {
        console.log('Could not delete order ' + id);
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
        console.log('Inserted line ' + parameters.id + ' on order ' + parameters.orderIndex);
        if (callback !== undefined) callback(result);
    }).error(function(error) {
        console.log('Could not insert line ' + parameters.id + ' on order ' + parameters.orderIndex);
        logError(error);
    });
}