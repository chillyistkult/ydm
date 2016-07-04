'use strict';

angular.module('ydmApp')
    .controller('HomeCtrl', function ($scope, $rootScope, Repository) {
        $rootScope.loading = true;

        $scope.dragListeners = {
            accept: function (sourceItemHandleScope, destSortableScope) {
                return boolean
            },//override to determine drag is allowed or not. default is true.
            itemMoved: function (event) {
            },
            orderChanged: function (event) {
            },
            containment: '#board',//optional param.
            clone: true, //optional param for clone feature.
            allowDuplicates: false //optional param allows duplicates to be dropped.
        };

        $scope.getTechnologies = function () {
            Repository.getTechnologies().then(function (res) {
                $scope.technologies = res.data;
                $scope.technology = res.data[0];
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

        var init = function () {
            $scope.getTechnologies();
        }
        init();
    });
