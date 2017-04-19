
import React from 'react';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';

const {Item} =Breadcrumb;


class DiyBreadCrumb extends  React.Component{
    render(){
        return (
            <Breadcrumb style={this.props.style || ''} className="fr">
                {
                    this.props.breadCrumb.reverse().map(item=>{
                       return <Item key="item">{item}</Item>
                })
                }
            </Breadcrumb>
        )
    }
}

const mapStateToProps=(state,props)=>{
    return {breadCrumb:state.breadCrumb.breadCrumb,style:props.styles};
};

DiyBreadCrumb=connect(mapStateToProps)(DiyBreadCrumb);

export default DiyBreadCrumb;