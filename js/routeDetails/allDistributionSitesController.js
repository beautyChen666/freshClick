/**
 * Created by Administrator on 2017/4/6.
 */
appConttoller.controller('allDistributionSitesController', function($scope,$http,Constant,$state,$stateParams,ApiService,$rootScope,$timeout,$ionicHistory) {
    $rootScope.fromWhere=1; //不需要改变判断条件
    $scope.allDistributionSitesDatas=[];
    var arrChange=[];
    $scope.nowSearchOrders="";
    var state=0;// 进入页面的时候 全选按钮不选中
    forDatas();//初始化页面数据 调用函数
    $scope.ionicGoBack=function(){  //返回
        $rootScope.fromWhere=1; //不需要改变判断条件
        $rootScope.detailsOnLineDatas=[];  //数组不变
        $scope.allDistributionSitesDatas=[];
        arrChange=[];
        $ionicHistory.goBack();
    };
    $scope.OIchooseAll=function(){  //点击全选按钮进行全选的状态
        if(state===0){
            angular.forEach($scope.allDistributionSitesDatas,function(data,index,array){ //所有选中
                data.flag=true;
            });
            arrChange=$scope.allDistributionSitesDatas;  //现在我的选中数组存数为所以数据
            state=1;
        }else if(state===1){
            angular.forEach($scope.allDistributionSitesDatas,function(data,index,array){ //所有不选中
                data.flag=false;
            });
            arrChange=[];
            state=0;
        }
    };
    $scope.cancelAll=function(){
        $scope.nowSearchOrders='';
    };
    function forDatas(){  //获取数据 初始化页面数据
        ApiService.GetData("POST",Constant.System.Host+'/getAllDestination',{
        }).then(function(res){
            if(res.resultCode===0){
                    $scope.allDistributionSitesDatas=$rootScope.detailsOnLineDatas.concat(res.data);  //得到并拼接
            }
            else {$rootScope.alertPop(res.resultMsg)};
        });
    };
    $scope.doRefresh=function(){   //下拉刷新
        $scope.allDistributionSitesDatas=[];
        $timeout(function (){
            forDatas();
        },1000);
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.allSitesCheck=function(dataNow){  //复选框点击逆函数 选中或者删除
        if(dataNow.flag===true){
            dataNow.flag=false;
        }else if(dataNow.flag===false){
            dataNow.flag=true;
        };
    };
    $scope.submitAllLineSites=function(){  // 全部配送点信息 勾选之后点击跳转
        $rootScope.fromWhere=2; //需要改变判断条件
        angular.forEach($scope.allDistributionSitesDatas,function(data,index,array){  //提交遍历数组flag为true 提交确认
            if(data.flag===true){
                arrChange.push(data);
            };
            $rootScope.detailsOnLineDatas=arrChange;
        });
        $ionicHistory.goBack();
        arrChange=[];
        $scope.allDistributionSitesDatas=[];
    };
    $scope.$on('ngRepeatFinished',function(ngRepeatFinishedEvent){     //渲染完成之后 对比两组数据 改变状态和位置
        console.log(0);
        var hash = {};
        $scope.allDistributionSitesDatas = $scope.allDistributionSitesDatas.reduce(function(item, next) { //去重之后重新给页面数据赋值
            hash[next.allocationId] ? '' : hash[next.allocationId] = true && item.push(next);
            return item;
        }, []);
        $rootScope.detailsOnLineDatas=[]; //清0全局数组
    });
}) .directive('onFinishRenderFilters',function($timeout){
    return {
        restrict: 'AEMC',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
}).filter("filterSearch",function(){  //搜索
    return function(items,nowSearchOrders){
        if(!nowSearchOrders){
            return items;
        };
        var arr=[];
        for(var i=0;i<items.length;i++){
            if(items[i].allocationName.indexOf(nowSearchOrders)>=0){
                    arr.push(items[i]);
            }
        };
        return arr;
    };

});

