'use strict';

var menuGameShow = function($rootScope, $http) {

    return {
        restrict: 'A',
        compile: function(element) {

    		var compilarMenu = function() {
    			var modulos = $rootScope.securityDataUser.modulos.split(",").sort();
    			var menuTemplate = '';

    			modulos.forEach(function(obj) {
    				if (obj == 1)
    					menuTemplate += '<a href="#brackets" id="btn-menu-brackets"><i class="fa fa-gamepad"></i><span class="nav-label">Brackets</span></a>';
    				else if (obj == 2)
    					menuTemplate += '<a href="#equipos"   id="btn-menu-equipos"><i class="fa fa-cogs"></i><span class="nav-label">Equipos</span></a>';
    				else if (obj == 3)
    					menuTemplate += '<a href="#juegos" id ="btn-menu-juegos"><i class="fa fa-desktop"></i><span class="nav-label">Juegos</span></a>';
    				else if (obj == 4)
                        menuTemplate += '<a href="#torneos" id ="btn-menu-torneos"><i class="fa fa-desktop"></i><span class="nav-label">Torneos</span></a>';
                    else if (obj == 5)
    					menuTemplate += '<a href="#torneosj" id ="btn-menu-torneosj"><i class="fa fa-desktop"></i><span class="nav-label">Torneos Jugadores</span></a>';
    				//else if (obj == 6)
    					//menuTemplate += '<a href="#jugadores" id ="btn-menu-jugadores"><i class="fa fa-users"></i><span class="nav-label">Perfil</span></a>';
    				else if (obj == 7)
    					menuTemplate += '<a href="#modulos" id="btn-menu-modulos"><i class="fa fa-eye"></i> <span class="nav-label">Modulos</span></a>';
    				else if (obj == 8)
    					menuTemplate += '<a href="#roles" id="btn-menu-roles"><i class="fa fa-chain"></i><span class="nav-label">Roles</span></a>';
    				else if (obj == 9)
    					menuTemplate += '<a href="#usuarios" id="btn-menu-usuarios"><i class="fa fa-key"></i><span class="nav-label">Usuarios</span></a>';
    			});

                element.append(menuTemplate);

                return function(scope, element, attrs) {
                	var elemento;

                	if (modulos.indexOf(1) == -1) {
                		elemento = angular.element(document.querySelector('#btn-menu-brackets'));
                        elemento.parent().html('');
                	}

                	if (modulos.indexOf(2) == -1) {
                		elemento = angular.element(document.querySelector('#btn-menu-equipos'));
                        elemento.parent().html('');
                	}

                	if (modulos.indexOf(3) == -1) {
                        elemento = angular.element(document.querySelector('#btn-menu-juegos'));
                        elemento.parent().html('');
                    }

                    if (modulos.indexOf(4) == -1) {
                        elemento = angular.element(document.querySelector('#btn-menu-torneos'));
                        elemento.parent().html('');
                    }

                	if (modulos.indexOf(5) == -1) {
                		elemento = angular.element(document.querySelector('#btn-menu-torneosj'));
                        elemento.parent().html('');
                	}

                	if (modulos.indexOf(6) == -1) {
                		elemento = angular.element(document.querySelector('#btn-menu-jugadores'));
                        elemento.parent().html('');
                	}

                	if (modulos.indexOf(7) == -1) {
                		elemento = angular.element(document.querySelector('#btn-menu-modulos'));
                        elemento.parent().html('');
                	}

                	if (modulos.indexOf(8) == -1) {
                		elemento = angular.element(document.querySelector('#btn-menu-roles'));
                        elemento.parent().html('');
                	}

                	if (modulos.indexOf(9) == -1) {
                		elemento = angular.element(document.querySelector('#btn-menu-usuarios'));
                        elemento.parent().html('');
                	}
                }
    		}

    		var procesarCompilacionMenu = function() {
                if ($rootScope.securityDataUser) {
                    if ($rootScope.securityDataUser.modulos) {
                        compilarMenu();
                    } else {
                        setTimeout(function() {
                            procesarCompilacionMenu();
                        }, 5);
                    }
                } else {
                    setTimeout(function() {
                        procesarCompilacionMenu();
                    }, 5);
                }
            };

            setTimeout(function() {
                procesarCompilacionMenu();
            }, 5);
        }
    }
}

angular
    .module('myApp')
    .directive('menuGameShow', ['$rootScope', '$http', menuGameShow])
