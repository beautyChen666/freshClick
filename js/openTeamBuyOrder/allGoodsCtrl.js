/**
 * Created by cj on 2017/5/2.
 */
appConttoller.controller('allGoodsController', function($scope,$http,Constant,$state,$ionicModal,$stateParams,$ionicNavBarDelegate,ApiService,$ionicPopup,$rootScope,$timeout,$ionicPopover,$ionicHistory) {
    $scope.allDatas=[];// 用于存储初始进入页面的所有数据
    $scope.arrChange=[]; //用于传递选中的商品 需要add的商品
    $scope.categoryNameDatas=[];  //分类数据数组初始化
    $scope.getListOfCommoditiesDatas=[]; //商品数据数组初始化
    $scope.saveDatas=[]; //用于存储数据选中与否
    $scope.productCategory=null;//初始进入页面 分类全部入参
    var state=0;// 进入页面的时候 全选按钮不选中
    forDatas();
    $scope.ionicGoBack=function(){   //返回
        $ionicHistory.goBack();
    };

    $ionicPopover.fromTemplateUrl('my-popover.html', {  // .fromTemplateUrl() 方法
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {  //打开浮动框
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {  //关闭浮动框
        $scope.popover.hide();
    };
    $scope.$on('$destroy', function() {   // 清除浮动框
        $scope.popover.remove();
    });

    $scope.$on('popover.hidden', function() { // 在隐藏浮动框后执行
        // 执行代码
    });
    // 移除浮动框后执行
    $scope.$on('popover.removed', function() {
        // 执行代码
    });
    $scope.addGoods=function(){  //添加商品
        $state.go('addGoods');  //去添加商品页面
        $scope.popover.hide();

    };

    $scope.doRefresh = function () {    //do something刷新
        $scope.allDatas=[];
        $scope.categoryNameDatas=[];
        $scope.getListOfCommoditiesDatas=[];
        $scope.productCategory=null;//分类全部入参
        forDatas();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.subheaderChangeLabelAll=function(){  //点击全部分类
        $scope.getListOfCommoditiesDatas=$scope.allDatas;//所有商品展示
        $('.subheaderA').removeClass('subheaderActive');
        $('.subheaderA').eq(0).addClass('subheaderActive');
        $('.allGoodsCt .scroll').css('transform','translate3d(0px, 0px, 0px)');
        $(".allGoodsCt .list").scrollTop(0);
    };
    $scope.subheaderChangeLabel=function(nowIndex){  //点击分类切换数据
        $('.subheaderA').removeClass('subheaderActive');
        $('.subheaderA').eq(nowIndex + 1).addClass('subheaderActive');
        $scope.getListOfCommoditiesDatas=[]; //先清空
        var nowProductCategory=$scope.categoryNameDatas[nowIndex].categoryId;//目前需要展示的上商品种类
        angular.forEach($scope.allDatas, function(data,index,array){  //循环遍历获取过滤数据
            if(data.productCategory===nowProductCategory){
                $scope.getListOfCommoditiesDatas.push(data);
            }
        });
        $('.allGoodsCt .scroll').css('transform','translate3d(0px, 0px, 0px)');
        $(".allGoodsCt .list").scrollTop(0);
    };
    $scope.isChecked=function(dataNow){  //单个checkbox点击
        if(dataNow.flag===true){
            dataNow.flag=false;
            $('.TproductListCheck_button').prop("checked", false); //如果全选 全选取消
            state=0;
        }else if(dataNow.flag===false){
            dataNow.flag=true;
            angular.forEach($scope.getListOfCommoditiesDatas,function(data,index,array){ //判断所有选中 全选选中
                if(data.flag===true){
                    $('.TproductListCheck_button').prop("checked", true);
                    state=1;
                }else {
                    $('.TproductListCheck_button').prop("checked", false);
                    state=0;
                }
            });
        };
    };
    $scope.toEdit=function(data){  //去编辑页面携带数据
        $state.go('addGoods',{objGoods:data});
    };
    $scope.OIchooseAll=function(){  //点击全选按钮进行全选的状态
        if($scope.getListOfCommoditiesDatas.length>0){  //当前页面有数据的情况下
            if(state===0){
                angular.forEach($scope.getListOfCommoditiesDatas,function(data,index,array){ //所有选中
                    data.flag=true;
                });
                state=1;
            }else if(state===1){
                angular.forEach($scope.getListOfCommoditiesDatas,function(data,index,array){ //所有不选中
                    data.flag=false;
                });
                state=0;
            }
        };
    };
    $scope.addGoodsHere=function () {  //确认添加商品
        angular.forEach($scope.allDatas,function(data,index,array){  //提交遍历数组flag为true 提交确认
            if(data.flag===true){
                $scope.arrChange.push(data);
            };
            $rootScope.nowOpenOrderAddGoods=$scope.arrChange;
        });
        $ionicHistory.goBack();
        $rootScope.$broadcast('refreshOpenOrder');
    };
    $rootScope.$on("refreshAddGoods",function () {  //广播 编辑完或者添加完商品之后回来刷新
        $scope.doRefresh(); //执行刷新函数
    });
    function forDatas(){  //页面初始化数据
        //console.log($scope.productCategory);
        ApiService.GetData('POST',Constant.System.Host+'/getStoreClassification',{ //接口1 分类接口
            storeId:$rootScope.nowStoreId
        }).then(function(res){
            if(res.resultCode===0){
                $scope.categoryNameDatas=res.data;
                $('#sub_header_list').width(80 * ($scope.categoryNameDatas.length) + 70 + 'px');     //副导航宽度 实时获得为动态宽度
            }else {
                //$rootScope.alertPop('数据出错啦');
            }
        });

        ApiService.GetData('POST',Constant.System.Host+'/getListOfCommodities',{ //接口2 数据展示接口
            storeId:$rootScope.nowStoreId,
            productCategory:$scope.productCategory
        }).then(function(res){
            if(res.resultCode===0){
                $scope.allDatas=res.data;
                $scope.getListOfCommoditiesDatas=$scope.allDatas;
                console.log(res.data);

            }else {
                $scope.getListOfCommoditiesDatas=[];
                $rootScope.alertPop('啊哈，暂时没有此类商品');
            }
        });
    };

});