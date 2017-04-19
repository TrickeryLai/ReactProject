/**
 * Created by lay on 2017/3/24.
 */

import {message} from 'antd';

//message全局配置
message.config({
    top:70,//消息距离顶部的位置
    duration:2,//默认自动关闭延时
    // getContainer:()=>document.body//默认渲染节点的输出位置
});

export default message;