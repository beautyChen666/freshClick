/**
 * Created by Administrator on 2017-03-27.
 */
appConttoller.controller('addProductsCtrl', function($scope,$http,Constant,$state,ApiService,$rootScope,$stateParams){
    var thisStoreId=$rootScope.nowStoreId;  //初始化时产生分类
    $scope.addProOrEdit='添加商品';
    $scope.isAdd=0;//添加商品
    $scope.classifyClasses=[];//初始化分类接口数据
    forCategoryList();
    if($stateParams.productsData){
        $scope.isAdd=1;  //编辑商品
        $scope.addProOrEdit='编辑商品';
        $("#prodName").val($stateParams.productsData.productName);
        $scope.firstCategoryId=$stateParams.productsData.productCategory;
        $("#productDetail").val($stateParams.productsData.productDetail); //详情
        $("#productInventory").val($stateParams.productsData.productInventory); //库存
        $("#productPrice").val($stateParams.productsData.productPrice); //价格
        $scope.productId=$stateParams.productsData.productId;
        $scope.updTime=$stateParams.productsData.updTime;
        $scope.ifCanAdd=false;//可点击
    }else {
        $scope.isAdd=0;//添加商品
        $scope.addProOrEdit='添加商品';
    };
    function forCategoryList(){  //获取分类接口
        ApiService.GetData("POST", Constant.System.Host + '/storeCategoryList', {
            storeId:thisStoreId,
        }).then(function (res) {
            if(res.resultCode==0){
                $scope.classifyClasses=res.data[0];
                $scope.firstCategoryId=$scope.classifyClasses[0].categoryId;
            }else{
                $rootScope.alertPop(res.resultMsg);
            }
        });
    };

    $("#productUnit").change(function() {
        $("#priceUnit").text($("#productUnit").val());
    }); //实时获取select的数据
    var thisStorId=$rootScope.nowStoreId;
    //确认添加完成
$scope.addProdOver =function(){
    var productStatus ="",
        productPicUrl1 ="",
        productPicUrl2 ="",
        productPicUrl3 ="",
        storeId=thisStorId;
    var userId=JSON.parse(localStorage.getItem("userInformation"))[0].userId;
    if($scope.isAdd==0){   //添加商品
        ApiService.GetData("POST", Constant.System.Host + '/insertStoreProductMsg', {
            storeId:storeId,
            userId:userId,
            productName:$("#prodName").val(),
            productCategory:$("#productCategory").val(),
            productDetail:$("#productDetail").val(),
            productInventory:$("#productInventory").val(),
            productUnit:$("#productUnit").val(),
            productPrice:$("#productPrice").val(),
            productLogo:upimgSrc // 商品LOGO
//        productPicUrl1:"", // 商品图片URL1
//        productPicUrl2:"", // 商品图片URL2
//        productPicUrl3:""  // 商品图片URL3

        }).then(function (res) {
            if(res.resultCode==0){
                $state.go("manageProducts",{"thisStorId":thisStorId},{reload:true});
                $("#prodName").val('');
                $("#productCategory").val('');
                $("#productDetail").val('');
                $("#productInventory").val('');
                $("#productPrice").val('');
                $scope.firstCategoryId=$scope.classifyClasses[0].categoryId;
            }else{$rootScope.confirmPopup('不要急','去完善商品信息',function(){$state.go('OpenShop',{"thisStoreInfo":1})},function(){console.log('cancel')});  //弹框确认
            }
        });
    }else if($scope.isAdd==1){  //编辑商品
        ApiService.GetData("POST", Constant.System.Host + '/updateStoreProductMsg', {
            storeId:storeId,
            userId:userId,
            prodectId:$stateParams.productsData.prodectId,
            productName:$("#prodName").val(),
            productCategory:$("#productCategory").val(),
            productDetail:$("#productDetail").val(),
            productInventory:$("#productInventory").val(),
            productUnit:$("#productUnit").val(),
            productPrice:$("#productPrice").val(),
            productLogo:upimgSrc // 商品LOGO
//        productPicUrl1:"", // 商品图片URL1
//        productPicUrl2:"", // 商品图片URL2
//        productPicUrl3:""  // 商品图片URL3

        }).then(function (res) {
            if(res.resultCode==0){
                $state.go("manageProducts",{"thisStorId":thisStorId},{reload:true});
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
    }
};
    $scope.ifCanAdd=true;
    var regNum=/^[0-9]{1,}$/;
    $scope.ifAddP=function(){
        var allProd=regNum.test($("#productInventory").val()),
            price=regNum.test($("#productPrice").val());
        if(!isNaN(price)&&$("#prodName").val()!=""&&allProd){
                $scope.ifCanAdd=false;
        }else{
            $scope.ifCanAdd=true;
        }
    };
//上传图片
    $scope.uploadImgs=function () {
        cordova.exec(successExecResult, failExecResult, "RYPlugin", "selectPhoto", [111]);
    }

    function successExecResult(imagesUrl){
        showImages(imagesUrl);
    }

    function failExecResult(message){
        $rootScope.alertPop("验证失败："+message);
    }

    var upimgSrc="";

    function showImages(imagesUrl) {
        upimgSrc = imagesUrl[0].imgPath;
        $(".addProPic>img").attr("src",Constant.System.ResourceImageHost+imagesUrl[0].imgPath);

    }




});