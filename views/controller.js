'use strict';

var mainCtrl = function($rootScope, $scope, $http) {
    
    $rootScope.securityDataUser = {routers:[]};

    var configRouters = ['/brackets', '/equipos', '/juegos', '/torneos', '/torneosj', '/jugadores', '/modulos', '/roles', '/usuarios'];
    var acessRouters = [];

    var asignarPermisosRutas = function(modulos) {
        modulos.forEach(function(obj) {
            acessRouters.push(configRouters[obj-1]);
        });

        $rootScope.securityDataUser.routers = acessRouters;
    }

    var consulta = {
        method: "customDataUser"
    }

    $http.post('../apis/getDataUser.php', {
        data: {params:  consulta}
    }).success(function(data){
        $rootScope.securityDataUser = data[0];
        console.log("$rootScope.securityDataUser : " + JSON.stringify($rootScope.securityDataUser));
        asignarPermisosRutas($rootScope.securityDataUser.modulos.split(",").sort());
    }).error(function(){
        alert('Error al intentar enviar el query.');
    });

    $scope.cerrarSession = function() {
        $http.post('../apis/logout.php', {
            data: {params:  consulta}
        }).success(function(data){
            window.location = '../index.php';
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };
};

mainCtrl.$inject = ['$rootScope', '$scope', '$http'];

angular
    .module('myApp')
    .controller('mainCtrl', mainCtrl);