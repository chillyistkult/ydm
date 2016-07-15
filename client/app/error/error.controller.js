'use strict';

angular.module('ydmApp')
    .controller('ErrorCtrl', function ($scope, $rootScope, $state, Auth) {
        $scope.previous = function() {
            if($state.previous.name) {
                $state.go($state.previous.name);
            }
            else {
                $state.go('access.login');
            }
        }
        
        $scope.home = function() {
            $state.go('app.home');
        }
    });
