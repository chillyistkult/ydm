'use strict';

angular.module('ydmApp')
    .controller('FilterCtrl', function ($scope, Repository, filter, types, groups) {
        $scope.filter = angular.copy(filter);
        $scope.types = types;
        $scope.groups = groups
        
        $scope.isEdit = false;

        $scope.reset = function() {
           $scope.filter = angular.copy(filter);
        };
    });
