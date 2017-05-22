/**
 * Created by Administrator on 2017-04-06.
 */
appConttoller.controller('goMoreOrderCtrl', function ($scope, $http, Constant, $state, ApiService, $timeout,$rootScope,$stateParams) {
    var thisStorId = $rootScope.nowStoreId,
        thisTeambuyId = $rootScope.thisTeambuyId,
        thisproductId = $stateParams.thisProductId;
    $scope.moreDataCanBeLoaded = true;
    $scope.productTeambuyOrders=[];
    var pageNo=1;
    loadOrders();
    function loadOrders(){
        ApiService.GetData("POST", Constant.System.Host + '/getOrderProductDetail', {
            storeId: thisStorId,
            teambuyId:thisTeambuyId ,
            productId:thisproductId,
            pageNo:pageNo,
            pageSize:7
        }).then(function (res) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (res.resultCode == 0) {
                $scope.allPage=res.data.allPage;
                if($scope.allPage>pageNo){
                    $scope.moreDataCanBeLoaded = true;
                }else{
                    $scope.moreDataCanBeLoaded=false;
                }
                $scope.allAmount=res.data.allAmount;
                $scope.productTeambuyOrders= $scope.productTeambuyOrders.concat(res.data.obj);
            }else{
                //alert(res.resultMsg);
            }
        })
    }

    $scope.loadMorePOrder=function(){
        pageNo++;
        if (pageNo <= $scope.allPage) {
            loadOrders();
        } else {
            $scope.moreDataCanBeLoaded = false;
        }
    }
    //下拉刷新
    $scope.doRefresh=function(){
        $timeout(function () {
            $scope.$broadcast
            ('scroll.refreshComplete');
        }, 1000);
    }
    $scope.$on('stateChangeSuccess', function() {
        $scope.loadMorePOrder();
    });
})