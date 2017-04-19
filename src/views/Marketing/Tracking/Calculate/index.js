/**
 * Created by lzf on 2017/4/14.
 */

import React from 'react';
import {connect} from 'react-redux';
import action from './../../../../components/actions/calculate';

require("./calculate.css");

class Calculate extends React.Component{
    constructor(props){
        super(props);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
    }
    handleInputChange(){
        const {dispatch} = this.props;
        const type = this.refs.calculate_type.value.toUpperCase();
        const val1 = this.refs.val1.value.trim();//第一个输入框的值
        const val2 = this.refs.val2.value.trim();//第一个输入框的值
        dispatch(action.calculate_type({type,val1,val2}))
    }
    handleSelectChange(){

        const {dispatch} = this.props;
        const type = this.refs.calculate_type.value.toUpperCase();
        const val1 = this.refs.val1.value.trim();//第一个输入框的值
        const val2 = this.refs.val2.value.trim();//第一个输入框的值
        dispatch(action.calculate_type({type,val1,val2}))
    }

    componentDidMount(){
        const {dispatch} = this.props;
        //组件加载之后，初始化结果
        dispatch(action.calculate_init());
    }

    render(){
        return (
            <div className="tracking-calculate">
                <h3>Calculate</h3>
                <p>Input the number </p>
                <div>
                    <input type="text" className="form-control input-width" onChange={this.handleInputChange} ref="val1"/>
                    <select name="" id="" className="form-control input-width" onChange={this.handleSelectChange} ref="calculate_type">
                        <option value="calculate_add">+</option>
                        <option value="calculate_reduce">-</option>
                        <option value="calculate_multiplication">X</option>
                        <option value="calculate_division">÷</option>
                    </select>
                    <input type="text" className="form-control input-width" onChange={this.handleInputChange} ref="val2"/>
                    <span> = {this.props.calculate}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return state
};

Calculate = connect (mapStateToProps)(Calculate);

export default Calculate;