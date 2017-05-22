 var appConttoller=angular.module('starter.controllers', []);

appConttoller.controller('LoginCtrl', function($scope,$http,Constant,$state,ApiService,$rootScope) {
    var userData=JSON.parse(sessionStorage.getItem("userFindPwd"));
    var userInformation=JSON.parse(localStorage.getItem("userInformation"));
    if(userData){
        var userEmail=userData;
        $("#userEmail").val(userEmail);
    }else if(userInformation){
        var userEmail=userInformation.email;
        $("#userEmail").val(userEmail);
    }
    $scope.goLogin=function(){
        var email=$("#userEmail").val(),
            password=$("#userPwd").val();  //hex_sha256(加密)
        ApiService.GetData("POST",Constant.System.Host+'/login',{
            email:email,
            password:password,
            userType:"1"
        }).then(function(res){
            if(res.resultCode==0) {
                //$state.go("myShop");
                if(res.data[0].storeNum==0){
                    var status=res.data[0].userStatus;
                    $state.go("goOpenShop",{"fromLogin":"status"});
                }else{
                    $state.go("myShop",{reload:true});
                }
                var data=JSON.stringify(res.data);
                localStorage.setItem("userInformation", data);
                //console.log(res.data);
            }else{
                var len=res.data.length;
                var str="";
                for(var i=0;i<len;i++){
                    str+=res.data[i]+"!";
                }
                $rootScope.alertPop(str);
            }
        });
    };

});


