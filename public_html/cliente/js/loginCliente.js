


function loginCliente() {
    var data = $("#formLoginCliente").serialize();       
    
    $.ajax({
        url: '../../server/dao/usuarioDAO.php',
        type: 'POST',
        data: data,
        success: function (data){
            console.log(data);
        },
        error: function (data){
            console.log(data);
        }
    });
}



