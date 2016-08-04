'use strict';

angular.module('ydmApp')
    .controller('LoginCtrl', function ($scope, Auth, $state) {

        $scope.user = {};

        $scope.login = function (user, form) {
            if (form.$valid) {
                Auth.login(user)
                    .then(function (user) {
                        $state.go('app.filters');
                    })
                    .catch(function (err) {
                    });

            }
        };
    });
