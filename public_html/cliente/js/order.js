function insertOrder(parameters, callback) {
    $.ajax({
        url: '../server/controller/pedidoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'insert',
            values: [parameters.index, parameters.status]
        }
    }).success(function(result) {
        callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}

function deleteOrder(id, callback) {
    $.ajax({
        url: '../server/controller/pedidoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'delete',
            id: id
        }
    }).success(function(result) {
        callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
    
    
    $.ajax({
        url: '../server/controller/pedido_lineaController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            operation: 'deleteByCondition',
            condition: 'id_pedido = ' + id
        }
    }).success(function(result) {
        callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
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
        callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}