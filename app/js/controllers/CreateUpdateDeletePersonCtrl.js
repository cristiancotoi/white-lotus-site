'use strict';

// The CreateUpdateDeletePhoneCtrl holds the presentation logic for the Add and Edit and Delete Phone screen
app.controller('CreateUpdateDeletePhoneCtrl',
  function ($scope, $rootScope, $routeParams, $location, phoneSrvc, notifySrvc, authSrvc) {
    $scope.isAdd = $location.$$path.indexOf('add') != -1;
    $scope.isDelete = $location.$$path.indexOf('delete') != -1;
    if ($scope.isAdd) {
      $rootScope.pageTitle = "Add Phone"
      $scope.subTitle = $rootScope.pageTitle;
      $scope.phoneData = {};

      $scope.add = function(phoneData) {
        phoneData.ACL = { };
        phoneData.ACL[authSrvc.getCurrentUser().objectId] = { write:true, read:true };
        phoneSrvc.add(phoneData)
        .$promise
        .then(function (data) {
          notifySrvc.showInfo("Add Phone successful!");
          $location.path("/persons");
        }, function (err) {
          notifySrvc.showError("Add Phone failed", err);
        });
      };
    } else if(!$scope.isDelete) {
      $rootScope.pageTitle = "Edit Phone"
      $scope.subTitle = $rootScope.pageTitle;
      phoneSrvc.get($routeParams.objectId)
      .$promise
      .then(function (data) {
        $scope.phoneData = data;
      }, function (err) {
        notifySrvc.showError("Get Phone failed", err);
        $location.path("/persons");
      });
      $scope.edit = function(phoneData) {
        phoneSrvc.edit($routeParams.objectId, phoneData)
        .$promise
        .then(function (data) {
          notifySrvc.showInfo("Edit Phone successful!");
          $location.path("/persons");
        }, function (err) {
          notifySrvc.showError("Edit Phone failed", err);
        });
      };
    } else {
      $rootScope.pageTitle = "Delete Phone"
      $scope.subTitle = "Confirm " + $rootScope.pageTitle + "?";
      phoneSrvc.get($routeParams.objectId)
      .$promise
      .then(function (data) {
        $scope.phoneData = data;
      }, function (err) {
        notifySrvc.showError("Get Phone failed", err);
        $location.path("/persons");
      });
      $scope.delete = function() {
        phoneSrvc.delete($routeParams.objectId)
        .$promise
        .then(function (data) {
          notifySrvc.showInfo("Delete Phone successful!");
          $location.path("/persons");
        }, function (err) {
          notifySrvc.showError("Delete Phone failed", err);
        });
      };
    }
  }
);