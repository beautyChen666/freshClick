/**
 * Created by Administrator on 2017/3/27.
 */
appConttoller.controller('singleDistributionController', ['$scope', '$stateParams', '$http', 'Constant', '$state', 'ApiService', '$rootScope', function ($scope, $stateParams, $http, Constant, $state, ApiService, $rootScope) {
    $scope.nowSingleRoute = $stateParams.singleDisId; //传入的团购单数据
    $scope.singleRouteDatas = []; //初始化当前页面便利数据
    $scope.bigBtnFt = '开始配送'; //开始配送默认是开始配送
    $scope.issingleDisplay = true;  //开始配送大按钮 默认是可点绿色
    var bigBtnState = 1;  //开始配送大按钮状态为1的时候是开始配送,2 是确认收货，3是完成配送
    var arrStatus = [];//装进数组
    forSingleDatas();//进入页面初始化页面数据

    $scope.doRefresh = function () {   // 下拉刷新页面重新获取数据
        forSingleDatas();//调用函数
        $scope.$broadcast('scroll.refreshComplete');
    };
    function forSingleDatas() {  //进入页面初始化单条路线
        console.log($scope.nowSingleRoute.routeId, $scope.nowSingleRoute.teambuyId, $scope.nowSingleRoute.storeId);
        ApiService.GetData("POST", Constant.System.Host + '/selectByRouteId', {
            routeId: $scope.nowSingleRoute.routeId,
            teambuyId: $scope.nowSingleRoute.teambuyId,
            storeId: $scope.nowSingleRoute.storeId
        }).then(function (res) {
            if (res.resultCode == 0) {      //已解析
                $scope.singleRouteDatas = res.data;
                setTimeout(function () {
                    for (var i in res.data) {
                        arrStatus[i] = res.data[i].allocationStatus;
                    }
                    console.log(arrStatus);
                    forMap(arrStatus);
                }, 200);
            } else {
                $rootScope.alertPop(res.resultMsg);
            }
        });
    };

    $scope.singleGoDis = function () {  // 进入页面点击了大按钮
        if ($scope.issingleDisplay === true) {
            if (bigBtnState === 1) {    //开始配送
                $scope.bigBtnFt = '配送中';
                ApiService.GetData("POST", Constant.System.Host + '/startDistribution', { //大按钮初始化状态数据
                    teambuyId: $scope.nowSingleRoute.teambuyId
                }).then(function (res) {
                    if (res.resultCode == 0) {
                        arrStatus=res.data[0];
                        console.log(arrStatus);
                        forMap(arrStatus);
                    } else {
                        $rootScope.alertPop(res.resultMsg);
                    }
                });
            } else if (bigBtnState === 2) {  //ios跳转扫二维码2
                //cordova.exec(successExecResult, failExecResult, "RYPlugin", "scan", [{page:"1",teambuyId:$scope.nowSingleRoute.teambuyId,storeId:$scope.nowSingleRoute.storeId}]);
                //function successExecResult(resultArray){
                //    if(resultArray[0]=="0") { //扫码成功
                //        //console.log(resultArray[resultArray.length])  需要接受的元素
                //        $state.go('orderInformation', {iosSkipFlag:true});
                //    }
                //    else if(resultArray[0]=="1") {  // 发货履历
                //        $rootScope.sourceFlag=0;//初始化确认收货的来源是扫二维码收货确认的
                //        $rootScope.nowReceivingId='';//初始化确认收货的配送点ID
                //        $state.go("deliveryRecords",{teambuyId:$scope.teambuyId, storeId:$scope.storeId, iosSkipFlag:true});
                //    }
                //    else if(resultArray[0]=="2") {  //手动发货
                //        $rootScope.sourceFlag=1;//初始化确认收货的来源是手动发货确认的
                //        $state.go("handDeliverGoods",{teambuyId:$scope.teambuyId, storeId:$scope.storeId, iosSkipFlag:true});
                //    }
                //};
                //function failExecResult(message){
                //    alert("验证失败："+message);
                //}
                $state.go("receiptGoodsHome", {
                    teambuyId: $scope.nowSingleRoute.teambuyId,
                    storeId: $scope.nowSingleRoute.storeId
                });  // 点击确认收货去二维码收货页面
            }
            else if (bigBtnState === 3) {
                $state.go("distributionRoute",{reload:true});    // 点击完成配送去配送路线页面
            };
        }
    };

    $scope.changeState = function (nowIndex) {      //小按钮点击切换当前状态
        var nowAllocationStatus = 0;
        if ($('.smallBtn').eq(nowIndex).text() === '已到达') {  //判断当前状态 进行传值
            nowAllocationStatus = 2;
        }else if ($('.smallBtn').eq(nowIndex).text() === '完成配送') {
            nowAllocationStatus = 4;
        }
        //if (arrStatus[nowIndex] ==="3") {  //判断当前状态 进行传值
        //    nowAllocationStatus = 2;
        //}else if (arrStatus[nowIndex] ==="4") {
        //    nowAllocationStatus = 4;
        //}
        ApiService.GetData("POST", Constant.System.Host + '/updateDistriButionStatus', {
            teambuyId: $scope.nowSingleRoute.teambuyId,
            deliveryId: $scope.singleRouteDatas[nowIndex].deliveryId,
            allocationStatus: nowAllocationStatus,
            updUserId: $scope.nowSingleRoute.updUserId
        }).then(function (res) {
            if (res.resultCode == 0) {
                forMap(res.data[0]);
                console.log(res.data[0]);
            } else {
                $rootScope.alertPop(res.resultMsg);
            }
        });
    };
    function forMap(arr) {  //当状态值不同时展现的样式改变
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === "0" || arr[i] === "1") {//进了这里
                $('.singleState').eq(i).text('未配送');
                $('.singleBall').eq(i).removeClass('overDis unoverDis');//小球
                $('.smallBtn').eq(i).removeClass('unopacity').addClass('opacity');//小按钮
                $scope.bigBtnFt = '开始配送'; //按钮灰色 并且不能点
                bigBtnState = 1; //大按钮的状态
            } else if (arr[i] === "2") {
                $('.singleState').eq(i).text('配送中').removeClass('overdisring').addClass('distring');
                $('.singleBall').eq(i).removeClass('overDis').addClass('unoverDis');
                $('.smallBtn').eq(i).addClass('unopacity').removeClass('opacity').text('完成配送');
                $rootScope.nowReceivingId = $scope.singleRouteDatas[i].allocationId;//得到当前配送点的id
                bigBtnState = 2;
            } else if (arr[i] === "3") {
                $('.singleState').eq(i).text('前往配送').removeClass('overdisring').addClass('distring');
                $('.singleBall').eq(i).removeClass('overDis').addClass('unoverDis');
                $('.smallBtn').eq(i).addClass('unopacity').removeClass('opacity').text('已到达');
                $scope.bigBtnFt = '配送中'; //按钮灰色 并且不能点
                bigBtnState = 1;
                $scope.issingleDisplay = false;
            } else if (arr[i] === "4") {
                $('.singleState').eq(i).text('完成配送').addClass('overdisring').removeClass('distring');
                $('.singleBall').eq(i).addClass('overDis').removeClass('unoverDis');
                $('.smallBtn').eq(i).removeClass('unopacity').addClass('opacity');
                $('.singleItemI').eq(i).css(" border-left", "3px solid #A6D652 !important");
                $scope.bigBtnFt = '配送中'; //按钮灰色 并且不能点
                bigBtnState = 1;
                $scope.issingleDisplay = false;
            }
        };
        if (arr[arr.length - 1] === "4") {
            $scope.issingleDisplay = true; //按钮亮  这个时候配送完成
            $scope.bigBtnFt = '完成配送';
            bigBtnState = 3;
        } else if (arr.indexOf("2") >= 0) {  //存在发货的情况
            $scope.issingleDisplay = true; //按钮亮  去确认发货
            $scope.bigBtnFt = '确认发货';
            bigBtnState = 2;
            $rootScope.nowReceivingId = $scope.singleRouteDatas[arr.indexOf("2")].allocationId;//得到当前配送点的id
        }
    };

}]);
