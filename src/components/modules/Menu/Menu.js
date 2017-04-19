/**
 * Created by lay on 2017/3/22.
 */

import React from 'react';
import $ from 'jquery';
import reqwest from 'reqwest';
import {Menu,Icon,Spin} from 'antd';
import NavLink from "./../../NavLink";
import action from './../../actions/nav';
import {connect} from 'react-redux';

const {SubMenu,ItemGroup,Item} =Menu;

class DiyMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:null,
            currentKey:null,
            currentKeyPath:null,
            defaultSelectedKeys:null,
        };
        this.componentDidMount=this.componentDidMount.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
    }

    handleClick(e){
        const {dispatch}=this.props;
        const path=e.key;
        const currentKeyPath=e.keyPath;
        const currentKey=new Array(1).fill(path);
        this.setState({
            currentKey,
            currentKeyPath
        });
        dispatch(action.navChange(currentKeyPath));

    }
    handleSelect(e){
    }
    componentDidMount(){
        const {dispatch}=this.props;
        //请求数据
        // let _this=this;
        // $.getJSON(this.props.url,function(data){
        //     let siderData=data.data;
        //     let currentKey=new Array(1).fill(siderData.items[0].key);
        //     _this.setState({data:siderData,currentKey,currentKeyPath:currentKey});
        //     dispatch(action.navInit(currentKey));
        // });
        this.setState({loading:true});
        reqwest({
            url:this.props.url,
            method:'get',
            data:{},
            type:'json',
        }).then((data)=>{
            let siderData=data.data;
            let currentKey=new Array(1).fill(siderData.items[0].key);
            //通过地址对应的查询当前活跃页面，修改导航栏对应acitve项
            let href=location.href;
            let currentKeyPath=[];//存储符合条件的地址
            // const currentHref=href.split(/[#?]/)[1];//以“#”，“？”将地址分割
            const currentHref=href.split(/([#?]|\/_)/);//以“#”，“？”，”/_“将地址分割，“/_”是页面内的自定义的路由切割规则，定义路由的时候以“_”开头。
            //递归查询
           let findActive=(data)=> {
               for (let i = 0; i < data.length; i++) {
                   let item;
                   item = data[i];

                   if (!item.hasChild) {
                       if (currentHref.indexOf(item.url)!=-1) {
                           currentKeyPath.push(item.key);
                           return currentKey = new Array(1).fill(item.key);
                       }
                   }else {
                       currentKeyPath.pop();
                       currentKeyPath.push(item.key);
                       return findActive(item.child.data[0].child)
                   }
               }
           };
           findActive(siderData.items);
           this.setState({data:siderData,currentKey,currentKeyPath:currentKeyPath,loading:false,defaultSelectedKeys:currentKey});
            currentKeyPath.reverse();
            dispatch(action.navInit(currentKeyPath));
        })
    }
    render(){
        if(!this.state.data){
            return (<Spin />)
        }
        //判断是否设置了初始项，若没有则用数据第一项
        const defaultSelectedKeys=this.state.defaultSelectedKeys?this.state.defaultSelectedKeys: new Array(1).fill(this.state.data.items[0].key);
         return(
            <Menu
                theme={this.state.data.theme || ""}
                mode={this.state.data.mode || ""}
                style={this.state.data.style}
                onSelect={this.handleSelect}
                onClick={this.handleClick}
                defaultSelectedKeys={defaultSelectedKeys}
                loading={this.state.loading}
            >
                { this.state.data.items.map(item=>{
                    if(!item.hasChild) {
                        return <Item  key={item.key}>
                            <NavLink to={item.url}>{item.icon?<Icon type={item.icon}/>:''}{item.txt}</NavLink>
                        </Item>
                    }else{
                        let sub;
                        let  f=(item)=>{
                            let itemChild=item.child;
                            let childs;
                            childs=itemChild.data.map((i,index)=>{
                                let iChild;
                                if(i.child.length>0){
                                    iChild=i.child.map(ichild=>{
                                        if(!ichild.hasChild){
                                            return<Item key={ichild.key}>
                                                <NavLink to={ichild.url}>
                                                    {ichild.icon?<Icon type={ichild.icon} />:''}{ichild.txt}
                                                </NavLink>
                                            </Item>
                                        }else{
                                            f(ichild);
                                            return sub;
                                        }

                                    })
                                }
                                if(itemChild.isGroup){//分组形式
                                    return <ItemGroup title={<span><Icon type={i.icon}/>{i.groupTitle}</span>} key={index+'g'} >
                                        {iChild}
                                        </ItemGroup>
                                }else{
                                    return iChild
                                }

                            });
                            //sub=<SubMenu title={<NavLink to={item.url}>{item.icon?<Icon type={item.icon}/>:''}{item.txt}</NavLink>} key={item.key}>
                                sub=<SubMenu title={<span>{item.icon?<Icon type={item.icon}/>:''}{item.txt}</span>} key={item.key}>
                                {childs}
                                </SubMenu>;
                            return  sub;
                        };
                        f(item);
                        return sub;
                    }
                })}
            </Menu>
        )

    }
}

const mapStateToProps=(state)=>{
    return state;
};

DiyMenu=connect(mapStateToProps)(DiyMenu);
export default DiyMenu