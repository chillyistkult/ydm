'use strict';

angular.module('ydmApp')
    .controller('LoginCtrl', function ($scope, Auth, $state, referrer, email) {
        $scope.user = {};
        $scope.email = email;

        $scope.login = function (user, form) {
            if (form.$valid) {
                Auth.login({
                        _username: user.email,
                        _password: user.password
                    })
                    .then(function (user) {
                        // Logged in, redirect to home
                        forward(referrer);
                    })
                    .catch(function (err) {
                        // Something went wrong.
                    });
            }
        };

        var forward = function (referrer) {
            referrer == 'previous' ? $state.go($state.previous, $state.previous.params) : $state.go(referrer);
        }
    });
