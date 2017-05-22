/**
 * Created by Administrator on 2017/3/20.
 */
appConttoller.controller('OpenShopCtrl', function ($ionicScrollDelegate, $scope, $ionicHistory, Constant, $ionicSideMenuDelegate, $rootScope, $http, $state, $stateParams, ApiService) {
//现获取开店列表的基本信息,包括需要发送给后台的数据
    var userId = JSON.parse(localStorage.getItem("userInformation"))[0].userId;
    $ionicScrollDelegate.resize();
    $rootScope.storeStatue=2;//初始开店负责人状态
    var isOk = 0,
        isEmail = 0,
        storeNameNow = 0, //店铺验证是否成功验证
        other = 0;
    $scope.aaaa = []; //选中分类的商品列表
    $scope.initSrc = "";
    //提交按钮是否可点
    $scope.canClick1 = true;
    $scope.canClick2 = true;
    $scope.canClick2 = true;
    //初次加载提交按钮状态是否可点
    function canClick(storeInfo) {
        if (storeInfo.storeName) {
            $scope.canClick1 = false;
        };
        if (storeInfo.storekeeperName) {
            $scope.canClick2 = false;
        };
        if (storeInfo.storekeeperEmail) {
            $scope.canClick3 = false;
        };
    }
    $scope.loseBlur = function () {
        $scope.canClick2 = true;
        if ($('#storekeeperName').val()) {
            $scope.canClick2 = false;
        }
    };

    //判断是否是更新店铺还是开店
    var thisStoreInfo = $stateParams.thisStoreInfo;
    function openShopOrUpdateShop(thisStoreInfo) {
        if (thisStoreInfo) {  //更新店铺信息判断
            $scope.openShopValue = "确认修改";
            $scope.openShopTitle = "店铺信息";
            $scope.OpenShopCanClick = true;
            ApiService.GetData("POST", Constant.System.Host + '/getStoreInfo', {
                storeId: $rootScope.nowStoreId
            }).then(function (res) {
                if (res.resultCode == 0) {
                    var storeInfo = res.data.storeInfo;
                    if (storeInfo.storeName) {
                        $('#storeName').val(storeInfo.storeName);
                    }
                    if (storeInfo.storekeeperName) {
                        $('#storekeeperName').val(storeInfo.storekeeperName);
                    }
                    if (storeInfo.storekeeperEmail) {
                        $scope.OpenShopEmail = storeInfo.storekeeperEmail;
                    }
                    //上传图片初始化的src
                    if (storeInfo.storeLogo) {
                        $scope.initSrc = Constant.System.ResourceImageHost + storeInfo.storeLogo;
                    }
                    if (storeInfo.storekeeperMobile) {
                        $scope.OpenShopTell = storeInfo.storekeeperMobile;
                    }
                    if (storeInfo.state) {
                        $('#state').val(storeInfo.state);
                    }
                    if (storeInfo.city) {
                        $('#city').val(storeInfo.city);
                    }
                    if (storeInfo.street1) {
                        $('#streetOne').val(storeInfo.street1);
                    }
                    if (storeInfo.street2) {
                        $('#streetTwo').val(storeInfo.street2);
                    }
                    if (storeInfo.storeDetail) {
                        $('#storeDetail').val(storeInfo.storeDetail);
                    }
                    var storeProductCategory = res.data.storeProductCategory;//所买分类
                    if (storeProductCategory) {
                        $scope.nowCategoryList = '';
                        for (var i = 0; i < storeProductCategory.length; i++) {
                            $scope.nowCategoryList += storeProductCategory[i].categoryName + ',';
                        }
                        $scope.productCategoryListContent = $scope.nowCategoryList;
                    }
                    //店铺负责人状态 0:未认证 1:已认证(电话+电邮) 2:已认证(电邮) 3:已认证(电话)
                    $rootScope.storeStatue = storeInfo.storekeeperStatus;
                    $scope.aaaa = storeProductCategory;
                    canClick(storeInfo);
                } else {
                    $rootScope.alertPop(res.resultMsg);
                }
            });
        } else {
            $scope.openShopValue = "确认开店";
            $scope.openShopTitle = "开店信息";
            $scope.productCategoryList = '';    //初始化分类选框的值
            $scope.OpenShopCanClick = false; //初始化点击开店按钮的状态
            $scope.OpenShopEmail = JSON.parse(localStorage.getItem("userInformation"))[0].email; //初始化开店页面邮箱的值
            $scope.OpenShopTell = JSON.parse(localStorage.getItem("userInformation"))[0].mobile; //初始化开店页面邮箱的值
            $('#OpenShopTell').val($scope.OpenShopTell);
        }
    }
    //openShopOrUpdateShop(thisStoreInfo);

    //getTheSend();//是否传参数
    //获取所买商品分类
    ApiService.GetData("POST", Constant.System.Host + '/getProductCategoryList').then(function (res) {  //得到分类商品
        if (res.resultCode === 0) {
            $scope.productCategoryListDatas = res.data;
        } else {
            $rootScope.alertPop("数据错误");
        }
    });
    //选中产品种类之后点击关掉side-menu
    $scope.toggleLeftSideMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
    $scope.goChangeDetails = function (nowChangeWho) {  //单个跳转验证电话或者邮箱
        $state.go("ChangeDetails", {"GOChangeWhat": nowChangeWho});
    };
    //点击产品分类进行选择
    $scope.getProductCategory = function () {
        $scope.nowCategoryList = '';
        $scope.aaaa = [];
        $('.productListCheck').each(function ($index, obj) {
            if ($(this).is(':checked')) {
                $scope.nowCategoryList += $('.OpenShopCheckbox').eq($index).text() + ',';
                $scope.aaaa.push($scope.productCategoryListDatas[$index])
            }
        });
        $scope.productCategoryListContent = $scope.nowCategoryList.substring(0, $scope.nowCategoryList.length - 1);
    };
    //验证店铺名是否为已存在
    $scope.loseBlurName = function () {
        $scope.canClick1 = true;
        var storeName=$('#storeName').val();
        if (storeName) {
            $scope.canClick1 = false;
            ApiService.GetData("POST", Constant.System.Host + '/checkStoreName', {
                storeName: storeName
            }).then(function (res) {
                if (res.resultCode === 22) {
                    storeNameNow = 1;  //店铺验证成功
                } else if (res.resultCode === 21) {
                    storeNameNow = 0;
                    $rootScope.alertPop("店铺名已存在");
                }
            });
        }else {
            $rootScope.alertPop("请输入店铺名称");
        }
    };

    //上传图片
    var upimgSrc = "";
    $scope.uploadImgs = function () {
        // selectPhoto scan
        cordova.exec(successExecResult, failExecResult, "RYPlugin", "selectPhoto", [111]);
    };
    function successExecResult(imagesUrl) {
        showImages(imagesUrl);
    }

    function failExecResult(message) {
        alert("验证失败：" + message);
    }
    function showImages(imagesUrl) {
        upimgSrc = imagesUrl[0].imgPath;
        $scope.initSrc = Constant.System.ResourceImageHost + imagesUrl[0].imgPath;
        $scope.$apply();
    }

    //点击提交开店信息
    $scope.OpenShopNow = function () {
        userId = JSON.parse(localStorage.getItem("userInformation"))[0].userId;
        if($('#storeDetail').val()!=''){
            if($('#storeDetail').val().length<5){
                $rootScope.alertPop('请输入至少5位以上描述');
                return false;
            }
        };
        if (thisStoreInfo) {//更新店铺信息
            var productCategoryList = JSON.stringify($scope.aaaa);
            ApiService.GetData("POST", Constant.System.Host + '/updStoreInfo', {
                storeName: $('#storeName').val(),
                userId: userId,
                storeId: $rootScope.nowStoreId,
                storekeeperName: $('#storekeeperName').val(),
                storekeeperEmail: $scope.OpenShopEmail,
                storekeeperMobile: $scope.OpenShopTell,
                productCategoryList: productCategoryList,
                state: $('#state').val(),
                city: $('#city').val(),
                street1: $('#streetOne').val(),
                street2: $('#streetTwo').val(),
                storeDetail: $('#storeDetail').val(),
                storePicUrl: "",  //图片
                storeLogo:upimgSrc,
                storekeeperStatus: $rootScope.storeStatue,
                storeStatus: 1          //店铺状态1：启用；0：禁用
            }).then(function (res) {
                console.log(res);
                if (res.resultCode == 50) {
                    $rootScope.alertPop("更新成功");
                    $state.go("shopHome", {thisStorId: $rootScope.nowStoreId},{reload:true});
                    $rootScope.$broadcast('refreshShopDetl');
                } else {
                    if (res.data==[]) {
                        $rootScope.alertPop(res.data);
                        $state.go("shopHome", {thisStorId: $rootScope.nowStoreId});
                        $rootScope.$broadcast('refreshShopDetl');
                    } else {
                        $rootScope.alertPop(res.resultMsg);
                        $state.go("shopHome", {thisStorId: $rootScope.nowStoreId});
                        $rootScope.$broadcast('refreshShopDetl');
                    }

                }
            });
        } else { //开店
            console.log($rootScope.storeStatue);
            ApiService.GetData("POST", Constant.System.Host + '/insertStoreInfo', {
                storeName: $('#storeName').val(),
                userId: userId,
                storekeeperName: $('#storekeeperName').val(),
                storekeeperEmail: $scope.OpenShopEmail,
                storekeeperMobile: $scope.OpenShopTell,
                productCategoryList: JSON.stringify($scope.aaaa),
                state: $('#state').val(),
                city: $('#city').val(),
                street1: $('#streetOne').val(),
                street2: $('#streetTwo').val(),
                storeDetail: $('#storeDetail').val(),
                storePicUrl: "",  //图片
                storeLogo:upimgSrc,
                storekeeperStatus: $rootScope.storeStatue,
                storeStatus: 1
            }).then(function (res) {
                console.log(res);
                if (res.resultCode === 0) {
                    $rootScope.alertPop("开店成功");
                    $state.go("shopHome", {"thisStorId": res.data},{reload:true});
                    $('#storeName').val('');
                    $('#storekeeperName').val('');
                    $scope.OpenShopEmail = '';
                    $scope.OpenShopTell = '';
                    $('#state').val('');
                    $('#city').val('');
                    $('#streetOne').val('');
                    $('#streetTwo').val('');
                    $('#storeDetail').val('');
                    $rootScope.storeStatue = 2;
                } else {
                    if (res.data != []) {
                        $rootScope.alertPop(res.data[0].storekeeperStatus);
                        console.log(res.data);
                    } else {
                        $rootScope.alertPop(res.resultMsg);
                        console.log(1);
                    }
                }
            });
        }
    };
    $rootScope.$on("getShopDet",function () {  //广播 进入页面刷新
        openShopOrUpdateShop(thisStoreInfo);
    });
    //判断详情跳进这个页面是否存在参数
    $scope.getTheSend = function () {
        if ($rootScope.sendToShopChangeWhat != undefined) {
            if ($rootScope.sendToShopChangeWhat.indexOf('@') > 0) {
                $scope.OpenShopEmail = $rootScope.sendToShopChangeWhat;
                isEmail = 1;
            } else {
                $scope.OpenShopTell = $rootScope.sendToShopChangeWhat;
            }
        } openShopOrUpdateShop(thisStoreInfo);
    };
    $scope.$on('$stateChangeSuccess', $scope.getTheSend);

});
