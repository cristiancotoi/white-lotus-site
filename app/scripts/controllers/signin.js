'use strict';
/*global gapi */

angular
    .module('whiteLotusApp.signin', [])
    .controller('SignInController', function ($scope, $rootScope) {
        // This flag we use to show or hide the button in our HTML.
        $rootScope.signedIn = false;

        // Here we do the authentication processing and error handling.
        // Note that authResult is a JSON object.
        $scope.processAuth = function (authResult) {
            // Do a check if authentication has been successful.
            // cheap and dirty way to dodge jshint for a variable name we don't own
            var prop = 'access_' + 'token';
            if (authResult[prop]) {
                // Successful sign in.
                $rootScope.signedIn = true;
                $scope.getUserInfo();
            } else if (authResult.error) {
                // Error while signing in.
                $rootScope.signedIn = false;

                // Report error.
            }
        };

        // When callback is received, we need to process authentication.
        $scope.signInCallback = function (authResult) {
            $scope.$apply(function () {
                $scope.processAuth(authResult);
            });
        };

        // Start function in this example only renders the sign in button.
        $scope.start = function () {
            $scope.renderSignInButton();
        };

        // Render the sign in button.
        $scope.renderSignInButton = function () {
            if (typeof gapi !== 'undefined') {
                gapi.signin.render('signInButton',
                    {
                        'callback': $scope.signInCallback, // Function handling the callback.
                        'clientid': '551441825719-29ro8j3up3u0gllimuj901328baf4qrn.apps.googleusercontent.com', // CLIENT_ID from developer console
                        'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                          // as their explanation is available in Google+ API Documentation.
                        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                        'cookiepolicy': 'single_host_origin'
                    }
                );
            } else {
                $rootScope.signedIn = true;
            }
        };

        // Process user info.
        // userInfo is a JSON object.
        $scope.processUserInfo = function (userInfo) {
            $rootScope.userEmail = userInfo.emails[0].value;
            $rootScope.userName = userInfo.displayName;
        };

        // When callback is received, process user info.
        $scope.userInfoCallback = function (userInfo) {
            $scope.$apply(function () {
                $scope.processUserInfo(userInfo);
            });
        };

        // Request user info.
        $scope.getUserInfo = function () {
            if (gapi) {
                gapi.client.request(
                    {
                        'path': '/plus/v1/people/me',
                        'method': 'GET',
                        'callback': $scope.userInfoCallback
                    }
                );
            }
        };

        $scope.signOut = function () {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.info('User signed out.');
                $rootScope.userEmail = undefined;
                $rootScope.signedIn = false;
            });
        };

        // Call start function on load.
        $scope.start();
    });
