/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {   

    $("body").append('<div id="registro"></div>')
    $("#registro").load("registro.html", function(){
        
    });
    loadCategoriesPanel();
});

function loadNav(id){
    $('#navbar').load('navbar.html', function () {
        $("#"+id).addClass("active");
        $("#"+id+" a").attr('href', '#');
    });
}



