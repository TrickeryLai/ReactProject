/**
 * Created by lay on 2017/3/24.
 */
import React from 'react';
import {Modal} from 'antd';
import {Mask} from './mask'

class DiyModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            newRandomKey:null
        };
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);

    }
    handleOk(){
        this.setState({visible:false});

    }
    handleCancel(){
        this.setState({visible:false});
    }
    render(){
        const randomNum=Math.random(1000);//随机生成数，用做modal key值，保证每次生成的modal不一样
        return (
            <Modal
                key={randomNum}
                visible={this.props.visible}//对话框是否可见
                title={this.props.title}//标题
                onOk={this.props.handleOk}//确定按钮
                onCancel={this.props.handleCancel}//取消按钮
                footer={null}

            >
                {this.props.children}
            </Modal>
        )
    }
}

export default DiyModal;