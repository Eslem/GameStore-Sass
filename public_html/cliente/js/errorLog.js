function logError(error) {
    var message = error.responseText;
    if (message !== '') console.log('Error: ' + message);
    else console.log('Error (no error message)');
    $('#log').html(error.responseText);
}