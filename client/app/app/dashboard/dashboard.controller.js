'use strict';

angular.module('ydmApp')
    .controller('DashboardCtrl', function ($state, $scope, $rootScope, $timeout, DATES, NgTableParams, User, user, stats, Auctions) {
        $scope.user = user;
    });
