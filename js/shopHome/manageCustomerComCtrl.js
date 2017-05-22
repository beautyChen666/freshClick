/**
 * Created by Administrator on 2017-04-13.
 */
appConttoller.controller('manageCustomerComCtrl', function ($scope, $http, Constant, $state, ApiService, $timeout,$rootScope,$stateParams){
    var thisStorId = $rootScope.nowStoreId;

    //$scope.someCunCom=[{},{},{}];
    $scope.moreDataCanBeLoaded = true;
    $scope.someCunCom=[];
    $scope.ifHavaData=false;
    var pageNo=1;
    loadProdCom();
    function loadProdCom(){
        ApiService.GetData("POST", Constant.System.Host + '/userCommentManage', {
            storeId: thisStorId,
            pageNo:pageNo,
            pageSize:4,
        }).then(function (res) {
            if (res.resultCode == 0) {
                //$scope.allComAmount=res.data[0].allAmount;
                $scope.allPage=res.data[0].allPage;
                if($scope.allPage>pageNo){
                    $scope.moreDataCanBeLoaded = true;
                }else{
                    $scope.moreDataCanBeLoaded=false;
                }
                $scope.someCunCom= $scope.someCunCom.concat(res.data[0].obj);
                var len=$scope.someCunCom.length;
                for(var i=0 ;i<len;i++){
                    $scope.someCunCom[i].starArray = [
                        {
                            "num": 1,
                            "icon": "ion-android-star-outline"
                        },
                        {
                            "num": 2,
                            "icon": "ion-android-star-outline"
                        },
                        {
                            "num": 3,
                            "icon": "ion-android-star-outline"
                        },
                        {
                            "num": 4,
                            "icon": "ion-android-star-outline"
                        },
                        {
                            "num": 5,
                            "icon": "ion-android-star-outline"
                        }
                    ];
                    $scope.DoEvaluate($scope.someCunCom[i].grade,$scope.someCunCom[i].starArray);
                }
                if(len==0){
                    $rootScope.alertPop('没有评论和回复数据哦');
                    //$scope.ifHavaData=true;
                }
                $timeout(function(){
                    for(var i=0;i<len;i++){
                        var ifBuyede=$(".ifBuyede")[i];
                        if($scope.someCunCom[i].commentUserFlag==2){
                            $(ifBuyede).addClass("bgBuyed");
                        }else{
                            $(ifBuyede).removeClass("bgBuyed");
                        }
                    }
                });
            }else{
                $rootScope.alertPop(res.resultMsg);
            }
        })
    }

    //定义一个数组 映射五颗星星的位置和图片
    $scope.starNum = 0;
    $scope.DoEvaluate = function (num,starArray) {
        starArray.map(function (value, i, array) {
            if (i + 1 <= num) {
                value.icon = "ion-android-star";
            } else {
                value.icon = "ion-android-star-outline";
            }
        });
        $scope.starNum = num;
    };


    //下拉刷新
    $scope.doRefresh=function(){
        $timeout(function () {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    $scope.$on('stateChangeSuccess', function() {
        loadProdCom();
    });

    $scope.loadMoreProdCom=function(){
        pageNo++;
        if (pageNo <= $scope.allPage) {
            loadProdCom();
        } else {
            $scope.moreDataCanBeLoaded = false;
        }
    };

    $scope.goReplyMsg=function(){
        var commentId=this.oneCusCom.commentId;
        $state.go("replyMsgPage",{"commentId":commentId})

    }

    $rootScope.$on("refreshReplayp",function () {
        pageNo=1;
        $scope.someCunCom=[];
        loadProdCom();
    })

})