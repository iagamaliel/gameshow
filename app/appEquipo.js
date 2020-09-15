'use strict';

var equipoCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.newEquipo = {};
    $scope.equipos = [];

    $scope.nuevoEquipo = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/equipos/modalNuevoEquipo.html',
            controller: crearEquipoCtrl,
            size: size
        });
    };

    $scope.seleccionarEquipo = function(equipo) {
        $scope.editarEquipo = angular.copy(equipo);
        $scope.modalEditarEquipo = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/equipos/modalEditarEquipo.html',
            controller: editarEquipoCtrl
        });
    };

    $scope.asignarMiembros = function(equipo) {
        $scope.nuevoMiembrosEquipo = angular.copy(equipo);
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/equipos/modalNuevoMiembroEquipo.html',
            controller: miembroEquipoCtrl
        });
    };

    var modalMiembrosEquipo = function() {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/equipos/modalVerMiembroEquipo.html',
            controller: equipoCtrl
        });
    }

    $scope.verMiembros = function(equipo) {
        $scope.nombreEquipo = equipo.nombre;
        $scope.miembrosEquipo = [];
        var consulta = {
            query:"select * from vt_jugadores_team  where team_codTeam=" + equipo.codTeam,
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.miembrosEquipo = data;
            modalMiembrosEquipo();
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.cerrarModal = function() {
        $scope.modalInstance.close();
    };

    $scope.listarEquipos = function() {
        $scope.equipos = [];
        var consulta = {
            query:"select * from team where id_capitan=" + $rootScope.securityDataUser.id_usuario,
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log(JSON.stringify(data));
            $scope.equipos = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    if ($rootScope.securityDataUser && $rootScope.securityDataUser.id_usuario)
    $scope.listarEquipos();

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

equipoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];

var crearEquipoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    $scope.newEquipo = {};

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

    $scope.guardar = function(newEquipo) {

        var stringQuery = "INSERT INTO team (nombre,activo, id_capitan) VALUES " +
        "('" + newEquipo.nombre + "'," +
        "true," +
        "'" + $rootScope.securityDataUser.id_usuario + "')";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarEquipos();
                administrarMensajeSweet({titulo:'Equipo ingresado', tipo:'success', texto: ''});
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

crearEquipoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var editarEquipoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
                $scope.modalEditarEquipo.close();
            }
        });
    };

    $scope.modificar = function(editarEquipo) {
        var stringQuery = "UPDATE team set  " +
        "nombre = '" + editarEquipo.nombre + "', " +
        "activo = '" + editarEquipo.activo + "' " +
        "where codTeam = '" + editarEquipo.codTeam + "'";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarEquipos();
                administrarMensajeSweet({titulo:'Equipo actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modalEditarEquipo.close();
    };
};

editarEquipoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var miembroEquipoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    $scope.newMiembroEquipo = {};
    $scope.jugadores = [];

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

    $scope.guardar = function(newMiembroEquipo) {

        newMiembroEquipo.miembros.forEach(function(obj){
            var stringQuery = "INSERT INTO jugadores_team (jugadores_codJugadores, team_codTeam) VALUES " +
            "('" + obj + "'," +
            "'" + $scope.nuevoMiembrosEquipo.codTeam + "')";

            var consulta = {
                query: stringQuery,
                method: "POST"
            }

            $http.post('../apis/porcesaAPI.php', {
                data: {params:  consulta}
            }).success(function(response){
                if (response == "1") {

                } else {
                }
            }).error(function(){
                administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
            });
        });

        administrarMensajeSweet({titulo:'Miembros ingresados al Equipo con éxito', tipo:'success', texto: ''});
    };


    $scope.listarJugadores = function() {
        $scope.jugadores = [];
        var consulta = {
            query:"select * from jugadores",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log(JSON.stringify(data));
            $scope.jugadores = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

   $scope.listarJugadores();


    $scope.cerrarModal = function() {
        $scope.modalInstance.close();
    };


};

miembroEquipoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

angular
    .module('myApp')
    .controller('equipoCtrl', equipoCtrl)
    .controller('crearEquipoCtrl', crearEquipoCtrl)
    .controller('editarEquipoCtrl', editarEquipoCtrl)
    .controller('miembroEquipoCtrl', miembroEquipoCtrl);