/**
 * Created by cj on 2017/5/9.
 */
angular.module('starter.filter', [])
.filter('filterRate',function(){
    return function (item) {
        var nowItem=(1+item.rate)*item.productPrice*item.productRealityQuantity;
    }
});