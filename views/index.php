<?php
    session_start();
    
    if(!isset($_SESSION["userId"])){
        header("Location: ../index.php");
    }
?>
<!DOCTYPE html>
<html ng-app="myApp" ng-app lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Gameshow</title>

    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Anton" rel="stylesheet">

    <link href="../css/animate.css" rel="stylesheet">
    <link href="../css/style.css" rel="stylesheet">
    <link href="../css/image-picker.css" rel="stylesheet">
    <link href="../css/jquery.bracket.min.css" rel="stylesheet">
    <link href="../css/jquery.group.min.css" rel="stylesheet">

    <!-- Sweetalert CSS-->
    <link rel="stylesheet" href="../css/sweetalert.css">

</head>

<body ng-controller="mainCtrl">

    <div id="wrapper">

        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <span>
                                <img alt="image" class="img-circle" ng-src="{{securityDataUser.img_jugador}}" />
                            </span>
                            <a data-toggle="dropdown" class="dropdown-toggle">
                                <span class="clear"><span class="block m-t-xs">
                                <strong class="font-bold">{{securityDataUser.usuario}}</strong>
                                </span>
                                    <span class="text-muted text-xs block">{{securityDataUser.nombre_rol}} <b class="caret"></b></span>
                                </span>
                            </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#jugadores">Perfil</a></li>
                                <li><a ng-click="cerrarSession()">Cerrar Sesión</a></li>
                            </ul>
                        </div>
                        <div class="logo-element">
                            GS
                        </div>
                    </li>
                    <!-- Menú -->
                    <li menu-game-show></li>
                    <!-- END Menú -->
                </ul>
            </div>
        </nav>

        <div id="page-wrapper" class="gray-bg">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header">
                        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                    </div>
                    <ul class="nav navbar-top-links navbar-right">
                        <li>
                            <span class="m-r-sm text-muted welcome-message">Gameshow.</span>
                        </li>
                        <li>
                            <a ng-click="cerrarSession()">
                                <i class="fa fa-sign-out"></i> Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <!-- angular templating -->
            <!-- this is where content will be injected -->
            <div ng-view></div>
            <div class="footer">

                <div>
                    <strong>Gameshow</strong> Company &copy; 2018
                </div>
            </div>

        </div>
    </div>

    <!-- Mainly scripts -->
    <script src="../js/jquery-2.1.1.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="../js/inspinia.js"></script>
    <script src="../js/plugins/pace/pace.min.js"></script>

    <!-- Scripts de AngularJS-->
    <script src="../js/angular.js"></script>
    <script src="../js/angular-animate.js"></script>
    <script src="../js/angular-route.min.js"></script>
    <script src="../js/angular-sanitize.js"></script>
    <script src="../js/ui-bootstrap-tpls-2.1.4.js"></script>
    <script src="../js/jquery.bracket.min.js"></script>
    <script src="../js/image-picker.js"></script>
    <script src="../js/image-picker.min.js"></script>
    <script src="../js/Bacon-1ab32ffb.min.js"></script>
    <script src="../js/lodash-2.2.1.min.js"></script>
    <script src="../js/live.js"></script>
    <script src="../js/handlebars.js"></script>
    <script src="../js/jquery.group.min.js"></script>
    <!--<script src="app/menuDirective.js"></script>-->
    <script src="app.js"></script>
    <script src="controller.js"></script>
    <script src="config.js"></script>
    <script src="directive.js"></script>

    <!--- Controladores -->
    <script src="../app/appUsuario.js"></script>
    <script src="../app/appTorneo.js"></script>
    <script src="../app/appRol.js"></script>
    <script src="../app/appModulo.js"></script>
    <script src="../app/appJugador.js"></script>
    <script src="../app/appBracket.js"></script>
    <script src="../app/appEquipo.js"></script>
    <script src="../app/appPerfil.js"></script>
    <script src="../app/appJuego.js"></script>


    <!-- Page-Level Scripts -->
    <!-- Sweetalert JS-->
    <script src="../js/sweetalert-dev.js"></script>

</body>

</html>
