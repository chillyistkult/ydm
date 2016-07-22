'use strict';

angular.module('app.config', [])
    .constant('CONFIG', {
        api: 'http://ydm.app/api',
        env: 'development',
        version: '0.0.0',
        layout: {
            placeholder: {
                list: 160,
            },
        }
    });
