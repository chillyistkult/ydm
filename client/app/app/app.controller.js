'use strict';

angular.module('ydmApp')
    .controller('AppCtrl', function ($scope, $rootScope, $timeout, $state, $compile, $localStorage, Message, User, Auth, user) {
        $scope.user = user;
    });
