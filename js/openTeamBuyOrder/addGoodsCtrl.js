/**
 * Created by cj on 2017/5/2.
 */
/**
 * Created by cj on 2017-03-21.
 */
appConttoller.controller('addGoodsController', function($scope,$http,Constant,$state,$ionicModal,$stateParams,$ionicNavBarDelegate,ApiService,$ionicPopup,$rootScope,$timeout) {
    $scope.ifCanAdd=true;
    var regNum=/^[0-9]{1,}$/; //价格
    if($stateParams.objGoods!=null){  //如果存在传入的商品值 那么就是编辑商品
        $("#prodName").val($stateParams.objGoods.productName);
        $scope.classifyClasses=[{
            'categoryId':$stateParams.objGoods.productCategory,
            'categoryName':$stateParams.objGoods.productCategoryName
        }];
        $scope.firstCategoryId=$scope.classifyClasses[0].categoryId;
        $("#productDetail").val($stateParams.objGoods.productDetail); //详情
        $("#productInventory").val($stateParams.objGoods.productInventory); //库存
        $("#productPrice").val($stateParams.objGoods.productPrice); //价格
        $scope.productId=$stateParams.objGoods.productId;
        $scope.updTime=$stateParams.objGoods.updTime;
        $scope.ifCanAdd=false;//可点击
    }else {
        $scope.productId=null;
        $scope.updTime=null;
        ApiService.GetData("POST", Constant.System.Host + '/storeCategoryList', {
            storeId:$rootScope.nowStoreId
        }).then(function (res) {
            if(res.resultCode==0){
                $scope.classifyClasses=res.data[0];
                $scope.firstCategoryId=$scope.classifyClasses[0].categoryId;
            }else{
                $rootScope.alertPop(res.resultMsg);
            }
        });
    };
    //function forCategoryList(){  //获取分类接口
    //    ApiService.GetData("POST", Constant.System.Host + '/storeCategoryList', {
    //        storeId:$rootScope.nowStoreId
    //    }).then(function (res) {
    //        if(res.resultCode==0){
    //            $scope.classifyClasses=res.data[0];
    //            $scope.firstCategoryId=$scope.classifyClasses[0].categoryId;
    //        }else{
    //            $rootScope.alertPop(res.resultMsg);
    //        }
    //    });
    //};
    $("#productUnit").change(function() {
        $("#priceUnit").text($("#productUnit").val());
    }); //实时获取select的数据
    $scope.ifAddP=function(){
        var allProd=regNum.test($("#productInventory").val()),
            price=regNum.test($("#productPrice").val());
        if(!isNaN(price)&&$("#prodName").val()!=""&&allProd){
            $scope.ifCanAdd=false;
        }else{
            $scope.ifCanAdd=true;
        }
    };
        $scope.addGoods =function(){  //确认添加完成
            if($scope.ifCanAdd===false){
                ApiService.GetData("POST", Constant.System.Host + '/insertStoreProductMsg', {
                    storeId:$rootScope.nowStoreId,
                    productId:$scope.productId,
                    updTime:$scope.updTime,
                    userId:JSON.parse(localStorage.getItem("userInformation"))[0].userId,
                    productName:$("#prodName").val(),
                    productCategory:$("#productCategory").val(),
                    productDetail:$("#productDetail").val(),
                    productInventory:$("#productInventory").val(),
                    productUnit:$("#productUnit").val(),
                    productPrice:$("#productPrice").val()
                }).then(function (res) {
                    if(res.resultCode==0){
                        $state.go("allGoods");//回到所有商品页面
                        $rootScope.$broadcast('refreshAddGoods');
                        $("#prodName").val('');
                        $("#productCategory").val('');
                        $("#productDetail").val('');
                        $("#productInventory").val('');
                        $("#productPrice").val('');
                        $scope.firstCategoryId=$scope.classifyClasses[0].categoryId;
                    }else{
                        $rootScope.confirmPopup('不要急','去完善商品信息',function(){$state.go('OpenShop',{"thisStoreInfo":1})},function(){console.log('cancel')});  //弹框确认
                    }
                });
            };
        }
});