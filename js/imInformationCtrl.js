/**
 * Created by Administrator on 2017-03-21.
 */
appConttoller.controller('ImInformation2Ctrl', function($scope,$http,Constant,$state,$rootScope) {
    var otherInforEmail=$("#otherInforEmail"),
        otherInforTel=$("#otherInforTel");
    //邮箱验证
    $scope.inforEmlCode=function(){
        console.log("你点击了获取邮箱验证码");
        ApiService.GetData("POST", Constant.System.Host + '/getVerificationCode', {
            emailOrMobile:telphone,
            userType:1,
            verificationType:1
        }).then(function (res) {
            console.log(res);
            if (res.resultCode == 0) {
                console.log(res.data);
                $scope.inforEmailCode=res.data;
            }
        });
    };
    //手机验证
    $scope.inForMsgCode=function(){
        console.log("你点击了获取手机验证码");
        ApiService.GetData("POST", Constant.System.Host + '/getVerificationCode', {
            emailOrMobile:telphone,
            userType:1,
            verificationType:0
        }).then(function (res) {
            console.log(res);
            if (res.resultCode == 0) {
                console.log(res.data);
                $scope.inforMobileCode=res.data;
            }
        });

    }

});