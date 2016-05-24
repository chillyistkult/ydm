'use strict';

angular.module('ydmApp')
  .directive('loader',['Message', function (Message) {
    return {
      templateUrl: 'components/loader/loader.html',
      restrict: 'AE',
      link: function ($scope, element, attrs) {

      }
    };
  }]);
