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
            + '<div><h3>' + gameInfo.nombre + '</h3><hr/>'
            + '<p>' + gameInfo.descripcion + '</p></div>' + '<div class="platforms">Plataformas</div>'
            + '<div class="precio">' + gameInfo.precio + '€</div>';

    if (!inCart) strHTML += '<button onclick="addToCart(' + gameInfo.id + ');" class="diagnalA btnCB btnCB-5 btnCB-5b">'
                + '<span>Add to cart</span></button></div>';

    else strHTML += '<button onclick="removeFromCart(' + gameInfo.id + ', loadCart);" class="diagnalA btnCB btnCB-5 btnCB-5b">'
                + '<span>Remove from cart</span></button></div>';

    container.html(strHTML);
    container.fadeIn("slow");
}