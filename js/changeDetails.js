/**
 * Created by Administrator on 2017/3/22.
 */
appConttoller.controller('ChangeDetailsCtrl', function($scope,$ionicHistory,$rootScope,$stateParams,Constant,$http,$state,ApiService) {
    var nowChange=$stateParams.GOChangeWhat,
        nowVal='',
        nowCode='0';
    $scope.nowChangeWhat =nowChange; //openshop跳转传递修改什么
    $scope.ChangeType ='email';//默认初始的input类型为email
    $scope.CanClickCode=false; //发送验证码
    $scope.ChangeDetailsCanClick=true; //最后确定禁止
    $scope.second=60;
    $scope.description='获取验证码';
    $scope.ChangeDetailVerCode=false;  //获取验证码按钮是否能点击 初始禁止
    $scope.keyup=false;  //获取验证码是否正确
    $scope.isTestOK=false;//邮箱或电话验证是否成功
    $scope.verificationType=1;//初始类型为邮箱
    var timerHandler='';
    ////定义修改的类型
    function changeTheType(){
        if(nowChange==='email'){
            $scope.second=60; //验证码时间
            $scope.ChangeDetailVerCode=false;
            $scope.CanClickCode=false; //发送验证码
            $scope.ChangeDetailsCanClick=true; //最后确定禁止
            $scope.ChangeType ='email'; //定义input类型为email
            $scope.nowChangeWhat='邮箱'; //定义此次修改邮箱
            $scope.keyup=false;  //获取验证码是否正确
            $scope.verificationType=1;//类型为邮箱
        }else if(nowChange==='tel'){
            $scope.second=60; //验证码时间
            $scope.ChangeDetailVerCode=false;
            $scope.CanClickCode=false; //发送验证码
            $scope.ChangeDetailsCanClick=true; //最后确定禁止
            $scope.ChangeType ='text'; //定义input类型为email
            $scope.nowChangeWhat='电话'; //定义修改电话
            $scope.keyup=false;  //获取验证码是否正确
            $scope.verificationType=0;//类型为电话
        }
    };
    //开店修改默认邮箱和电话获取验证码
    $scope.ChangeDetailsCode = function () {
        if($("#ChangeDetailsWhat").val()!=''){
             if($scope.ChangeDetailVerCode===true){
                    timerHandler = setInterval(function () {
                     $scope.second--;
                     $("#GetChangeDetailsCode").addClass("changeOpacity");
                     if ($scope.second===0) {
                         $scope.CanClickCode = false;
                         $scope.second = 60;
                         $("#GetChangeDetailsCode").removeClass("changeOpacity");
                         $("#timing").text("60");
                         $('#ChangeDetailsWhat').removeAttribute("readonly");
                         clearInterval(timerHandler);
                     } else {
                         $scope.CanClickCode = true;
                         $("#timing").text($scope.second);
                     }
                 }, 1000);
                 if(timerHandler){  //获取验证
                     nowChangeVal=$('#ChangeDetailsWhat').val();
                     if (nowChange === 'email') {  //为邮箱修改请求
                         $http({
                             url:Constant.System.Host + '/getVerificationCode',
                             method: "POST",
                             params: {
                                 emailOrMobile:nowChangeVal,
                                 verificationType: 1
                             }
                         }).success(function (res) {
                             if(res.resultCode == 0){
                                 nowCode=res.data[0].verificationCode;
                                 $rootScope.alertPop(res.data[0].verificationCode);
                             }else {
                                 $rootScope.alertPop(res.resultMsg);
                             }
                         }).error(function (err) {
                         });
                     } else if (nowChange === 'tel') {  //为电话修改请求
                         $http({
                             url:Constant.System.Host + '/getVerificationCode',
                             method: "POST",
                             params: {
                                 emailOrMobile:nowChangeVal,
                                 verificationType: 0
                             }
                         }).success(function (res) {
                             if (res.resultCode == 0) {
                                 nowCode=res.data[0].verificationCode;
                                 $rootScope.alertPop(res.data[0].verificationCode);
                             } else {
                                 $rootScope.alertPop(res.resultMsg);
                             }
                         }).error(function (err) {
                         })
                     };
                 }
                $scope.ChangeDetailVerCode = true;
            }else{
                 $rootScope.alertPop("输入格式不正确哦");
            };
        }else {
            $rootScope.alertPop("输入不能为空");
        }
    };
    $scope.ifTelIn=function(){ //文本框失焦的时候
        if(nowChange === 'tel') {
            var telphoneNum = $("#ChangeDetailsWhat").val();
            if (telphoneNum == "") {
                $scope.ChangeDetailVerCode = false;
                return false;
            } else {
                var re1 = /^\d{10}$/,
                    re2 = /^(\d{3}-)?(\d{3}-)?\d{4}$/;
                if (re1.test(telphoneNum)){
                    $scope.ChangeDetailVerCode = true;
                    re3 = /\d{3}/g;
                    $("#ChangeDetailsWhat").val(telphoneNum.slice(0, 3) + "-" + telphoneNum.slice(3, 6) + "-" + telphoneNum.slice(6, 10));
                    $scope.isTestOK=true;
                } else if (re2.test(telphoneNum)) {
                    $scope.ChangeDetailVerCode = true;
                    $scope.isTestOK=true;
                } else {
                    $scope.ChangeDetailVerCode = false;
                    $scope.isTestOK=false;
                }
            }
        }else if(nowChange === 'email'){
            var patten=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+/,
                emailNow= $("#ChangeDetailsWhat").val();
            if(emailNow!=''){
                if(patten.test(emailNow)){  //验证邮箱格式正确
                    $scope.ChangeDetailVerCode=true;  //获取验证码按钮是能点击
                    $scope.isTestOK=true;
                }else {
                    $scope.ChangeDetailVerCode=false;  //获取验证码按钮是bu能点击
                    $scope.isTestOK=false;
                }
            }else {
                $scope.ChangeDetailVerCode=false;  //获取验证码按钮是bu能点击
                return false;
            }
        }
    };

    $scope.KeyFor=function(){  //验证验证码是否正确
        if($('#ChangeDetailsCode').val()===nowCode){
            $scope.ChangeDetailsCanClick=false;
            $scope.keyup=true;
        }else {
            $scope.ChangeDetailsCanClick=true;
            $scope.keyup=false;
        };
    };

    $scope.ChangeDetailsNow=function() { //点击确定按钮  存储所修改数据 并且跳转到开店页面
        if(nowChange === 'tel'){
            $rootScope.storeStatue=1;
        }else {$rootScope.storeStatue=2;}
        if($scope.isTestOK===true){
            ApiService.GetData("POST", Constant.System.Host + '/judgeVerificationCode',{
                emailOrMobile:$('#ChangeDetailsWhat').val(),
                verificationType: $scope.verificationType,
                userId:JSON.parse(localStorage.getItem("userInformation"))[0].userId,
                verificationCode: nowCode,
                userType: 1
            }).then(function (res) {  //再次矫正邮箱,电话和发送验证时候的是否相同
                if (res.resultCode === 0) {
                    $rootScope.sendToShopChangeWhat=$('#ChangeDetailsWhat').val();
                    $ionicHistory.goBack();
                    $scope.ChangeDetailVerCode=false;
                    $("#ChangeDetailsWhat").val(' ');
                    clearInterval(timerHandler);
                    $scope.CanClickCode=false;
                    $scope.second=60;
                    $scope.description='获取验证码';
                } else {
                    $rootScope.alertPop($scope.nowChangeWhat+"两次输入不相同");
                }
            });
        }else {
            $rootScope.alertPop($scope.nowChangeWhat+'格式不正确');
        }

    }
    $scope.getTheSend=function(){
        changeTheType();
        clearInterval(timerHandler);
        $scope.ChangeDetailVerCode=false;
        $("#ChangeDetailsWhat").val('');
        $scope.CanClickCode=false;
        $scope.second=60;
        $scope.description='获取验证码';

    }
    $scope.$on('$stateChangeSuccess', $scope.getTheSend);
});

