/**
 * Created by Administrator on 2017-03-21.
 */
appConttoller.controller('myShopCtrl', function($scope,$rootScope,$http,Constant,$state,$ionicSideMenuDelegate,$ionicScrollDelegate,ApiService,$timeout,$ionicHistory) {
    var userData=JSON.parse(localStorage.getItem("userInformation")),
        userId=userData[0].userId,
        userNickname=userData[0].nickname;
    $scope.userNikname=userNickname;
    $scope.myShops=[];
    $rootScope.sendToShopChangeWhat='';  //不保留之前验证的邮箱或者电话的数据
    var pageNo=1;
        loadShops();
    $scope.initSrc=Constant.System.ResourceImageHost+userData[0].userImgUrl;
    function loadShops(){
        ApiService.GetData("POST", Constant.System.Host + '/getStoreList', {
            pageNo: pageNo,
            userId: userId,
            timeStamp:new Date()
        }).then(function (res) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (res.resultCode == 0) {
                $scope.allPage=res.data[0].allPage;
                if($scope.allPage>pageNo){
                    $scope.moreDataCanBeLoaded = true;
                }else{
                    $scope.moreDataCanBeLoaded=false;
                }
                $scope.myShops=$scope.myShops.concat(res.data[0].obj);

            } else {
                $rootScope.alertPop(res.resultMsg);
            }
        });
    }
    //默认加载登录用户的店铺数据

    $scope.openShop=function(){
        $rootScope.storeStatue=2;//初始开店负责人状态
        $state.go('OpenShop',{});
    }
    $scope.toSetUp=function () {
        $state.go("setUp");
    }
    $scope.moreDataCanBeLoaded=true;
    //模拟数据

    //上拉加载
    $scope.loadMoreShop=function(){
        pageNo++;
        if(pageNo<=$scope.allPage){
            loadShops();
        }else{
            $scope.moreDataCanBeLoaded=false;
        }
    };  //下拉刷新
    $scope.doRefresh=function(){
        pageNo=1;
        $scope.moreDataCanBeLoaded=false;
        $scope.myShops=[];
        $timeout(function () {
            loadShops();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    $scope.$on('stateChangeSuccess', function() {
        $scope.loadMoreShop();
    });

   //进入店铺主页
    $scope.goThisShopHome=function(){
        var thisStorId=this.myShop.storeId;
        $state.go("shopHome", {"thisStorId":thisStorId},{reload:true});
    }
    $scope.goOnesInfo=function(){
        $ionicHistory.clearCache();
        $state.go("imInformation1",{"fromWhere":"fromOnesInfo"},{ reload: true});
    }
    //退出登录
    $scope.logOut=function(){
        ApiService.GetData("POST", Constant.System.Host + '/logOut', {

        }).then(function (res) {
            if(res.resultCode==0){
            }else{
                $rootScope.alertPop(res.resultMsg);
            }
        });
        localStorage.removeItem("userInformation");
        console.log($ionicSideMenuDelegate.$getByHandle("isSideOpen").isOpen());
        if($ionicSideMenuDelegate.$getByHandle("isSideOpen").isOpen()){
            $ionicSideMenuDelegate.$getByHandle("isSideOpen").toggleLeft(false);
        }
    }

    $rootScope.$on("refresh",function () {
        userData=JSON.parse(localStorage.getItem("userInformation")),
        userId=userData[0].userId,
        userNickname=userData[0].nickname;
    })

    $rootScope.$on("refreshMyShop",function () {
        pageNo=1;
        $scope.myShops=[];
        loadShops();
    })
});