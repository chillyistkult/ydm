'use strict';

angular.module('ydmApp')
    .factory('Repository',
        function (Restangular) {
            return {
                getTechnologies: function (params) {
                    return Restangular.all('technologies').getList(params);
                },
                getProductLines: function(id, params) {
                    return Restangular.one('technologies', id).all('productlines').getList(params);
                },
                getFilterByTechnologyAndProduct: function(tId, pId, fId, params) {
                    return Restangular.one('technologies', tId).one('productlines', pId).one('filters', fId).get(params);
                },
                getFilter: function(id, params) {
                    return Restangular.one('filters', id).get(params);
                },
                updateFilter: function(id, data) {
                    return Restangular.one('filters', id).customPUT(data);
                },
                deleteFilter: function(id) {
                    return Restangular.one('filters', id).customDELETE();
                },
                addFilter: function(data, params) {
                    return Restangular.all('filters').customPOST(data);
                },
                getFilters: function(params) {
                    return Restangular.all('filters').getList(params);
                },
                updateFilters: function(data) {
                    return Restangular.one('filters').customPUT(data);
                },
                getFilterProperty: function(id, params) {
                    return Restangular.one('filters/properties', id).get(params);
                },
                updateFilterProperty: function(id, data) {
                    return Restangular.one('filters/properties', id).customPUT(data);
                },
                getFilterProperties: function(params) {
                    return Restangular.all('filters/properties').getList(params);
                },
                getFilterPropertyModels: function(fId, pId, params) {
                    return Restangular.one('filters', fId).one('properties', pId).all('models').getList(params);
                },
                getFilterType: function(id, params) {
                    return Restangular.one('filters/types', id).get(params);
                },
                getFilterTypes: function(params) {
                    return Restangular.all('filters/types').getList(params);
                },
                getFilterGroup: function(id, params) {
                    return Restangular.one('filters/groups', id).get(params);
                },
                getFilterGroups: function(params) {
                    return Restangular.all('filters/groups').getList(params);
                },
                getProductGroup: function(id, params) {
                    return Restangular.one('productgroups', id).get(params);
                },
                getProductGroups: function(id, params) {
                    return Restangular.all('productgroups').getList(params);
                },
                getModel: function(id, params) {
                    return Restangular.one('models', id).get(params);
                },
                getModels: function(params) {
                    return Restangular.all('models').getList(params);
                }
            };
        });