'use strict';

angular.module('ydmApp')
    .controller('AppCtrl', function ($scope, $rootScope, $timeout, $state, $compile, $localStorage, DATES, Message, User, Auth, user, refreshTimer) {
        $scope.user = user;
    });
