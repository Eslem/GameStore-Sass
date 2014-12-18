function getCategories(callback) {
    $.ajax({
        url: 'php/controller/categoriaController.php',
        type: 'POST',
        data: {
            query: 'select'
        }
    }).success(function(result) {
        console.log(result);
        categories = JSON.parse(result);
        callback(categories);
    }).error(function(errorHTML) {
        $('#log').html(errorHTML);
    });
}

$('document').ready(function() {
    getCategories(function(categories) {
        var strHTML = '';
        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];

            if (i % 3 === 0) strHTML += '<li>';
            strHTML += '<a href="categorias.html#' + category.id + '">'
                    + '<img class="genreIcon" src="images/genres/' + category.nombre + '.svg">'
                    + '<br/>' + category.nombre + '</a>';
            if (!i % 3 === 2) strHTML += '</li>';
        }

        $('.panel-categorias').html(strHTML);
    });
});