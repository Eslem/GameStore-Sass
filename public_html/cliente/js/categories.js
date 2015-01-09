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
    }).success(function(result) {
        callback(result);
    }).error(function(error) {
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
    }).success(function(result) {
        callback(result);
    }).error(function(error) {
        $('#log').html(error.responseText);
    });
}


//==============================================================================
// MAIN
//==============================================================================

function loadGames(categoryID) {
    getProductsByCategory(categoryID, function(result) {
        $('#divGames').text('');
        $('#divDetail').hide();
        if (result !== '' && result !== null && JSON.parse(result) !== null) {
            $(".back-panel").removeClass("active");
            result = JSON.parse(result);
            for (var i in result) {
<<<<<<< HEAD
                loadThumbnail($('#divGames'), result[i]);
                $('#divGames').fadeIn("slow");

            }
            $('.game .imgBack').click(function(ev) {
                findProduct($(ev.currentTarget).parent().attr('data-id'), function(result) {
                    loadGameDetail($('#divDetail'), result, false);
=======
                $('#divGames').hide();
                $('#divGames').append('<div class="game" data-id="' + result[i].id
                        + '"><div class="imgBack"><img src="images/games/' + result[i].id
                        + '/categories.jpg" alt></div><div class="diagnalA">Detalle</div><div class="info"><div>'
                        + result[i].nombre + '</div></div></div>');
                $('#divGames').fadeIn("slow");

            }
            $('.game').click(function(ev) {
                findProduct($(ev.currentTarget).attr('data-id'), function(result) {
                    $('#divDetail').hide();
                    $('#divDetail').html('<div class="detail"><img class="imgDet" src="images/games/'
                            + result.id + '/categories.jpg" alt><div><h3>' + result.nombre
                            + '</h3><hr/><p>' + result.descripcion + '</p>'
                            + '</div><div class="platforms">Plataformas</div><div class="precio">'
                            + result.precio + '€</div><button class="diagnalA btnCB btnCB-5 btnCB-5b">'
                            + '<span>Add to cart</span></button>'
                            + '</div>');
                    $('body').attr('style','background-image:url("images/games/'
                            + result.id + '/fondo.jpg");');
                    $('#divDetail').fadeIn("slow");
>>>>>>> 9a2c97db9fc676ca4060998d3001044a63fb634b
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
    $('#navbar').load('navbar.html', function() {
        $('#navLinkCategories').addClass('active');
    });

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