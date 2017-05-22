/**
 * Created by Administrator on 2017-04-07.
 */
appConttoller.controller('manageCustomerCtrl', function ($scope, $http, Constant, $state, ApiService, $timeout,$rootScope,$stateParams) {
    var thisStorId = $rootScope.nowStoreId;
    $scope.toMsgOth=function(){
        $state.go("msgToOther");
    }
    $scope.toCustomerCom=function(){
        $state.go("manageCustomerCom");
    }


 })