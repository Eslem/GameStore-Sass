function logError(headers, info) {
    var message = headers.responseText;
    if (message === '') message = '(no error message)';
    message = 'Error ' + headers.status;
    if (info !== undefined) message += ' (' + info + ')';
    message += ': ' + message;

    console.log(message);
    if (headers.status !== 200)
        $('#log').html(message);
}