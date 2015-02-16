function loadThumbnail(container, gameInfo, quantity) {
    var strHTML = '<div class="game" data-id="' + gameInfo.id + '" data-price="' + gameInfo.precio + '">'
            + '<div class="imgBack"><img src="images/games/' + gameInfo.id
            + '_thumb.jpg" alt><div class="diagonal">'
            + '<span class="normalize">Detalle</span></div></div>'
            + '<div class="info"><div>' + gameInfo.nombre;

    if (quantity !== undefined) {
        strHTML += loadQuantity(gameInfo, quantity);
    }

    strHTML += '</div></div></div>';
    container.append(strHTML);
}

function loadGameDetail(container, gameInfo, inCart, permanent) {
    container.hide();
    var strHTML = '<div class="detail">';
    if (gameInfo.video !== '')
        strHTML += '<iframe class="video" src="//www.youtube.com/embed/' + gameInfo.video + '?rel=0" frameborder="0" allowfullscreen></iframe>';
    else
        strHTML += '<img class="imgDet" src="images/games/' + gameInfo.id + '.jpg" alt>';
    strHTML += '<div class="description"><h3>' + gameInfo.nombre + '</h3><hr/>'
            + '<p>' + gameInfo.descripcion + '</p></div>'
            + '<div class="bottom"><div class="platforms">Plataformas</div>'
            + '<div class="precio">' + gameInfo.precio + '€</div>'
            + '<div class="diagonal slideButton ';

    if (!inCart) {
        strHTML += 'cart"';
        if (permanent !== true) strHTML += ' onclick="addToCart(' + gameInfo.id + '); $(\'#divDetail\').fadeOut()"';
        strHTML += '><label class="normalize">Añadir al carro</label>';
    }

    else strHTML += 'trash long" onclick="removeFromCart(' + gameInfo.id + ', loadCart); $(\'#divDetail\').fadeOut()">'
                + '<label class="normalize">Eliminar del carro</label>';

    strHTML += '</div></div></div>';

    container.html(strHTML);
    container.fadeIn('slow');
    $('body').css('background', 'rgba(0,0,0,.75)');
    $('#background').css('background-image', 'url(images/games/' + gameInfo.id + '.jpg)');
}

function loadQuantity(gameInfo, quantity) {
    totalCost += gameInfo.precio * quantity;
    return '<div class="price">' + gameInfo.precio + '€ x ' + quantity
            + ' (<span class="increase" onclick="increaseProduct(' + gameInfo.id + ', updateItems)">+</span>'
            + '/<span class="decrease" onclick="decreaseProduct(' + gameInfo.id + ', updateItems)">-</span>) '
            + '= ' + (gameInfo.precio * quantity) + '€</div>';
}