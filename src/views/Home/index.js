/**
 * Created by lay on 2017/3/22.
 */

import React from 'react';
// import echarts from 'echarts';
import {Echarts} from './../../components/modules/Echarts';
import {echartsOption} from './../../components/modules/echartsOption';

// 基于准备好的dom，初始化echarts实例


export default class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let option={
            legendshow: true,
            legenddata: ['潜在客户','正式客户'],
            legendorient:'vertical',
            titleText:'近十年新增客户情况',
            xAxis: {
                show:true,
                axisLine:{
                    show:false,
                },
                axisTick:{
                    show:false
                },
                type:'value',
                boundaryGap: [0, 0.01],

            },
            color:["#59c161","#fe9c55"],
            yAxis: {
                type:'category',
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
            },
            series: [
                {
                    name: '潜在客户',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                },
                {
                    name: '正式客户',
                    type: 'bar',
                    data: [50, 20, 10, 15, 13, 28]
                }
            ],
        };
        let options=echartsOption.echarts(option);//图表配置项，option可通过ajax数据请求获得
        let option11={
            title:"访问途径",
            subtext:"305",
            color:["#0aadfc"],
            seriesData: [
                {
                    name: '电话来访',
                    value: 0.71
                }
            ],
        };
        let option12={
            title:"支付途径",
            subtext:"35",
            color:["#ff9c00"],
            seriesData: [
                {
                    name: '现金',
                    value: 0.2
                }
            ],
        };
        let options1=echartsOption.percentPie(option11);
        let options2=echartsOption.percentPie(option12);
        return(
            <div className="clear content home">
                <div className="fl content-left">
                    <div className="" style={{textAlign:'center'}}>
                        <h4 style={{lineHeight:'3rem',fontSize:'1.6rem',color:'#000'}}>共有<span style={{margin:'0 2%',color:'blue',fontSize:'1.8rem'}}>10,824,508</span>位客户</h4>
                        <div className="clear">
                            <div className="fl clear increase-box-sm ">
                                <div className="fl increase-box-sm-txt">本月新增</div>
                                <div className="fl increase-box-sm-num">14,895</div>
                            </div>
                            <div className="fl clear increase-box-sm">
                                <div className="fl increase-box-sm-txt">本月新增</div>
                                <div className="fl increase-box-sm-num">14,895</div>
                            </div>
                        </div>
                        <div className="clear customer-show">
                            <div className="fl customer-box lightseagreen">
                                <h4>潜在客户</h4>
                                <span>1,446,020</span>
                                <span>75.6%</span>
                            </div>
                            <div className="fl customer-box">
                                <h4>潜在客户</h4>
                                <span>1,446,020</span>
                                <span>75.6%</span>
                            </div>
                        </div>
                    </div>
                    <div id="echarts_fir">
                        <Echarts options={options} pId="echarts_fir" dataId="echarts" diyStyle={{height:'300px',width:'100%'}} diyClassName='cl'/>
                    </div>
                </div>
                <div className="fl content-right clear">
                    <div id="echarts_two" style={{width:"50%"}} className="fl">
                        <Echarts options={options1} pId="echarts_two" dataId="echarts3" diyStyle={{height:'150px',width:'100%'}} diyClassName='cl'/>
                    </div>
                    <div id="echarts_three" style={{width:"50%"}} className="fl">
                        <Echarts options={options2} pId="echarts_three" dataId="echarts4" diyStyle={{height:'150px',width:'100%'}} diyClassName='cl'/>
                    </div>
                    <div></div>
                </div>
            </div>
        )
    }
}