/**
 * Created by Administrator on 2017-03-22.
 */
appConttoller.controller('goOpenShopCtrl', function($scope,$rootScope,$http,Constant,$state,$stateParams,$ionicSideMenuDelegate,ApiService,$ionicPopup,$timeout,$ionicHistory) {
    var userData=JSON.parse(localStorage.getItem("userInformation")),
        userNickname=userData.nickname;
    $scope.userNikname=userNickname;
    var fromLogin=$stateParams.fromLogin;
    if(fromLogin==2){
        setPopup();
    };
    $scope.initSrc=Constant.System.ResourceImageHost+userData[0].userImgUrl;
    //退出登录
    $scope.logOut=function(){
        ApiService.GetData("POST", Constant.System.Host + '/logOut', {

        }).then(function (res) {
            console.log(res);
            if(res.resultCode==0){
                console.log(res.data);
            }else{
                alert(res.resultMsg);
            }
        });
        localStorage.removeItem("userInformation");
        if($ionicSideMenuDelegate.$getByHandle("isSideOpen").isOpen()){
            $ionicSideMenuDelegate.$getByHandle("isSideOpen").toggleLeft(false);
        }
    };
    //弹框 去验证邮箱
    function setPopup(){
        var confirmPopup = $ionicPopup.confirm({
            title: '请验证邮箱',
            template: '你还没有验证邮箱',
            cssClass:'myPopup',
            cancelText: '取消', // String (默认: 'Cancel')。一个取消按钮的文字。
            cancelType: 'button-stable', // String (默认: 'button-default')。取消按钮的类型。
            okText: '验证', // String (默认: 'OK')。OK按钮的文字。
            okType: 'button-balanced', // String (默认: 'button-positive')。OK按钮的类型。
        });
        confirmPopup.then(function(res) {
            if(res) {
                $state.go("changeEmail",{"gOChangeWhat":'email'});
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.goOpenStore=function(){      //去开店
        console.log(userData[0].userStatus);
        if(userData[0].userStatus==1){
            $rootScope.storeStatue=2;//初始开店负责人状态
            $state.go("OpenShop");
        }else{
            setPopup();
        }
    };
    //去个人信息
    $scope.goOnesInfo=function(){
        $ionicHistory.clearCache();
        $state.go("imInformation1",{"fromWhere":"fromOnesInfo"},{ reload: true});
    }

    $rootScope.$on("refresh",function () {
        userData=JSON.parse(localStorage.getItem("userInformation")),
            userNickname=userData.nickname;
    })

});