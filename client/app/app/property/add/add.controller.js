'use strict';

angular.module('ydmApp')
    .controller('PropertyAddCtrl', function ($scope, $state, Repository, Message, filter) {
        $scope.property = {}

        $scope.save = function(data) {
            Repository.addFilterProperty(filter.id, data).then(function(res) {
                $state.go('app.filters.edit.properties.edit', {pId: res.data.id}).then(function() {
                    Message.logSuccess('Property successfully saved!');
                });
            });
        };

        $scope.reset = function (form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.property = {};
        };
    });
