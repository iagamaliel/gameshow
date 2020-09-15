'use strict';

var perfilCtrl = function($rootScope, $scope, $uibModal, $http) {

    $scope.seleccionarPerfil = function(perfil) {
        $scope.editarPerfil = angular.copy(perfil);
        $scope.modaleditarPerfil = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'perfil/modalEditarPerfil.html',
            controller: editarPerfilCtrl
        });
    };

    $scope.cambiarContra = function(perfil) {
        $scope.editarContra = angular.copy(perfil);
        $scope.modaleditarContra = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'perfil/modalEditarContra.html',
            controller: editarContraCtrl
        });
    };

    $scope.seleccionarImg = function(perfil) {
        $scope.editarImg = angular.copy(perfil);
        $scope.modaleditarImg = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'perfil/modalEditarImg.html',
            controller: editarImgCtrl
        });
    };

};

perfilCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];


var editarPerfilCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
                title: conf.titulo,
                text: conf.texto,
                type: conf.tipo,
                showCancelButton: false
            },
            function(isConfirm){
                if (isConfirm){
                    $scope.modaleditarPerfil.close();
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

    $scope.modificar = function(editarPerfil) {
        if (!editarPerfil.nombre_jugador) {
            administrarMensajeSweet2({titulo:'El nombre no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }
        if (!editarPerfil.apellido_jugador) {
            administrarMensajeSweet2({titulo:'El apellido no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }
        if (!editarPerfil.nickname_jugador) {
            administrarMensajeSweet2({titulo:'El nickname no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }
        if (!editarPerfil.email) {
            administrarMensajeSweet2({titulo:'El correo electronico no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }
        if (!editarPerfil.telefono_jugador) {
            administrarMensajeSweet2({titulo:'El numero de telefono no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }
        if (isNaN(editarPerfil.telefono_jugador)) {
            administrarMensajeSweet2({titulo:'Ingrese un numero de telefono valido', tipo:'error', texto: ''});
            return false;
        }
        if (!editarPerfil.fecha_nacimiento) {
            administrarMensajeSweet2({titulo:'La fecha de nacimiento no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }
        if (!editarPerfil.pais_jugador) {
            administrarMensajeSweet2({titulo:'El campo pais  no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }

        var d = new Date(editarPerfil.fecha_nacimiento);
        var x = d.getFullYear()  + "/" + (d.getMonth() + 1) + "/" + d.getDate();

        var stringQuery = "UPDATE jugadores set  " +
            "nombre_jugador = '" + editarPerfil.nombre_jugador + "', " +
            "apellido_jugador = '" + editarPerfil.apellido_jugador + "', " +
            "nickname_jugador = '" + editarPerfil.nickname_jugador + "', " +
            "email = '" + editarPerfil.email + "', " +
            "telefono_jugador = '" + editarPerfil.telefono_jugador + "', " +
            "fecha_nacimiento = '" + x + "', " +
            "pais_jugador = '" + editarPerfil.pais_jugador + "', " +
            "direccion = '" + editarPerfil.direccion + "' " +
            "where codJugadores = " + editarPerfil.jugadores_codJugadores + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log("consulta :" + JSON.stringify(consulta));
            if (response == "1") {
                administrarMensajeSweet({titulo:'Perfil actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modaleditarPerfil.close();
        window.location.reload();
    };
};

editarPerfilCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];


var editarContraCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
                title: conf.titulo,
                text: conf.texto,
                type: conf.tipo,
                showCancelButton: false
            },
            function(isConfirm){
                if (isConfirm){
                    $scope.modaleditarContra.close();
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

    $scope.modificar2 = function(editarContra) {
        if (editarContra.pwdact != $rootScope.securityDataUser.pwd) {
            administrarMensajeSweet2({titulo:'Contraseña incorrecta', tipo:'error', texto: ''});
            return false;
        }
        if (editarContra.pwdnew != editarContra.pwdnewconf) {
            administrarMensajeSweet2({titulo:'La nueva contraseña no coincide', tipo:'error', texto: ''});
            return false;
        }


        var stringQuery = "UPDATE usuarios set  " +
            "pwd = '" + editarContra.pwdnew + "' " +
            "where id_usuario = " + editarContra.id_usuario + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log("consulta :" + JSON.stringify(consulta));
            if (response == "1") {
                administrarMensajeSweet({titulo:'Contraseña actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modaleditarContra.close();
        window.location.reload();
    };
};

editarContraCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];


var editarImgCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
                title: conf.titulo,
                text: conf.texto,
                type: conf.tipo,
                showCancelButton: false
            },
            function(isConfirm){
                if (isConfirm){
                    $scope.modaleditarImg.close();
                    window.location.reload();
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

    $scope.modificar3 = function() {

        var IMG = $('.image-picker').imagepicker().val();
        console.log(IMG)

        var stringQuery = "UPDATE jugadores set  " +
            "img_jugador = '../img/" + IMG + ".png' " +
            "where codJugadores = " + $rootScope.securityDataUser.id_usuario + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log("consulta :" + JSON.stringify(consulta));
            if (response == "1") {
                administrarMensajeSweet({titulo:'Avatar actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modaleditarImg.close();
        window.location.reload();
    };
};

editarImgCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];


angular
    .module('myApp')
    .controller('perfilCtrl', perfilCtrl)
    .controller('editarPerfilCtrl', editarPerfilCtrl);
