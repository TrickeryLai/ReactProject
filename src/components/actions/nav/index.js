/**
 * Created by lay on 2017/3/23.
 */

//导航栏切换，对应面包屑内容改变

export const navChange=((current,data)=>{
    return {
        type:"NAV_CHANGE",
        breadCrumb:current
    }
});
//初始加载
const navInit=((current,data)=>{
    return {
        type:"NAV_INIT",
        breadCrumb:current
    }
});

export default {navChange,navInit}