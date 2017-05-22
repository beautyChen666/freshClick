/**
 * Created by cj on 2017/4/5.
 */
appConttoller.controller('lineManagementController', function($scope,$http,Constant,$state,ApiService,$stateParams,$timeout,$rootScope){
    $scope.lineManagementDatas=[];  //初始化数据
    $scope.nowStoreId=$rootScope.nowStoreId;
    $rootScope.fromWhere=0; //不需要改变判断条件
    $scope.nowPage=0;//总共后台给的数据页面
    var  nowActive='true',
         pageNo=1;//初始化页面 page为1
    forDatas();
    $scope.doRefresh=function(){    /*下拉刷新*/
        $scope.lineManagementDatas=[];
        ApiService.GetData("POST",Constant.System.Host+'/getRouteInformation',{
            pageSize:2,
            storeId:$scope.nowStoreId,
            flag:1,
            pageNo:1
        }).then(function(res){
            if(res.resultCode===0){
                $scope.lineManagementDatas=res.data.obj;
            }else {$rootScope.alertPop('请稍后重试')};
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
    function forDatas(){  //获取数据  以及分页获取
        ApiService.GetData("POST",Constant.System.Host+'/getRouteInformation',{
            pageSize:2,
            storeId:$scope.nowStoreId,
            flag:1,
            pageNo:pageNo
        }).then(function(res){
            if(res.resultCode===0){
                if(pageNo<res.data.allPage){ //页数小于后台返回的数据页数
                    $scope.nowPage=res.data.allPage;
                    $scope.moredataLineManagement=true;
                    $scope.lineManagementDatas=$scope.lineManagementDatas.concat(res.data.obj);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }else if(pageNo===res.data.allPage){ //页数=后台返回的数据页数
                    $scope.moredataLineManagement=false;
                    $scope.lineManagementDatas=$scope.lineManagementDatas.concat(res.data.obj);
                }else if(res.data.allAmount>0&&res.data.obj.length===0){ //页数>后台返回的数据页数
                    $rootScope.alertPop('没有更多数据咯');
                    $scope.moredataLineManagement=false;
                }else {
                    $scope.moredataLineManagement=false;
                    $rootScope.alertPop('你还没有配置路线哦');
                }
            }else{$rootScope.alertPop('请稍后重试');
          };
        });
    };
    $scope.loadMore=function(){       //上拉加载更多
        pageNo++;
        $timeout(function (){
            forDatas();
        },1000);
    };
    $scope.lMgoDetails=function(nowIndex){   //点击路线详情 并且传值 当前路线
        $state.go("detailsOnLine",{lineObj:$scope.lineManagementDatas[nowIndex]});
    };
    $scope.addNewLine=function(){ //点击添加写的路线
        $rootScope.LineRouteId='none';
        $state.go("detailsOnLine");
    };
}).filter("filterState",function(){
    return function(item){
        if(item==="0"){
            item= "禁用";
            return item;
        }else if(item==="1"){
            item= "启用";
            return item;
        }
    };
});


