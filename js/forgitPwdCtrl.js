/**
 * Created by Administrator on 2017-03-21.
 */
appConttoller.controller('forgitPwdCtrl', function($scope,$rootScope,$http,Constant,$state,ApiService) {
    //$scope.forBtnCanClk=false;
    $scope.forPwdCodeClick=false;
    $scope.time=60;
    $scope.canClick1 = true;
    $scope.canClick2= true;
    //确认提交按钮的状态
    $scope.pwdCheck = function () {
        $scope.canClick1 = true;
        var forEmail = $("#forEmail").val();
        if(forEmail){
            $scope.canClick1 = false;
        }
    }
    $scope.pwdCheck1 = function () {
        $scope.canClick2= true;
        var forEmailCode = $("#forEmailCode").val();
        if(forEmailCode){
            $scope.canClick2 = false;
        }
    }


    //完成倒计时的样式
    var btnClass=function () {
        $scope.forPwdCodeClick=false;
        $scope.time=60;
        $("#forGetCode").removeClass("changeOpacity");
        $(".rTiming").text("60");
    }
    $scope.getForCode=function(){
        $scope.forPwdCodeClick=false;
        var email=$("#forEmail").val();
        if(!email){
            $rootScope.alertPop("请输入邮箱");
            return;
        }else {
            var regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;//验证邮箱
            if(!regEmail.test(email)){
                $rootScope.alertPop("请输入正确的邮箱格式");
                return;
            }
        }
        var timer=setInterval(function(){//计时器
            $scope.time--;
            $("#forGetCode").addClass("changeOpacity");
            if($scope.time==0){
                btnClass();//改变按钮的状态和样式
                clearInterval(timer);
                return;
            }else{
                $scope.forPwdCodeClick=true;
                $(".rTiming").text($scope.time);
            }
        },1000);

        //调用获取验证码接口
        ApiService.GetData("POST", Constant.System.Host + '/getVerificationCode', {
            emailOrMobile:email,
            userType:1,
            verificationType:2
        }).then(function (res) {
            console.log(res);
            if (res.resultCode == 0) {
                var data=res.data[0];
                $rootScope.alertPop(data.verificationCode);
                //sessionStorage.setItem("findPwdCode",data);
                $scope.findPwdCodeShort=data.verificationCode;
                $scope.thisUserId=data.userId;
            }else{
                var len=res.data.length;
                var str="";
                for(var i=0;i<len;i++){
                    str+=res.data[i]+"!";
                }
                $rootScope.alertPop(str);
                clearInterval(timer);
                btnClass()
            }
        });
    }
    //验证验证码
    $scope.goSetNewPwd=function(){
        var forEmailCode=$("#forEmailCode").val();
        ApiService.GetData("POST",Constant.System.Host+'/judgeVerificationCode',{
            emailOrMobile:$("#forEmail").val(),
            verificationType:2,
            verificationCode:forEmailCode,
            userType:"1"
        }).then(function(res){
            if(res.resultCode==0){
                $state.go("inputPwd",{"findPwdEmail":$scope.thisUserId});
            }else{
                if(res.data){
                    $rootScope.alertPop(res.data[0]);
                }else {
                    $rootScope.alertPop(res.resultMsg);
                }

            }
        });
    }



});