'use strict';

angular.module('ydmApp')
    .controller('FilterCtrl', function ($scope, Filter) {
        $scope.$parent.heading = 'Filter';

        $scope.getTechnologies = function() {
             Filter.getTechnologies().then(function(res) {
                $scope.technologies = res.data;
                $scope.technology= res.data[0];
            })
        };

        $scope.getProductLines = function(id) {
            Filter.getProductLines(id).then(function(res) {
                $scope.productLines = res.data;
                $scope.productLine = res.data[0];
            })
        };

        $scope.$watchGroup(['technology'], function (newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                $scope.getProductLines($scope.technology.id);
            }
        });

        var init = function() {
            $scope.getTechnologies();
        }
        init();
    });
