'use strict';

angular.module('ydmApp')
    .factory('Filter',
        function (Restangular) {
            return {
                getTechnologies: function (params) {
                    return Restangular.one('technologies').getList(params);
                },
            };
        });