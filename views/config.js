'use strict';

var configState = function($routeProvider) {
    // Set default state
    $routeProvider
    .otherwise({ redirectTo: '/torneos' })

    .when('/usuarios', {
        templateUrl : 'usuarios/usuarios.html',
        data: {
            pageTitle: 'Usuarios'
        }
    })

    .when('/roles', {
        templateUrl : 'roles/roles.html',
        data: {
            pageTitle: 'Roles'
        }
    })

    .when('/juegos', {
        templateUrl : 'juego/juegos.html',
        data: {
            pageTitle: 'Juegos'
        }
    })

    .when('/jugadores', {
        templateUrl : 'perfil/perfil.html',
        data: {
            pageTitle: 'Perfil'
        }
    })

    .when('/torneos', {
        templateUrl : 'torneos/torneos.html',
        data: {
            pageTitle: 'Torneos'
        }
    })

    .when('/modulos', {
        templateUrl : 'modulos/modulos.html',
        data: {
            pageTitle: 'Modulos'
        }
    })

    .when('/brackets', {
        templateUrl : 'brackets/brackets.html',
        data: {
            pageTitle: 'Brackets'
        }
    })

    .when('/torneosj', {
        templateUrl : 'torneos/torneosJugador.html',
        data: {
            pageTitle: 'Torneos Jugador'
        }
    })

    .when('/equipos', {
        templateUrl : 'equipos/equipos.html',
        data: {
            pageTitle: 'Equipos'
        }
    })
};

configState.$inject = ['$routeProvider'];

angular
    .module('myApp')
    .config(configState)
    .run([
        '$rootScope','$location',
        function($rootScope, $location) {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                setTimeout(function() {
                    if ($rootScope.securityDataUser) {
                        if ($rootScope.securityDataUser.modulos && $rootScope.securityDataUser.routers.length > 0) {
                            if ($rootScope.securityDataUser.routers.indexOf(next.originalPath) === -1) {
                                if (current && current.originalPath)
                                    $location.path(current.originalPath);
                                else
                                    $location.path($rootScope.securityDataUser.routers[0]);
                            }
                        }
                    }
                }, 5);
            });
        }
    ]);
