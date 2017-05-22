/**
 * Created by beautyChen on 2017/3/30.
 */
appConttoller.controller('handDeliverGoodsController', function($scope,$http,Constant,$state,ApiService,$timeout,$stateParams,$rootScope){
    if($stateParams.iosSkipFlag) {  //判断是否是ios跳转
        cordova.exec(successExecResult, failExecResult, "RYPlugin", "afterH5Skip", []);
        function successExecResult(message){ }
        function failExecResult(message){ }
    }
    $scope.handDeliverGoodsDatas=[];   //初始化页面数据
    $scope.nowTeamBuyId=$stateParams.teambuyId;
    $scope.nowStoreId=$stateParams.storeId;
    var pageNo= 1,//初始化页面 page为1
        pageNum=0;
    forDatas();//初始化页面数据 调用函数
    function forDatas(){  //获取数据 以及分页获取
        ApiService.GetData("POST",Constant.System.Host+'/getDeliverGoodsList',{
            storeId:$scope.nowStoreId,
            pageNo:pageNo,
            teambuyId:$scope.nowTeamBuyId
        }).then(function(res){
            console.log(res.data.obj);
            if(res.resultCode===0){
                pageNum=res.data.allPage;
                if(pageNo<=res.data.allPage){
                    $scope.handDeliverGoodsDatas=$scope.handDeliverGoodsDatas.concat(res.data.obj);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }else{
                    $scope.moredata=false;
                    $rootScope.alertPop('没有更多数据咯');
                }
            }else {$rootScope.alertPop('您还没有发货历史哦');}
        });
    };
    $scope.doRefresh=function(){  //下拉刷新
        $scope.handDeliverGoodsDatas=[];
        pageNo=1;//初始化页面 page为1
        forDatas();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.loadMore=function(){       //下上拉加载更多
        pageNo++;
        if(pageNo<pageNum){
            $scope.moredata=true;
            forDatas();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }else if(pageNo===pageNum){
            $scope.moredata=false;
            forDatas();
        }

    };

    $scope.goOrderInformation=function(nowIndex){   //点击确认收货 跳转到收货信息页面 并且进行传参数 用户名和订单号
        var orderId=$scope.handDeliverGoodsDatas[nowIndex].orderId;
        var userId=$scope.handDeliverGoodsDatas[nowIndex].customerInfo.userId;
        $state.go("orderInformation",{teambuyId:$scope.nowTeamBuyId,storeId:$scope.nowStoreId,orderId:orderId,userId:userId});
    };
    $scope.goSearchOrders=function(){ //搜索框搜索
        ApiService.GetData("POST",Constant.System.Host+'/selectDeliverGoods',{
                storeId:$scope.nowStoreId,
                orderId:$('#search').val()
        }).then(function(res){
            if(res.resultCode===0){
                $scope.handDeliverGoodsDatas=res.data;
            }else if(res.resultCode===5){
                //$scope.handDeliverGoodsDatas=[];
            }
        })
    };
});
