/**
 * Created by Administrator on 2017-03-30.
 */
appConttoller.controller('manageOrderCtrl', function ($scope, $http, Constant, $state, ApiService,$timeout,$rootScope) {
    var userData = JSON.parse(localStorage.getItem("userInformation"));
    var thisStorId = $rootScope.nowStoreId;
    $scope.ifChangeTime=null;
    $scope.moreDataCanBeLoaded = true;
    var pageNo = 1;
    $scope.someOrders = [];
    $scope.ionicGoBack=function(){  //这里跳转返回设置
        $state.go('shopHome',{"thisStorId":thisStorId});
    };
    //调用订单信息列表
    loadOrderList(0);
    //var callFcn=new Obj;
    function loadOrderList(teambuyStatus) {
        ApiService.GetData("POST", Constant.System.Host + '/showTeambuyOrder', {
            storeId: thisStorId,
            teambuyStatus: teambuyStatus,
            pageNo: pageNo,
        }).then(function (res) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (res.resultCode == 0) {
                console.log(res.data.obj);
                $scope.allPage = res.data.allPage;
                if($scope.allPage>pageNo){
                    $scope.moreDataCanBeLoaded = true;
                }else{
                    $scope.moreDataCanBeLoaded=false;
                }
                //数据拼接
                $scope.someOrders = $scope.someOrders.concat(res.data.obj);
                //进度条加载
                var len = $scope.someOrders.length;
                $timeout(function () {
                    for (var i = 0; i < len; i++) {
                        var Oscore = $scope.someOrders[i].currentAmount;
                        var allscore = $scope.someOrders[i].minAmount;
                        $scope.someOrders[i].baifenNum=Math.floor(($scope.someOrders[i].currentAmount/$scope.someOrders[i].minAmount)*100);
                        var Owin = (2 * Oscore )/ allscore;
                        var nowProesB = $(".nowProesB")[i];
                        if (Oscore <= allscore) {
                            $(nowProesB).css("width", Owin + "rem");
                        } else if(Oscore > allscore){
                            $(nowProesB).css("width", "2rem");
                            $(nowProesB).css("backgroundColor", "#ff6a4d");
                        };
                        var allBtnRou=$(".allBtnRou")[i];
                        //判断是否已生成过配送单
                        if ($scope.showOrder == false) {
                            if ($scope.someOrders[i].deliveryStatus == 1) {
                                $(allBtnRou).addClass("routeBtn");
                                allBtnRou.setAttribute("disabled", "disabled");
                            }
                            ;
                        }
                    }
                });

            } else {
                $rootScope.alertPop(res.resultMsg);
            }
        });
    }


    //上拉加载
    $scope.loadMoreOrder = function () {
        pageNo++;
        console.log("滚动了");
        if (pageNo <= $scope.allPage) {
            if ($scope.showOrder == true) {
                //console.log(pageNo);
                loadOrderList(0);
            } else {
                loadOrderList(1);
            }

        } else {
            $scope.moreDataCanBeLoaded = false;
        }
    };
    //下拉刷新
    $scope.doRefresh=function(){
        console.log($scope.showOrder);
        if ($scope.showOrder == true) {
            pageNo = 1;
            $scope.someOrders = [];
            loadOrderList(0);
        } else {
            pageNo = 1;
            $scope.someOrders = [];
            loadOrderList(1);
        }
        $timeout(function () {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }

    //选项卡切换
    $scope.showOrder = true;
    $scope.overOrder = false;

    $scope.showOredrDo = function () {
        $scope.ifChangeTime=null;
        $(".overOrder").removeClass("nowChoose");
        $(".showOrder").addClass("nowChoose");
        $scope.showOrder = true;
        $scope.overOrder = false;
        pageNo = 1;
        $scope.someOrders = [];
        loadOrderList("0");
    }
    $scope.overOrderDo = function () {
        $scope.ifChangeTime=1;
        $(".showOrder").removeClass("nowChoose");
        $(".overOrder").addClass("nowChoose");
        $scope.showOrder = false;
        $scope.overOrder = true;
        pageNo = 1;
        $scope.someOrders = [];
        loadOrderList("1");

    }
    $scope.goHistoryOrder=function(){
        $state.go("historyOrders");
    }
    $scope.goTeamOrder= function () {
        $rootScope.thisTeambuyId=this.oneOrder.teambuyId;
        $state.go("teamOrderInfor",{"ifChangeTime":$scope.ifChangeTime});
    };
    $scope.goForRoute=function($event){
        var thisRouteInfo=this.oneOrder;
        $event.target.setAttribute("disabled","disabled");
        $($event.target).addClass("routeBtn");
        var list=[{"storeId":this.oneOrder.storeId,"teambuyId":this.oneOrder.teambuyId,"routeId":this.oneOrder.routeId}];
        var addDisMessage=JSON.stringify(list);
        console.log(addDisMessage);
        //生成配送单
        ApiService.GetData("POST", Constant.System.Host + '/addDistributionMessage', {
            userId:userData[0].userId,
            distributionList:addDisMessage
        }).then(function (res) {
            if (res.resultCode == 0) {
                $rootScope.alertPop("已生成配送单");

            } else {
                $rootScope.alertPop(res.resultMsg);
            }
        });
    }
});