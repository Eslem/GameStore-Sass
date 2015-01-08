function loadThumbnail(container, gameInfo) {
    container.append('<div class="game" data-id="' + gameInfo.id + '">'
            + '<div class="imgBack"><img src="images/games/' + gameInfo.id
            + '_thumb.jpg" alt><div class="diagnalA">Detalle</div></div><div class="info">'
            + '<div>' + gameInfo.nombre + '</div></div></div>');
}

function loadGameDetail(container, gameInfo, inCart) {
    container.hide();
    var strHTML = '<div class="detail">'
            + '<img class="imgDet" src="images/games/' + gameInfo.id + '.jpg" alt>'
            + '<div class="description"><h3>' + gameInfo.nombre + '</h3><hr/>'
            + '<p>' + gameInfo.descripcion + '</p></div>'
            + '<div class="bottom"><div class="platforms">Plataformas</div>'
            + '<div class="precio">' + gameInfo.precio + '€</div>'
            + '<div class="diagnalA slideButton ';

    if (!inCart) strHTML += 'cart" onclick="addToCart(' + gameInfo.id + ');">'
                + '<label>Add to cart</label>';

    else strHTML += 'trash long" onclick="removeFromCart(' + gameInfo.id + ', loadCart);">'
                + '<label>Remove from cart</label>';

    strHTML += '</div></div></div>';

    container.html(strHTML);
    container.fadeIn("slow");
    $('body').css('background', 'rgba(0,0,0,.75)');
    $('#background').css('background', 'url(images/games/' + gameInfo.id + '.jpg)');
}