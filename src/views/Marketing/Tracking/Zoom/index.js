
/**
 *
 * Created by lzf on 2017/4/14.
 */

import React from 'react';
import Zoom  from './../../../../components/modules/zoom';
import $ from 'jquery';

//引入css样式
require("./zoom.css");

class List_3 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            picIndex:0,//imgData下的第n张初始显示
            imgData:[//全部图片数据
                "./../../../../images/pic_01.jpg",
                "./../../../../images/food_02.jpg",
                "./../../../../images/food_03.jpg",
                "./../../../../images/girl.jpg",
                "./../../../../images/girl_02.jpg",
                "./../../../../images/timg.jpg",
                "./../../../../images/food_03.jpg",
                "./../../../../images/girl.jpg",
                "./../../../../images/girl_02.jpg",
                "./../../../../images/timg.jpg",
            ],
            picUrl:"",
        };
        this.handleClickPic=this.handleClickPic.bind(this);
    }
    handleClickPic(item,picIndex){
        return ()=>{
            this.setState({picUrl:item,picIndex});
            let choicePicBox=$("#choicePicBox");
            //如果当前点击的是第三个之后的，并且不是最后一个，就会开始往后滚动
            if(picIndex>2&&picIndex<(this.state.imgData.length-1)){
                choicePicBox.animate({left:(2-picIndex)*110+'px'})
            }
            //如果当前点击的是第三个之前的，把left设置为0
            else if(picIndex<=2){
                choicePicBox.animate({left:0})
            }
        }
    }
    componentDidMount(){
        this.setState({picUrl:this.state.imgData[this.state.picIndex]});//设置首张图片
    }
    render(){
        let {picUrl,imgData,picIndex} = this.state;
        return (
            <div className="views-zoom">
                <h3>Try to move the mouse on the picture!</h3>
                <div style={{width:"50%"}} >
                    <div className="zoom-box">
                        <Zoom
                            zoomRate="3"
                            smallPic={picUrl}
                            initWidth="300"
                            cursorInitWidth="60"
                            zoomPosition="right"
                            id="test"
                            className="zoom-pic"
                        />
                    </div>
                    {/*图片选择*/}
                    {/*一次最多显示4张*/}
                    <div className="choice-pic-box" style={{width:"440px"}}>
                        <ul className="clear" style={{width:imgData.length*110+'px'}} id="choicePicBox">
                            {
                                imgData.map((item,index)=><li className={picIndex==index?"active fl choice-pic-small":" fl choice-pic-small"} key={index} onClick={this.handleClickPic(item,index)}><img src={item} alt=""/></li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default List_3;