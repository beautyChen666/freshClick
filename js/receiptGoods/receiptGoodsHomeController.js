/**
 * Created by beautyChern on 2017/3/29.
 */
appConttoller.controller('receiptGoodsHomeController', function($scope,$http,Constant,$state,ApiService,$stateParams,$rootScope){
    $scope.teambuyId=$stateParams.teambuyId;
    $scope.storeId=$stateParams.storeId;
    $scope.handDeliverGoods=function(){  //手动发货
            $rootScope.sourceFlag=1;//初始化确认收货的来源是手动发货确认的
            $state.go("handDeliverGoods",{teambuyId:$scope.teambuyId,storeId:$scope.storeId});
    };
    $scope.deliveryRecords=function(){    //发货履历
        $state.go("deliveryRecords",{teambuyId:$scope.teambuyId,storeId:$scope.storeId});
    };
 //
    //   $state.go('orderInformation');

});