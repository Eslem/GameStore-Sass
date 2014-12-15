/* UNUSED */

function construct() {
    $.ajax({
        url: '',
        type: 'POST',
        data: {
            query: 'select'
        }
    }).success(function(result) {

    }).error(function(errorHTML) {
        var window = window.open();
        $(window.document.body).html(errorHTML);
    });
}

$('document').ready(function() {
    construct();
});