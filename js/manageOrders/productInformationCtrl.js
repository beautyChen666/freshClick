/**
 * Created by Administrator on 2017-04-05.
 */
appConttoller.controller('productInformationCtrl', function ($scope, $http, Constant, $state, ApiService, $timeout,$rootScope,$stateParams){
    var thisStorId = $rootScope.nowStoreId,
        thisTeambuyId=$rootScope.thisTeambuyId,
        thisproductId=$stateParams.thisProductId;
    $scope.producOrd=true;
    $scope.productCom=false;
    $scope.moreDataCanBeLoaded = true;
    $scope.moreDataComBeLoaded = true;
    ApiService.GetData("POST", Constant.System.Host + '/getProductDetail', {
        storeId: thisStorId,
        teambuyId:thisTeambuyId ,
        productId:thisproductId
    }).then(function (res) {
        if (res.resultCode == 0) {
            $scope.prodcDetlInfor=res.data[0];
            if($scope.prodcDetlInfor.currentQuantity<$scope.prodcDetlInfor.productInventory){
                $timeout(function () {
                    $(".productBigPic").addClass("sellingBg");
                })
            }else{
                $timeout(function () {
                    $(".productBigPic").addClass("sellOverBg");
                })
            }

        }else{
            //alert(res.resultMsg);
        }
    })
    //订单
    ApiService.GetData("POST", Constant.System.Host + '/getOrderProductDetail', {
            storeId: thisStorId,
            teambuyId:thisTeambuyId ,
            productId:thisproductId,
            pageNo:1,
            pageSize:3
        }).then(function (res) {
        console.log(res);
        console.log(thisStorId,thisTeambuyId,thisproductId);
        if (res.resultCode == 0) {
            console.log(res.data);
            $scope.threeProductTeambuyOrders=res.data.obj;
            if(res.data.allAmount){
                $scope.allOrderAmount=res.data.allAmount;
            }else{
                $scope.allOrderAmount=0;
            }

            console.log($scope.threeProductTeambuyOrders);
            var len=$scope.threeProductTeambuyOrders.length;
        }else{
            //alert(res.resultMsg);
            $scope.allOrderAmount=0;
        }
    })
    //评论
    ApiService.GetData("POST", Constant.System.Host + '/getDmsCommentsfromproduct', {
            storeId: thisStorId,
            productId:thisproductId,
            pageNo:1,
            pageSize:3
        }).then(function (res) {
        console.log(thisStorId,thisproductId);
        if (res.resultCode == 0) {
            console.log(res.data);
            $scope.threeProductTeambuyComs=res.data.obj;
            console.log(res.data.obj);
            console.log(res.data.allAmount);
            if(res.data.allAmount){
                $scope.allComAmount=res.data.allAmount;
            }else{
                $scope.allComAmount=0;
            }
            var len=$scope.threeProductTeambuyComs.length;
            $timeout(function(){
                for(var i=0;i<len;i++){
                    var Oscore=res.data.obj[i].commentGrade;
                    var changWidS=$(".changWidS")[i];
                    var Owin =Oscore / 10;
                    $(changWidS).css("width", Owin + "rem");

                }
            });
        }else{
            $scope.allOrderAmount=0;
        }
    })
    $scope.OchangeOrder=function(){
        console.log(thisproductId);
        $state.go("goMoreOrder",{"thisProductId":thisproductId});
    }
    $scope.OchangeCom=function(){
        $state.go("goMoreCom",{"thisProductId":thisproductId});
    }
    $scope.goReplyMsgPage=function(){
        var commentId=this.productTeambuyCom.commentId;
        console.log(commentId);
        $state.go("replyMsgPage",{"commentId":commentId})

    }
})