function logError(headers) {
    var message = headers.responseText;
    if (message === '') message = '(no error message)';
    message = 'Error ' + headers.status + ': ' + message;

    console.log(message);
    if (headers.status !== 200)
        $('#log').html(message);
}