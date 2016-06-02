'use strict';

angular.module('ydmApp')
    .factory('Filter',
        function (Restangular) {
            return {
                getTechnologies: function (params) {
                    return Restangular.all('technologies').getList(params);
                },
                getProductLines: function(id, params) {
                    return Restangular.one('technologies', id).all('productlines').getList(params);
                }
            };
        });