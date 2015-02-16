//==============================================================================
// CATEGORIES
//==============================================================================

var game;

function findProduct(id, callback) {
    $.ajax({
        url: rootURL + 'server/controller/productoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'find',
            id: id
        }
    }).success(function(result) {
        game = result;
        callback(result);
    }).error(function(error) {
        logError(error);
    });
}


//==============================================================================
// MAIN
//==============================================================================

function loadGame(gameID) {
    $('#divDetail').hide();
    findProduct(gameID, function(product) {
        if (product !== '' && product !== null)
            loadGameDetail($('#divDetail'), product, false, true);
        else console.log('No item with that id found in the table.');
    });
}

function getSelectedGame() {
    var url = window.location.toString();
    if (url.indexOf('#') !== -1) {
        var gameID = parseInt(url.slice(url.indexOf('#') + 1));
        if (!isNaN(gameID))
            loadGame(gameID);
        else {
            $('#divDetail').html('<h2>404: No existe ningún juego con esa ID</h2>');
        }
    } else {
        $(".back-panel").addClass("active");
    }
}


//==============================================================================
// ON DOCUMENT READY
//==============================================================================

$('document').ready(function() {
    loadNavbar();

    getSelectedGame();
});