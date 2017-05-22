/**
 * Created by beautyChen on 2017/3/30.
 */
appConttoller.controller('orderInformationController', function($scope,$http,Constant,$state,ApiService,$stateParams,$timeout,$ionicPopup,$rootScope){
        if($stateParams.iosSkipFlag) {   //判断是否是ios跳转
            cordova.exec(successExecResult, failExecResult, "RYPlugin", "afterH5Skip", []);
            function successExecResult(message){ }
            function failExecResult(message){ }
        }
    $scope.nowTeamBuyId=$stateParams.teambuyId;//传进来的参数
    $scope.nowStoreId=$stateParams.storeId;
    $scope.orderId=$stateParams.orderId;
    $scope.userId=$stateParams.userId;
    //alert($scope.userId);
    $scope.orderInformationDatas=[];//初始化页面数据
    $scope.bouncedNum=1;//初始化修改数量弹框 input数量
    $scope.bouncedName='';//初始化弹框商品名称
    $scope.setDatas= [];//装在提交数组
    $scope.wrapDatas=[];//用于存储外层用户名和订单号id
        var pageNo= 1,    //初始化页面 page为1
        whichChangeNum=0, //初始化 弹框改变的是哪个
        changeNum={},  //修改数量弹框
        showPopup={},  //确认发货弹框
        arrStatus=[];
    forDatas();
    $scope.allChooseState=0; //进入页面初始化全选可选
    $scope.OIchooseAll=function(){  //点击全选按钮进行全选的状态
        if($scope.allChooseState===0){ //全选中
            $('.productListCheck').prop("checked", true);
            $('.OISmallBtn').addClass('OISmallBtnUn');
            $scope.allChooseState=1;
        }else if($scope.allChooseState===1){ //取消全部选中
            $('.productListCheck').prop("checked", false);
            $('.OISmallBtn').removeClass('OISmallBtnUn');
            $scope.allChooseState=0;
        }
    };
    function forDatas(){  //获取数据
        ApiService.GetData("POST",Constant.System.Host+'/getOrderDetailsListByOrderId',{
            orderId:$scope.orderId,
            allocationId:$rootScope.nowReceivingId
        }).then(function(res){
            if(res.resultCode===0){
                $scope.wrapDatas=res.data;
                $scope.orderInformationDatas=res.data.orderDetailsVo;
                angular.forEach($scope.orderInformationDatas,function(data,index,array){
                    data.productRealityAmount=data.productPrice*data.productRealityQuantity*(1+data.rate)
                });
            }
            else {$rootScope.alertPop('请稍后重试')};
        });
        var contentH=parseFloat($('.orderInformation').height())-47+'px';//控制content的高度
        $('.orderInformation').css("height",contentH);
    };
    $scope.doRefresh=function(){  //下拉
        forDatas();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.isChecked=function(nowIndex,ev){     //复选框不选中时 按钮呈现灰色
        if($(ev.target).attr('checked')=="checked"){
            $(ev.target).removeAttr("checked");
            $('.OISmallBtn').eq(nowIndex).addClass('OISmallBtnUn');
        }else{
            $(ev.target).attr("checked","checked");
            $('.OISmallBtn').eq(nowIndex).removeClass('OISmallBtnUn');
        }
    };
    function changeCheckboxStyle(arr){  //根据checkbox的状态判断它的样式
        for(var i in arr){
            if(arr[i]==="3"||arr[i]==="4"){
                $('.goodsForSending').eq(i).text('已发货').addClass('goodsSended');
                $('.productListCheck').eq(i).addClass('unCheck').attr("disabled",true);
                $('.OISmallBtn').eq(i).addClass('OISmallBtnUn');
            }
        }
    };
    $scope.closeShowPopup=function(){  //点击关闭确认弹框
        showPopup.close();
    };
    $scope.showPopup = function() {   // 自定义  确认收货弹窗
        $scope.setDatas=[];//清空
        $('.productListCheck').each(function($index,obj){  //判断复选框是否选中
            if($(this).attr('disabled')!="true"){
                if($(this).attr('checked')==="checked") {
                    $scope.setDatas.push(
                        {
                            orderDetailId:$scope.orderInformationDatas[$index].orderDetailId,
                            productRealityQuantity:$scope.orderInformationDatas[$index].productRealityQuantity,
                            productRealityAmount:($scope.orderInformationDatas[$index].productRealityAmount).toFixed(2),
                            productPrice:$scope.orderInformationDatas[$index].productPrice,
                            productCategory:$scope.orderInformationDatas[$index].productCategory
                        }
                    );
                }
            }
        });
        if($scope.setDatas.length>0){
            showPopup=$ionicPopup.show({
                templateUrl: 'comfirmeGoods.html',
                scope:$scope
            });
            console.log($scope.setDatas);
        }else {$rootScope.alertPop('没有选中出货商品哦');}


    };
    $scope.closeChangeNum=function(){  //点击关闭修改数量弹框
        changeNum.close();
    }
    $scope.changeNum=function(nowIndex){  //修改数量弹框
        whichChangeNum=nowIndex;
        changeNum= $ionicPopup.show({
            templateUrl: 'changeNum.html',
            scope:$scope
        });
       $scope.bouncedName=$scope.orderInformationDatas[nowIndex].teambuyProduct.productName;
       $scope.bouncedNum=parseFloat($scope.orderInformationDatas[nowIndex].productRealityQuantity);
    }
    $scope.goChangeOrderNum=function(){    //确定修改数量
        if(!isNaN($("#nowOrderNum").val())){
            if($("#nowOrderNum").val()>0){
                $scope.orderInformationDatas[whichChangeNum].productRealityQuantity=$("#nowOrderNum").val();
                $scope.orderInformationDatas[whichChangeNum].productRealityAmount=$("#nowOrderNum").val()*$scope.orderInformationDatas[whichChangeNum].productPrice*($scope.orderInformationDatas[whichChangeNum].rate+1);
            }else {$rootScope.alertPop('输入需要大于0哦')};
        }else {$rootScope.alertPop('请输入数字')};
        changeNum.close();
    };
    $scope.finallySendGoods=function(){    //最终确认发货
            ApiService.GetData("POST",Constant.System.Host+'/takeDeliveryOrder',{
                orderId:$scope.orderId,
                orderDetailsIdList:JSON.stringify($scope.setDatas),
                sourceFlag:$rootScope.sourceFlag,
                userId:$scope.userId,
                realityReceivingId:$rootScope.nowReceivingId
            }).then(function(res){
                if(res.resultCode===0){
                    $("#changeShow").text("发货成功").css({"line-height":"50px","text-align":"center"});
                    $timeout(function () {
                        $state.go("receiptGoodsHome", {
                            teambuyId:$scope.nowTeamBuyId,
                            storeId:$scope.nowStoreId
                        });  // 点击确认收货去二维码收货页面
                        showPopup.close();//关闭弹框
                        $rootScope.nowReceivingId='';//初始化确认收货的配送点ID
                        $rootScope.sourceFlag=0;//初始化确认收货的来源是二维码扫描的
                    },1000);
                }else {
                    $rootScope.alertPop('请稍后重试');
                }
            });
    }
    $scope.$on('ngRepeatFinished',function(ngRepeatFinishedEvent) {     //下面是在table render完成后执行的js
        changeCheckboxStyle(arrStatus);
        $('.productListCheck').attr("checked", "checked");
    });

})
    .directive('onFinishRenderFilters',function($timeout){
    return {
        restrict: 'AEM',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
