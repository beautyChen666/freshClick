/**
 * Created by Administrator on 2017-04-06.
 */
appConttoller.controller('goMoreComCtrl', function ($scope, $http, Constant, $state, ApiService, $timeout,$rootScope,$stateParams) {
    var thisStorId = $rootScope.nowStoreId,
        thisTeambuyId = $rootScope.thisTeambuyId,
        thisproductId = $stateParams.thisProductId;
    $scope.moreDataCanBeLoaded = true;
    $scope.productTeambuyComs=[];
    var pageNo=1;
    loadComs();
    function loadComs(){
        ApiService.GetData("POST", Constant.System.Host + '/getDmsCommentsfromproduct', {
            storeId: thisStorId,
            productId:thisproductId,
            pageNo:pageNo,
            pageSize:6
        }).then(function (res) {
            console.log(thisStorId,thisproductId);
            if (res.resultCode == 0) {
                $scope.allPage=res.data.allPage;
                $scope.productTeambuyComs=$scope.productTeambuyComs.concat(res.data.obj);
                $scope.allComAmount=res.data.allAmount;

                var len=$scope.productTeambuyComs.length;
                if($scope.allPage>pageNo){
                    $scope.moreDataCanBeLoaded = true;
                }else{
                    $scope.moreDataCanBeLoaded=false;
                }
                $timeout(function(){
                    for(var i=0;i<len;i++){
                        if(res.data.obj[i].commentUserFlag==2){
                            $scope.ifBuyed=true;
                        }else{
                            $scope.ifBuyed=false;
                        }
                        var Oscore=res.data.obj[i].commentGrade;

                        var changWidS=$(".changWidSe")[i];
                        var Owin =Oscore / 10;
                        $(changWidS).css("width", Owin + "rem");

                    }
                });

            }else{
                //alert(res.resultMsg);
            }
        })
    }
    $scope.loadMoreComOrder=function(){
        pageNo++;
        console.log("滚动了");
        if (pageNo <= $scope.allPage) {
            loadComs();
        } else {
            $scope.moreDataCanBeLoaded = false;
        }
    }
    //下拉刷新
    $scope.doRefresh=function(){
        $timeout(function () {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    $scope.$on('stateChangeSuccess', function() {
        $scope.loadMoreComOrder();
    });
    $scope.goReplyMsgPage=function(){
        var commentId=this.productTeambuyCom.commentId;
        $state.go("replyMsgPage",{"commentId":commentId})

    }
})