/**
 * Created by Administrator on 2017-04-19.
 */
appConttoller.controller('changeEmailCtrl', function ($scope, $rootScope, $http, Constant, $state, ApiService, $stateParams, $rootScope, $ionicHistory) {
    var userData = JSON.parse(localStorage.getItem("userInformation"));
    var userId = userData[0].userId;
    var gOChangeWhat = $stateParams.gOChangeWhat;
    //$scope.phone=$rootScope.phone;
    $("#forEmailT").val($rootScope.phone);
    $scope.userEmail = userData[0].email;
    $scope.TimeE=60;//初始时间
    $scope.TimeT=60;
    $scope.emailClick=false;
    $scope.telClick=false;

    //提交按钮状态
    $scope.canClickT=true;
    $scope.CheckTelCode = function () {
        $scope.canClickT = true;
        var forEmailCodeT = $("#forEmailCodeT").val();
        if(forEmailCodeT){
            $scope.canClickT = false;
        }
    }
    $scope.canClickE=true;
    $scope.CheckEmailCode = function () {
        $scope.canClickE = true;
        var forEmailCodeE = $("#forEmailCodeE").val();
        if(forEmailCodeE){
            $scope.canClickE = false;
        }
    }

    //完成倒计时的样式
    var btnClass=function () {
        if(gOChangeWhat == "email"){
            $scope.emailClick=false;
            $("#email").removeClass("changeOpacity");
            $scope.TimeE=60;
            $("#email>span").text($scope.TimeE);
        }
        if(gOChangeWhat == "tel"){
            $scope.telClick=false;
            $("#tel").removeClass("changeOpacity");
            $scope.TimeT=60;
            $("#tel>span").text($scope.TimeT);
        }
    }

    var userType=1;//1：供货商；2：消费者
    var verificationType=1;//1：验证邮箱；0：验证电话；2：找回密码验证码
    function getCode(userId,emailOrMobile,userType,verificationType) {
        //调用获取验证码接口
        ApiService.GetData("POST", Constant.System.Host + '/getVerificationCode', {
            userId: userId,
            emailOrMobile: emailOrMobile,
            userType: userType,
            verificationType: verificationType
        }).then(function (res) {
            if (res.resultCode == 0) {
               var  code = res.data[0].verificationCode;
                $rootScope.alertPop(code);
            } else {
                if(res.data){
                    var len = res.data.length;
                    var str = "";
                    for (var i = 0; i < len; i++) {
                        str += res.data[i] + "!";
                        console.log(str, len);
                    }
                    $rootScope.alertPop(str);
                }else {
                    $rootScope.alertPop(res.resultMsg);
                }
                btnClass();
            }
        });
    }
    //获取邮箱验证码
    $scope.getForCodEmail = function () {//验证邮箱
        $scope.emailClick=false;
        verificationType=1;
        var timer=setInterval(function(){//计时器
            $scope.TimeE--;
            $("#email").addClass("changeOpacity");
            if($scope.TimeE==0){
                btnClass();//改变按钮的状态和样式
                clearInterval(timer);
                return;
            }else{
                $scope.emailClick=true;
                $("#email>span").text($scope.TimeE);
            }
        },1000);
        getCode(userId,$scope.userEmail,userType,verificationType);
    };
    //获取电话验证码
    $scope.getForCodTel = function () {//验证电话
        $scope.telClick=false;
        verificationType=0;
        var telPhoneNum = $("#telphone").val();
        var timer=setInterval(function(){//计时器
            $scope.TimeT--;
            $("#tel").addClass("changeOpacity");
            if($scope.TimeT==0){
                btnClass();//改变按钮的状态和样式
                clearInterval(timer);
                return;
            }else{
                $scope.telClick=true;
                $("#tel>span").text($scope.TimeT);
            }
        },1000);
        getCode(userId,telPhoneNum,userType,verificationType);
    };

    //确认按钮
    $scope.goSetNewE = function () {
        var re1 = /^\d{6}$/;
        if (gOChangeWhat == "email") {
            var forEmailCode = $("#forEmailCodeE").val();
            if(!forEmailCode){
                $rootScope.alertPop("请输入验证码");
                return
            }
            if(!re1.test(forEmailCode)){
                $rootScope.alertPop("请输入六位数字的验证码");
                return
            }
            ApiService.GetData("POST", Constant.System.Host + '/judgeVerificationCode', {
                emailOrMobile: $scope.userEmail,
                verificationType: verificationType,
                userId: userId,
                verificationCode: forEmailCode,
                userType: userType
            }).then(function (res) {
                console.log(res);
                if (res.resultCode == 0) {
                    userData[0].userStatus = 1;
                    console.log(userData);
                    localStorage.setItem("userInformation", JSON.stringify(userData));
                    if (res.data[0].mobileOrUserStatus == 1) {
                        $rootScope.hideEo = true;
                    }
                    $rootScope.alertPop("验证成功");
                    $ionicHistory.goBack();
                    $rootScope.$broadcast('refresh');
                } else {
                    if(res.data){
                        $rootScope.alertPop(res.data[0]);
                    }else {
                        $rootScope.alertPop(res.resultMsg);
                    }
                }
            });

        } else if (gOChangeWhat == "tel") {
            var forEmailCode = $("#forEmailCodeT").val();
            if(!forEmailCode){
                $rootScope.alertPop("请输入验证码");
                return
            }
            if(!re1.test(forEmailCode)){
                $rootScope.alertPop("请输入六位数字的验证码");
                return
            }
            ApiService.GetData("POST", Constant.System.Host + '/judgeVerificationCode', {
                emailOrMobile: $("#telphone").val(),
                verificationType: verificationType,
                userId: userId,
                verificationCode: forEmailCode,
                userType: userType
            }).then(function (res) {
                if (res.resultCode == 0) {
                    $rootScope.alertPop("验证成功");
                    $ionicHistory.goBack();
                    $rootScope.$broadcast('refresh');
                } else {
                    if(res.data){
                        $rootScope.alertPop(res.data[0]);
                    }else {
                        $rootScope.alertPop(res.resultMsg);
                    }
                }
            });

        }
    }

    //电话格式验证
    $scope.ifTelIn = function () {
        var telphoneNum = $("#telphone").val();
        console.log($("#telphone").val());
        if (telphoneNum.length == 10 || telphoneNum.length == 12) {
            var re1 = /^\d{10}$/;
            var re2 = /^(\d{3}-)?(\d{3}-)?\d{4}$/;
            if (re1.test(telphoneNum)) {
                re3 = /\d{3}/g;
                $("#telphone").val(telphoneNum.slice(0, 3) + "-" + telphoneNum.slice(3, 6) + "-" + telphoneNum.slice(6, 10));
                $rootScope.phone = $("#telphone").val();
            } else if (re2.test(telphoneNum)) {
                $rootScope.phone = $("#telphone").val();
            } else {
                alert("电话格式错误");
            }
        } else {

        }
    };

})