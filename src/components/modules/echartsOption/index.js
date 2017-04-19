
//echarts相关的配置项
let echartsOption={};

echartsOption.prototype={
    echarts:function(propsOptions){
        return {
                legend: propsOptions.legend ||{
                    show:propsOptions.legendShow || true,
                    data:propsOptions.legendData || [],
                    orient:propsOptions.legendorient||'horizontal',
                    right:20,
                    top:10
                },
                //设置组件离容器距离
                grid:propsOptions.grid || {
                    show: false,
                    left: '5%',
                    right: '10%',
                    top: '15%',
                    bottom:'2%',
                    containLabel: true
                },
                color:propsOptions.color,
                calculable: false,
                title: {
                    text: propsOptions.titleText||'',
                    textStyle:propsOptions.textStyle || {
                        color:'#666',
                        fontStyle:'normal',
                        fontWeight:'bold',
                        fontFamily:'宋体',
                        fontSize:14
                    },
                    padding:propsOptions.padding || [10,0,0,20],//上右下左
                },
                barGap:0.1,
                tooltip:propsOptions.tooltip || {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    // formatter: function(params) {
                    //     let res = params[0].name+'<br/>';
                    //     let myseries = params;
                    //     for (let i = 0; i < myseries.length; i++) {
                    //         res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + myseries[i].color + '"></span>'+ myseries[i].name+" : "+myseries[i].value+'<br/>';
                    //     }
                    //     return res;
                    // }
                },
                xAxis:propsOptions.xAxis || {
                    show:false,
                    type:'category',
                    boundaryGap: [0, 0.01],
                    data:propsOptions.xAxisData ||[]
                },
                yAxis:propsOptions.yAxis || {
                    type:'value',
                    nameRotate:null,
                    // inverse:true,//是否反向显示坐标轴，echarts3新增
                    axisLabel:{
                        show:true,
                        rotate:0,
                        margin:8
                    },
                    data:propsOptions.yAxisData || []
                },
                series:propsOptions.series || [],
            };
    },
    percentPie:function(opt){
        let option= {
            title:{
              show:true,
                text:opt.title,
                left:"center",
                bottom:"0%",
                subtext:opt.subtext,
                textStyle:{
                    fontSize:12
                },
            },
            grid:opt.grid || {
                show: false,
                left: '5%',
                right: '10%',
                top: '0',
                bottom:'10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                show:false
            },
            legend: {
                show:false,
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            color:opt.color,
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['50%', '60%'],
                    center:['50%','35%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                           formatter:function(params){
                               let res = params.percent+"%";
                              // res+=params.value;
                               return res;
                           }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:opt.seriesData || []
                }
            ]
        };
        let bgData={
            value:(1-opt.seriesData[0].value),
            name:"",
            itemStyle:{
                normal:{
                    color:"transparent",
                    borderColor:"#f5f5f5"
                }
            }
        };
        option.series[0].data.push(bgData);
        return option
    }
};

echartsOption=echartsOption.prototype;

export default {echartsOption}