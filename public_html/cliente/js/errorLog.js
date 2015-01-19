function logError(headers) {
    var message = headers.responseText;
    if (message === '') message = '(no error message)';
    message = 'Error ' + headers.status + ': ' + message;
    
    console.log(message);
    $('#log').html(message);
}