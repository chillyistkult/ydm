'use strict';

angular.module('ydmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('error', {
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'app/error/error.html',
                        controller: 'ErrorCtrl',
                    },
                }
            })
            .state('error.404', {
                url: '/404',
                views: {
                    'content': {
                        templateUrl: 'app/error/404.html'
                    }
                }
            })
            .state('error.20002', {
                url: '/500/20002',
                views: {
                    'content': {
                        templateUrl: 'app/error/20002.html'
                    }
                }
            })
    });
