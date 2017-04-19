/**
 * Created by lay on 2017/3/22.
 */

import React from 'react';
import {Layout, Icon} from 'antd';
import DiyMenu from '../../components/modules/Menu/Menu';
import DiyBreadCrumb from '../breadCrumd/BreadCrumd';

const {Header,Footer,Sider,Content} = Layout;

export default class LayOut extends React.Component{
   constructor(props){
       super(props);
      this.state={
           collapsed:false,
           mode:'inline',
          siderData:{},
          headerData:{}
       };
      this.onCollapse=this.onCollapse.bind(this);
      this.toggle=this.toggle.bind(this);

   }

   toggle(){
       this.setState({collapsed:!this.state.collapsed})
   }
    onCollapse(collapsed){
        this.setState({collapsed,mode:collapsed?'vertical':'inline',})
    };
    render(){
        return (
            <div className="app">
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        //onCollapse={this.onCollapse}
                    >
                        <div className="relative allWH">
                            <Icon
                                id="trigger"
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <DiyMenu url="../../../data/sider-menu/siderMenu.json"/>
                        </div>
                    </Sider>
                    <Layout id="layout-wrap">
                        <Header>
                            <div className="relative">
                                <DiyMenu url='../../../data/header-menu/headerMenu.json' />
                            </div>
                        </Header>
                        <Content style ={{margin:"2.4rem",marginTop:"0.6rem"}} className="clear">
                            <DiyBreadCrumb styles={{marginBottom:"0.6rem",marginRight:"1.2rem"}}/>
                            <div className="fl allWH" style={{minHeight:"37rem"}}>
                                {this.props.children}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}