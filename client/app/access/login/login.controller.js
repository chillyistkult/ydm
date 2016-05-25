'use strict';

angular.module('ydmApp')
    .controller('LoginCtrl', function ($scope, Auth, $state) {

        $scope.user = {};

        $scope.login = function (user, form) {
            debugger;
            if (form.$valid) {

                Auth.login({
                    _username: user.username,
                    _password: user.password
                })
                    .then(function (user) {
                        // Logged in, redirect to home
                        $state.go('app.dashboard');
                    })
                    .catch(function (err) {
                        // Something went wrong.
                    });

            }
        };
    });
