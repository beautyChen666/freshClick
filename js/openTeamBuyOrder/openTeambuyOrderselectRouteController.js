/**
 * Created by Administrator on 2017-03-21.
 */
appConttoller.controller('openTeambuyOrderselectRouteController', function($timeout,$scope,$http,Constant,$rootScope,$state,$stateParams,$ionicNavBarDelegate,ApiService,$ionicHistory) {
    $scope.radioActive=false;    // /单选selecton
    $scope.openTeambuyOrderselectRouteDatas=[];
    $scope.nowStoreId=$rootScope.nowStoreId;
    var pageNo=1,//初始化页面 page为1
        nowWhoSelect=0;
    forDatas();
    $scope.goRadioActive=function(ev,nowIndex){  //选中当前的radio
        if($(ev.target).prop('checked')===true){
            nowWhoSelect=nowIndex;
            $(".ion-checkmark").css("visibility","hidden");
            $(".ion-checkmark").eq(nowIndex).css("visibility","visible");
        }else {
            $(".ion-checkmark").css("visibility","hidden");
        }
    };
    $scope.goTeamBuySendLine=function(){  //点击确定 携带值返回之前页面
        $rootScope.goOpenTeambuyOrderSending=[]; //先清空
        $rootScope.goOpenTeambuyOrderSending.push($scope.openTeambuyOrderselectRouteDatas[nowWhoSelect]);
        $rootScope.$broadcast('refreshOpenOrderRoute');
        $ionicHistory.goBack();
    };

    function forDatas(){  //获取数据 以及分页获取
        ApiService.GetData("POST",Constant.System.Host+'/getRouteInformation',{
            storeId:$scope.nowStoreId,
            pageSize:4,
            flag:0,
            pageNo:pageNo
        }).then(function(res){
            if(res.resultCode===0){
                if(pageNo<=res.data.allPage){
                    $scope.moredatas=true;
                    $scope.openTeambuyOrderselectRouteDatas=$scope.openTeambuyOrderselectRouteDatas.concat(res.data.obj);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }else{
                    $scope.moredatas=false;
                    return;
                }
            }
            else { $rootScope.alertPop(res.resultMsg);}
        });
    };
    $scope.doRefresh = function () {    //do something
        pageNo=1;
        $scope.openTeambuyOrderselectRouteDatas=[];
        forDatas();
        $scope.$broadcast('scroll.refreshComplete');
    };
   $scope.loadMores=function(){       //上拉加载数据
       pageNo++;
       $timeout(function (){
            forDatas();
        },1000);
    };
    $scope.goSearchOrders=function(){ //搜索框搜索
        ApiService.GetData("POST",Constant.System.Host+'/selectStoreRoute',{
            storeId:$scope.nowStoreId,
            routeName:$('#searchAllSites').val(),
        }).then(function(res){
            if(res.resultCode===0){
                $scope.openTeambuyOrderselectRouteDatas=res.data;
            }else if(res.resultCode===5){
                $scope.openTeambuyOrderselectRouteDatas=[];
            }
        })
    };

});