'use strict';

var juegoCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.nuevoJuego = function() {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'juego/modalNuevoJuego.html',
            controller: crearJuegoCtrl
        });
    };

    $scope.seleccionarJuego = function(juego) {
        $scope.editarJuego = angular.copy(juego);
        $scope.modaleditarJuego = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'juego/modalEditarJuego.html',
            controller: editarJuegoCtrl
        });
    };

    $scope.listarJuegos = function() {
        $scope.juegos = [];
        var consulta = {
            query:"select * from juego",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.juegos = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarJuegos();

    $scope.cssEstado = function(activo) {
        var css = 'label-danger';
        if (activo == 1)
            css = 'label-info';
        return css;
    };

    $scope.etiquetaEstado = function(activo) {
        var etiqueta = 'Inactivo';
        if (activo == 1)
            etiqueta = 'Activo'
        return etiqueta;
    };
};

juegoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];

var crearJuegoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    $scope.newJuego = {};

    var administrarMensajeSweet = function(conf) {
        $window.swal({
                title: conf.titulo,
                text: conf.texto,
                type: conf.tipo,
                showCancelButton: false
            },
            function(isConfirm){
                if (isConfirm)
                    $scope.modalInstance.close();
            });
    };

    $scope.guardar = function(newJuego) {

        var stringQuery = "INSERT INTO juego (nombre_juego, activo) VALUES (" +
            "'" + newJuego.nombre_juego + "'," +
            "true)";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log("consulta :" + JSON.stringify(consulta));
            if (response == "1") {
                $scope.listarJuegos();
                administrarMensajeSweet({titulo:'Juego ingresado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al ingresar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };


    $scope.cerrarModal = function() {
        $scope.modalInstance.close();
    };
};

crearJuegoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var editarJuegoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
                title: conf.titulo,
                text: conf.texto,
                type: conf.tipo,
                showCancelButton: false
            },
            function(isConfirm){
                if (isConfirm){
                    $scope.modaleditarJuego.close();
                }
            });
    };

    var administrarMensajeSweet2 = function(conf) {
        $window.swal({
                title: conf.titulo,
                text: conf.texto,
                type: conf.tipo,
                showCancelButton: false
            },
            function(isConfirm){
                //Se cierra automaticamente
            });
    };

    $scope.modificar = function(editarJuego) {

        var stringQuery = "UPDATE juego set  " +
            "nombre_juego = '" + editarJuego.nombre_juego + "', " +
            "activo = '" + editarJuego.activo + "' " +
            "where id_juego = " + editarJuego.id_juego + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarJuegos();
                administrarMensajeSweet({titulo:'Juego actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modaleditarJuego.close();
    };
};

editarJuegoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];


angular
    .module('myApp')
    .controller('juegoCtrl', juegoCtrl)
    .controller('crearJuegoCtrl', crearJuegoCtrl)
    .controller('editarJuegoCtrl', editarJuegoCtrl);

