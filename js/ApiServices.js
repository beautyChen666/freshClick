angular.module('starter.services', [])

.service("ApiService",function($http,$timeout,$q,Constant){
    this.GetData=function(method,url,params){
        var deferred = $q.defer();
        $http({
            method: method,
            url:url,
            params:params,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
            },
            timeout: function(){console.log("请求超时！")}
        }).success(function (res) {
            console.log("请求成功");
            deferred.resolve(res);
        }).error(function (data) {
            console.log("请求失败");
            deferred.reject(data);
        });
        return deferred.promise;
    };
}).service("commonService", function () {
    var _this=this;
    _this.prePageSelect="";
    return _this;
});
