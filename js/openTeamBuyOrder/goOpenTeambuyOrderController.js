/**
 * Created by Administrator on 2017-03-21.
 */
appConttoller.controller('goOpenTeambuyOrderController', function($scope,$http,Constant,$state,$ionicModal,$stateParams,$ionicNavBarDelegate,ApiService,$ionicPopup,$rootScope,$timeout,$ionicHistory) {
   //获取店铺ID
    var openTeamPup={},
        modal={},
        nowSelectNum=0,
        nowWhoPup= 0,
        maxA=0; //实际总额
    $scope.goOpenTeambuyOrderDatas=[]; //选择add商品
    $scope.pupChange=[];  //弹框点击修改数据
    $scope.nowStoreId=$rootScope.nowStoreId;
    $scope.storId=$stateParams.thisStorId;
    $scope.routeName='';




    var selectDateDom = $('#selectDate');
    var routeTimeDom = $('#distriTime');
    var saleEndTime = $('#saleEndTime');
    var showDateDom = $('#showDate');
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    showDateDom.attr('data-year', nowYear);
    showDateDom.attr('data-month', nowMonth);
    showDateDom.attr('data-date', nowDate);

    $scope.doRefresh = function () {    //do something刷新数据
        forDatas();
        $scope.$broadcast('scroll.refreshComplete');
    };
    function formatYear (nowYear) {
        var arr = [];
        for (var i = nowYear; i <= nowYear + 5; i++) {
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
    };
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
    var hourData = function(one, two, three, callback) {
        var hours = [];
        for (var i = 0,len = 24; i < len; i++) {
            hours.push({
                id: i,
                value: i + '时'
            });
        }
        callback(hours);
    };
    var minuteData = function(one, two, three, four, callback) {
        var minutes = [];
        for (var i = 0, len = 60; i < len; i++) {
            minutes.push({
                id: i,
                value: i + '分'
            });
        }
        callback(minutes);
    };
    selectDateDom.bind('click', function () {
        var oneLevelId = showDateDom.attr('data-year');
        var twoLevelId = showDateDom.attr('data-month');
        var threeLevelId = showDateDom.attr('data-date');
        var fourLevelId = showDateDom.attr('data-hour');
        var fiveLevelId = showDateDom.attr('data-minute');
        var iosSelect = new IosSelect(5,
            [yearData, monthData, dateData, hourData, minuteData],
            {
                title: '时间选择',
                itemHeight: 35,
                relation: [1, 1, 0, 0],
                itemShowCount: 9,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                fourLevelId: fourLevelId,
                fiveLevelId: fiveLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj, selectFourObj, selectFiveObj) {
                    showDateDom.attr('data-year', selectOneObj.id);
                    showDateDom.attr('data-month', selectTwoObj.id);
                    showDateDom.attr('data-date', selectThreeObj.id);
                    showDateDom.attr('data-hour', selectFourObj.id);
                    showDateDom.attr('data-minute', selectFiveObj.id);
                    var y=selectOneObj.value.substring(0,selectOneObj.value.length-1);
                    var m=selectTwoObj.value.substring(0,selectTwoObj.value.length-1);
                    var d=selectThreeObj.value.substring(0,selectThreeObj.value.length-1);
                    var h=selectFourObj.value.substring(0,selectFourObj.value.length-1);
                    var M=selectFiveObj.value.substring(0,selectFiveObj.value.length-1);
                    if (m >= 1 && m <= 9) {
                        m = "0" + m;
                    }
                    if (d >= 0 && d <= 9) {
                        d = "0" + d;
                    }
                    if (h >= 0 && h <= 9) {
                        h = "0" + h;
                    }
                    if (M >= 0 && M <= 9) {
                        M = "0" + M;
                    }
                    saleEndTime.html(y + '- '+ m + '-' +d + ' '+' ' + h + ':' + M);
                }
            });
    });

    routeTimeDom.bind('click', function () {  //开单时间
        var oneLevelId = showDateDom.attr('data-year');
        var twoLevelId = showDateDom.attr('data-month');
        var threeLevelId = showDateDom.attr('data-date');
        var iosSelect = new IosSelect(3,
            [yearData, monthData, dateData],
            {
                title: '时间选择',
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
                    if (m >= 1 && m <= 9) {
                        m = "0" + m;
                    }
                    if (d >= 0 && d <= 9) {
                        d = "0" + d;
                    }
                    $('#routeTime').html(y + '- '+ m + '-' +d);
                }
            });
    });

    $scope.TeamActiveBtnS=false;  //初始化页面的时候 删除按钮都 不能点击 并且颜色为灰色
    //进入页面初始化时间
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        $('#routeTime').text(currentdate);
        $('#saleEndTime').text(currentdate+' '+24+seperator2+'00');
    };
    getNowFormatDate();//获取当前的时间 初始化配送时间和截单时间
    $scope.ionicGoBack=function(){   //返回提示
        $rootScope.confirmPopup("提示","是否放弃本次开单",function(){$ionicHistory.goBack();$rootScope.detailsOnLineDatas=[];},function(){console.log('cancel')});
    };
    $scope.selectAll=function(ev){  //点击全选按钮进行全选的状态
        if($(ev.target).prop('checked')==true){
            $('.productListCheck').prop("checked", true);
            $scope.TeamActiveBtnS=true;//删除按钮可以点击
        }else {
            $('.productListCheck').prop("checked", false);
            $scope.TeamActiveBtnS=false;//删除按钮不可以点击
        }
    };
    $scope.isChecked=function(ev){  //点击单个 复选框
        nowSelectNum=0;
        $('.productListCheck').each(function($index,obj){  //判断复选框是否选中的个数
            if($(this).prop('checked')) {
                nowSelectNum++; //复选框个数
            };
        });
        if(nowSelectNum>=1){
            $scope.TeamActiveBtnS=true;  //删除按钮可以点击
            if(nowSelectNum===$('.productListCheck').length){
                $('.TproductListCheck_button').prop("checked", true);
            }else {
                $('.TproductListCheck_button').prop("checked", false);
            }
        }else if(nowSelectNum<=0){
            $scope.TeamActiveBtnS=false;//删除按钮不可以点击
            $('.TproductListCheck_button').prop("checked", false);
        }
    };
    $scope.openTeameDetel=function(){  //点击删除按钮弹框
        if($scope.TeamActiveBtnS===true){  //删除按钮可以点的情况下
            if($('.TproductListCheck_button').prop('checked')){  //全选情况下 清空数组
                $scope.goOpenTeambuyOrderDatas=[];//如果全选了就全部删除
                $('#maxAmount').val(' '); //总金额为空
            }else {  //或者匹配删除
                $('.productListCheck').each(function($index,obj){  //判断复选框是否选中
                    if($(this).prop('checked')) {
                        $scope.goOpenTeambuyOrderDatas.splice($index,1); //减掉
                    }else {
                        console.log('没有选中需要删除的数据');
                    }
                });
            }
            maxAmount(); //删除计算一次实际金额
            $('.productListCheck').prop('checked',false);
            $scope.TeamActiveBtnS=false;  // 删除按钮都不能点击 并且颜色为灰色
            $('.TproductListCheck_button').prop("checked", false);
        }
    };
    $scope.goselectRoutes=function(StoreId){  //点击路线 转路线页面
        $state.go("openTeambuyOrderselectRoute",{"StoreId":$scope.storId});
    };
    $scope.openTeameEdit=function(nowEdit){  //点击编辑按钮弹框
        openTeamPup=$ionicPopup.show({
            templateUrl: 'openTeamPup.html',
            scope:$scope
        });
        nowWhoPup=nowEdit;
        console.log($scope.goOpenTeambuyOrderDatas[nowEdit].productInventory);
        $scope.pupProductName=$scope.goOpenTeambuyOrderDatas[nowEdit].productName; //当前需修改的
        $scope.pupProductInventory=$scope.goOpenTeambuyOrderDatas[nowEdit].productInventory; //当前需修改的
        $scope.pupProductPrice=$scope.goOpenTeambuyOrderDatas[nowEdit].productPrice; //当前需修改的
    };
    $scope.goChangeOrderNum = function(){   // 自定义 弹框 点击确定之后 修改的数据
        $scope.goOpenTeambuyOrderDatas[nowWhoPup].productInventory=$("#pupProductInventory").val();
        $scope.goOpenTeambuyOrderDatas[nowWhoPup].productPrice=$("#pupProductPrice").val();
        maxAmount();//编辑之后计算一次实际金额
        openTeamPup.close();
    };

    $scope.closeOpenTeamPup=function(){  //点击关闭确认弹框 右上角的差
        openTeamPup.close();
    };

    $scope.addLineOne=function(){   //最后提交 增加
        var timeSub=new Date($('#routeTime').text()).getTime()-new Date($('#saleEndTime').text()).getTime();
        var nowTimeSub=new Date($('#saleEndTime').text()).getTime()-new Date().getTime();
        if($('#teambuyName').val()===''){
            $rootScope.alertPop('团购单名不能为空哦');
            return false;
        }else if($scope.routeName===''){
            $rootScope.alertPop('请选择路线');
            return false;
        }else if(nowTimeSub<0){
            $rootScope.alertPop('截单时间不能低于现在时间');
            return false;
        }else if(timeSub<0){
            $rootScope.alertPop('请重新选择配送时间');
            return false;
        } else if($('#maxAmount').val()-$('#minAmount').val()<0){
            $rootScope.alertPop('商品金额不够哦');
            return false;
        }else if($scope.goOpenTeambuyOrderDatas.length<=0){
            $rootScope.alertPop('请选择商品');
            return false;
        }else {  //满足条件之后提交
            console.log(JSON.stringify($scope.goOpenTeambuyOrderDatas));
            ApiService.GetData("POST",Constant.System.Host+'/createTeambuyOrder',{
                storeId:$scope.nowStoreId,
                routeId:$scope.routeId,
                userId:JSON.parse(localStorage.getItem("userInformation"))[0].userId,
                currentAmount:' ',
                routeTime:$('#routeTime').text(), //配送时间
                saleEndTime:$('#saleEndTime').text(),//截止时间
                saleStartTime:'',
                touteName:$scope.routeName,
                minAmount:$('#minAmount').val(),
                maxAmount:$('#maxAmount').val(),
                teambuyName:$('#teambuyName').val(),
                teambuyProuctList:JSON.stringify($scope.goOpenTeambuyOrderDatas)
            }).then(function(res){
                if(res.resultCode===0){
                    $state.go('manageOrder');  //存值然后跳转到团购单管理页面
                    $('#teambuyName').val(' ');//清除团购单名
                    $scope.routeName='';////清除路线
                    $scope.goOpenTeambuyOrderDatas=[];//商品数据为空
                    $rootScope.nowOpenOrderAddGoods=[];
                    getNowFormatDate();//获取当前的时间 初始化配送时间和截单时间
                    $('.TproductListCheck_button').prop("checked", false);
                    $('#maxAmount').val(' ');//清除最大最小金额
                    $('#minAmount').val(' ');//清除最大最小金额
                }
                else { $rootScope.alertPop(res.resultMsg)};
            });
        }
    };
    $rootScope.$on("refreshOpenOrder",function () {  //广播 查询得到add的商品
        if($rootScope.nowOpenOrderAddGoods.length>0){  //存在选中的数据
            $scope.goOpenTeambuyOrderDatas=$scope.goOpenTeambuyOrderDatas.concat($rootScope.nowOpenOrderAddGoods);
            var hash = {};
            $scope.goOpenTeambuyOrderDatas = $scope.goOpenTeambuyOrderDatas.reduce(function(item, next) { //去重之后重新给页面数据赋值
                hash[next.productId] ? '' : hash[next.productId] = true && item.push(next);
                return item;
            }, []);
            $('.TproductListCheck_button').prop("checked", false);
            maxAmount(); //选择了商品回来之后计算总金额
        };
    });
    function maxAmount(){  //实际金额的计算
        maxA=0;
        if($scope.goOpenTeambuyOrderDatas.length>0){
            angular.forEach($scope.goOpenTeambuyOrderDatas,function(data,index,array){
                maxA+=Number(parseFloat(data.productPrice*data.productInventory));//保留2位小数
            });
            $('#maxAmount').val(maxA.toFixed(2)); //赋值并且保留2未小数
        }else {
            $('#maxAmount').val(' '); //当没有商品的时候 金额为空
        }
    };
    $scope.addGoods=function(){  //点击add去所有商品页面
        $rootScope.nowOpenOrderAddGoods=[]; //每次进去的时候重置选取商品数据
        $state.go('allGoods');
    };
    $rootScope.$on('refreshOpenOrderRoute', function(){  //选择全部路线信息之后  调回页面 并且保存之前的值
        if($rootScope.goOpenTeambuyOrderSending.length>0){
            $scope.routeName=$rootScope.goOpenTeambuyOrderSending[0].routeName;
            $scope.routeId=$rootScope.goOpenTeambuyOrderSending[0].routeId;
            $('#minAmount').val($rootScope.goOpenTeambuyOrderSending[0].minAmount);
        }else {
            $scope.routeName='';
            $scope.routeId='';
        }
    });

});