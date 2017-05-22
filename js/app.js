// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in ApiServices.js
// 'starter.controllers' is found in loginController.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.interceptor']);
app.run(function ($ionicPlatform, ApiService, Constant, $rootScope, $ionicPopup, $ionicHistory) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    // 确认对话框
    $rootScope.confirmPopup = function (title, content, confirmFun, cancelFun) {
        $ionicPopup.confirm({
            title: title,
            template: content
        }).then(function (res) {
            if (res) {
                confirmFun();
            } else {
                cancelFun();
            }
        });
    };
    // 提示对话框
    $rootScope.alertPop = function (content) {
        $ionicPopup.alert({
            title: '温馨提示：',
            template: content
        });
    };

});

app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    $ionicConfigProvider.platform.ios.scrolling.jsScrolling(true);
    $ionicConfigProvider.platform.android.scrolling.jsScrolling(true);
    //添加http请求拦截器
    $httpProvider.interceptors.push('httpInterceptor');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in loginController.js
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'login': {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('register', {
            url: '/register',
            views: {
                'login': {
                    templateUrl: "templates/register.html",
                    controller: "RegisterCtrl"
                }
            }
        })
        .state('imInformation1', {
            url: '/imInformation1?fromWhere',
            views: {
                'login': {
                    templateUrl: "templates/imInformation1.html",
                    controller: "ImInformation1Ctrl"
                }
            },
        })
        .state('changeEmail', {
            url: 'imInformation1/changeEmail',
            views: {
                'login': {
                    templateUrl: "templates/changeEmail.html",
                    controller: "changeEmailCtrl"
                }
            },
            params: {
                gOChangeWhat: null,
            }
        })
        .state('changeTel', {
            url: 'imInformation1/changeTel',
            views: {
                'login': {
                    templateUrl: "templates/changeTel.html",
                    controller: "changeEmailCtrl"
                }
            },
            params: {
                gOChangeWhat: null,
            }
        })
        .state('imInformation2', {
            url: '/imInformation2',
            views: {
                'login': {
                    templateUrl: "templates/imInformation2.html",
                    controller: "ImInformation2Ctrl"
                }
            }
        })
        .state('forgitPwd', {
            url: '/forgitPwd',
            views: {
                'login': {
                    templateUrl: "templates/forgitPwd.html",
                    controller: "forgitPwdCtrl"
                }
            }
        })
        .state('inputPwd', {
            url: '/inputPwd?findPwdEmail',
            views: {
                'login': {
                    templateUrl: "templates/inputPwd.html",
                    controller: "inputPwdCtrl"
                }
            }
        })
        .state('manageBankCard', {
            url: '/manageBankCard',
            views: {
                'login': {
                    templateUrl: "templates/manageBankCard.html",
                    controller: "manageBankCardCtrl"
                }
            }
        })
        .state('goOpenShop', {
            url: '/goOpenShop?fromLogin',
            views: {
                'login': {
                    templateUrl: "templates/goOpenShop.html",
                    controller: "goOpenShopCtrl"
                }
            }
        })
        .state('myShop', {
            url: '/myShop',
            cache:'false',
            views: {
                'login': {
                    templateUrl: "templates/myShop.html",
                    controller: "myShopCtrl"
                }
            }
        })
        .state('setUp', {
            url: '/setUp',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/setUp.html",
                    controller: "setUpCtrl"
                }
            }
        })
        .state('newsCenter', {
            url: '/newsCenter',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/newsCenter.html",
                    controller: "newsCenterCtrl"
                }
            }
        })
        .state('shopHome', {
            url: '/shopHome?thisStorId',
            cache:'false',
            views: {
                'login': {
                    templateUrl: "templates/shopHome.html",
                    controller: "shopHomeCtrl"
                }
            },
            params: {
                thisStorId: null
            }
        })
        .state('distributionRoute', {
            url: '/shopHome/distributionRoute',
            cache: false,
            views: {
                'login': {
                    templateUrl: "templates/shopHome/distributionRoute.html",
                    controller: "distributionRouteController"
                }
            }
        })
        .state('singleDistribution', {
            url: '/shopHome/distributionRoute/singleDistribution',
            cache: true,
            views: {
                'login': {
                    templateUrl: "templates/shopHome/singleDistribution.html",
                    controller: "singleDistributionController"
                }
            },
            params: {singleDisId: null}
        })
        .state('addProducts', {
            url: '/shopHome/addProducts',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/addProducts.html",
                    controller: "addProductsCtrl"
                }
            },
            params:{productsData: null}
        })
        .state('manageProducts', {
            url: '/shopHome/manageProducts',
            cache: false,
            views: {
                'login': {
                    templateUrl: "templates/shopHome/manageProducts.html",
                    controller: "manageProductsCtrl"
                }
            }
        })
        .state('dataStatistics', {
            url: '/shopHome/dataStatistics',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/dataStatistics.html",
                    controller: "dataStatisticsCtrl"
                }
            }
        })
        .state('msgToOther', {
            url: '/shopHome/msgToOther',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/msgToOther.html",
                    controller: "msgToOtherCtrl"
                }
            }
        })
        .state('manageCustomerCom', {
            url: '/shopHome/manageCustomerCom',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/manageCustomerCom.html",
                    controller: "manageCustomerComCtrl"
                }
            }
        })
        .state('manageCustomer', {
            url: '/shopHome/manageCustomer',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/manageCustomer.html",
                    controller: "manageCustomerCtrl"
                }
            }
        })
        .state('manageOrder', {
            url: '/shopHome/manageOrder',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/manageOrder.html",
                    controller: "manageOrderCtrl"
                }
            }
        })
        .state('historyOrders', {
            url: '/shopHome/historyOrders',
            views: {
                'login': {
                    templateUrl: "templates/shopHome/historyOrders.html",
                    controller: "historyOrderCtrl"
                }
            }
        })
        .state('teamOrderInfor', {
            url: '/shopHome/teamOrderInfor?ifChangeTime',
            views: {
                'login': {
                    templateUrl: "templates/manageOrders/teamOrderInfor.html",
                    controller: "teamOderInforCtrl"
                }
            }
        })
        .state('productInformation', { //商品详情
            url: '/shopHome/productInformation?thisProductId',
            views: {
                'login': {
                    templateUrl: "templates/manageOrders/productInformation.html",
                    controller: "productInformationCtrl"
                }
            }
        })
        .state('goMoreOrder', {
            url: '/shopHome/goMoreOrder?thisProductId',
            views: {
                'login': {
                    templateUrl: "templates/manageOrders/goMoreOrder.html",
                    controller: "goMoreOrderCtrl"
                }
            }
        })
        .state('goMoreCom', {
            url: '/shopHome/goMoreCom?thisProductId',
            views: {
                'login': {
                    templateUrl: "templates/manageOrders/goMoreCom.html",
                    controller: "goMoreComCtrl"
                }
            }
        })
        .state('replyMsgPage', {
            url: '/shopHome/replyMsgPage?commentId',
            views: {
                'login': {
                    templateUrl: "templates/manageOrders/replyMsgPage.html",
                    controller: "replyMsgPageCtrl"
                }
            }
        })
        .state('OpenShop', {
            url: '/OpenShop?thisStoreInfo',
            views: {
                'login': {
                    templateUrl: "templates/openShop.html",
                    controller: "OpenShopCtrl"
                }
            }
        })

        .state('ChangeDetails', {
            url: '/ChangeDetails',
            cache: true,
            views: {
                'login': {
                    templateUrl: "templates/changeDetails.html",
                    cache: false,
                    controller: "ChangeDetailsCtrl"
                }
            },
            params: {
                GOChangeWhat: null,
            }

        })
        .state('receiptGoodsHome', { // 发货首页 二维码页面
            url: '/receiptGoodsHome',
            cache: true,
            views: {
                'login': {
                    templateUrl: "templates/receiptGoods/receiptGoodsHome.html",
                    cache: false,
                    controller: "receiptGoodsHomeController"
                }
            },
            params: {
                teambuyId: null,
                storeId: null
            }
        })
        .state('deliveryRecords', {  //发货履历
            url: '/receiptGoodsHome/deliveryRecords',
            cache: false,
            views: {
                'login': {
                    templateUrl: "templates/receiptGoods/deliveryRecords.html",
                    cache: false,
                    controller: "deliveryRecordsController"
                }
            },
            params: {
                iosSkipFlag:false,
                teambuyId: null,
                storeId: null
            }
        })
        .state('handDeliverGoods', {  //手动发货
            url: '/receiptGoodsHome/handDeliverGoods',
            cache: true,
            views: {
                'login': {
                    templateUrl: "templates/receiptGoods/handDeliverGoods.html",
                    cache: false,
                    controller: "handDeliverGoodsController"
                }
            },
            params: {
                iosSkipFlag:false,
                teambuyId: null,
                storeId: null
            }
        })
        .state('orderInformation', {  //订单信息 确认的时候
            url: '/receiptGoodsHome/orderInformation',
            views: {
                'login': {
                    templateUrl: "templates/receiptGoods/orderInformation.html",
                    cache: false,
                    controller: "orderInformationController"
                }
            },
            params: {
                iosSkipFlag:false,
                teambuyId: null,
                storeId: null,
                orderId: null,
                userId:null
            }
        })
        .state('lineManagement', {   //路线管理
            url: '/shopHome/lineManagement',
            cache: false,
            views: {
                'login': {
                    templateUrl: "templates/routeDetails/lineManagement.html",
                    controller: "lineManagementController"
                }
            }
        })
        .state('detailsOnLine', {   //路线管理 路线详情
            url: '/lineManagement/detailsOnLine',
            views: {
                'login': {
                    templateUrl: "templates/routeDetails/detailsOnLine.html",
                    controller: "detailsOnLineController"
                }
            },
            params: {
                lineObj: null
            }
        })
        .state('allDistributionSites', {   //路线管理 全部配送点
            url: '/detailsOnLine/allDistributionSites',
            views: {
                'login': {
                    templateUrl: "templates/routeDetails/allDistributionSites.html",
                    controller: "allDistributionSitesController"
                }
            },
            params: {
                routeId: null
            }
        })
        .state('openTeambuyOrder', {   //开单
            url: '/openTeambuyOrder?thisStorId',
            views: {
                'login': {
                    templateUrl: "templates/openTeambuyOrder/goOpenTeambuyOrder.html",
                    controller: "goOpenTeambuyOrderController"
                }
            },
            params: {
                routeName: null,
                routeId: null
            }
        })
        .state('openTeambuyOrderselectRoute', {//开单--选择路线
            url: '/openTeambuyOrderselectRoute?StoreId',
            cache: true,
            views: {
                'login': {
                    templateUrl: "templates/openTeambuyOrder/openTeambuyOrderselectRoute.html",
                    controller: "openTeambuyOrderselectRouteController"
                }
            }
        })
        .state('allGoods', {   //开单--所有商品
            url: '/openTeambuyOrder/allGoods',
            cache: true,
            views: {
                'login': {
                    templateUrl: "templates/openTeambuyOrder/allGoods.html",
                    controller: "allGoodsController"
                }
            }
        })
        .state('addGoods', {   //开单--所有商品（添加商品，编辑商品）
            url: '/openTeambuyOrder/addGoods',
            cache: true,
            views: {
                'login': {
                    templateUrl: "templates/openTeambuyOrder/addGoods.html",
                    controller: "addGoodsController"
                }
            },
            params: {objGoods: null}
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

}]);
