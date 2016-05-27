'use strict';

angular.module('ydmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('access', {
                abstract: true,
                templateUrl: 'app/access/access.html',
                controller: 'AccessCtrl',
                data: {
                    authenticate: false
                },
            })
            .state('access.login', {
                url: '/login',
                templateUrl: 'app/access/login/login.html',
                controller: 'LoginCtrl'
            })
            .state('access.logout', {
                url: '/logout?referrer',
                referrer: 'access.login',
                template: '',
                controller: function ($state, Auth) {
                    var referrer = $state.params.referrer ||
                        $state.current.referrer ||
                        'access.login';
                    Auth.logout();
                    $state.go(referrer);
                }
            });
    })
    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
            if (next.name === 'logout' && current && current.name && !current.data.authenticate) {
                next.referrer = current.name;
            }
        });
    });
