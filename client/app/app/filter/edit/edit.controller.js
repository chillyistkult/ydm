'use strict';

angular.module('ydmApp')
    .controller('FilterEditCtrl', function ($scope, $rootScope, $state, Repository, Message, filter, types, groups, productGroups) {
        $scope.filter = angular.copy(filter);
        $scope.types = angular.copy(types);
        $scope.groups = angular.copy(groups);
        $scope.productGroups = angular.copy(productGroups);

        $scope.update = function(data) {
            Repository.updateFilter(data.id, data).then(function(res) {
                $state.reload().then(function() {
                    Message.logSuccess('Filter successfully updated!');
                });
            });
        };

        $scope.reset = function() {
           $scope.filter = angular.copy(filter);
        };
    });
