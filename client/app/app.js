'use strict';
angular.module('ydmApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ngStorage',
    'ngMessages',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'restangular',
    'app.config',
    'angulartics',
    'angulartics.google.analytics',
    'angular-jwt',
    'angular.filter',
    'satellizer',
    'valdr',
    'ngTable',
    'ngTableTemplates',
    'ncy-angular-breadcrumb',
    'ngDraggable'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('httpRequestInterceptor');
        $httpProvider.interceptors.push('loadingInterceptor');
    })
    .factory('httpRequestInterceptor', function ($q, $location, $anchorScroll, Message) {
        return {
            'responseError': function (rejection) {
                if (rejection.status === 404) {
                    $location.path('/404');
                }
                if (rejection.status === 500) {
                    if(rejection.data.code === 20002) {
                        $location.path('/20002');
                    }
                    if(rejection.data.code === 20009) {
                        $location.path('/20009');
                    }
                    //Message.logError(500);
                    //$location.path('/');
                }
                return $q.reject(rejection);
            }
        };
    })
    .factory('loadingInterceptor',
        function ($q, $rootScope, $log, $timeout) {
            'use strict';

            var xhrCreations = 0;
            var xhrResolutions = 0;
            var timer = 0;

            function isLoading() {
                return xhrResolutions < xhrCreations;
            }

            function updateStatus() {
                //Only show loader if
                $timeout(function () {
                    $rootScope.loading = isLoading();
                }, 300)
            }

            return {
                request: function (config) {
                    xhrCreations++;
                    updateStatus();
                    return config;
                },
                requestError: function (rejection) {
                    xhrResolutions++;
                    updateStatus();
                    $log.error('Request error:', rejection);
                    return $q.reject(rejection);
                },
                response: function (response) {
                    xhrResolutions++;
                    updateStatus();
                    return response;
                },
                responseError: function (rejection) {
                    xhrResolutions++;
                    updateStatus();
                    $log.error('Response error:', rejection);
                    return $q.reject(rejection);
                }
            };
        })
    .config(function ($authProvider, CONFIG) {
        $authProvider.withCredentials = false;
        $authProvider.baseUrl = CONFIG.api;
        $authProvider.signupUrl = '/auth/register';
    })
    .config(function ($analyticsProvider, CONFIG) {
        $analyticsProvider.developerMode((CONFIG.env == 'development'));
    })
    .config(function ($urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.strictMode(false)
    })
    .config(function ($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            templateUrl: 'app/app/breadcrumb/template.html',
            includeAbstract: true,
        });
    })
    .config(function ($provide) {
        $provide.decorator('$state', function ($delegate) {
            var originalTransitionTo = $delegate.transitionTo;
            $delegate.transitionTo = function (to, toParams, options) {
                return originalTransitionTo(to, toParams, angular.extend({
                    reload: true
                }, options));
            };
            return $delegate;
        });
    })
    .config([
        'RestangularProvider',
        'CONFIG',
        function (RestangularProvider, CONFIG) {
            RestangularProvider.setBaseUrl(CONFIG.api);

            RestangularProvider.setFullResponse(true);
            RestangularProvider.setDefaultHttpFields({cache: false});
            //RestangularProvider.setPlainByDefault(false);


            RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                var extractedData;
                if (operation === "getList") {
                    extractedData = data;
                } else {
                    extractedData = data;
                }
                return extractedData;
            });
        }])
    .run([
        '$rootScope',
        '$state',
        '$filter',
        '$breadcrumb',
        'Auth',
        'Message',
        'Restangular',
        '$templateCache', function ($rootScope, $state, $filter, $breadcrumb, Auth, Message, RestangularProvider, $templateCache) {
            // Redirect to login if route requires auth and the user is not logged in
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.redirectTo) {
                    event.preventDefault();
                    _.isObject(toState.redirectTo) ? $state.go(toState.redirectTo.name, toState.redirectTo.params) : $state.go(toState.redirectTo, toParams)
                }
                if (toState.name === 'access.login') {
                    if (Auth.isAuthenticated()) {
                        event.preventDefault();
                        $state.go('app.filters');
                        return;
                    }
                }
                if (toState.data.authenticate) {
                    if (!Auth.isAuthenticated()) {
                        event.preventDefault();
                        $state.go('access.login');
                        return;
                    }
                }
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $state.previous = fromState;
                $state.previous.params = fromParams;
            });

        }
    ]);
