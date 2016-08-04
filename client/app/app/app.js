'use strict';

angular.module('ydmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                ncyBreadcrumb: {
                    skip: true
                },
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
            .state('app.filters', {
                url: '',
                params: {
                    tId: null,
                    pId: null,
                },
                views: {
                    'content': {
                        templateUrl: 'app/app/filter/filter.html',
                        controller: 'FilterCtrl',
                    }
                },
                ncyBreadcrumb: {
                    label: 'Filters'
                },
                resolve: {
                    technology: function ($stateParams) {
                        return $stateParams.tId;
                    },
                    product: function ($stateParams) {
                        return $stateParams.pId;
                    }
                }
            })
            .state('app.filters.edit', {
                url: '/filters/{fId}',
                ncyBreadcrumb: {
                    label: function ($stateParams) {
                        return $stateParams.fId
                    }
                },
                views: {
                    'content@app': {
                        templateUrl: 'app/app/filter/edit/edit.html',
                        controller: 'FilterEditCtrl'
                    }
                },
                resolve: {
                    filter: function (Repository, $stateParams) {
                        return Repository.getFilter($stateParams.fId).then(function (res) {
                            return res.data.plain();
                        })
                    },
                    types: function (Repository) {
                        return Repository.getFilterTypes().then(function (res) {
                            return res.data.plain();
                        })
                    },
                    groups: function (Repository) {
                        return Repository.getFilterGroups().then(function (res) {
                            return res.data.plain();
                        })
                    }
                }
            })
            .state('app.filters.edit.properties', {
                abstract: true,
                url: '/properties',
                ncyBreadcrumb: {
                    label: 'Properties'
                },
            })
            .state('app.filters.edit.properties.edit', {
                url: '/{pId}',
                ncyBreadcrumb: {
                    label: function ($stateParams) {
                        return $stateParams.pId
                    }
                },
                views: {
                    'content@app': {
                        templateUrl: 'app/app/property/edit/edit.html',
                        controller: 'PropertyCtrl'
                    },
                    'models@app.filters.edit.properties.edit': {
                        templateUrl: 'app/app/models/list/list.html',
                        controller: 'PropertyCtrl'
                    }
                },
                resolve: {
                    property: function (Repository, $stateParams) {
                        return Repository.getFilterProperty($stateParams.pId).then(function (res) {
                            return res.data.plain();
                        })
                    },
                    propertyModels: function (Repository, filter, property) {
                        return Repository.getFilterPropertyModels(filter.id, property.id).then(function (res) {
                            return res.data.plain();
                        })
                    }

                }
            })
            .state('app.filters.edit.properties.edit.models', {
                abstract: true,
                ncyBreadcrumb: {
                    label: 'Models'
                }
            })
            .state('app.filters.edit.properties.edit.models.add', {
                views: {
                    'models@app.filters.edit.properties.edit': {
                        templateUrl: 'app/app/models/add/add.html',
                        controller: 'ModelCtrl'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Add'
                },
                resolve: {
                    property: function (Repository, $stateParams) {
                        return Repository.getFilterProperty($stateParams.pId).then(function (res) {
                            return res.data.plain();
                        })
                    },
                    models: function (Repository) {
                        return Repository.getModels().then(function (res) {
                            return res.data.plain();
                        })
                    }

                }
            })
    });
