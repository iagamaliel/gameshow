'use strict';

var usuarioCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.usuarios = [];
    $scope.roles = [];
    $scope.jugadores = [];

    $scope.nuevoUsuario = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/usuarios/modalNuevoUsuario.html',
            controller: crearUsuarioCtrl,
            size: size
        });
    };

    $scope.seleccionarUsuario = function(jugador) {
        $scope.editarUsuario = angular.copy(jugador);
        $scope.modalEditarUsuario = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/usuarios/modalEditarUsuario.html',
            controller: editarUsuarioCtrl
        });
    };

    $scope.listarUsuarios = function() {
        $scope.usuarios = [];
        var consulta = {
            query:"SELECT u.*, j.nombre_jugador, j.apellido_jugador,j.nickname_jugador,j.email,j.fecha_nacimiento, j.pais_jugador, j.telefono_jugador, j.direccion from usuarios u left join jugadores j on u.jugadores_codJugadores = j.codJugadores",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log(JSON.stringify(data));
            $scope.usuarios = data
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarUsuarios();

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

    $scope.listarJugadores = function() {
        $scope.jugadores = [];
        var consulta = {
            query:"SELECT u.*, j.nombre_jugador, j.apellido_jugador,j.nickname_jugador,j.email,j.fecha_nacimiento, j.pais_jugador, j.telefono_jugador, j.direccion from usuarios u left join jugadores j on u.jugadores_codJugadores = j.codJugadores",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log('jugadores : ' + JSON.stringify(data));
            $scope.jugadores = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarJugadores();

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

usuarioCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];

var crearUsuarioCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    $scope.newUsuario = {};

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

    var ingresarUsuarioJugador = function(newUsuario) {

        var d = new Date(newUsuario.fecha_nacimiento );
        var x = d.getFullYear()  + "/" + (d.getMonth() + 1) + "/" + d.getDate();

        var stringQuery = "call InsertarUsuario ("+
            "'" + newUsuario.nombre_jugador + "'," +
            "'" + newUsuario.apellido_jugador + "'," +
            "'" + newUsuario.nickname_jugador + "'," +
            "'" + newUsuario.email + "'," +
            "'" + x + "'," +
            "1," +
            "" + newUsuario.telefono_jugador + "," +
            "'" + newUsuario.pais_jugador + "'," +
            "'" + newUsuario.direccion + "'," +
            "'" + newUsuario.usuario + "'," +
            "'" + newUsuario.email + "'," +
            "" + newUsuario.id_rol + ",'../img/base.jpg')";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log("consulta :" + JSON.stringify(consulta));
            if (response == "1") {
                $scope.listarUsuarios();
                administrarMensajeSweet({titulo:'Usuario ingresado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al ingresar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.guardar = function(newUsuario) {
        var consulta = {
            query: "select * from vt_usuarios_roles_jugadores where usuario = '" + newUsuario.usuario.trim() + "' or email = '" + newUsuario.email.trim() + "';",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            if (data.length > 0) {
                $window.swal({
                    title: 'Favor cambie el Usuario o Email debido a que ya se encuentra registrado con estos datos',
                    text: '',
                    type: 'info',
                    showCancelButton: false
                });
            } else {
                ingresarUsuarioJugador(newUsuario);
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modalInstance.close();
    };
};

crearUsuarioCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var editarUsuarioCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
                title: conf.titulo,
                text: conf.texto,
                type: conf.tipo,
                showCancelButton: false
            },
            function(isConfirm){
                if (isConfirm){
                    $scope.modalEditarUsuario.close();
                }
            });
    };

    var ingresarUsuarioMod = function(editarUsuario) {

        var d = new Date(editarUsuario.fecha_nacimiento );
        var x = d.getFullYear()  + "/" + (d.getMonth() + 1) + "/" + d.getDate();

        var stringQuery2 = "UPDATE usuarios set  " +
            "id_rol = '" + editarUsuario.id_rol + "', " +
            "usuario = '" + editarUsuario.usuario + "', " +
            "activo = '" + editarUsuario.activo + "' " +
            "where id_usuario = '" + editarUsuario.id_usuario + "'";

        var consulta = {
            query: stringQuery2,
            method: "POST"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log('stringQuery:' + JSON.stringify(stringQuery2));
            if (response == "1") {


                var stringQuery = "UPDATE jugadores set  " +
                    "nombre_jugador = '" + editarUsuario.nombre_jugador + "', " +
                    "apellido_jugador = '" + editarUsuario.apellido_jugador + "', " +
                    "nickname_jugador = '" + editarUsuario.nickname_jugador + "', " +
                    "email = '" + editarUsuario.email + "', " +
                    "telefono_jugador = '" + editarUsuario.telefono_jugador + "', " +
                    "pais_jugador = '" + editarUsuario.pais_jugador + "', " +
                    "direccion = '" + editarUsuario.direccion + "', " +
                    "fecha_nacimiento = '" + x + "', " +
                    "activo = '" + editarUsuario.activo + "' " +
                    "where codJugadores = '" + editarUsuario.jugadores_codJugadores + "'";

                var consulta = {
                    query: stringQuery,
                    method: "POST"
                }

                $http.post('../apis/porcesaAPI.php', {
                    data: {params:  consulta}
                }).success(function(response){
                    console.log('stringQuery:' + JSON.stringify(stringQuery));
                    if (response == "1") {
                        $scope.listarUsuarios();
                        administrarMensajeSweet({titulo:'Usuario actualizado', tipo:'success', texto: ''});
                    } else {
                        administrarMensajeSweet({titulo:'Error al ingresar', tipo:'error', texto: ''});
                    }
                }).error(function(){
                    administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
                });
            } else {
                administrarMensajeSweet({titulo:'Error al ingresar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });


    };


    $scope.modificar = function(editarUsuario) {
        var consulta = {
            query: "select * from vt_usuarios_roles_jugadores where usuario = '" + editarUsuario.usuario.trim() + "' or email = '" + editarUsuario.email.trim() + "';",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            if (data.length > 0) {
                $window.swal({
                    title: 'Favor cambie el Usuario o Email debido a que ya se encuentra registrado con estos datos',
                    text: '',
                    type: 'info',
                    showCancelButton: false
                });
            } else {
                ingresarUsuarioMod(editarUsuario);
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });

    };


    $scope.cerrarModal = function() {
        $scope.modalEditarUsuario.close();
    };
};

editarUsuarioCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

angular
    .module('myApp')
    .controller('usuarioCtrl', usuarioCtrl)
    .controller('crearUsuarioCtrl', crearUsuarioCtrl)
    .controller('editarUsuarioCtrl', editarUsuarioCtrl);
