/**
 * Created by Administrator on 2017-03-20.
 */

//注册页面
appConttoller.controller('RegisterCtrl', function ($scope, $http, Constant, $state, ApiService,$rootScope) {
    $scope.canClick1 = true;
    $scope.canClick2= true;
    $scope.canClick3= true;
    //确认提交按钮的状态
    $scope.pwdCheck = function () {
        $scope.canClick1 = true;
        var password1 = $("#password1").val();
        if(password1){
            $scope.canClick1 = false;
        }

    }
    $scope.pwdCheck1 = function () {
        $scope.canClick2= true;
        var password2 = $("#password2").val();
        if(password2){
            $scope.canClick2 = false;
        }
    }
    $scope.pwdCheck2 = function () {
        $scope.canClick3= true;
        var Remail = $("#email").val();
        if(Remail){
            $scope.canClick3 = false;
        }
    }


    //点击注册按钮
    $scope.getRegister = function () {
        var email = $("#email").val(),
            password = $("#password1").val(),
            repeatPassword = $("#password2").val(),
            goRegistr = $("#goRegistr");
        var reg = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,18}$/;//验证密码
        var regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;//验证邮箱
        if(!(regEmail.test(email))){
            $rootScope.alertPop("邮箱格式错误，请检查");
            return
        }
        if(!(reg.test(password))){
            $rootScope.alertPop("请输入6~18位字母、数字和特殊字符");
            return
        }
        if(repeatPassword!=password){
            $rootScope.alertPop("前后密码输入不一致，请检查");
            return
        }
        ApiService.GetData("POST", Constant.System.Host + '/register', {
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            userType: "1"
        }).then(function (res) {
            console.log(res);
            if (res.resultCode == 0) {
                var data = JSON.stringify(res.data);
                localStorage.setItem("userInformation", data);
                $state.go("imInformation1", {"fromWhere": "register"});
                $rootScope.$broadcast('refresh');
            } else {
                if(res.resultCode == 1){
                    $rootScope.alertPop(res.resultMsg);
                }else {
                    var len = res.data[0].length;
                    var str = "";
                    for (var i = 0; i < len; i++) {
                        str += res.data[0][i] + "!";
                    }
                    $rootScope.alertPop(str);
                }

            }
        });

    }


});
