/**
 * Created by zcr on 2017/4/19 0019.
 */
appConttoller.controller('newsCenterCtrl',  function ($rootScope, $scope, $state, $ionicHistory) {
    console.log("newsCenterCtrl");
    $scope.GoBack=function () {
        $ionicHistory.goBack();
    }
    $scope.privateMesg=function () {
        $state.go("msgToOther");
    }
    $scope.toComments=function () {
        $state.go("manageCustomerCom");
    }
    // $scope.ordersMesg=function () {
    //     $state.go("ordersMesg");
    // }
});
