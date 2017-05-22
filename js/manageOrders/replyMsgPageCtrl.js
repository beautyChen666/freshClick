/**
 * Created by Administrator on 2017-04-06.
 */
appConttoller.controller('replyMsgPageCtrl', function ($scope, $http, Constant, $state,$ionicHistory, ApiService, $timeout,$rootScope,$stateParams,$ionicScrollDelegate) {
    $scope.goBack=function () {
        $ionicHistory.goBack();
        $rootScope.$broadcast("refreshReplayp");
        $rootScope.$broadcast("refreshReplays");
    };
    var userInformation=JSON.parse(localStorage.getItem("userInformation"));
    var thisStorId = $rootScope.nowStoreId,
        thisTeambuyId = $rootScope.thisTeambuyId,
        commentId = $stateParams.commentId;
    $scope.moreDataCanBeLoaded = true;
    $scope.allReplyMsg=[];
    loadReplyComs();
    function loadReplyComs(){
        ApiService.GetData("POST", Constant.System.Host + '/oneCommentJustGetReply', {
            commentId:commentId,
        }).then(function (res) {
            if (res.resultCode == 0) {
                console.log(res);
                $scope.comMsg=res.data;
                $scope.allReplyMsg=$scope.allReplyMsg.concat(res.data.replys);
                if(res.data.user){
                    $scope.custmerUserId=res.data.user.userId;
                };
            }else{
                alert(res.resultMsg);
            }
        })
    }
    //上拉加载
    //$scope.loadMoreReplys = function () {
    //    pageNo++;
    //    console.log("滚动了",pageNo);
    //    if (pageNo <= $scope.allPage) {
    //        loadReplyComs();
    //    } else {
    //        $scope.moreDataCanBeLoaded = false;
    //    }
    //};
    //下拉刷新
    $scope.doRefresh=function(){
        $timeout(function () {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    $scope.$on('stateChangeSuccess', function() {
        $scope.loadReplyComs();
    });

    //发送信息
    $scope.sendReplyMsg=function(){
        var addUserId=userInformation[0].userId,
            custmerUserId=$scope.custmerUserId;
        var replyComment=$("#padLef").val();
        console.log(replyComment,addUserId,custmerUserId,commentId);
        ApiService.GetData("POST", Constant.System.Host + '/replys', {
            commentId:commentId,
            userId:addUserId,
            replyComment:replyComment,
            replyUserStatus:3,
            addUserId:addUserId,
        }).then(function (res) {
            console.log(res);
            if (res.resultCode == 0) {
                console.log(res.data);
                $scope.allReplyMsg=[];
                var pageNo=1;
                loadReplyComs();
                $("#padLef").val("");
            }else{
                $rootScope.alertPop(res.resultMsg);
            }
        })
    }

})