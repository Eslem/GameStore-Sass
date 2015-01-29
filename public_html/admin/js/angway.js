/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

function modalConfig() {
    $("[data-function='launchModal']").click(function () {
        showModal($(this).attr("data-modalId"));
    })
    $("[data-function='closeModal']").click(function () {
        $(".modal").fadeOut();
    })
    $(document).mouseup(function () {
        $(".modal").each(function () {
            var modal = $(this).attr('data-autoClose');
            if (modal != 'false')
                $(this).fadeOut();
        });
    });
    $(".modal-content").mouseup(function () {
        return false;
    });
    $(".modal-form").mouseup(function () {
        return false;
    });
}

function showModal(id) {
    $("#" + id).fadeIn();
}

function clone(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
}

function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) { // use native implementation if available
        return node.getElementsByClassName(classname);
    } else {
        return (function getElementsByClass(searchClass, node) {
            if (node == null)
                node = document;
            var classElements = [],
                    els = node.getElementsByTagName("*"),
                    elsLen = els.length,
                    pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"),
                    i, j;

            for (i = 0, j = 0; i < elsLen; i++) {
                if (pattern.test(els[i].className)) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        })(classname, node);
    }
}

function App() {
    this.controllers = {};
    this.routes = {};
    var app = this;

    this.addRoute = function (name, route) {
        route.name = name;
        this.routes[name] = route;
        var path = window.location.hash.split("#")[1];
        if (path === route.name) {
            getSession(function () {
                route.show();
                onlogin();
            });
        }
    };

    this.addController = function (controller) {
        controllers[controller.name] = controller;
    };

}

function Controller(name, elemHTML, funct) {
    this.$scope = {};
    this.name = name;
    this.func = funct;
    this.elemName = elemHTML;


}

function Route(viewPath, controller) {
    this.viewPath = viewPath;
    this.controller = controller;
    var route = this;

    this.show = function () {
        window.location.replace("#" + route.name)
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.viewPath + '?_=' + new Date().getTime(), false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    document.getElementById("wrap-body").innerHTML = allText
                    modalConfig();

                    controller.func(controller.$scope);
                    return allText;
                }
            }
        };
        rawFile.send(null);
    };

}


function showRoute(elem, name) {
    app.routes[name].show();
    $(".sideBar li.active").removeClass("active");
    $(elem).addClass("active");
}

function Error(title, message, type) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.show = function () {
        console.log(type + "-" + title + ": \m" + message);
    };
}

function ServicePaginanted(id, header, controller, index, callback, hasPass) {
    this.id = id;
    this.header = header;
    this.controller = controller;
    this.index = index;
    this.quantity = 10;
    this.pages = 0;
    this.order = "id";
    this.orientation = "ASC";
    this.callback = callback;
    var service = this;

    this.removeCallback = function (obj) {
        return function () {
            service.remove(obj);
        };
    };

    this.addinputs = function (data) {
        var modal = document.getElementById("modal-form");
        modal.innerHTML = "";
        var isEdit = data !== undefined;
        for (var x in service.header) {
            if (isEdit && data[x].length > 25) {
                var input = document.createElement("textarea");
            } else {
                var input = document.createElement("input");
            }
            input.setAttribute("placeholder", service.header[x]);
            input.setAttribute("name", x);
            if (isEdit)
                input.value = data[x];
            modal.appendChild(input);
        }


        var inputQuery = document.createElement("input");
        inputQuery.setAttribute("name", "query");
        inputQuery.setAttribute("type", "hidden");
        modal.appendChild(inputQuery);
        if (isEdit) {
            inputQuery.value = "update";
            var inputName = document.createElement("input");
            inputName.setAttribute("name", "id");
            inputName.setAttribute("type", "hidden");
            modal.appendChild(inputName);
            inputName.value = data.id;

            document.getElementById("sendModalForm").onclick = function () {
                sendModalForm(service);
            };

        } else {
            inputQuery.value = "insertJSON";

            document.getElementById("sendModalForm").onclick = function () {
                addObj(service);
            };
        }

        if (!isEdit && hasPass) {
            var input = document.createElement("input");
            input.setAttribute("name", "password");
            input.setAttribute("type", "password");
            input.setAttribute("id", "modal-password");
            input.setAttribute("placeholder", "contraseña");
            modal.appendChild(input);
            var inputName = document.createElement("input");
            inputName.setAttribute("name", "password2");
            inputName.setAttribute("type", "password");
            inputName.setAttribute("id", "modal-password2");
            inputName.setAttribute("placeholder", "repite contraseña");
            modal.appendChild(inputName);
        }


    };

    this.remove = function (data) {
        var modal = document.getElementById("modal-form");
        modal.innerHTML = "Seguro quieres eliminar a " + data['nombre'];
        document.getElementById("sendModalForm").onclick = function () {
            removeObj(service, data.id);
        };
        document.getElementById("sendModalForm").innerHTML = "Eliminar <i class='fa fa-trash-o'></i>";
        $(".modal.edit").slideDown();
    };

    this.editCallback = function (obj) {
        return function () {
            service.edit(obj);
        };
    };

    this.edit = function (data) {
        service.addinputs(data);
        $(".modal.edit").slideDown();
    };

    this.add = function () {
        service.addinputs();
        $(".modal.edit").slideDown();
    };

    this.get = function () {

        $.ajax({
            url: baseurl + "../server/controller/" + service.controller + ".php",
            type: "POST",
            data: {
                query: "selectPaginated",
                index: service.index,
                quantity: service.quantity,
                order: service.order,
                orientation: service.orientation
            },
            success: function (data) {
                data = JSON.parse(data);
                service.pages = Math.ceil(parseInt(data.count) / service.quantity);
                service.show(data);
                if (typeof (service.callback) === 'function') {
                    service.callback(data);
                }

            },
            error: function (data) {
                new Error("Error", "Error request", null).show();
            }
        });
    };


    this.show = function (json) {
        if (document.getElementById(id) !== null)
            document.getElementById(id).innerHTML = "";

        if (document.getElementById("modal-edit") !== null)
            document.getElementById("modal-edit").remove();

        if (json.elems === undefined) {
            var div = document.createElement("div");
            div.className = "noresults"
            div.textContent = "No hay resultados";
            document.getElementById(id).appendChild(div);
        } else {

            var table = document.createElement("table");
            var maintr = document.createElement("tr");
            var modalDiv = document.createElement("div");
            modalDiv.innerHTML = '<div class="modal sm edit" id="modal-edit">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="bt modal-close noStyle" data-function="closeModal">×</button>\
                        <h3 class="primary">Editar</h3>\
                    </div>\
                    <div class="modal-body text-center">\
                    <form id="modal-form" class="modal-form"></form>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="bt primary" data-function="closeModal">Cancelar</button>\
                        <button type="button" class="bt primary" id="sendModalForm">Guardar</button>\
                    </div>\
                </div>\
            </div>';
            document.body.appendChild(modalDiv);
            modalConfig();

            var modal = document.getElementById("modal-form");

            for (var x in service.header) {
                var header = document.createElement("th");
                header.setAttribute("data-header", x);

                header.textContent = service.header[x];


                var input = document.createElement("input");
                input.setAttribute("placeholder", service.header[x]);
                input.setAttribute("name", x);
                modal.appendChild(input);


                header.onclick = function () {
                    if (service.order === this.getAttribute("data-header")) {
                        if (service.orientation === "ASC") {
                            service.orientation = "DESC";
                        } else {
                            service.orientation = "ASC";
                        }
                    } else {
                        service.order = this.getAttribute("data-header");
                    }

                    service.get();
                };
                maintr.appendChild(header);
            }
            table.appendChild(maintr);

            for (var elem in json.elems) {
                var obj = json.elems[elem];
                var row = document.createElement("tr");

                for (var x in service.header) {
                    var col = document.createElement("td");
                    if (obj[x].length > 65) {
                        var div = document.createElement("div");
                        div.textContent = obj[x];
                        col.appendChild(div);
                    } else {
                        col.textContent = obj[x];
                    }
                    row.appendChild(col);
                }
                var col = document.createElement("td");
                var button = document.createElement("button");
                button.onclick = service.editCallback(obj);
                button.innerHTML = "<i class='fa fa-gear'></i>";
                col.appendChild(button);

                var buttonRemove = document.createElement("button");
                buttonRemove.onclick = service.removeCallback(obj);
                buttonRemove.innerHTML = "<i class='fa fa-trash-o'></i>";

                col.appendChild(buttonRemove);
                row.appendChild(col);
                table.appendChild(row);
            }

            var div = document.createElement("div");

            var buttonAdd = document.createElement("button");
            buttonAdd.onclick = function () {
                service.add();
            };
            buttonAdd.innerHTML = "<i class='fa fa-plus-square'></i>";
            div.appendChild(buttonAdd);

            var first = document.createElement("button");

            first.onclick = function () {
                service.index = 0;
                service.get();
            };
            first.textContent = "<<";
            div.appendChild(first);

            var buttonMinus = document.createElement("button");
            buttonMinus.onclick = function () {
                service.index--;
                service.get();
            };
            buttonMinus.textContent = "<";
            div.appendChild(buttonMinus);
            if (service.index === 0) {
                first.setAttribute("disabled", true);
                buttonMinus.setAttribute("disabled", true);
            }

            var input = document.createElement("input");
            input.value = service.index + 1;
            input.onchange = function () {
                service.index = input.value - 1;
                service.get();
            };
            div.appendChild(input);

            var label = document.createElement("span");
            label.textContent = service.pages;
            div.appendChild(label);

            var buttonMore = document.createElement("button");
            buttonMore.onclick = function () {
                service.index++;
                service.get();
            };
            buttonMore.textContent = ">";
            div.appendChild(buttonMore);

            var last = document.createElement("button");
            last.onclick = function () {
                service.index = service.pages;
                service.get();
            };
            last.textContent = ">>";
            div.appendChild(last);
            var reload = document.createElement("button");
            reload.onclick = function () {
                service.get();
            };
            reload.innerHTML = "<i class='fa fa-refresh'></i>";
            div.appendChild(reload);
            if (service.pages === service.index) {
                last.setAttribute("disabled", true);
                buttonMore.setAttribute("disabled", true);
                input.setAttribute("disabled", true);
            }
            document.getElementById(id).appendChild(table);
            document.getElementById(id).appendChild(div);
        }
    };
}

function sendModalForm(service) {
    var data = $('#modal-form').serializeArray();
    var values = {};
    for (var x in data) {
        var obj = data[x];
        values[obj.name] = obj.value;
    }
    data.push({
        name: 'values',
        value: JSON.stringify(values)
    });
    $.ajax({
        url: baseurl + "../server/controller/" + service.controller + ".php",
        type: "POST",
        data: data,
        success: function (data) {
            $("#modal-edit").slideUp();
            service.get();
        },
        error: function (data) {
            new Error("Error", "Error request", null).show();
        }
    });

}

function removeObj(service, data) {
    $.ajax({
        url: baseurl + "../server/controller/" + service.controller + ".php",
        type: "POST",
        data: {
            query: "delete",
            id: data
        },
        success: function (data) {
            $("#modal-edit").slideUp();
            service.get();
        },
        error: function (data) {
            new Error("Error", "Error request", null).show();
        }
    });

}

function addObj(service, data) {
    var data = $('#modal-form').serializeArray();
    var values = {};
    for (var x in data) {
        var obj = data[x];
        if (obj.name !== 'password2')
            values[obj.name] = obj.value;
    }
    data.push({
        name: 'values',
        value: JSON.stringify(values)
    });

    $.ajax({
        url: baseurl + "../server/controller/" + service.controller + ".php",
        type: "POST",
        data: data,
        success: function (data) {
            $("#modal-edit").slideUp();
            service.get();
        },
        error: function (data) {
            new Error("Error", "Error request", null).show();
        }
    });

}

function createCallback(i) {
    return function () {
        alert('you clicked' + i);
    };
}