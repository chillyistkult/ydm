'use strict';

angular.module('app.config', [])
    .constant('CONFIG', {
        api: '@@api',
        env: '@@env',
        version: '@@version',
    });
