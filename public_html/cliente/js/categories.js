//==============================================================================
// CATEGORIES
//==============================================================================

var categories;

function getProductsByCategory(category, callback) {
    $.ajax({
        url: '../server/controller/productoController.php',
        type: 'POST',
        data: {
            query: 'selectJoin',
            otherTable: 'producto_categorias',
            field: 'id',
            otherField: 'idProducto',
            condition: 'idCategoria = ' + category
        }
    }).success(function (result) {
        callback(result);
    }).error(function (error) {
        $('#log').html(error.responseText);
    });
}

function findProduct(id, callback) {
    $.ajax({
        url: '../server/controller/productoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'find',
            id: id
        }
    }).success(function (result) {
        callback(result);
    }).error(function (error) {
        $('#log').html(error.responseText);
    });
}


//==============================================================================
// MAIN
//==============================================================================

function loadGames(categoryID) {
    getProductsByCategory(categoryID, function (result) {
        $('#divGames').text('');
        $('#divDetail').hide();
        if (result !== '' && result !== null && JSON.parse(result) !== null) {
            $(".back-panel").removeClass("active");
            result = JSON.parse(result);
            for (var i in result) {
                loadThumbnail($('#divGames'), result[i]);
                $('#divGames').fadeIn("slow");

            }
            $('.game .imgBack').click(function (ev) {
                findProduct($(ev.currentTarget).parent().attr('data-id'), function (result) {
                    loadGameDetail($('#divDetail'), result, false);
                });
            });
        } else {
            if (!$(".back-panel").hasClass("active"))
                $(".back-panel").addClass("active");
            alert('No existen juegos bajo esta categoría.');
        }

        history.pushState(null, '', 'categorias.html#' + categoryID);
    });
}

function getSelectedCategory() {
    var url = window.location.toString();
    if (url.indexOf('#') !== -1) {
        var categoryID = parseInt(url.slice(url.indexOf('#') + 1));
        if (!isNaN(categoryID))
            loadGames(categoryID);
        else {
            $(".back-panel").addClass("active");
            window.history.pushState({}, "", url.slice(0, url.indexOf('#')));
        }
    } else {
        $(".back-panel").addClass("active");
    }
}


//==============================================================================
// ON DOCUMENT READY
//==============================================================================

$('document').ready(function () {
    loadNav("navLinkCategories");
    getSelectedCategory();
});