
/**
 *
 * Created by lzf on 2017/4/14.
 */

import React from 'react';
import {connect} from 'react-redux';
import {showConfirm} from './../../../../components/modules/Modal'
import action from './../../../../components/actions/doubleClick';

require("./doubleClick.css");

class DoubleClick extends React.Component{
    constructor(props){
        super(props);
        this.state={
            button_content:"Begin",
            isClick:false,
            button_class:"btn-info",
            interval:null,
            interval_time:0,
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleResetClick=this.handleResetClick.bind(this);
    }
    handleClick(){
        const {dispatch} = this.props;
        if(!this.state.isClick){
            this.setState({
                button_content:"Stop",
                isClick:true,
                button_class:"btn-warning"
            });
            const click_now = new Date();

            this.setState({
                interval:setInterval(()=>{
                        let right_now = new Date();
                        let time=right_now-click_now;
                        this.setState({time});
                        dispatch(action.begin_click({time}));
            },0.5)});
            // this.refs.txt.className='btn btn-warning';//设置样式，同样生效
        }else{
            this.setState({
                button_content:"Begin",
                isClick:false,
                button_class:"btn-info"
            });
            clearInterval(this.state.interval);
            dispatch(action.stop_click(this.state.time));
        }
    }

    handleResetClick(){
        const {dispatch} = this.props;
        showConfirm({
            onOk:()=>{
                dispatch(action.reset_click(0))
            },
            onCancel:()=>{}
        })
    }

    render(){
        return (
            <div className="doubleClick">
                <h3>DoubleClick</h3>
                <h4>Double click the button as quickly as possible to create the best grade!</h4>
                <div>
                    <p>The best grade<span className="best-grade">{this.props.doubleClick.best_grade}ms</span> </p>
                    <p>{this.props.doubleClick.time}ms</p>
                    <div>
                        <button type="button" className={this.state.button_class+" btn"} ref="txt" onClick={this.handleClick}>{this.state.button_content}</button>
                        <button type="button" className="btn btn-danger" onClick={this.handleResetClick}>Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return state;
};

DoubleClick = connect(
    mapStateToProps
    )(DoubleClick);

export default DoubleClick;