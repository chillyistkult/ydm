'use strict';

angular.module('ydmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('access', {
                abstract: true,
                template: '<div class="fullscreen gradient-primary"><messages></messages><div ui-view class="fade-in-right-big smooth"></div></div>',
                controller: 'AccessCtrl',
                data: {
                    authenticate: false
                },
            })
            .state('access.login', {
                url: '/login',
                params: {referrer: null},
                templateUrl: 'app/access/login/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    referrer: function ($stateParams, $state) {
                        return $stateParams.referrer || $state.current.referrer || 'app.dashboard';
                    }
                }
            })
    })
    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
            if (next.name === 'logout' && current && current.name && !current.data.authenticate) {
                next.referrer = current.name;
            }
        });
    });
