/**
 * .
 */
angular.module('personApp.controllers',[]).controller('PersonListController',function($scope,$state,popupService,$window,Person){

    $scope.persons=Person.query();

    $scope.deletePerson=function(person){
        if(popupService.showPopup('Really delete this?')){
            person.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('PersonViewController',function($scope,$stateParams,Person){

    $scope.person=Person.get({id:$stateParams.id});

}).controller('PersonCreateController',function($scope,$state,$stateParams,Person){

    $scope.person=new Person();

    $scope.addPerson=function(){
        $scope.person.$save(function(){
            $state.go('persons');
        });
    }

}).controller('PersonEditController',function($scope,$state,$stateParams,Person){

    $scope.updatePerson=function(){
        $scope.person.$update(function(){
            $state.go('persons');
        });
    };

    $scope.loadPerson=function(){
        $scope.person=Person.get({id:$stateParams.id});
    };

    $scope.loadPerson();
});