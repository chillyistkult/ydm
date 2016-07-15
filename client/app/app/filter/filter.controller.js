'use strict';

angular.module('ydmApp')
    .controller('FilterCtrl', function ($scope, $state, Repository, Message, filter, types, groups) {
        $scope.filter = angular.copy(filter);
        $scope.types = angular.copy(types);
        $scope.groups = angular.copy(groups);

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
