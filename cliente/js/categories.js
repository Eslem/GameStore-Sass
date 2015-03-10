//==============================================================================
// CATEGORIES
//==============================================================================

var categories;

function getProductsByCategory(category, callback) {
    $.ajax({
        url: rootURL + 'server/controller/productoController.php',
        dataType: 'JSON',
        type: 'POST',
        data: {
            query: 'selectJoin',
            otherTable: 'producto_categorias',
            field: 'id',
            otherField: 'idProducto',
            condition: 'idCategoria = ' + category
        }
    }).success(function(result) {
        callback(result);
    }).error(function(error) {
        logError(error);
    });
}

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
        callback(result);
    }).error(function(error) {
        logError(error);
    });
}


//==============================================================================
// MAIN
//==============================================================================

function loadGames(categoryID) {
    getProductsByCategory(categoryID, function(result) {
        $('#divGames').text('');
        $('#divDetail').hide();
        if (result !== '' && result !== null) {
            $(".back-panel").removeClass("active");
            for (var i in result) {
                loadThumbnail($('#divGames'), result[i]);
                $('#divGames').fadeIn("slow");
            }
            $('.game .imgBack').click(function(ev) {
                findProduct($(ev.currentTarget).parent().attr('data-id'), function(product) {
                    if (product !== '' && product !== null)
                        loadGameDetail($('#divDetail'), product, false, true);
                    else console.log('No item with that id found in the table.');
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

$('document').ready(function() {
    loadNavbar('Categories');

    getCategories(function(categories) {
        var strHTML = '';
        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];

            if (i % 3 === 0)
                strHTML += '<li>';
            strHTML += '<span class="gameIcon" data-id="' + category.id + '">' +
                    '<img class="genreIcon" src="images/genres/'
                    + category.nombre + '.svg"><br/>' + category.nombre + '</span>';
            if (!i % 3 === 2)
                strHTML += '</li>';
        }

        $('.panel-categorias').html(strHTML);

        $('.panel-categorias .gameIcon').click(function(ev) {
            loadGames($(ev.currentTarget).attr('data-id'));
        });
    });

    getSelectedCategory();
});
