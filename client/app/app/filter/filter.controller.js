'use strict';

angular.module('ydmApp')
    .controller('FilterCtrl', function ($scope, $state, Repository, Message, filter, types, groups) {
        $scope.filter = angular.copy(filter);
        $scope.types = types;
        $scope.groups = groups
        
        $scope.isEdit = false;

        $scope.update = function(data) {
            Repository.updateFilter(data.id, data).then(function(res) {
                $state.reload().then(function() {
                    Message.logSuccess('Filter updated!');
                });
            });
        };

        $scope.reset = function() {
           $scope.filter = angular.copy(filter);
        };
    });
