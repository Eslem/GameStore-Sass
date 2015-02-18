function logError(headers, info) {
    var response = headers.responseText;
    if (response !== '') response = ': ' + response;
    var message = 'Error ' + headers.status;
    if (info !== undefined) message += ' (' + info + ')';
    message += response;

    console.log(message);
    if (headers.status !== 200)
        $('#log').html(message);
}