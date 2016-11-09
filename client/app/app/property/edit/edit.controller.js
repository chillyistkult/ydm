'use strict';

angular.module('ydmApp')
    .controller('PropertyEditCtrl', function ($scope, $state, Repository, Message, NgTableParams, property, propertyModels) {
        $scope.property = angular.copy(property);
        $scope.models = propertyModels;

        $scope.update = function (data) {
            Repository.updateFilterProperty(data.id, data).then(function (res) {
                $state.reload().then(function () {
                    Message.logSuccess('Property successfully updated!');
                });
            });
        };

        $scope.delete = function(data) {
            data.isIncluded = false;
            Repository.updateModel(property.id, data.id, data).then(function(res) {
                $state.reload().then(function() {
                    Message.logSuccess('Model successfully removed!');
                });
            });
        };

        $scope.reset = function (form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.property = angular.copy(property);
        };

        $scope.tableParams = new NgTableParams({
            page: 1, // show first page
            count: 25, // count per page
        }, {
            filterOptions: {
                filterDelay: 300
            },
            dataset: $scope.models
        });
    });
