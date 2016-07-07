'use strict';

angular.module('ydmApp')
    .controller('PropertyCtrl', function ($scope, Repository, NgTableParams, property, propertyModels) {
        $scope.property = angular.copy(property);
        $scope.models = propertyModels;

        $scope.save = function() {

        };

        $scope.reset = function() {
            $scope.property = angular.copy(property);
        }

        $scope.tableParams = new NgTableParams({
            page: 1, // show first page
            count: 25, // count per page
        }, {
            filterOptions: {
                filterDelay: 300
            },
            dataset:  $scope.models
        });
    });
