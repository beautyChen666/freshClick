/**
 * Created by ZCR on 2017-04-28.
 */
appConttoller.controller('manageBankCardCtrl', function ($scope, $http, Constant, $state, $stateParams, ApiService, $rootScope, $ionicHistory) {
    var userData = JSON.parse(localStorage.getItem("userInformation"));
    var userId = userData[0].userId;
    console.log(userId);
    $scope.bankDetail = [];
    $scope.userAccountId = "";
    function getHistoryData(userId) {
        ApiService.GetData("POST", Constant.System.Host + '/getAccountInfo', {
            userId: userId
        }).then(function (res) {
            if (res.resultCode == 0) {
                $scope.bankDetail = res.data[0];
                if (!$scope.bankDetail) {
                    $scope.userAccountId = "";
                } else {
                    $scope.userAccountId = $scope.bankDetail.userAccountId;
                    isShow();
                }
            }
        });
    }

    getHistoryData(userId);

    $scope.canClick1 = true;
    $scope.canClick2 = true;
    $scope.canClick3 = true;
    $scope.canClick4 = true;
    //请求成功后判断是否有值
    function isShow() {
        if ($scope.bankDetail.bankCardName) {
            $scope.canClick1 = false;
        }
        if ($scope.bankDetail.bankCode) {
            $scope.canClick2 = false;
        }
        if ($scope.bankDetail.bankCardCode) {
            $scope.canClick3 = false;
            $scope.canClick4 = false;
        }
    }


    // if($scope.bankDetail.)
    //确认提交按钮的状态
    $scope.nonBlankCheck1 = function () {
        $scope.canClick1 = true;
        var userNameM = $("#userNameM").val();
        if (userNameM) {
            $scope.canClick1 = false;
        }
    }
    $scope.nonBlankCheck2 = function () {
        $scope.canClick2 = true;
        var bankCode = $("#bankCode").val();
        if (bankCode) {
            $scope.canClick2 = false;
        }
    }
    $scope.nonBlankCheck3 = function () {
        $scope.canClick3 = true;
        var bankNum = $("#bankNum").val();
        if (bankNum) {
            $scope.canClick3 = false;
        }
        console.log($scope.canClick3);
    }
    $scope.nonBlankCheck4 = function () {
        $scope.canClick4 = true;
        var repeatBankNum = $("#repeatBankNum").val();
        if (repeatBankNum) {
            $scope.canClick4 = false;
        }

    };


    //确认银行账号
    $scope.subBankCard = function () {
        var re1 = /^\d{9}$/;
        var re2 = /^\d{1,20}$/;
        var bankCode = $("#bankCode").val();
        var bankNum = $("#bankNum").val();
        var repeatBankNum = $("#repeatBankNum").val();
        if (!re1.test(bankCode)) {
            $rootScope.alertPop("银行代码为9位数字");
            return
        }
        if (!re2.test(bankNum)) {
            $rootScope.alertPop("银行账号不超过20位的数字");
            return
        }
        if (bankNum != repeatBankNum) {
            $rootScope.alertPop("前后输入的账号不一致，请检查");
            return
        }
        // * 方法名 updAccountInfo
        // * @param bankCardCode        银行卡号
        // * @param confirmBankCardCode 确认银行卡号
        // * @param userId              用户ID
        // * @param bankName            银行名称
        // * @param bankCode            银行代号
        // * @param bankCardName        银行户名
        // * @param userType            用户类型
        // * @param userAccountId       用户银行账号ID
        console.log(bankNum,repeatBankNum,userId, $("#bankName").val(),bankCode,$("#userNameM").val(),$scope.userAccountId);
        ApiService.GetData("POST", Constant.System.Host + '/updAccountInfo', {
            bankCardCode: bankNum,
            confirmBankCardCode: repeatBankNum,
            userId: userId,
            bankName: $("#bankName").val(),
            bankCode: bankCode,
            bankCardName: $("#userNameM").val(),
            userType: 1,
            userAccountId: $scope.userAccountId
        }).then(function (res) {
            if (res.resultCode == 0) {
                if (!$scope.bankDetail) {
                    $rootScope.alertPop("添加账号成功");
                } else {
                    $rootScope.alertPop("更新账号成功");
                }
                $ionicHistory.goBack();
            } else {
                $rootScope.alertPop(res.resultMsg);
            }
        });
    }
})