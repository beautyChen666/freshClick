/**
 * Created by Administrator on 2017/4/5.
 */
appConttoller.controller('detailsOnLineController', function($scope,$http,Constant,$state,ApiService,$stateParams,$rootScope,$timeout,$ionicPopup,$ionicHistory){
    var userId=JSON.parse(localStorage.getItem("userInformation"))[0].userId;
        $scope.detailsOnLineNowDatas=[];  //初始化数据
        $scope.setLineDetailsDatas=[];
        $scope.state=1; //初始化 toggle状态为1 开启
        var showMeaningOrder={}; //弹框初始化
        $scope.routeDetailsList=[];
            if($stateParams.lineObj!=null){  //当点击单条路线进入详情 并初始化页面数据
                $scope.routeDistance=$stateParams.lineObj.routeDistance;
                $('#routeDistance').val($stateParams.lineObj.routeDistance);
                $scope.minAmount=$stateParams.lineObj.minAmount;
                $('#minAmount').val($stateParams.lineObj.minAmount);
                $scope.maxDistance=$stateParams.lineObj.maxDistance;
                $scope.routeId=$stateParams.lineObj.routeId;
                $scope.routeName=$stateParams.lineObj.routeName;
                $scope.addUserId=userId;
                $scope.detailsOnLineNowDatas=$stateParams.lineObj.routeDetailsList;
                if($stateParams.lineObj.routeStatus==='1'){
                    $scope.isOpen=true;
                    $scope.state=1;
                } //判断该路线是否启用？？新加线路初始化为开启
                else if($stateParams.lineObj.routeStatus==='0'){
                    $scope.isOpen=false;
                    $scope.state=0;
                }else {
                    $scope.isOpen=true;
                    $scope.state=0;
                }
            }else{  //或者是进入新添加路线
                $scope.routeDistance="";
                $scope.maxDistance="";
                $scope.minAmount="";
                $scope.routeId=$rootScope.LineRouteId;  //添加的时候 rputId=none
                $scope.routeName="";
                $scope.addUserId=userId;
                $scope.isOpen=true;
                $scope.state=1;
            };
        $scope.stateNow=function(a){   //状态按钮点击切换状态
            if(a==true){
                $scope.state=1;
            }else {$scope.state=0;}
        };
        $scope.ionicGoBack=function(){  //返回提示
                $rootScope.confirmPopup("提示","是否放弃本次修改",function(){$ionicHistory.goBack();$rootScope.detailsOnLineDatas=[];},function(){console.log('cancel')});
        };
        //Tabs的切换
        $scope.tabsToggle=true; //初始化tabs
        $scope.isActive=true; //初始化tabs
        $scope.showBaseDetailsUl=function(){  //点击tabs的切换
            $scope.tabsToggle=true;
        };
        $scope.showDistributionDetailsUl=function(){  // 这里进行判断 当第一次点的时候调用后台的接口 后面使用传值点击配送点信息
            $scope.tabsToggle=false;
        };
        $scope.patternFno=function(ev){  //输入必须为数字
            //var reg = new RegExp('/^d*(?:.d{0,2})?$/s');
            if(isNaN($('#routeDistance').val())){
                $rootScope.alertPop('请输入正确的位数');
            }
        }
        $scope.patternFn=function(ev){  //输入必须为数字
            //var reg = new RegExp("^[0-9]*$");
            if(isNaN($('#minAmount').val())){
                $rootScope.alertPop('请输入正确的位数');
            };
        }
        $scope.closeMeaningOrder=function(){  //点击关闭确认弹框 右上角的差
            showMeaningOrder.close();
        };
        $scope.showMeaningOrder = function(nowIndex) {   // 自定义  调顺序弹窗
            showMeaningOrder=$ionicPopup.show({
                templateUrl: 'meaningOrder.html',
                scope:$scope
            });
            $scope.sortNum=nowIndex+1;
            $scope.sortAddress=$scope.detailsOnLineNowDatas[nowIndex].allocationAddress;
            $scope.isMeaningOrder=function(){  //点击调训之后 点击确定按钮
                var nowIndexSort=$('#DPLinput').val();
                if(!isNaN(nowIndexSort)){
                    if(nowIndexSort<=0){
                        $rootScope.alertPop('亲，我们是从1开始排序的哦');
                        return false;
                    }else if(nowIndexSort>=$scope.detailsOnLineNowDatas.length){
                        nowIndexSort=$scope.detailsOnLineNowDatas.length;
                        $scope.nowLineDatas=$scope.detailsOnLineNowDatas.splice(nowIndex,1);//先剪切
                        $scope.detailsOnLineNowDatas.splice(nowIndexSort-1,0,$scope.nowLineDatas[0]); //再拼接
                    }else {
                        $scope.nowLineDatas=$scope.detailsOnLineNowDatas.splice(nowIndex,1);//先剪切
                        $scope.detailsOnLineNowDatas.splice(nowIndexSort-1,0,$scope.nowLineDatas[0]); //再拼接
                    }
                };
                showMeaningOrder.close();
            };
        };
        $scope.goAllDistributionsSites=function(){ //点击跳转到全部配送点页面
            $rootScope.fromWhere===1;
            angular.forEach($scope.detailsOnLineNowDatas,function(data,index,array){ //所有选中
                data.flag=true;
            });
            $rootScope.detailsOnLineDatas=$scope.detailsOnLineNowDatas;
            $state.go("allDistributionSites",{routeId:$scope.routeId},{reload:true});
        };
        $scope.submitLineDetails=function(){  // 最后提交数据
            if($scope.detailsOnLineNowDatas.length==0){
                $rootScope.alertPop("请选择配送点");
            }else if($("#routeName").val()===''){
                $rootScope.alertPop("配送路线不能为空");
            }else if($('#minAmount').val()===''){
                $rootScope.alertPop("送货下限不能为空");
            } else{
                ApiService.GetData("POST",Constant.System.Host+'/addRouteAndDetails',
                    {
                        routeName:$("#routeName").val(),
                        minAmount:$('#minAmount').val(),
                        routeDetailsList:JSON.stringify($scope.detailsOnLineNowDatas),
                        routeId:$scope.routeId,
                        storeId:$rootScope.nowStoreId,
                        routeStatus:$scope.state,
                        maxDistance:$("#routeDistance").val(),
                        addUserId:userId
                    }).then(function(res){
                    if(res.resultCode===0){
                        $state.go("lineManagement",{reload:true});
                        console.log($scope.detailsOnLineNowDatas);
                        $rootScope.detailsOnLineNowDatas=[];
                        $rootScope.fromWhere=0;
                    }else {$rootScope.alertPop(res.resultMsg)};
                })
            }
        };
    $scope.changeTheSitesDetails=function(){  //选择配送点信息之后  调回页面 默认在配送点信息tabs
        if($rootScope.fromWhere===0){  //从列表页面进入
            $scope.tabsToggle=true;
        }else if($rootScope.fromWhere===1){  //返回的时候
            $scope.tabsToggle=false;
            $scope.detailsOnLineNowDatas=$scope.detailsOnLineNowDatas; //数组不变
        }else if($rootScope.fromWhere===2){  //选了配送信息之后提交返回
            $scope.tabsToggle=false;
            $scope.detailsOnLineNowDatas=$rootScope.detailsOnLineDatas;
        }
    };
    $scope.$on('$stateChangeSuccess', $scope.changeTheSitesDetails);

    });


