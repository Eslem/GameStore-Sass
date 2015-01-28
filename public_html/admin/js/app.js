var app = new App();
var userController = new Controller("userController", "usuarios", function ($scope) {
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
    service.get();
});
var userRoute = new Route("views/user.html", userController);
app.addRoute("user", userRoute);

var adminsController = new Controller("adminsController", "admins", function ($scope) {
    $scope.index = 0;
    $scope.headers = {
        "nombre": "Nombre",
        "apellido": "Apellidos",
        "email": "Email",
        "direccion": "Direccion",
        "telefono": "Telefono",
        "alias": "Alias"
    };
    var service = new ServicePaginanted("adminsServiceTable", $scope.headers, "administradorController", $scope.index, null);
    service.get();
});
var adminsRoute = new Route("views/administradores.html", adminsController);
app.addRoute("admins", adminsRoute);

var productsController = new Controller("productsController", "products", function ($scope) {
    $scope.index = 0;
    $scope.headers = {
        "nombre": "Nombre",
        "descripcion": "Descripcion",
        "video": "Video",
        "precio": "Precio"
    };
    var service = new ServicePaginanted("productsServiceTable", $scope.headers, "productoController", $scope.index, null);
    service.get();
});
var productsRoute = new Route("views/products.html", productsController);
app.addRoute("products", productsRoute);

var categoriesController = new Controller("categoriesController", "categories", function ($scope) {
    $scope.index = 0;
    $scope.headers = {
        "id": "Id",
        "nombre": "Nombre"
    };
    var service = new ServicePaginanted("categoriesServiceTable", $scope.headers, "categoriaController", $scope.index, null);
    service.get();
});
var categoriesRoute = new Route("views/categories.html", categoriesController);
app.addRoute("categories", categoriesRoute);

var pedidosController = new Controller("pedidosController", "pedidos", function ($scope) {
    $scope.index = 0;
    $scope.headers = {
        "id": "Id",
        "usuario": "Usuario",
        "estado": "Estado"
    };
    var service = new ServicePaginanted("pedidosServiceTable", $scope.headers, "pedidoController", $scope.index, null);
    service.get();
});
var pedidosRoute = new Route("views/pedidos.html", pedidosController);
app.addRoute("pedidos", pedidosRoute);