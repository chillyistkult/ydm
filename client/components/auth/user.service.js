'use strict';

angular.module('ydmApp')
    .factory('User', [
        'Restangular', '$auth', '$q',
        function (Restangular, $auth, $q) {
            var user = {};

            return {
                /* Currenty a workaround to get the user object updated on next update cycle (should be more generic in the feature */
                clear: function () {
                    user = {};
                },
                /* A very naiv caching implementation */
                get: function (id) {
                    if (id) {
                        return Restangular.one('users', id).get().then(function (res) {
                            return res.data;
                        });
                    }
                    else {
                        return $q.when(_.isEmpty(user) && $auth.getPayload() ? this.get($auth.getPayload().id) : user)
                            .then(function (res) {
                                if (res.token) {
                                    $auth.setToken(res.token);
                                }
                                return user = res;
                            }, function (err) {
                                console.error(err);
                                return {};
                            });
                    }
                },
                update: function (obj, params) {
                    return Restangular.copy(obj).save(params).then(function (res) {
                        $auth.setToken(res.data.token);
                        return user = res.data;
                    });
                },
                delete: function (obj, params) {
                    return Restangular.copy(obj).remove(params).then(function (res) {
                        user = {};
                        $auth.logout();
                        return res;
                    });
                },
            };
        }]);