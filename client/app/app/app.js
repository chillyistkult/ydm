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
                        return Auth.getCurrentUser();
                    },
                },
            })
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'content': {
                        templateUrl: 'app/app/dashboard/dashboard.html',
                        controller: 'DashboardCtrl',
                    }
                },
            })
            .state('app.maintenance', {
                abstract: true,
                url: '/maintenance',
                heading: "Maintenance",
                views: {
                    'content': {
                        templateUrl: 'app/app/maintenance/maintenance.html',
                        controller: 'DashboardCtrl',
                    },
                    'sidebar@app.maintenance': {
                        templateUrl: 'app/app/maintenance/sidebar/sidebar.html',
                    },
                },
            })
            .state('app.maintenance.filter', {
                url: '/filter',
                heading: "Filter",
                views: {
                    'content': {
                        templateUrl: 'app/app/maintenance/filter/filter.html',
                        controller: 'FilterCtrl',
                    },
                },
                resolve: {
                    technologies: function(Filter) {
                        return Filter.getTechnologies().then(function(res) {
                            return res.data;
                        })
                    }
                }
            })
    });
