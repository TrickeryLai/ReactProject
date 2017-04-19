/**
 * Created by lzf on 2017/4/18.
 */

import React from 'react';
import $ from 'jquery';

require("./zoom.css");

class Zoom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            initWidth:this.props.initWidth || this.props.initHeight ||200,
            initHeight:this.props.initHeight || this.props.initWidth || 200,
            cursorInitWidth:this.props.cursorInitWidth || this.props.cursorInitHeight ||50,
            cursorInitHeight:this.props.cursorInitHeight || this.props.cursorInitWidth ||50,
            zoomPosition:this.props.zoomPosition ||"left",
        }
    }

    componentDidMount(){
        const layout=$("#layout-wrap"),//最外层容器
            picBlock=$("#picBlock"),
            cursorBlock=$("#cursorBlock"),
            zoomBlock=$("#zoomBlock"),
            zoomViewsBlock=$("#zoom-viewsBlock"),
            {initWidth,initHeight,cursorInitHeight,cursorInitWidth}=this.state,
            rate=this.props.zoomRate || 4,//放大倍数，默认四倍
            picLeft=picBlock.offset().left-parseFloat(picBlock.css("marginLeft"))/2,
            picTop=picBlock.offset().top-parseFloat(picBlock.css("marginTop"))/2,
            picWidth=initWidth,
            picHeight=initHeight,
            cursorWidth=cursorInitWidth,
            cursorHeight=cursorInitHeight;
            // cursorWidth=parseFloat(cursorBlock.css("width")),
            // cursorHeight=parseFloat(cursorBlock.css("height"));
            // rate=parseFloat(zoomBlock.css("width"))/picWidth;
        //根据设置的数值，设置对应的样式
        // 正常显示图片
        picBlock.css({width:this.props.width||initWidth+'px',height:this.props.height||initHeight+'px'});
        // 放大图片
        zoomBlock.css({width:this.props.width*rate||initWidth*rate+'px',height:this.props.height||initHeight*rate+'px'});
        // 鼠标对应区域
        cursorBlock.css({width:cursorInitWidth+'px',height:cursorInitHeight+'px'});
        // 放大显示区域
        zoomViewsBlock.css({[this.state.zoomPosition]:(initWidth-(-50))+'px',top:-50+'px',width:cursorInitWidth*rate+'px',height:cursorInitHeight*rate+'px'});
        // this.refs.moduleZoom.style.width=this.props.width||initWidth+'px';
        this.refs.moduleZoom.style.height=this.props.height||initHeight+'px';
        picBlock.mouseenter((e)=>{
            let xx = e.originalEvent.x || e.originalEvent.layerX || 0,
              yy = e.originalEvent.y || e.originalEvent.layerY || 0,
                scrollTop=layout.scrollTop(),
                scrollLeft=layout.scrollLeft();
            cursorBlock.css({display:"block",top:yy-picTop-cursorHeight/2+scrollTop,left:xx-picLeft-cursorWidth/2+scrollLeft});
            zoomBlock.css({display:"block",top:-rate*(yy-picTop-cursorHeight/2+scrollTop),left:-rate*(xx-picLeft-cursorWidth/2+scrollLeft)});

        })
            .bind("mousemove",(e)=>{
                let xx = e.originalEvent.x || e.originalEvent.layerX || 0,
                    yy = e.originalEvent.y || e.originalEvent.layerY || 0,

                    scrollTop=layout.scrollTop(),
                    scrollLeft=layout.scrollLeft(),
                    cursorTop=yy-picTop-cursorHeight/2+scrollTop,//鼠标位置-图片容器offset+滚动条-鼠标区域的一半
                    cursorLeft=xx-picLeft-cursorWidth/2+scrollLeft;
                //防止，鼠标模块移出图片区域
                if(cursorTop<=0){
                    cursorTop=0;
                }else if(cursorTop>=picHeight-cursorHeight){
                    cursorTop=picHeight-cursorHeight;
                }
                if(cursorLeft<=0){
                    cursorLeft=0;
                }else if(cursorLeft>=picWidth-cursorWidth){
                    cursorLeft=picWidth-cursorWidth;
                }
                cursorBlock.css({top:cursorTop,left:cursorLeft});
                zoomBlock.css({display:"block",top:-rate*cursorTop,left:-rate*cursorLeft});
            })
            .mouseleave(()=>{
                picBlock.unbind("mousemove",()=>{});
                cursorBlock.css({display:"none"});
                zoomBlock.css({display:"none"});
            })
    }
    render(){
        return (
            <div className={this.props.className+" modules-zoom"} id={this.props.id} ref="moduleZoom">
                {/*正常显示区域*/}
                <div className="modules-zoom-picBlock" id="picBlock">
                    <div className="modules-zoom-pic" >
                        <img src={this.props.smallPic || this.props.zoomPic} alt=""/>
                    </div>
                    <div className="modules-zoom-cursor" id="cursorBlock"></div>
                </div>
                {/*放大区域*/}
                <div className="modules-zoom-block" id="zoom-viewsBlock">
                    <div className="modules-zoom-bigPic" id="zoomBlock">
                        <img src={this.props.zoomPic ||this.props.smallPic} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Zoom