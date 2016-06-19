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

        $scope.getFilters = function(tId, pId) {
            Filter.getFilters(tId, pId).then(function(res) {
                $scope.filters = res.data;
            })
        }

        $scope.$watchGroup(['technology'], function (newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                $scope.getProductLines($scope.technology.id);
            }
        });

        $scope.$watchGroup(['productLine'], function (newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                $scope.getFilters($scope.technology.id, $scope.productLine.id);
            }
        });

        var init = function() {
            $scope.getTechnologies();
        }
        init();
    });
