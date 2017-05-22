appConttoller.controller('teamOderInforCtrl', function ($scope, $http, Constant, $state, ApiService, $stateParams, $timeout,$rootScope){
    var thisStorId = $rootScope.nowStoreId;
    var thisTeambuyId=$rootScope.thisTeambuyId;
    $scope.ifChange=true;
    console.log($stateParams.ifChangeTime);

    var ifChangeTime=$stateParams.ifChangeTime;
    if(ifChangeTime){
        $("#changeTimes").css("display","none");
    }else{
        //$scope.ifChange=true;
    };

    var userData = JSON.parse(localStorage.getItem("userInformation"));
    if(ifChangeTime){
        $scope.ifChange=false;
    }else{
        $scope.ifChange=true;
    }
    ApiService.GetData("POST", Constant.System.Host + '/showTeamBuyOrderDetail', {
        storeId: thisStorId,
        teambuyId:thisTeambuyId ,
    }).then(function (res) {
        if (res.resultCode == 0) {
            $scope.orderInfor=res.data;
            $scope.teambuyProducts=res.data.teambuyProducts;
            var len=$scope.teambuyProducts.length;
            $timeout(function () {
                for(var i=0;i<len;i++){
                    var  currentQuantity= $scope.teambuyProducts[i].currentQuantity;
                    var  productInventory= $scope.teambuyProducts[i].productInventory;
                    var oneProInTeam=$(".oneProInTeam")[i];
                    if(currentQuantity<productInventory){
                        $(oneProInTeam).addClass("sellingBg");
                    }else{
                        $(oneProInTeam).addClass("sellOverBg");
                    }
                }
            })

        }
    });
    $scope.goProdInfor= function () {
        var thisProductId=this.oneProInTeam.productId;
        $state.go("productInformation",{"thisProductId":thisProductId});
    };
    //修改配送时间
    var changeRouTime=$("#changeTimes");
    var showChangeTime=$("#showChangeTime");
    //初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    showChangeTime.attr('data-year', nowYear);
    showChangeTime.attr('data-month', nowMonth);
    showChangeTime.attr('data-date', nowDate);
    //时间函数
    function formatYear (nowYear) {
        var arr = [];
        for (var i = nowYear - 5; i <= nowYear + 5; i++) {
            arr.push({
                id: i + '',
                value: i + '年'
            });
        }
        return arr;
    }
    function formatMonth () {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            arr.push({
                id: i + '',
                value: i + '月'
            });
        }
        return arr;
    }
    function formatDate (count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
            arr.push({
                id: i + '',
                value: i + '日'
            });
        }
        return arr;
    }
    var yearData = function(callback) {
        callback(formatYear(nowYear))
    }
    var monthData = function (year, callback) {
        callback(formatMonth());
    };
    var dateData = function (year, month, callback) {
        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
            callback(formatDate(31));
        }
        else if (/^(4|6|9|11)$/.test(month)) {
            callback(formatDate(30));
        }
        else if (/^2$/.test(month)) {
            if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                callback(formatDate(29));
            }
            else {
                callback(formatDate(28));
            }
        }
        else {
            throw new Error('month is illegal');
        }
    };
    changeRouTime.bind('click', function () {  //配送时间
        var oneLevelId = showChangeTime.attr('data-year');
        var twoLevelId = showChangeTime.attr('data-month');
        var threeLevelId = showChangeTime.attr('data-date');
        var iosSelect = new IosSelect(3,
            [yearData, monthData, dateData],
            {
                title: '选择配送时间',
                itemHeight: 35,
                relation: [1, 1, 0, 0],
                itemShowCount: 9,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    var y=selectOneObj.value.substring(0,selectOneObj.value.length-1);
                    var m=selectTwoObj.value.substring(0,selectTwoObj.value.length-1);
                    var d=selectThreeObj.value.substring(0,selectThreeObj.value.length-1);
                    m=changeDate(m);
                    d=changeDate(d);
                    $('#showTimeRout').html(d + '/'+ m + '/' +y);
                    var changeNewTime=y+m+d+"000000";

                    ApiService.GetData("POST", Constant.System.Host + '/updTeamBuyOrder', {
                        userId:userData[0].userId ,
                        teambuyId:thisTeambuyId ,
                        routeTime:changeNewTime,
                    }).then(function (res) {
                        if (res.resultCode == 0) {
                            $rootScope.alertPop("您已将配送时间修改为：   "+d + '/'+ m + '/' +y);
                        }
                        else{
                            $rootScope.alertPop(res);
                        }
                    });
                }
            });
    });
    //如果月和日只有一位字符串，则自动补0
    function changeDate(x){
        if(x.length==1){
            x="0"+x;
            return x;
        }else{
            return x;
        }
    }
})