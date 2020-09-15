'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('loginCtrl', function ($scope, $uibModal, $http, $window) {

    $scope.loginData = {};

    $scope.nuevoUsuario = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'views/usuarios/modalRegistroUsuario.html',
            controller: 'crearUsuarioCtrl',
            size: size
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

    $scope.loggin = function(user) {

        var consulta = {
            query: "select * from usuarios where activo = 1 and usuario = '" + user.email + "' and pwd = '" + user.pwd + "'",
            method: "Security"
        }

        $http.post('apis/security.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log("data : " + data.length);
            if (data.length == 0) {
                administrarMensajeSweet2({titulo:'Usuario y contraseña incorrecto', tipo:'error', texto: ''});
            } else {
                window.location = 'views/index.php';
            }
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    }
});

app.controller('crearUsuarioCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {
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
                $uibModalInstance.close();
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

    var ingresarUsuarioJugador = function(newUsuario){

        if (newUsuario.pwd != newUsuario.pwd2) {
            administrarMensajeSweet2({titulo:'Las contraseñas no son iguales', tipo:'error', texto: ''});
            return false;
        }

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
            "'" + newUsuario.pwd + "'," +
            "" + "3,'../img/base.jpg')";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log("consulta :" + JSON.stringify(consulta));
            if (response == "1") {
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

        $http.post('apis/porcesaAPI.php', {
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
                console.log("consulta :" + JSON.stringify(consulta));
                ingresarUsuarioJugador(newUsuario);
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });

    };


    $scope.cerrarModal = function() {
        $uibModalInstance.close();
    };

});

app.directive('menuApp', function($parse) {

});




