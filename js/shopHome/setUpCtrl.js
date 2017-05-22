/**
 * Created by Administrator on 2017/5/9 0009.
 */
appConttoller.controller('setUpCtrl', function ($scope, $http, Constant, $state, ApiService,$rootScope) {
    var userId = JSON.parse(localStorage.getItem("userInformation"))[0].userId;
    var pushFlag=JSON.parse(localStorage.getItem("userInformation"))[0].pushFlag;
    if(pushFlag==0){
        $('#isOpen').prop("checked", true);
    }else {
        $('#isOpen').prop("checked", false);
    }
    $scope.isOpenTo = function (ev) {  //单选框设置
        if ($(ev.target).prop('checked')) {
            $('#isOpen').prop("checked", false);
            $(ev.target).prop("checked", true);  //当前选中
            ApiService.GetData('POST', Constant.System.Host + '/changePushFlag', {
                userId: userId
            }).then(function (res) {
                if (res.resultCode === 0) {
                    if(res.data[0]==0){
                        $rootScope.alertPop("开启成功");
                        $rootScope.$broadcast("refresh");
                    }
                }  else {
                    console.log(res.resultMsg);
                }
            });
        } else {
            $('#isOpen').prop("checked", false);
            ApiService.GetData('POST',Constant.System.Host + '/changePushFlag', {
                userId: userId
            }).then(function (res) {
                if (res.resultCode === 0) {
                    if(res.data[0]==1){
                        $rootScope.alertPop("关闭成功");
                        $rootScope.$broadcast("refresh");
                    }
                }  else {
                    console.log(res.resultMsg);
                }
            });
        }
    };

});