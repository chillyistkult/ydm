'use strict';

angular.module('ydmApp')
    .controller('FilterAddCtrl', function ($scope, $rootScope, $state, Repository, Message, types, groups, productGroups, group, productGroup) {
        $scope.filter = {};
        $scope.filter.group = angular.copy(group);
        $scope.filter.productGroup = angular.copy(productGroup)
        $scope.types = angular.copy(types);
        $scope.groups = angular.copy(groups);
        $scope.productGroups = angular.copy(productGroups);

        $scope.save = function(data) {
            Repository.addFilter(data).then(function(res) {
                $state.go('app.filters.edit', {fId: res.data.id}).then(function() {
                    Message.logSuccess('Filter successfully saved!');
                });
            });
        };

        $scope.reset = function() {
           $scope.filter = {};
        };
    });
