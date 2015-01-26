/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function login(elem) {
    // alert();
    $("#logo").addClass("flip");
    setInterval(function () {

    });
    $(elem).text("Loading...");
}

function login() {
    $.ajax({
        url: '../../server/session/session.php',
        type: 'POST',
        data:
                {
                    email: $("#idCliente").val(),
                    password: $("#passCliente").val()
                },
        success: function (data) {
            console.log(data);


        }

    });

}