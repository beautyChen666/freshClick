/**
 * Created by Administrator on 2017-04-07.
 */
appConttoller.controller('msgToOtherCtrl', function ($scope, $http, Constant, $state, ApiService, $timeout,$rootScope,$stateParams) {
    var thisStorId = $rootScope.nowStoreId;
    $scope.moreDataCanBeLoaded = true;
    $scope.allMsgToOthers=[];
    var pageNo=1;
    loadMsg();
    function loadMsg(){
        ApiService.GetData("POST", Constant.System.Host + '/getStoreCommentList', {
            storeId: thisStorId,
            pageNo:pageNo,
        }).then(function (res) {
            console.log(thisStorId,pageNo);
            console.log(res);
            if (res.resultCode == 0) {
                console.log(res.data);
                $scope.allPage=res.data.allPage;
                $scope.allComAmount=res.data.allAmount;
                $scope.allMsgToOthers=$scope.allMsgToOthers.concat(res.data.obj);
                $scope.comIdArray="";
                if($scope.allPage>pageNo){
                    $scope.moreDataCanBeLoaded = true;
                }else{
                    $scope.moreDataCanBeLoaded=false;
                }
                var len=$scope.allMsgToOthers.length;
                //if(res.data.obj[0].commentUserFlag==2){
                //    $scope.ifBuyed=true;
                //}else{
                //    $scope.ifBuyed=false;
                //}
                //$timeout(function(){
                //    for(var i=0;i<len;i++){
                //        $scope.comIdArray+=res.data.obj[i].commentId+',';
                //        $scope.comIdArray= $scope.comIdArray.substr(0, $scope.comIdArray.length - 1);
                //        ApiService.GetData("POST", Constant.System.Host + '/changeCommentFlag', {
                //            commentIdArray:$scope.comIdArray,
                //        }).then(function (res) {
                //            if(res.resultCode==0){
                //
                //            }else{
                //                //alert(res.resultMsg);
                //            }
                //        });
                //    }
                //});



            }else{
                $rootScope.alertPop(res.resultMsg);
            }
        })
    }
    //下拉刷新
    $scope.doRefresh=function(){
        $scope.allMsgToOthers=[];
        pageNo=1;
        loadMsg();
        $timeout(function () {
            $scope.$broadcast('scroll.refreshComplete');

        }, 1000);
    }
    $scope.$on('stateChangeSuccess', function() {
        loadMsg();
    });

    $scope.loadMoreMsgTo=function(){
        pageNo++;
        console.log("滚动了",pageNo,$scope.allPage);
        if (pageNo <= $scope.allPage) {
            loadMsg();
            console.log();
        } else {
            $scope.moreDataCanBeLoaded = false;
        }
    };

    $scope.goReplyMsg=function(){
        var commentId=this.msgToSomeOne.commentId;
        $state.go("replyMsgPage",{"commentId":commentId})
    }

    $rootScope.$on("refreshReplay",function () {
        $scope.allMsgToOthers=[];
        pageNo=1;
        loadMsg();
    })
})