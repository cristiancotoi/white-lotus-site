'use strict';

app.factory('authSrvc',
    function ($http, $resource, baseSrvcUrl, parseAppId, parseRestApiKey) {
        return {
            login: function (userData, success, error) {
                this.setAuthHeaders();
                return $resource(baseSrvcUrl + '1/login', {
                    username: "@username",
                    password: "@password"
                }).get(userData)
                    .$promise
                    .then(function (data) {
                        sessionStorage['currentUser'] = JSON.stringify(data);
                        success();
                    }, function (err) {
                        error(err);
                    });

            },
            register: function (userData, success, error) {
                this.setAuthHeaders();
                return $resource(baseSrvcUrl + '1/users', {
                        username: "@username",
                        password: "@password",
                        fullName: "@fullName"
                    }
                ).save(userData);
            },
            logout: function () {
                delete sessionStorage['currentUser'];
            },
            getCurrentUser: function () {
                if (sessionStorage['currentUser']) {
                    return JSON.parse(sessionStorage['currentUser']);
                } else {
                    return undefined;
                }
            },
            isAnonymous: function () {
                return sessionStorage['currentUser'] == undefined;
            },
            isLoggedIn: function () {
                return sessionStorage['currentUser'] != undefined;
            },
            isNormalUser: function () {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (!currentUser.isAdmin);
            },
            isAdmin: function () {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (currentUser.isAdmin == true);
            },
            getAuthHeaders: function () {
                var result = {
                    'X-Parse-Application-Id': parseAppId,
                    'X-Parse-REST-API-Key': parseRestApiKey
                };
                if (sessionStorage['currentUser']) {
                    result['X-Parse-Session-Token'] = this.getCurrentUser()['sessionToken'];
                }
                console.debug(result);
                return result;
            }
            , setAuthHeaders: function () {
                var headers = this.getAuthHeaders();
                Object.keys(headers).forEach(function (key) {
                    $http.defaults.headers.common[key] = headers[key];
                });
            }
        }
    }
);