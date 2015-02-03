

function login() {
    $.ajax({
        url: '../server/session/session.php',
        type: 'POST',
        data:
                {
                    email: $("#loginCliente").val(),
                    password: $("#passCliente").val()
                },
        success: function (data) {
            console.log(data);
        },
        error: function(data){
            console.log(data);
        }

    });

}