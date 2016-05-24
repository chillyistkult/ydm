'use strict';

angular.module('app.config', [])
    .constant('CONFIG', {
        api: 'http://ydm-api.azurewebsites.net/api',
        env: 'development',
        version: '0.0.0',
    });
