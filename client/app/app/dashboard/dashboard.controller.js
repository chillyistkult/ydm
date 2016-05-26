'use strict';

angular.module('ydmApp')
    .controller('DashboardCtrl', function ($state, $scope, User, user, Restangular) {
        $scope.user = user;
        Restangular.one('protected').get().then(function(res) {
            console.log(res);
        })
    });
