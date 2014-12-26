//==============================================================================
// CATEGORIES
//==============================================================================

var categories;

function getProductsByCategory(category, callback) {
    $.ajax({
        url: '../php/controller/productoController.php',
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
        url: '../php/controller/productoController.php',
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
        $('#divGames').html('');
        $('#divDetail').html('');
        if (result !== '' && result !== null && JSON.parse(result) !== null) {
            $(".back-panel").removeClass("active");
            result = JSON.parse(result);
            for (var i in result) {
                $('#divGames').hide();
                $('#divGames').append('<div class="game" data-id="' + result[i].id + '">'
                        + '<div class="imgBack"><img src="images/games/' + result[i].id
                        + '.jpg" alt><div class="diagnalA">Detalle</div></div><div class="info">'
                        + '<div>' + result[i].nombre + '</div></div></div>');
                $('#divGames').fadeIn("slow");

            }
            $('.game .imgBack').click(function (ev) {
                findProduct($(ev.currentTarget).parent().attr('data-id'), function (result) {
                    $('#divDetail').hide();
                    $('#divDetail').html('<div class="detail">'
                            + '<img class="imgDet" src="images/games/' + result.id + '.jpg" alt>'
                            + '<div><h3>' + result.nombre + '</h3><hr/>'
                            + '<p>' + result.descripcion + '</p></div>' + '<div class="platforms">Plataformas</div>'
                            + '<div class="precio">' + result.precio + '€</div>'
                            + '<button onclick="addToCart(' + result.id + ');" class="diagnalA btnCB btnCB-5 btnCB-5b">'
                            + '<span>Add to cart</span></button></div>');
                    $('#divDetail').fadeIn("slow");
                });
            });
        } else {
            if (!$(".back-panel").hasClass("active"))
                $(".back-panel").addClass("active");
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
        else
            window.history.pushState({}, "", url.slice(0, url.indexOf('#')));
    } else {
        $(".back-panel").addClass("active");
    }
}


//==============================================================================
// ON DOCUMENT READY
//==============================================================================

$('document').ready(function () {
    $('#navbar').load('navbar.html', function () {
        $('#navLinkCategories').addClass('active');
    });

    getCategories(function (categories) {
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

        $('.panel-categorias .gameIcon').click(function (ev) {
            loadGames($(ev.currentTarget).attr('data-id'));
        });
    });

    getSelectedCategory();
});