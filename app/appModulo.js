'use strict';

var moduloCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.modulos = [];

    $scope.listar = function() {
        var consulta = {
            query:"SELECT * FROM modulos",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.modulos = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listar();

    $scope.cssEstado = function(activo) {
        var css = 'label-danger';
        if (activo) 
            css = 'label-info';
        return css;
    };

    $scope.etiquetaEstado = function(activo) {
        var etiqueta = 'Inactivo';
        if (activo) 
            etiqueta = 'Activo'
        return etiqueta;
    };
};

moduloCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];

angular
    .module('myApp')
    .controller('moduloCtrl', moduloCtrl);
