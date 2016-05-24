'use strict';

angular.module('ydmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                data: {
                    authenticate: true
                },
                views: {
                    '': {
                        templateUrl: 'app/app/app.html',
                        controller: 'AppCtrl',
                    },
                    'header@app': {
                        templateUrl: 'app/app/header/header.html',
                    },
                    'footer@app': {
                        templateUrl: 'app/app/footer/footer.html',
                    },
                },
                resolve: {
                    user: function (Auth) {
                        debugger;
                        return Auth.getCurrentUser().then(function (user) {
                            return user;
                        });
                    },
                },
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/app/dashboard/dashboard.html',
                views: {
                    'content': {
                        templateUrl: 'app/app/dashboard/dashboard.html',
                        controller: 'DashboardCtrl',
                        controllerAs: 'dashboard',
                    }
                },
            })
    });
