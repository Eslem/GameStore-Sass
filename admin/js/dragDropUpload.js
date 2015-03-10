var file = null;
var thumbnail = null;
function uploadImg(id) {
    var formData = new FormData();
    formData.append("id", id);
    formData.append('thumbnail', thumbnail);
    formData.append('file', file);
    if (file !== null && thumbnail !== null) {

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
//Upload progress
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
//Do something with upload progress
                        console.log(percentComplete);
                    }
                }, false);
//Download progress
                xhr.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
//Do something with download progress
                        console.log(percentComplete);
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: baseurl+"../server/imgUpload.php",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            }
        });
    } else {
        console.log("No image to upload");
    }
}

function clearCanvas() {
    $("#canvas").html("");
    $("#dropZone h1").show();
}

function createCanvas(file, canvas, max_width, max_height) {
    var img = document.createElement("img");
    var reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result
    };
    reader.readAsDataURL(file);
    img.onload = function () {
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var MAX_WIDTH = max_width;
        var MAX_HEIGHT = max_height;
        var width = img.width;
        var height = img.height;
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataurl = canvas.toDataURL("image/png");
        thumbnail = dataurl;
    };
}
function showArray() {
    alert(filesData);
}
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // FileList object.
// files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
//$("#image").val(f);
//$("#imageForm").append("<input type='file' value='"+f+"'>");
        var canvas = document.createElement("canvas");
        $("#dropZone h1").hide();
        $("#imgBefore").hide();
        $("#canvas")[0].appendChild(canvas);
        file = f;
        createCanvas(f, canvas, 355, 224);
        imageNames.push(f.name);
    }
    $(evt.target).removeClass("over");
}
function handleDragOver(evt) {
    $(evt.target).addClass("over");
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
function handleDragEnter(evt) {
    evt.stopPropagation();
    $(evt.target).addClass("over");
}
function handleDragLeave(evt) {
    evt.stopPropagation();
    $(evt.target).removeClass("over");
}
// Setup the dnd listeners.
function loadDropZone() {
    var dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('dragenter', handleDragEnter, false);
    dropZone.addEventListener('dragleave', handleDragLeave, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
}