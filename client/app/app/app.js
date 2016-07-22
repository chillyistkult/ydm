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
                    'breadcrumb@app': {
                        templateUrl: 'app/app/breadcrumb/breadcrumb.html'
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
            .state('app.home', {
                url: '/',
                params: {
                    tId: null,
                    pId: null,
                },
                views: {
                    'content': {
                        templateUrl: 'app/app/home/home.html',
                        controller: 'HomeCtrl',
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('app.filter', {
                url: '/filters/{fId}',
                views: {
                    'content@app': {
                        templateUrl: 'app/app/filter/filter.html',
                        controller: 'FilterCtrl',
                    }
                },
                ncyBreadcrumb: {
                    label: 'Filter'
                },
                resolve: {
                    filter: function (Repository, $stateParams) {
                        return Repository.getFilter($stateParams.fId).then(function (res) {
                            return res.data.plain();
                        })
                    },
                    types: function(Repository) {
                        return Repository.getFilterTypes().then(function(res) {
                            return res.data.plain();
                        })
                    },
                    groups: function(Repository) {
                        return Repository.getFilterGroups().then(function(res) {
                            return res.data.plain();
                        })
                    },
                }
            })
            .state('app.filter.property', {
                url: '/property/{pId}',
                views: {
                    'content@app': {
                        templateUrl: 'app/app/filter/property/property.html',
                        controller: 'PropertyCtrl'
                    },
                    'models@app.filter.property': {
                        templateUrl: 'app/app/filter/property/models/list.html',
                        controller: 'PropertyCtrl'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Property'
                },
                resolve: {
                    property: function (Repository, $stateParams) {
                        return Repository.getFilterProperty($stateParams.pId).then(function (res) {
                            return res.data.plain();
                        })
                    },
                    propertyModels: function(Repository, filter, property) {
                        return Repository.getFilterPropertyModels(filter.id, property.id).then(function(res) {
                            return res.data.plain();
                        })
                    }

                }
            })
            .state('app.filter.property.models', {
                views: {
                    'models@app.filter.property': {
                        templateUrl: 'app/app/filter/property/models/add.html',
                        controller: 'ModelCtrl'
                    }
                },
                ncyBreadcrumb: {
                    skip: true
                },
                resolve: {
                    property: function (Repository, $stateParams) {
                        return Repository.getFilterProperty($stateParams.pId).then(function (res) {
                            return res.data.plain();
                        })
                    },
                    models: function(Repository) {
                        return Repository.getModels().then(function(res) {
                            return res.data.plain();
                        })
                    }

                }
            })
    });
