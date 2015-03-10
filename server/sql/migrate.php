<html>
    <head>
        <style>
            *{
                background-color: #111;
                color:#eee;
            }
            
        </style>
    </head>
    <body>
        <?php
        require "flyway.php";
        require "../connectionManager.php";

        if (true) {
            $openshiftHost = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
            $openshiftPort = $_ENV["OPENSHIFT_MYSQL_DB_PORT"];
            $connectionManager = new ConnectionManager($openshiftHost . ':' . $openshiftPort, 'admin3PSnjwx', '2U9hxCaUq573', 'metrogames');
        } else {
            $connectionManager = new ConnectionManager('localhost', 'root', 'root', 'tienda');
        }
        $flyway = new Flyway($connectionManager->getConnection());
        $flyway->migrate();
        ?>
    </body>

</html>


