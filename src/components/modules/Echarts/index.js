/**
 * Created by lay on 2017/3/27.
 */

import React from 'react';
import echarts from 'echarts';
import $ from 'jquery';

class Echarts extends React.Component{
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
    }
    componentDidMount(){
        let propsOptions=this.props.options;
        //基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById(this.props.dataId));
        // 绘制图表
        let options=propsOptions;
        myChart.setOption(options);
        window.addEventListener("resize",()=>{
            myChart = echarts.init(document.getElementById(this.props.dataId));//重新定义容器
            myChart.clear();
            myChart.setOption(options);
        });
        //点击收缩左侧区域，对应echarts重新渲染
        if(document.getElementById('trigger')){
            document.getElementById('trigger').onclick=()=>{
                myChart = echarts.init(document.getElementById(this.props.dataId));
                myChart.clear();
                setTimeout(()=>{
                    let pEle=$("#"+this.props.pId);//父级
                    if(pEle.width()){
                        let pWidth=pEle.width();//获取父级的宽度
                        let ele=$("#"+this.props.dataId);
                        if(ele.find('canvas')){
                            ele.find('div').width(pWidth);//将当前渲染的画布容器宽度设置和父级同宽
                            ele.find('canvas').width(pWidth);//将当前渲染的画布宽度设置和父级同宽
                        }
                    }
                    myChart.setOption(options);
                },500)

            }
        }
    }
    render(){
        return (
                <div id={this.props.dataId} style={this.props.diyStyle} className={this.props.diyClassName}></div>
        )
    }
}

export default {Echarts};