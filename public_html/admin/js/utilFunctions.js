/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

function modalConfig() {
    $("[data-function='launchModal']").click(function () {
        showModal($(this).attr("data-modalId"));
    })
    $("[data-function='closeModal']").click(function () {
        $(".modal").fadeOut();
    })
    $(document).mouseup(function () {
        $(".modal").each(function () {
            var modal = $(this).attr('data-autoClose');
            if (modal != 'false')
                $(this).fadeOut();
        });
    });
    $(".modal-content").mouseup(function () {
        return false;
    });
    $(".modal-form").mouseup(function () {
        return false;
    });
}

function showModal(id) {
    $("#" + id).fadeIn();
}

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}