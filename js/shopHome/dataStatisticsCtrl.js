/**
 * Created by Administrator on 2017-04-11.
 */
appConttoller.controller('dataStatisticsCtrl', function ($scope, $http, Constant, $state, ApiService, $timeout,$rootScope,$stateParams) {

    var thisStorId = $rootScope.nowStoreId;
    //加载全部
    getChartOfSales(9);
    //切换环形图按钮
    $scope.goNowSells=function(i,j){
        var oPs=$("#chooseChartOfSales").children('p');
        $("#chooseChartOfSales").children('p').removeClass('nowState');
        $(oPs[i]).addClass("nowState");
        getChartOfSales(j);
    }

    //请求环形图数据
    function getChartOfSales(timeSign){
        ApiService.GetData("POST", Constant.System.Host + '/doughnutChartOfSales', {
            storeId:thisStorId,
            timeSign:timeSign,
        }).then(function (res) {
            if(res.resultCode==0){
                var len=res.data[0].length;
                $scope.DataO=[];
                for(var i=0;i<len;i++){
                    $scope.objItem=new Object();
                    $scope.objItem.value=res.data[0][i].productAmount;
                    $scope.objItem.name=res.data[0][i].productCategory;
                    $scope.DataO.push($scope.objItem);
                }

                allProductAmount=res.data[0][0].allProductAmount;
                dountChart($scope.DataO,allProductAmount);//生成环形图
            }else{
                console.log(res.rulstMsg);
            }
        });
    }
    //切换曲线图按钮
    $scope.goEveSells=function(i,j){
        var oPs=$("#chooseLineOfSales").children('p');
        $("#chooseLineOfSales").children('p').removeClass('nowState');
        $(oPs[i]).addClass("nowState");
        getLineOfSales(j);
    }
    //生成曲线图
    getLineOfSales(0);
    $scope.num=3;
    //请求曲线图数据
    function getLineOfSales(timeSign){
        ApiService.GetData("POST", Constant.System.Host + '/lineSeriesOfSales', {
            storeId:thisStorId,
            timeSign:timeSign,
        }).then(function (res) {
            console.log(res);
            if(res.resultCode==0){
                console.log(res);
                var len=res.data[0].length;
                $scope.xData=[];
                $scope.yData=[];
                for(var i=0;i<len;i++){
                    $scope.xData.push(res.data[0][i].date);
                    $scope.yData.push(res.data[0][i].productAmount);
                }
                if(timeSign==0){
                    $scope.xdata1=$scope.xData.slice(0,10);
                    $scope.xdata2=$scope.xData.slice(10,20);
                    $scope.xdata3=$scope.xData.slice(20,30);
                    $scope.ydata1=$scope.yData.slice(0,10);
                    $scope.ydata2=$scope.yData.slice(10,20);
                    $scope.ydata3=$scope.yData.slice(20,30);

                }else{
                    $scope.xdata1=$scope.xdata2=$scope.xdata3=$scope.xData;
                    $scope.ydata1=$scope.ydata2=$scope.ydata3=$scope.yData;

                }
                lineChart($scope.xdata3,$scope.ydata3);

            }else{
                console.log(res.rulstMsg);
            }
        });
    }

    $scope.goLeft=function(){
     console.log('right拖动了');
        $scope.num++;
        if($scope.num>=3){
            $scope.num=3;
        };
        if($scope.num==1){
            lineChart($scope.xdata1,$scope.ydata1)
        }else if($scope.num==2){
            lineChart($scope.xdata2,$scope.ydata2)
        }else if($scope.num==3){
            lineChart($scope.xdata3,$scope.ydata3)
        }

    }
    $scope.goRight=function(){
        console.log('left拖动了');
        $scope.num--;
        if($scope.num<=1){
            $scope.num=1;
        }
        if($scope.num==1){
            lineChart($scope.xdata1,$scope.ydata1)
        }else if($scope.num==2){
            lineChart($scope.xdata2,$scope.ydata2)
        }else if($scope.num==3){
            lineChart($scope.xdata3,$scope.ydata3)
        }
    }







    //曲线图生成
    function  lineChart(xdata,ydata) {
        var myChart = echarts.init(document.getElementById('canLineO'));
        option = {
            tooltip : {
                show:false,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#ffffff'
                    }
                }
            },
            grid: {
                show:true,
                left: "0%",
                right: '5%',
                bottom: '3%',
                width:"90%",
                height:'80%',
                containLabel: true,
            },
            xAxis : [
                {
                    splitLine:{
                        show:true
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#f9f9f9',
                        },

                    },
                    axisLabel:{
                        show:true,
                        textStyle: {
                            color: '#222222'
                        }
                    },
                    type : 'category',
                    boundaryGap : false,
                    data : xdata,
                }
            ],
            yAxis : [
                {
                    show:'true',
                    axisLabel:{
                        show:false,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#f9f9f9',
                        }

                    },
                }
            ],
            series : [
                {
                    name:'销售额',
                    type:'line',
                    stack: '总量',
                    smooth:true,
                    label: {
                        normal: {
                            show: true,  //点上的值
                            position: 'top',
                            textStyle:{
                                color:'#bababa'
                            }
                        }
                    },
                    areaStyle: {
                        show:false,
                        normal: {
                            opacity:0
                        }
                    },
                    data:ydata,
                }
            ],
            color:['#7da936']
        };
        myChart.setOption(option);

    }

    //环形图生成
    function  dountChart(oData){
        var myChart = echarts.init(document.getElementById('canDountO'));
        //var data=$scope.dountData;
        option = {
            title: {
                titleStyle:{ normal:{color:'#fff'} },
                text: '销售金额',
                subtext: '$'+allProductAmount,
                x: 'center',
                y: 'center',
                textStyle: {
                    color:'#222222',
                    fontSize: '14',
                    fontWeight:'normal',
                },
                subtextStyle: {
                    color:'#222222',
                    fontSize: '12',
                    fontWeight:'normal',
                }
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y:'center',
                itemGap: 5,
                align:'left',
                itemWidth:7,
                itemHeight:7,
                textStyle:{
                    fontWeight:'100',
                    fontSize:'8'
                },
                data:[
                    {
                        name:'水果',
                        icon:'circle',
                        textStyle:{
                            fontWeight:'100',
                            fontSize:'8'
                        }
                    },{
                        name:'蔬菜',
                        icon:'circle',
                        textStyle:{
                            fontWeight:'100',
                            fontSize:'8'
                        }
                    },{
                        name:'肉类',
                        icon:'circle',
                        textStyle:{
                            fontWeight:'100',
                            fontSize:'8'
                        }
                    },{
                        name:'海鲜',
                        icon:'circle',
                        textStyle:{
                            fontWeight:'100',
                            fontSize:'8'
                        }
                    },{
                        name:'奶制品',
                        icon:'circle',
                        textStyle:{
                            fontWeight:'100',
                            fontSize:'8'
                        }
                    },{
                        name:'其他',
                        icon:'circle',
                        textStyle:{
                            fontWeight:'100',
                            fontSize:'8'
                        }
                    }
                ]
            },
            series: [
                {
                    name:'销售金额',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'normal'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:oData,
                }
            ],
            color:[
                '#74c17d', '#61a8de','#76f6e5', '#8c64ad', '#de6366','#fcec3c'
            ]
        };
        myChart.setOption(option);

    }



})