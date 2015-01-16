function logError(error) {
    var message = error.responseText;
    if (message === '') message = '(no error message)';
    message = 'Error ' + error.status + ': ' + message;
    
    console.log(message);
    $('#log').html(message);
}