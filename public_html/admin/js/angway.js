/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
            if (modal != 'false') $(this).fadeOut();
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

function ServicePaginanted(id, header, controller, index, callback) {
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


    this.edit = function (data) {
        var modal = document.getElementById("modal-form");
        modal.innerHTML = "";
        for (var x in service.header) {
            if (data[x].length > 25) {

                var input = document.createElement("textarea");
            } else {

                var input = document.createElement("input");
            }
            input.setAttribute("placeholder", service.header[x]);
            input.setAttribute("name", x);
            input.value = data[x];
            modal.appendChild(input);
        }

        var input = document.createElement("input");
        input.setAttribute("name", "id");
        input.value = data.id;
        input.setAttribute("type", "hidden");
        modal.appendChild(input);
        var input = document.createElement("input");
        input.setAttribute("name", "query");
        input.value = "query";
        input.setAttribute("type", "hidden");
        modal.appendChild(input);
        $(".modal.edit").slideDown();
    };
    this.remove = function (data) {
        console.log(data);
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
                service.show(data);
                if (typeof (service.callback) === 'function') {
                    service.callback(data);
                }
                service.pages = 10 % parseInt(data.count);
            },
            error: function (data) {
                new Error("Error", "Error request", null).show();
            }
        });
    };


    this.show = function (json) {
        document.getElementById(id).innerHTML = "";

        if (json.elems === undefined) {
            var div = document.createElement("div");
            div.className = "noresults"
            div.textContent = "No hay resultados";
            document.getElementById(id).appendChild(div);
        } else {

            var table = document.createElement("table");
            var maintr = document.createElement("tr");
            if (document.getElementById("modal-form") === null) {
                var div = document.createElement("div");
                div.innerHTML = '<div class="modal sm edit" id="modal-edit">\
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
            </div>'
                document.body.appendChild(div);
                document.getElementById("sendModalForm").onclick = function () {
                    sendModalForm(service);
                }
                modalConfig();
            }

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
                    console.log(x);
                    console.log(obj);
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
                button.onclick = function () {
                    service.edit(obj);
                };
                button.innerHTML = "<i class='fa fa-gear'></i>";
                col.appendChild(button);

                var button = document.createElement("button");
                button.onclick = function () {
                    service.remove(obj);
                };
                col.appendChild(button);
                button.innerHTML = "<i class='fa fa-trash-o'></i>";
                row.appendChild(col);
                table.appendChild(row);
            }

            var div = document.createElement("div");

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
            label.textContent = service.pages + 1;
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
    var data = $("#modal-form").serializeArray();
    data.push({
        "values": $("#modal-form").serialize()
    });
    console.log(data);
    $.ajax({
        url: baseurl + "../server/controller/" + service.controller + ".php",
        type: "POST",
        data: data,
        success: function (data) {
            console.log(data);
            $("#modal-edit").slideUp();
        },
        error: function (data) {
            new Error("Error", "Error request", null).show();
        }
    });
}