/**
 * Created by Administrator on 2017-03-31.
 */
/**
 * Created by Administrator on 2017-03-30.
 */
appConttoller.controller('historyOrderCtrl', function ($scope, $http, Constant, $state, ApiService,$timeout,$rootScope) {
    var thisStorId = $rootScope.nowStoreId;
    console.log(thisStorId);
    console.log($rootScope.nowStoreId);
    var pageNo = 1;
    //模拟数据
    $scope.someOrders = [];
    //调用订单信息列表
    loadOrderList();
    //var callFcn=new Obj;
    function loadOrderList() {
        ApiService.GetData("POST", Constant.System.Host + '/selectHistoryTeambuyOrder', {
            storeId: thisStorId,
            pageNo: pageNo,
        }).then(function (res) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (res.resultCode == 0) {
                //console.log(res.data.obj);
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
                        var Owins = (2 * Oscore )/ allscore;
                        $scope.someOrders[i].baifenNum=Math.floor(($scope.someOrders[i].currentAmount/$scope.someOrders[i].minAmount)*100);
                        var nowProWid = $(".nowProWid")[i];
                        var pricIt=$(".isHisList")[i];
                        if (Oscore < allscore) {
                            $(nowProWid).css("width", Owins + "rem");
                            $(pricIt).addClass("haveSpeciel");
                        }else if(Oscore == allscore){
                            $(nowProWid).css("width", "2rem");
                        } else if(Oscore > allscore){
                            $(nowProWid).css("width", "2rem");
                            $(nowProWid).css("backgroundColor", "#ff6a4d");
                            console.log($(nowProWid).css("width"));
                        }
                    }
                });

            } else {
                alert(res.resultMsg);
            }
        });
    }

    $scope.moreDataCanBeLoaded = true;
    //下拉刷新
    $scope.doRefresh=function(){
        $timeout(function () {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    //上拉加载
    $scope.loadMoreOrder = function () {
        pageNo++;
        console.log("滚动了");
        if (pageNo <= $scope.allPage) {
                //console.log(pageNo);
                loadOrderList();

        } else {
            $scope.moreDataCanBeLoaded = false;
        }
        //console.log(pageNo);
    };
    $scope.goTeamOrder= function () {
        console.log(this.oneOrder.teambuyId);
        $rootScope.thisTeambuyId=this.oneOrder.teambuyId;
        $state.go("teamOrderInfor",{"ifChangeTime":"ifChangeTime"});
    }

});