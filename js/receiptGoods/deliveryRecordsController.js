/**
 * Created by beautyChen on 2017/3/30.
 */
appConttoller.controller('deliveryRecordsController', function($scope,$rootScope,$timeout,$http,Constant,$state,ApiService,$stateParams){
    if($stateParams.iosSkipFlag) {   //判断是否是ios跳转
        cordova.exec(successExecResult, failExecResult, "RYPlugin", "afterH5Skip", []);
        function successExecResult(message){ }
        function failExecResult(message){ }
    }
    $scope.deliveryRecordsDatas=[]; //初始化页面数据
    $scope.nowTeamBuyId=$stateParams.teambuyId;
    $scope.nowStoreId=$stateParams.storeId;
    $scope.moredata=false;
    var pageNo=1;//初始化页面 page为1
    forDatas();//初始化页面数据 调用函数
    function forDatas(){  //获取数据 以及分页获取
        ApiService.GetData("POST",Constant.System.Host+'/getShopResume',{
            storeId:$scope.nowStoreId,
            pageNo:pageNo,
            teambuyId:$scope.nowTeamBuyId
        }).then(function(res){
            if(res.resultCode===0){
                if(pageNo<res.data.allPage){
                    $scope.moredata=true;
                    $scope.deliveryRecordsDatas=$scope.deliveryRecordsDatas.concat(res.data.obj);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }else if(pageNo===res.data.allPage){
                    $scope.moredata=false;
                    $scope.deliveryRecordsDatas=$scope.deliveryRecordsDatas.concat(res.data.obj);
                }else if(res.data.allAmount>0&&res.data.obj.length===0){
                    $rootScope.alertPop('没有更多数据咯');
                    $scope.moredata=false;
                }else{
                    $scope.moredata=false;
                    $rootScope.alertPop('您还没有发货历史哦');
                }
            }else{
                $rootScope.alertPop('请稍后重试');
                $scope.moredata=false;
            };
        });
    };
    $scope.doRefresh=function(){  //下拉刷新
        pageNo=1;//初始化页面 page为1
        $scope.deliveryRecordsDatas=[];
        forDatas();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.loadMore=function(){       //上拉加载更多
        pageNo++;
        forDatas();
    }
});