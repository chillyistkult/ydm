'use strict';

angular.module('ydmApp')
    .controller('FilterCtrl', function ($scope, technologies) {
        $scope.$parent.heading = 'Filter';
        $scope.technologies = technologies;
        $scope.technology= technologies[0];
    });
