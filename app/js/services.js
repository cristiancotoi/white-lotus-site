/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('personApp.services',[]).factory('Person',function($resource){
    //return $resource('http://personapp-13434.onmodulus.net/api/persons/:id',{id:'@_id'},{
    //return $resource('http://personapp-sitepointdemos.rhcloud.com/api/persons/:id',{id:'@_id'},{
    return $resource('http://localhost:8000/api/persons/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});