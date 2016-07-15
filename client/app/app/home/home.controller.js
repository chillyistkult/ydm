'use strict';

angular.module('ydmApp')
    .controller('HomeCtrl', function ($scope, $rootScope, Repository) {

        // Index = Dropindex
        // Obj = Dragged obj
        $scope.onDropComplete = function (index, obj, event) {
            if (obj) {
                var destObj = $scope.filters[index];
                var sourceIndex = $scope.filters.indexOf(obj);
                $scope.filters[index] = obj;
                $scope.filters[sourceIndex] = destObj;
            }
        }

        $scope.getTechnologies = function () {
            Repository.getTechnologies().then(function (res) {
                $scope.technologies = res.data;
                $scope.technology = res.data[1];
            })
        };

        $scope.getProductLines = function (id) {
            Repository.getProductLines(id).then(function (res) {
                $scope.productLines = res.data;
                $scope.productLine = res.data[0];
            })
        };

        $scope.getFilters = function (tId, pId) {
            Repository.getFilterByTechnologyAndProduct(tId, pId).then(function (res) {
                $scope.filters = res.data;
                $scope.layout = $scope.getLayout($scope.filters);
                console.log($scope.layout);
            })
        }

        $scope.getLayout = function (filters) {
            var isBoolean = 0;
            angular.forEach(filters, function (filter) {
                if (filter.type.id == 1) {
                    isBoolean++;
                }
                else {
                    if (isBoolean != 2) {
                        isBoolean = 0;
                    }
                }
            });
            return isBoolean == 2 ? 2 : 1;
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

        var init = function () {
            $scope.getTechnologies();
        }
        init();
    });
