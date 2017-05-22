/**
 * Created by Administrator on 2017-03-21.
 */
appConttoller.controller('inputPwdCtrl', function ($scope, $rootScope, $http, Constant, $state, $stateParams, $ionicNavBarDelegate, ApiService) {
    var userData = JSON.parse(localStorage.getItem("userInformation"));
    if ($stateParams.findPwdEmail) {
        var userId = $stateParams.findPwdEmail;
        //忘记密码
    } else if (userData) {
        var userId = userData[0].userId;
        //修改密码
    }
    //初始化按钮为禁止状态
    $scope.canClick1 = true;
    $scope.canClick2 = true;
    $scope.pwdCheck = function () {
        $scope.canClick1 = true;
        var password = $("#password1").val();
        if(password){
            $scope.canClick1 = false;
        }
    }
    $scope.pwdCheck1 = function () {
        $scope.canClick2 = true;
        var repeatPassword = $("#password2").val();
        if(repeatPassword){
            $scope.canClick2 = false;
        }
    }
    //更新密码
    $scope.upDataNewPwd = function () {
        var reg = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,18}$/;
        var password = $("#password1").val(),
            repeatPassword = $("#password2").val();

        if(!(reg.test(password))){
            $rootScope.alertPop("请输入6~18位字母、数字和特殊字符");
            return
        }
        if(repeatPassword!=password){
            $rootScope.alertPop("前后密码输入不一致，请检查");
            return
        }
        ApiService.GetData("POST", Constant.System.Host + '/updPassword', {
            userId: userId,
            password: password,
            repeatPassword: repeatPassword
        }).then(function (res) {
            if (res.resultCode == 0) {
                $rootScope.alertPop("重置密码成功");
                $state.go("login");
                var data = JSON.stringify(res.data);
                sessionStorage.setItem("userFindPwd", data);
            } else {
                //alert(res.resultMsg);
                $rootScope.alertPop(res.resultMsg);
            }
        });


    }


});