/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = new App();

function App() {
    this.controllers = {};
    this.routes = {};

    this.addRoute = function (name, route) {
        this.routes[name] = route;
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
    this.name = name;
    this.viewPath = viewPath;
    this.controller = controller;

    this.show = function () {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.viewPath + '?_=' + new Date().getTime(), false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    document.getElementById("wrap-body").innerHTML = allText

                    controller.func(controller.$scope);
                    return allText;
                }
            }
        };
        rawFile.send(null);
    };

}


function showRoute(name) {
    app.routes[name].show();
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
    this.edit = function (data) {
        alert(data);
    };
    this.remove = function (data) {
        console.log(data);
    };

    var service = this;

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
                console.log(data);
                data = JSON.parse(data);
                service.show(data);
                service.callback(data);
                service.pages = 10 % parseInt(json.count);
            },
            error: function (data) {
                new Error("Error", "Error request", null).show();
            }
        });
    };

    this.show = function (json) {
        document.getElementById(id).innerHTML = "";
        var table = document.createElement("table");
        var maintr = document.createElement("tr");
        for (var x in service.header) {
            var header = document.createElement("th");
            header.setAttribute("data-header", x);

            header.textContent = service.header[x];

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
                col.textContent = obj[x];
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

        document.getElementById(id).appendChild(table);
        document.getElementById(id).appendChild(div);
    };

}

var userController = new Controller("userController", "users", function ($scope) {
    $scope.index = 0;
    $scope.headers = {
        "nombre": "Nombre",
        "apellido": "Apellidos",
        "email": "Email",
        "direccion": "Direccion",
        "telefono": "Telefono",
        "alias": "Alias"
    };
    var service = new ServicePaginanted("userServiceTable", $scope.headers, "usuarioController", $scope.index, null);
    service.edit = function () {
        alert("cewfce");
    };
    service.get();
});

var userRoute = new Route("views/user.html", userController);
app.addRoute("user", userRoute);