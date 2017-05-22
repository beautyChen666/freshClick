/**
 * Created by Administrator on 2017-03-20.
 */
appConttoller.controller('ImInformation1Ctrl', function ($scope, $http, Constant, $state, ApiService, $stateParams, $rootScope, $ionicHistory, $ionicHistory) {
    var userData = JSON.parse(localStorage.getItem("userInformation"));
    console.log(userData);
    //图片初始化
    //$scope.initSrc= "";
    $scope.userEmail = userData[0].email;
    $scope.mobile = userData[0].mobile;
    if (userData[0].userStatus == 1) {
        $scope.hideEo = true;
    }
    //当修改个人信息时，默认显示
    $scope.zipCode = userData[0].zipCode;
    $scope.userLastName = userData[0].userLastName;
    $scope.userFirstName = userData[0].userFirstName;
    $scope.userNickName = userData[0].nickname;
    $scope.email = $scope.userEmail;
    $scope.initSrc=Constant.System.ResourceImageHost+userData[0].userImgUrl;
    //判断从哪个页面跳转过来的
    var fromWhere = $stateParams.fromWhere;
    console.log(fromWhere);
    if (fromWhere == "fromOnesInfo") {
        $scope.inforTitle = "个人信息";
    } else {
        $scope.inforTitle = "完善信息";
    }
    var fromWhere = $stateParams.fromWhere;

    $scope.canClick1 = true;
    $scope.canClick2 = true;
    if ($scope.userEmail) {
        $scope.canClick1 = false;
    }
    if ($scope.zipCode) {
        $scope.canClick2 = false;
    }
    //确认提交按钮的状态
    $scope.pwdCheck = function () {
        $scope.canClick1 = true;
        var userEmail = $("#userEmail").val();
        if (userEmail) {
            $scope.canClick1 = false;
        }
    };

    //邮编输入框失去焦点后
    $scope.ifSubDis = function () {
        $scope.canClick2 = true;
        var inforZipcode = $("#inforZipcode").val();
        if (inforZipcode) {
            $scope.canClick2 = false;
        }
    };

    //上传图片
    $scope.uploadImgs=function () {
        cordova.exec(successExecResult, failExecResult, "RYPlugin", "selectPhoto", [111]);
    }

    function successExecResult(imagesUrl){
        showImages(imagesUrl);
    }

    function failExecResult(message){
        $rootScope.alertPop("验证失败："+message);
    }

    var upimgSrc="";

    function showImages(imagesUrl) {
        upimgSrc = imagesUrl[0].imgPath;
        $(".photoBor>a>img").attr("src",Constant.System.ResourceImageHost+imagesUrl[0].imgPath);
    }



    //提交信息
    var userId = userData[0].userId;
    //提交信息请求
    function getSubmInformation() {
        //完善信息参数
        var pram = {
            email: $scope.userEmail,
            zipCode: $("#inforZipcode").val(),
            userLastName: $("#inforLastName").val(),
            userFirstName: $("#inforFirstName").val(),
            mobile: $("#telphone").val(),
            userId: userId,
            userType: 1,
            nickname: $("#inforNickName").val(),
            userImgUrl:upimgSrc//上传的图片路劲
        };
        ApiService.GetData("POST", Constant.System.Host + '/userCompleteMsg', pram).then(function (res) {
            if (res.resultCode == 0) {
                var sotNum = userData[0].storeNum;
                var data = JSON.stringify(res.data);
                localStorage.setItem("userInformation", data);
                if (sotNum) {
                    if (sotNum == 0) {
                        $ionicHistory.clearCache();
                        $state.go("goOpenShop");
                        $rootScope.$broadcast('refresh');
                    } else {
                        $scope.thisUsrId = res.data[0].userId;
                        var userId = $scope.thisUsrId;
                        $ionicHistory.clearCache();
                        $state.go("myShop");
                        $rootScope.$broadcast('refresh');
                    }
                } else {
                    $state.go("goOpenShop");
                }
            } else {
                if (res.data.length == 1) {
                    $rootScope.alertPop(res.data);
                } else {
                    var len = res.data[0].length;
                    var str = "";
                    for (var i = 0; i < len; i++) {
                        str += res.data[0][i] + "!";
                    }
                    $rootScope.alertPop(str);
                }

            }
        });
    };

    //提交信息
    $scope.sunbmitInformation = function () {
        var regg = /^\d{5}$/;
        if (!regg.test($("#inforZipcode").val())) {
            $rootScope.alertPop("请填写5位数字邮编");
            return
        }
        var re2 = /^(\d{3}-)?(\d{3}-)?\d{4}$/;
        var telphoneNum = $("#telphone").val();
        if(telphoneNum){
            if (!re2.test(telphoneNum)) {
                $rootScope.alertPop("电话号码格式不对，请输入10位电话号码格式“xxx-xxx-xxxx”");
                return
            }
        }
        getSubmInformation();
    }
    //电话号码格式验证
    $scope.ifTelIn = function () {
        var telphoneNum = $("#telphone").val();
        if (telphoneNum.length == 10 || telphoneNum.length == 12) {
            var re1 = /^\d{10}$/;
            if (re1.test(telphoneNum)) {
                $("#telphone").val(telphoneNum.slice(0, 3) + "-" + telphoneNum.slice(3, 6) + "-" + telphoneNum.slice(6, 10));
            }
        }
    }
    //修改邮箱和电话并验证
    $scope.goChangeE = function (parm) {
        $state.go("changeEmail", {"gOChangeWhat": parm, "fromWhere": fromWhere});
    }
    $scope.goChangeT = function (parm) {
        $rootScope.phone = $("#telphone").val();
        var re2 = /^(\d{3}-)?(\d{3}-)?\d{4}$/;
        if (!$rootScope.phone) {
            $rootScope.alertPop("请输入电话号码");
            return
        }
        if (!re2.test($rootScope.phone)) {
            $rootScope.alertPop("电话号码格式不对，请输入10位电话号码格式“xxx-xxx-xxxx”");
            return
        } else {
            $state.go("changeTel", {"gOChangeWhat": parm, "fromWhere": fromWhere});
        }
    }
    //实时刷新数据
    $rootScope.$on("refresh", function () {
        // alert("111")
        userData = JSON.parse(localStorage.getItem("userInformation"));
        $scope.userEmail = userData[0].email;
    })
});
