/**
 * Created by Administrator on 2017/3/27.
 */
appConttoller.controller('distributionRouteController', function($scope,$http,Constant,$state,$rootScope,ApiService,$timeout,$ionicScrollDelegate){
     $scope.showWaitingDistributionsDatas= [];
     $scope.thisStorId=$rootScope.nowStoreId;
    var pageNo= 1, //初始化页面 page为1
        allPage= 0,//数据总数
        nowTab='0';  //初始化页面 展示为未配送的数据
    $scope.isSelected=false;
    $scope.routeState='未配送';  //初始化页面展示的是未配送的数据
    $scope.doRefresh=function(){  /*上拉刷新*/
        $scope.showWaitingDistributionsDatas=[];
        pageNo= 1;
        forDatas();
        $scope.$broadcast('scroll.refreshComplete');
    };
    forDatas();  //参数2 为当前的是为配送
    function forDatas(){
        ApiService.GetData("POST",Constant.System.Host+'/selectDistributionTeambuyOrder',{
            storeId:$scope.thisStorId,
            selectStatus:nowTab,
            pageNo:pageNo
        }).then(function(res){
            if(res.resultCode===0){
                allPage = res.data.allPage;
                if(pageNo<res.data.allPage&&res.data.allAmount>0){
                    $scope.moredata=true;
                    $scope.showWaitingDistributionsDatas= $scope.showWaitingDistributionsDatas.concat(res.data.obj);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }else if(pageNo==res.data.allPage&&res.data.allAmount>0){
                    $scope.moredata=false;
                    $scope.showWaitingDistributionsDatas= $scope.showWaitingDistributionsDatas.concat(res.data.obj);
                }else if(pageNo>res.data.allPage&&res.data.allAmount>0){
                    $scope.moredata=false;
                    $rootScope.alertPop('数据加载啦');
                }else if(res.data.allAmount==0){
                    $rootScope.alertPop('暂时没有更多数据哟');
                }
            }else {$rootScope.alertPop('请稍后重试');};
        });
    };
    $scope.loadMore=function(){       //上拉加载
        pageNo++;
        if(pageNo<=res.data.allPage){
            forDatas();
        }else {$scope.moredata=false;}
    };

    $scope.showWaitingDistributions=function(){ //点击tabs切换成等待配送的.等待配送
        $('.waitingDisFt').eq(0).addClass('disActive');
        $('.waitingDisFt').eq(1).removeClass('disActive');
        $scope.showWaitingDistributionsDatas= [];
        $scope.routeState='未配送';
        nowTab='0';
        pageNo=1;
        $ionicScrollDelegate.scrollTop();
        $scope.isSelected=false;
        forDatas();
    };
    $scope.showOverDistributions=function(){ //点击tabs切换成配送完成的
        $('.waitingDisFt').eq(1).addClass('disActive');
        $('.waitingDisFt').eq(0).removeClass('disActive');
        $scope.showWaitingDistributionsDatas= [];
        $scope.routeState='已配送';
        nowTab='1';
        pageNo=1;
        $ionicScrollDelegate.scrollTop();
        $scope.isSelected=true;
        forDatas();
    };
    $scope.goSingleDis=function($index){
        if(nowTab==='0'){   //把现在正在配送的团购单记录起来  后面可展示此团购单的发货履历
            $rootScope.nowReceivingId='';//初始化确认收货的配送点ID
            $rootScope.sourceFlag=0;//初始化确认收货的来源是二维码扫描的
            $state.go("singleDistribution",{singleDisId:$scope.showWaitingDistributionsDatas[$index]});
        }else {
            $rootScope.alertPop("此路线为已配送");
        };
    };
});