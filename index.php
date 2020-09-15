<?php
    session_start();
    session_destroy(); 
?>
<!DOCTYPE html>
<html ng-app="myApp" ng-app lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <!-- Clean Cache -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta http-equiv="Pragma" content="no-cache" /><meta http-equiv="Expires" content="0" />


    <title>Gameshow</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <!-- Sweetalert CSS-->
    <link rel="stylesheet" href="css/sweetalert.css">

</head>

<body class="gray-bg">

<div class="container form_style" ng-controller="loginCtrl">

    <div class="middle-box text-center loginscreen  animated fadeInDown">
        <div>
            <h3>Bienvenido a Gameshow</h3>
            <p></p>
            <p>Favor ingrese su usuario y password</p>
            <form method="post" class="m-t" role="form">
                <div class="form-group">
                    <input type="text" name="email" ng-model="loginData.email" class="form-control" placeholder="Usuario">
                </div>
                <div class="form-group">
                    <input type="password" name="pwd" ng-model="loginData.pwd" class="form-control" placeholder="Password">
                </div>
                <button type="submit" name="login" class="btn btn-primary block full-width m-b" ng-click="loggin(loginData)">Entrar</button>
                <button name="register_link" class="btn btn-primary block full-width m-b" ng-click="nuevoUsuario()">Registrarse</button>
            </form>

        </div>
    </div>
</div>

<!-- Mainly scripts -->
<script src="js/jquery-2.1.1.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<!-- Custom and plugin javascript -->
<script src="js/inspinia.js"></script>
<script src="js/plugins/pace/pace.min.js"></script>

<!-- Scripts de AngularJS-->
<script src="js/angular.js"></script>
<script src="js/angular-animate.js"></script>
<script src="js/angular-route.min.js"></script>
<script src="js/angular-sanitize.js"></script>
<script src="js/ui-bootstrap-tpls-2.1.4.js"></script>
<!--<script src="app/menuDirective.js"></script>-->
<script src="app/appRegistro.js"></script>

<!-- Page-Level Scripts -->
<!-- Sweetalert JS-->
<script src="js/sweetalert-dev.js"></script>

</body>

</html>

