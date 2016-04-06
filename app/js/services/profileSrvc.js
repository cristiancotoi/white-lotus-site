'use strict';

app.factory('profileSrvc',
  function ($http, $resource, baseSrvcUrl, authSrvc) {
    authSrvc.setAuthHeaders();
    return {
      get: function(objectId) {
          return $resource(baseSrvcUrl + '1/users' + ((objectId) ? '/'+objectId : '')).get();
      }
      , update: function(objectId, profileData) {
          return $resource(baseSrvcUrl + '1/users/' + objectId, {
            username:"@username"
            , password:"@password"
            , fullName:"@fullName"
        }, {
          update: {
            method: 'PUT'
          }
        }).update(profileData);
      }
    }
  }
);