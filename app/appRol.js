'use strict';

var rolCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.roles = [];
    $scope.modulos = [];

    $scope.nuevoRol = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'roles/modalNuevoRol.html',
            controller: crearRolCtrl,
            size: size
        });
    };

    $scope.seleccionarRol = function(rol) {
        $scope.editarRol = angular.copy(rol);
        $scope.editarRol.modulos = $scope.editarRol .modulos.split(",");
        $scope.modalEditarRol = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'roles/modalEditarRol.html',
            controller: editarRolCtrl
        });
    };

    $scope.listarRoles = function() {
        $scope.roles = [];
        var consulta = {
            query:"select * from roles",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.roles = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarRoles();

    $scope.verPermisosModulos = function(rol) {
        var ListModulos = ['Brackets', 'Equipos', 'Torneos', 'Torneos Jugadores', 'Jugadores', 'Modulos', 'Roles', 'Usuarios'];
        $scope.modulosPermisos = [];

        var modulos = rol.modulos.split(",").sort();
        modulos.forEach(function(obj) {
            $scope.modulosPermisos.push(ListModulos[obj-1]);
        });

        $scope.modalVerPermisos = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'roles/modalVerRolPermisos.html',
            controller: rolCtrl
        });

    };

    $scope.listarModulos = function() {
        $scope.modulos = [];
        var consulta = {
            query:"select * from modulos",
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

    $scope.listarModulos();

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

    $scope.cerrarModal = function() {
        $scope.modalVerPermisos.close();
    };
};

rolCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];

var crearRolCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    $scope.newRol = {};

    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
               $scope.modalInstance.close();
            }
        });
    };

    $scope.guardar = function(newRol) {

        var stringQuery = "INSERT INTO roles (nombre_rol, modulos, descripcion_rol, activo) VALUES (" +
        "'" + newRol.nombre_rol + "'," +
        "'" + newRol.modulos + "'," +
        "'" + newRol.descripcion_rol + "', true)";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarRoles();
                administrarMensajeSweet({titulo:'Ról ingresado', tipo:'success', texto: ''});
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

crearRolCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var editarRolCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
                $scope.modalEditarRol.close();
            }
        });
    };

    $scope.modificar = function(editarRol) {
        var stringQuery = "UPDATE roles set  " + 
        "nombre_rol = '" + editarRol.nombre_rol + "', " +
        "modulos = '" + editarRol.modulos + "', " +
        "descripcion_rol = '" + editarRol.descripcion_rol + "', " +
        "activo = '" + editarRol.activo + "' " +
        "where id_rol = '" + editarRol.id_rol + "'";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log('stringQuery:' + JSON.stringify(stringQuery));
            if (response == "1") {
                $scope.listarRoles();
                administrarMensajeSweet({titulo:'Ról actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modalEditarRol.close();
    };
};

editarRolCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

angular
    .module('myApp')
    .controller('rolCtrl', rolCtrl)
    .controller('crearRolCtrl', crearRolCtrl)
    .controller('editarRolCtrl', editarRolCtrl);

