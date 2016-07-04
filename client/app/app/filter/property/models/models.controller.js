'use strict';

angular.module('ydmApp')
    .controller('ModelsCtrl', function ($scope, Repository, NgTableParams, models, propertyModels, property) {
        $scope.property = property;
        $scope.propertyModels = propertyModels;
        $scope.models = models;

        angular.forEach($scope.models, function(model) {
            var isFound = false;
            angular.forEach($scope.propertyModels, function(propertyModel) {
                if(angular.equals(model, propertyModel)) {
                    return isFound = true;
                }
            });
            model.isIncluded = isFound;
        });

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
