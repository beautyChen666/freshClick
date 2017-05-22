/**
 * Created by Administrator on 2017-03-23.
 */
appConttoller.controller('shopHomeCtrl', function($scope,$http,Constant,$state,ApiService,$stateParams,$rootScope){
    var thisStorId=$stateParams.thisStorId;
    $rootScope.nowStoreId=$stateParams.thisStorId
    function getShopDetail(storeId) {
        ApiService.GetData("POST", Constant.System.Host + '/storeHomePage', {
            storeId:storeId,
            timeStamp:new Date()
        }).then(function (res) {
            if(res.resultCode==0){
                $scope.thisStore=res.data[0];
                if($scope.thisStore.privatLetterAmount>0){
                    $(".onlyChat").children("a").removeClass("noMassage").addClass("haveMassage");
                }
            }else{
                $rootScope.alertPop(res.resultMsg);
            }
        });
    }
    getShopDetail(thisStorId);
    $scope.back=function () {
        $state.go("myShop");
        $rootScope.$broadcast('refreshMyShop');
    }

    $scope.goAddPro=function(){
        $state.go("addProducts");
    };

    $scope.goManagePro=function(){
        $state.go("manageProducts",{reload:true});
    };
    $scope.toManageOrder=function(){
        $state.go("manageOrder");
    };
    $scope.toOpenTeambuyOrder=function(){
        $rootScope.nowOpenOrderAddGoods=[]; //每次进去的时候重置选取商品数据
        $rootScope.goOpenTeambuyOrderSending=[];// 每次进去的时候重置路线数据
        $state.go("openTeambuyOrder",{"thisStorId":thisStorId});
    };
    $scope.chatsLine=function(){
        $(".onlyChat").children("a").removeClass("haveMassage").addClass("noMassage");
        $state.go("newsCenter");//msgToOther
    };
    $scope.goChangeStoreInfo=function(){  //更新修改店铺信息
        $state.go("OpenShop",{"thisStoreInfo":1});
        $rootScope.$broadcast('getShopDet');
    }
    $scope.goDistribution=function(){ //路线管理
        $rootScope.detailsOnLineDatas=[];
        $rootScope.fromWhere=0;
        $state.go('lineManagement',{reload:true});
    }
    //实时更新店铺消息
    $rootScope.$on("refreshShopDetl",function () {
        getShopDetail(thisStorId);
    })

});


