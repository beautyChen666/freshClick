/**
 * Created by Administrator on 2017-03-27.
 */
appConttoller.controller('manageProductsCtrl', function($scope,$http,Constant,$state,$timeout,$stateParams,ApiService,$rootScope,$ionicScrollDelegate){
    var thisStorId=$rootScope.nowStoreId;
    console.log($rootScope.nowStoreId);
    $scope.someProducts=[];
    var pageNo = 1;
    $scope.goHome=function(){
        $state.go("shopHome",{"thisStorId":thisStorId},{reload:true});
    };
    $scope.showPro=true;
    $scope.imagePreSrc = Constant.System.ResourceImageHost;
    loadProductsList('1');
    function loadProductsList(selectStatus) {
        ApiService.GetData("POST", Constant.System.Host + '/getStoreProductList', {
            storeId: thisStorId,
            selectStatus: selectStatus,
            pageNo: pageNo,
        }).then(function (res) {
            console.log(pageNo,$scope.showPro);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (res.resultCode == 0) {
                console.log(res.data[0].obj);
                $scope.allPage = res.data[0].allPage;
                if($scope.allPage>pageNo){
                    $scope.moreDataCanBeLoaded = true;
                }else{
                    $scope.moreDataCanBeLoaded=false;
                }
                //数据拼接
                console.log($scope.someProducts);
                $scope.someProducts = $scope.someProducts.concat(res.data[0].obj);
                console.log($scope.someProducts);

                //动态加载星星样式
                var len=$scope.someProducts.length;
                $timeout(function(){
                    for(var i=0;i<len;i++){
                        var Oscore=$scope.someProducts[i].grade;
                        var changeW=$(".changeW")[i];
                        var Owin =2*Oscore / 10;
                        $(changeW).css("width",  Owin+ "rem");
                    };
                });
            }else {
                $rootScope.alertPop(res.resultMsg);
            }
        });
    }
    //上拉加载页面
    $scope.moreDataCanBeLoaded = true;
    $scope.loadMoreProducts = function () {
        pageNo++;
        if (pageNo <= $scope.allPage) {
            console.log($scope.showPro);
            if ($scope.showPro==true) {

                loadProductsList(1);
            } else {

                loadProductsList(0);
            }
        } else {
            $scope.moreDataCanBeLoaded = false;
        }
    }
    //下拉刷新
    $scope.doRefresh=function(){
        if ($scope.showPro==true) {
            $scope.someProducts=[];
            var pageNo = 1;
            loadProductsList(1);
        } else {
            $scope.someProducts=[];
            var pageNo = 1;
            loadProductsList(0);
        }
        $timeout(function () {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }


    //点击切换，选项卡
    //隐藏
    $scope.hideProDo=function(){
        console.log(pageNo);
        pageNo = 1;
        $scope.moreDataCanBeLoaded=false;
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        $scope.someProducts = [];
        $scope.showPro=false;
        $(".showProd").removeClass("nowChoose");
        $(".hideProd").addClass("nowChoose");
        loadProductsList("0");
        console.log(pageNo);
    }
    //可售
    $scope.showProDo=function(){
        pageNo = 1;
        $scope.someProducts = [];
        $scope.moreDataCanBeLoaded=false;
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        $(".hideProd").removeClass("nowChoose");
        $(".showProd").addClass("nowChoose");
        $scope.showPro=true;
        loadProductsList("1");
    }

    //隐藏or恢复
    $scope.toHidePro=function(){
        $scope.someProducts.splice($scope.someProducts.indexOf(this.oneProduct),1);  //删除数组当前隐藏的数据
        var productId=this.oneProduct.productId;
        ApiService.GetData("POST", Constant.System.Host + '/changeProductStatus', {
            productId: productId
        }).then(function (res) {
            if (res.resultCode == 0) {
                $scope.someProducts = [];
                loadProductsList("1");
            }
        });
    };
    $scope.toShowPro= function () {   //显示恢复
        console.log("aaaa");
        $scope.someProducts.splice($scope.someProducts.indexOf(this.oneProduct),1);
        var productId=this.oneProduct.productId;
        ApiService.GetData("POST", Constant.System.Host + '/changeProductStatus', {
            productId: productId
        }).then(function (res) {
            if (res.resultCode == 0) {
                $scope.someProducts = [];
                loadProductsList("0");
            }
        });
    };

    $scope.addProd=function(){     //添加商品
        $state.go("addProducts",{"thisStorId":thisStorId});

    }
    $scope.goProdInfor=function(oneProduct){  //点击商品进入编辑商品
        console.log(oneProduct);
        $state.go('addProducts',{productsData:oneProduct});
    }
})