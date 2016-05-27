'use strict';

angular.module('ydmApp')
    .factory('Auth', function Auth(User, Message, Restangular, $auth, $filter, $q) {
        var globalAuth = {
            login: function (user) {
                return $auth.login(user)
                    .then(function (res) {
                        return $auth.getPayload();
                    })
                    .catch(function (err) {
                        globalAuth.logout();
                        return $q.reject(err);
                    });
            },
            logout: function () {
                User.clear();
                return $auth.logout();
            },
            isAuthenticated: function () {
                return $auth.isAuthenticated();
            },
            getPayload: function () {
                return $auth.getPayload();
            },
            getCurrentUser: function () {
                return $auth.getPayload();
            },
        }
        return globalAuth;
    });